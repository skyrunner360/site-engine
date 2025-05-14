"use client";
import React from "react";
import { Table, TableBody } from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>;
  data: TData[];
  filterValue: string;
  actionButtonText?: React.ReactNode;
  modalChildren?: React.ReactNode;
}

const DataTable: React.FC<DataTableProps> = (props: Props) => {
  return <div>DataTable</div>;
};

export default DataTable;
