"use client";

import { ColumnDef } from "@tanstack/react-table";

import { AdminDataTable } from "@/components/admin/admin-data-table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  return (
    <AdminDataTable
      columns={columns}
      data={data}
      title="Customers"
      description="Review account roles, verification state, and customer value at a glance."
      filterColumn="email"
      filterPlaceholder="Search by customer email"
    />
  );
}
