"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils";

interface PaginationProps {
  currentPage: number;
  lastPage: number;
  total: number;
  perPage?: number;
  onPageChange: (page: number) => void;
  itemLabel?: string;
  className?: string;
}

function pageWindow(current: number, last: number): (number | "...")[] {
  if (last <= 7) {
    return Array.from({ length: last }, (_, i) => i + 1);
  }

  const pages = new Set<number>([1, last, current, current - 1, current + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= last).sort((a, b) => a - b);

  const result: (number | "...")[] = [];
  let prev = 0;
  for (const page of sorted) {
    if (prev && page - prev > 1) result.push("...");
    result.push(page);
    prev = page;
  }
  return result;
}

export default function Pagination({
  currentPage,
  lastPage,
  total,
  perPage = 5,
  onPageChange,
  itemLabel = "item",
  className,
}: PaginationProps) {
  if (total === 0) return null;

  const start = (currentPage - 1) * perPage + 1;
  const end = Math.min(currentPage * perPage, total);
  const pages = pageWindow(currentPage, lastPage);

  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row items-center justify-between gap-3 mt-6",
        className,
      )}
    >
      <p className="text-xs text-muted">
        Menampilkan {start}–{end} dari {total} {itemLabel}
      </p>

      {lastPage > 1 && (
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="p-2 rounded-lg border border-border text-muted hover:text-foreground hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-40 disabled:pointer-events-none transition-colors"
            aria-label="Halaman sebelumnya"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {pages.map((page, i) =>
            page === "..." ? (
              <span key={`gap-${i}`} className="px-1.5 text-sm text-muted">
                …
              </span>
            ) : (
              <button
                key={page}
                type="button"
                onClick={() => onPageChange(page)}
                className={cn(
                  "min-w-[2.25rem] h-9 px-2 rounded-lg text-sm font-medium transition-colors",
                  page === currentPage
                    ? "bg-primary text-white"
                    : "border border-border text-muted hover:text-foreground hover:bg-gray-50 dark:hover:bg-gray-700",
                )}
              >
                {page}
              </button>
            ),
          )}

          <button
            type="button"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= lastPage}
            className="p-2 rounded-lg border border-border text-muted hover:text-foreground hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-40 disabled:pointer-events-none transition-colors"
            aria-label="Halaman berikutnya"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
