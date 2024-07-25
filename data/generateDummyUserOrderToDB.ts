"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { getProducts } from "./getProducts";
import { $Enums } from "@prisma/client";
import { addCartToOrder } from "@/actions/addCartToOrder";
import { getCartItembyId } from "./getCartItembyId";
import { getCartIdbyUserId } from "./getCartIdbyUserId";

export const generateDummyUserOrderToDB = async () => {
  const maxItems = 4;
  const numItemsToAdd = Math.floor(Math.random() * maxItems) + 1;

  const getRandomUserId = async () => {
    const users = await db.user.findMany();

    if (users.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * users.length);
    return users[randomIndex];
  };

  const user = await getRandomUserId();

  let cart = await db.cart.findUnique({
    where: {
      userId: user?.id,
    },
  });

  if (!cart) {
    cart = await db.cart.create({
      data: {
        userId: user?.id!,
      },
    });
  }

  const getRandomProducts = async () => {
    const products = await getProducts();
    if (products.length === 0) return;
    const randomIndex = Math.floor(Math.random() * products.length);
    return products[randomIndex];
  };

  const createRandomCartItems = async () => {
    try {
      const itemsCreated = [];
      for (let i = 0; i < numItemsToAdd; i++) {
        const product = await getRandomProducts();
        if (!product) continue;

        const quantity = Math.floor(Math.random() * 3) + 1; // Random quantity between 1 and 3
        const sizeOption = "standard";
        const sideOption = "noAddOns";

        const newItem = db.cartItem.create({
          data: {
            cartId: cart.id,
            productId: product.id,
            quantity: quantity,
            sizeOption: sizeOption,
            sideOption: sideOption,
            extraPrice: 0,
            itemTotal: product.price * quantity,
          },
        });
        itemsCreated.push(newItem);
      }
      return await Promise.all(itemsCreated);
    } catch {
      return { error: "Failed to create cart items:" };
    }
  };

  await createRandomCartItems();
  const cartItems = await db.cartItem.findMany({
    where: { cartId: cart.id },
    include: { product: true },
  });

  const orderPrice = cartItems.reduce(
    (totalPrice, item) => totalPrice + item.itemTotal,
    0
  );
  const formattedPrice = parseFloat(orderPrice.toFixed(2));
  function generateDummyUKAddress() {
    const cities = [
      "London",
      "Manchester",
      "Birmingham",
      "Leeds",
      "Glasgow",
      "Southampton",
      "Liverpool",
      "Newcastle",
      "Nottingham",
      "Sheffield",
    ];
    const streets = [
      "High Street",
      "Station Road",
      "Main Street",
      "Park Road",
      "Church Road",
      "Church Street",
      "London Road",
      "Victoria Road",
      "Green Lane",
      "Manor Road",
    ];
    const postcodes = [
      "SW1A 1AA",
      "SW1A 0PW",
      "CB3 0FA",
      "B1 1TB",
      "L1 8JQ",
      "G1 1DT",
      "S1 2HE",
      "NE1 7RU",
      "NG1 5ND",
      "BS1 5UH",
    ];

    const city = cities[Math.floor(Math.random() * cities.length)];
    const street = streets[Math.floor(Math.random() * streets.length)];
    const postcode = postcodes[Math.floor(Math.random() * postcodes.length)];
    const houseNumber = Math.floor(Math.random() * 100) + 1;

    return `${houseNumber} ${street}, ${city}, ${postcode}`;
  }
  const address = generateDummyUKAddress();
  const amountReceived = cartItems.reduce((total, item) => {
    return total + item.itemTotal;
  }, 0);
  const order = await db.userOrder.create({
    data: {
      userId: user?.id!,
      orderPrice: formattedPrice,
      deliveryAddress: address,
      status: "PAID",
      clientEmail: user?.email,
      amountReceived: amountReceived,
    },
  });

  const orderItemsData = cartItems.map((item) => ({
    orderId: order.id,
    productId: item.productId,
    quantity: item.quantity,
    sizeOption: item.sizeOption,
    sideOption: item.sideOption,
    extraPrice: item.extraPrice,
    price: item.product.price,
  }));

  await db.$transaction([
    db.orderItem.createMany({ data: orderItemsData }),
    db.cartItem.deleteMany({ where: { cartId: cart.id } }),
  ]);

  return { message: "order generated" };
};
