# Admin UI Refresh Design

## Goal

Refresh the entire `/admin` area into a higher-end card-based SaaS interface and add a real dashboard homepage driven by live application data.

## Scope

- Add a dashboard at `/admin`
- Unify admin navigation and page chrome
- Replace repeated table shells with one reusable admin data table pattern
- Restyle orders, products, users, and super admin pages
- Keep all metrics based on existing database records only

## UX Direction

- Soft, premium SaaS look
- Layered white cards on a tinted background
- Clear hierarchy with page headers, KPI cards, and section cards
- Better table readability with lighter borders, roomier spacing, and clearer status badges

## Data Strategy

- Compute dashboard metrics on the server from `orders`, `products`, and `users`
- Show only metrics that can be derived reliably from existing schema
- Prefer simple visual breakdowns over fake charts

## Components

- `AdminShell`
- `AdminPageHeader`
- `AdminStatCard`
- `AdminSectionCard`
- `AdminDataTable`
- status badge helpers for orders, delivery, products, and user roles

## Risks

- Existing user records may not include a stable `createdAt`, so weekly-user metrics must degrade safely
- Detail pages are less standardized than list pages and may need a later pass for full parity
