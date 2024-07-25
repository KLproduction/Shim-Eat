import { db } from "@/lib/db";
import { ProductCategory } from "@prisma/client";

export const ADDONSPRICE = {
  size: {
    standard: 0,
    large: 2.0,
  },
  addOns: {
    redRice: 1,
    potatoSalad: 1.5,
    brownToast: 0,
    noAddOns: 0,
  },
};

export const products = [
  {
    name: "Garden Delight Steak Salad",
    description:
      "Dive into freshness with our Garden Delight Steak Salad! Juicy steak bites, crisp greens, and a sprinkle of seeds create a perfect harmony of flavors and textures, making it a must-try for salad lovers seeking a hearty yet refreshing meal.",
    image: "https://i.ibb.co/r4YjXMp/Garden-Delight-Steak-Salad.png",
    category: "salad" as ProductCategory,
    price: 8.99,
  },
  {
    name: "Rainbow Tofu Power Bowl",
    description:
      "Energize your day with our Rainbow Tofu Power Bowl! Packed with vibrant veggies, protein-rich tofu, and eggs, it's a colorful feast that’s as nutritious as it is delicious. Perfect for fueling your adventures with taste and health!",
    image: "https://i.ibb.co/RSMnWcN/Rainbow-Tofu-Power-Bowl.png",
    category: "main" as ProductCategory,
    price: 8.99,
  },
  {
    name: "Chickpea Avocado Curry Box",
    description:
      "Savor the zest of our Chickpea Avocado Curry Box! A delightful blend of spicy curry, creamy avocado slices, and hearty chickpeas, served over fluffy rice. It’s a tasteful choice for a satisfying lunch that packs a punch of flavor and nutrients.",
    image: "https://i.ibb.co/b3vBbKw/Chickpea-Avocado-Curry-Box.png",
    category: "main" as ProductCategory,
    price: 11.99,
  },
  {
    name: "Mediterranean Tuna Pasta Salad",
    description:
      "Enjoy a taste of the Mediterranean with our Tuna Pasta Salad! Loaded with flaky tuna, fresh veggies, and twirl-ready pasta, this salad is a delightful mix of textures and flavors, perfect for a light lunch or a satisfying side dish.",
    image: "https://i.ibb.co/K6W4ZKf/Mediterranean-Tuna-Pasta-Salad.png",
    category: "salad" as ProductCategory,
    price: 8.99,
  },
  {
    name: "Avocado Lentil Harvest Salad",
    description:
      "Delight in the wholesome goodness of our Avocado Lentil Harvest Salad! A hearty mix of fresh greens, creamy avocado, roasted sweet potatoes, and protein-packed lentils, topped with a sprinkle of pomegranate seeds for a burst of flavor. Perfect for a nourishing meal any time of day!",
    image: "https://i.ibb.co/ZLj8zr3/Avocado-Lentil-Harvest-Salad.png",
    category: "salad" as ProductCategory,
    price: 8.99,
  },
  {
    name: "Grilled Asparagus Parmesan Salad",
    description:
      "Experience the elegance of our Grilled Asparagus Parmesan Salad! This dish features tender grilled asparagus, crisp mixed greens, and shaved Parmesan, all sprinkled with a nutty crunch. It's a sophisticated salad that's perfect for impressing guests or enjoying a luxurious lunch.",
    image: "https://i.ibb.co/7rw28bg/Grilled-Asparagus-Parmesan-Salad.png",
    category: "salad" as ProductCategory,
    price: 8.99,
  },
  {
    name: "Sesame Pork Bao",
    description:
      "Bite into the delightful Sesame Pork Bao! Soft, fluffy bao filled with succulent pork, topped with fresh cucumbers and a sprinkle of sesame seeds. It's a fusion of flavors that's sure to bring a touch of Asian flair to your meal.",
    image: "https://i.ibb.co/pRrPRgQ/Sesame-Pork-Bao.png",
    category: "main" as ProductCategory,
    price: 6.99,
  },
  {
    name: "Avocado Egg-Toast Supreme",
    description:
      "Start your morning right with our Avocado Egg-Toast Supreme! Creamy avocado spread on toasted bread, topped with a perfectly cooked sunny-side-up egg and a sprinkle of chili flakes for a little kick. It's the ultimate breakfast to kickstart your day with energy and flavor.",
    image: "https://i.ibb.co/BVV1pPK/Avocado-Egg-Toast-Supreme.png",
    category: "main" as ProductCategory,
    price: 5.99,
  },
  {
    name: "Elegant Chicken Skewer Platter",
    description:
      "Presenting our Elegant Chicken Skewer Platter — a culinary masterpiece! Enjoy succulent grilled chicken skewers, served with a side of roasted vegetables, vibrant beetroot salad, and a zesty dip. Perfect for those who appreciate a beautifully balanced meal.",
    image: "https://i.ibb.co/XCT5Fpg/Elegant-Chicken-Skewer-Platter.png",
    category: "main" as ProductCategory,
    price: 5.99,
  },
  {
    name: "Fusion Feast Poke Bowl",
    description:
      "Explore the flavors of our Fusion Feast Poke Bowl! A delightful mix of shredded chicken, crispy wonton, fresh veggies, and avocado, all brought together with a dash of sesame seeds. It's a unique blend of textures and tastes that promises a culinary adventure in every bite!",
    image: "https://i.ibb.co/NtZyz4g/Fusion-Feast-Poke-Bowl.png",
    category: "main" as ProductCategory,
    price: 6.99,
  },
  {
    name: "Asian Noodle Delight",
    description:
      "Taste the exotic with our Asian Noodle Delight! This dish combines delicate rice noodles with succulent shrimp, boiled eggs, and crispy toppings, all tossed in a savory sauce. It's a refreshing take on traditional Asian cuisine that's bursting with flavor.",
    image: "https://i.ibb.co/qCKDjkW/Asian-Noodle-Delight.png",
    category: "main" as ProductCategory,
    price: 4.99,
  },
  {
    name: "Spicy Cucumber Sesame Salad",
    description:
      "Refresh your palate with our Spicy Cucumber Sesame Salad! Crisp cucumber slices tossed with sesame seeds, fresh herbs, and a kick of chili to spice things up. This light and flavorful salad is the perfect side to any meal, or a refreshing snack on its own.",
    image: "https://i.ibb.co/9Wxhvw8/Spicy-Cucumber-Sesame-Salad.png",
    category: "salad" as ProductCategory,
    price: 4.99,
  },
  {
    name: "Citrus Bliss Smoothie",
    description:
      "Quench your thirst with our Citrus Bliss Smoothie! A vibrant blend of fresh lemons and limes, this smoothie is not only refreshing but also packed with a zesty punch that will wake up your taste buds and revitalize your day. Perfect for a sunny afternoon or a healthy morning start!",
    image: "https://i.ibb.co/WgKYwT3/Citrus-Bliss-Smoothie.png",
    category: "drinks" as ProductCategory,
    price: 4.99,
  },
  {
    name: "Tropical Mango Smoothie",
    description:
      "Indulge in the lush flavors of our Tropical Mango Smoothie! Made with ripe, juicy mangoes, this smoothie is a sweet retreat into a tropical paradise. Perfect for cooling off on a hot day or for a fruity breakfast boost.",
    image: "https://i.ibb.co/k48VkKT/Tropical-Mango-Smoothie.png",
    category: "drinks" as ProductCategory,
    price: 4.99,
  },
  {
    name: "Strawberry Lime Mojito",
    description:
      "Sip on the sweet and tangy sensation of our Strawberry Lime Mojito! This refreshing drink combines the juiciness of strawberries with the zesty punch of lime, topped with a hint of mint for a cooling finish. It's the perfect blend for a vibrant and invigorating refreshment.",
    image: "https://i.ibb.co/Fq8N8Mt/Strawberry-Lime-Mojito.png",
    category: "drinks" as ProductCategory,
    price: 4.99,
  },
  {
    name: "Mango Magic Smoothie",
    description:
      "Delve into the lush sweetness of our Mango Magic Smoothie! This creamy delight is crafted from ripe mangoes, blending their rich, tropical flavor with a silky smooth texture. A healthy treat that's perfect for mango lovers looking to enjoy a piece of paradise in every sip.",
    image: "https://i.ibb.co/6mCr0NB/Mango-Magic-Smoothie.png",
    category: "drinks" as ProductCategory,
    price: 4.99,
  },
  {
    name: "Berry Breakfast Smoothie",
    description:
      "Jumpstart your morning with our Berry Breakfast Smoothie! Packed with mixed berries, a splash of yogurt, and a sprinkle of crunchy granola, this smoothie is a deliciously balanced meal in a glass. Ideal for a nutritious start or a sweet midday pick-me-up.",
    image: "https://i.ibb.co/bR2LHgj/Berry-Breakfast-Smoothie.png",
    category: "drinks" as ProductCategory,
    price: 5.99,
  },
];

export async function createProducts() {
  try {
    for (const product of products) {
      const existingProduct = await db.product.findFirst({
        where: {
          name: product.name,
        },
      });

      if (!existingProduct) {
        await db.product.createMany({
          data: products,
          skipDuplicates: true, // This prevents errors in case some products already exist
        });
        return { message: "Products successfully created." };
      }
    }
  } catch (error) {
    console.error(error);
    return { message: "Error creating products:" };
  }
}

export async function deleProducts() {
  try {
    await db.product.deleteMany();
    return { message: "Products successfully deleted." };
  } catch (error) {
    console.error(error);
    return { message: "Error deleting products:" };
  }
}
