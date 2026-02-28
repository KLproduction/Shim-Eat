"use server";

import { DeliveryStatus, OrderStatus, ProductStatus } from "@prisma/client";

import { db } from "@/lib/db";

const startOfWeek = () => {
  const now = new Date();
  const monday = new Date(now);
  const day = monday.getDay();
  const diff = monday.getDate() - day + (day === 0 ? -6 : 1);
  monday.setDate(diff);
  monday.setHours(0, 0, 0, 0);
  return monday;
};

export const getAdminDashboardData = async () => {
  const [orders, products, users] = await Promise.all([
    db.userOrder.findMany({
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    }),
    db.product.findMany({
      orderBy: {
        name: "asc",
      },
    }),
    db.user.findMany({
      orderBy: {
        email: "asc",
      },
    }),
  ]);

  const totalRevenue = orders.reduce(
    (sum, order) => sum + (order.amountReceived ?? order.orderPrice),
    0,
  );
  const pendingOrders = orders.filter((order) => order.status === "PENDING");
  const completedOrders = orders.filter((order) => order.status === "COMPLETE");
  const paidOrders = orders.filter((order) => order.status === "PAID");
  const deliveredOrders = orders.filter(
    (order) => order.deliveryStatus === "DELIVERED",
  );
  const userHasCreatedAt =
    users.length > 0 && "createdAt" in (users[0] as Record<string, unknown>);
  const newUsersThisWeek = userHasCreatedAt
    ? users.filter(
        (user) =>
          new Date(
            ((user as unknown as { createdAt?: Date }).createdAt ?? 0) as Date,
          ) >= startOfWeek(),
      ).length
    : 0;

  const statusBreakdown = Object.values(OrderStatus).map((status) => {
    const count = orders.filter((order) => order.status === status).length;
    const percentage = orders.length ? Math.round((count / orders.length) * 100) : 0;
    return { status, count, percentage };
  });

  const deliveryBreakdown = Object.values(DeliveryStatus).map((status) => {
    const count = orders.filter((order) => order.deliveryStatus === status).length;
    const percentage = orders.length ? Math.round((count / orders.length) * 100) : 0;
    return { status, count, percentage };
  });

  const topProducts = Object.values(
    orders
      .flatMap((order) => order.orderItems)
      .reduce<
        Record<
          string,
          { id: string; name: string; quantity: number; revenue: number }
        >
      >((acc, item) => {
        if (!acc[item.productId]) {
          acc[item.productId] = {
            id: item.productId,
            name: item.product.name,
            quantity: 0,
            revenue: 0,
          };
        }

        acc[item.productId].quantity += item.quantity;
        acc[item.productId].revenue += item.price * item.quantity + item.extraPrice;
        return acc;
      }, {}),
  )
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5);

  const productSummary = {
    onSale: products.filter((product) => product.status === ProductStatus.onSale).length,
    notAvailable: products.filter(
      (product) => product.status === ProductStatus.notAvailable,
    ).length,
  };

  return {
    metrics: {
      totalRevenue,
      totalOrders: orders.length,
      totalProducts: products.length,
      totalUsers: users.length,
      pendingOrders: pendingOrders.length,
      deliveredOrders: deliveredOrders.length,
      averageOrderValue: orders.length ? totalRevenue / orders.length : 0,
      completedOrders: completedOrders.length,
      paidOrders: paidOrders.length,
      newUsersThisWeek,
    },
    recentOrders: orders.slice(0, 6),
    statusBreakdown,
    deliveryBreakdown,
    topProducts,
    productSummary,
  };
};
