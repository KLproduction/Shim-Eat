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
      title="Order queue"
      description="Track payment, fulfilment, and delivery progress without losing context."
      filterColumn="clientEmail"
      filterPlaceholder="Search by client email"
    />
  );
}
