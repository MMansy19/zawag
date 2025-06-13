"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface Column<T> {
  key: keyof T | string;
  title: string;
  render?: (value: any, row: T) => React.ReactNode;
  width?: string;
}

interface TableViewProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  onRowClick?: (row: T) => void;
  className?: string;
}

export function TableView<T extends { id: string }>({
  data,
  columns,
  loading = false,
  onRowClick,
  className,
}: TableViewProps<T>) {
  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="bg-gray-200 rounded-lg h-64"></div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-4xl mb-4">📊</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          لا توجد بيانات
        </h3>
        <p className="text-gray-600">لا توجد بيانات لعرضها في الجدول</p>
      </div>
    );
  }

  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200"
                style={{ width: column.width }}
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((row, index) => (
            <tr
              key={row.id}
              onClick={() => onRowClick?.(row)}
              className={cn(
                "hover:bg-gray-50 transition-colors",
                onRowClick && "cursor-pointer",
                index % 2 === 0 ? "bg-white" : "bg-gray-50/50",
              )}
            >
              {columns.map((column) => (
                <td
                  key={String(column.key)}
                  className="px-4 py-3 text-sm text-gray-900 border-b border-gray-200"
                >
                  {" "}
                  {column.render
                    ? column.render(
                        typeof column.key === "string" && !(column.key in row)
                          ? undefined
                          : row[column.key as keyof T],
                        row,
                      )
                    : String(
                        typeof column.key === "string" && !(column.key in row)
                          ? ""
                          : row[column.key as keyof T] || "",
                      )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
