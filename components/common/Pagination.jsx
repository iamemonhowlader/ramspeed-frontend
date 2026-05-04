import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ currentPage, lastPage, onPageChange, loading }) => {
  if (lastPage <= 1) return null;

  const pages = [];
  const maxVisiblePages = 5;
  
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(lastPage, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-6 pb-10">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || loading}
      >
        <ChevronLeft size={16} /> Previous
      </Button>

      {startPage > 1 && (
        <>
          <Button
            variant={currentPage === 1 ? "default" : "outline"}
            size="sm"
            onClick={() => onPageChange(1)}
            disabled={loading}
          >
            1
          </Button>
          {startPage > 2 && <span className="px-2 text-gray-400">...</span>}
        </>
      )}

      {pages.map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? "default" : "outline"}
          size="sm"
          onClick={() => onPageChange(page)}
          disabled={loading}
        >
          {page}
        </Button>
      ))}

      {endPage < lastPage && (
        <>
          {endPage < lastPage - 1 && <span className="px-2 text-gray-400">...</span>}
          <Button
            variant={currentPage === lastPage ? "default" : "outline"}
            size="sm"
            onClick={() => onPageChange(lastPage)}
            disabled={loading}
          >
            {lastPage}
          </Button>
        </>
      )}

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === lastPage || loading}
      >
        Next <ChevronRight size={16} />
      </Button>
    </div>
  );
};

export default Pagination;
