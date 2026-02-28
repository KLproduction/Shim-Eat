import Link from "next/link";

import {
  ArrowRight,
  CircleDollarSign,
  ClipboardList,
  Package2,
  ShoppingBag,
  Users,
} from "lucide-react";

import {
  DeliveryStatusBadge,
  OrderStatusBadge,
} from "@/components/admin/admin-badges";
import AdminPageHeader from "@/components/admin/admin-page-header";
import AdminSectionCard from "@/components/admin/admin-section-card";
import AdminShell from "@/components/admin/admin-shell";
import AdminStatCard from "@/components/admin/admin-stat-card";
import { Button } from "@/components/ui/button";
import { getAdminDashboardData } from "@/data/getAdminDashboardData";
import { formatPrice } from "@/lib/formatPrice";

const Adminpage = async () => {
  const dashboard = await getAdminDashboardData();
  const {
    metrics,
    recentOrders,
    statusBreakdown,
    deliveryBreakdown,
    topProducts,
    productSummary,
  } = dashboard;

  return (
    <AdminShell>
      <AdminPageHeader
        eyebrow="Admin overview"
        title="Operations dashboard"
        description="Monitor revenue, fulfilment pace, order flow, catalogue health, and customer growth from one control surface."
        actions={
          <>
            <Button
              asChild
              className="h-11 rounded-2xl bg-slate-950 px-5 text-white hover:bg-slate-950/90"
            >
              <Link href="/admin/order">Manage orders</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-11 rounded-2xl border-slate-200 bg-white px-5 text-slate-700"
            >
              <Link href="/admin/products/add-product">Add product</Link>
            </Button>
          </>
        }
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard
          label="Total revenue"
          value={formatPrice(metrics.totalRevenue)}
          helper={`${metrics.totalOrders} total orders tracked`}
          icon={<CircleDollarSign className="h-5 w-5" />}
          tone="success"
        />
        <AdminStatCard
          label="Pending orders"
          value={String(metrics.pendingOrders)}
          helper={`${metrics.paidOrders} paid, ${metrics.completedOrders} completed`}
          icon={<ClipboardList className="h-5 w-5" />}
          tone="warning"
        />
        <AdminStatCard
          label="Products live"
          value={String(productSummary.onSale)}
          helper={`${productSummary.notAvailable} unavailable right now`}
          icon={<Package2 className="h-5 w-5" />}
        />
        <AdminStatCard
          label="Customers"
          value={String(metrics.totalUsers)}
          helper={`${metrics.newUsersThisWeek} new this week`}
          icon={<Users className="h-5 w-5" />}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <AdminSectionCard
          title="Recent orders"
          description="The latest orders needing review or fulfilment."
          action={
            <Button asChild variant="ghost" className="rounded-2xl text-slate-600">
              <Link href="/admin/order">
                View all
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          }
        >
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-4 md:flex-row md:items-center md:justify-between"
              >
                <div className="space-y-2">
                  <div className="font-medium text-slate-900">
                    {order.clientEmail || "Guest checkout"}
                  </div>
                  <div className="text-sm text-slate-500">
                    {order.deliveryAddress || "No delivery address"}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <OrderStatusBadge status={order.status} />
                    <DeliveryStatusBadge status={order.deliveryStatus} />
                  </div>
                </div>
                <div className="space-y-1 text-left md:text-right">
                  <div className="text-lg font-semibold text-slate-950">
                    {formatPrice(order.amountReceived ?? order.orderPrice)}
                  </div>
                  <div className="text-sm text-slate-500">
                    {new Intl.DateTimeFormat("en-GB", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    }).format(new Date(order.updatedAt))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </AdminSectionCard>

        <AdminSectionCard
          title="Quick actions"
          description="Jump straight into daily operations."
        >
          <div className="grid gap-3">
            {[
              {
                href: "/admin/order",
                label: "Order queue",
                copy: "Review payment and fulfilment changes.",
                icon: <ShoppingBag className="h-4 w-4" />,
              },
              {
                href: "/admin/products",
                label: "Catalogue",
                copy: "Update price, availability, and details.",
                icon: <Package2 className="h-4 w-4" />,
              },
              {
                href: "/admin/users",
                label: "Customer records",
                copy: "Inspect profiles, spend, and permissions.",
                icon: <Users className="h-4 w-4" />,
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/70 px-4 py-4 transition hover:border-slate-200 hover:bg-white"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-white">
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-medium text-slate-900">{item.label}</div>
                    <div className="text-sm text-slate-500">{item.copy}</div>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-400" />
              </Link>
            ))}
          </div>
        </AdminSectionCard>
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <AdminSectionCard
          title="Order status mix"
          description="Current distribution of order lifecycle states."
        >
          <div className="space-y-4">
            {statusBreakdown.map((item) => (
              <div key={item.status} className="space-y-2">
                <div className="flex items-center justify-between">
                  <OrderStatusBadge status={item.status} />
                  <span className="text-sm font-medium text-slate-600">
                    {item.count} orders
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-slate-900"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </AdminSectionCard>

        <AdminSectionCard
          title="Delivery progress"
          description="Track how quickly fulfilment is moving."
        >
          <div className="space-y-4">
            {deliveryBreakdown.map((item) => (
              <div key={item.status} className="space-y-2">
                <div className="flex items-center justify-between">
                  <DeliveryStatusBadge status={item.status} />
                  <span className="text-sm font-medium text-slate-600">
                    {item.count} orders
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-emerald-500"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </AdminSectionCard>

        <AdminSectionCard
          title="Best sellers"
          description="Products generating the most order volume."
        >
          <div className="space-y-3">
            {topProducts.length ? (
              topProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/80 p-4"
                >
                  <div>
                    <div className="text-sm text-slate-400">#{index + 1}</div>
                    <div className="font-medium text-slate-900">{product.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-slate-950">
                      {product.quantity} sold
                    </div>
                    <div className="text-sm text-slate-500">
                      {formatPrice(product.revenue)}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">
                No product sales recorded yet.
              </div>
            )}
          </div>
        </AdminSectionCard>
      </section>
    </AdminShell>
  );
};

export default Adminpage;
