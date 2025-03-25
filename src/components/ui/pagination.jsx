import React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

const Pagination = ({ className = "", ...props }) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={`mx-auto flex w-full justify-center ${className}`}
    {...props}
  />
);

const PaginationContent = React.forwardRef(({ className = "", ...props }, ref) => (
  <ul ref={ref} className={`flex flex-row items-center gap-1 ${className}`} {...props} />
));

const PaginationItem = React.forwardRef(({ className = "", ...props }, ref) => (
  <li ref={ref} className={className} {...props} />
));

const PaginationLink = ({ isActive = false, size = "icon", className = "", ...props }) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={`inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium ${
      isActive ? "border border-gray-300 bg-gray-100 text-gray-900" : "hover:bg-gray-50"
    } ${className}`}
    {...props}
  />
);

const PaginationPrevious = ({ className = "", ...props }) => (
  <PaginationLink
    aria-label="Go to previous page"
    className={`gap-1 pl-2.5 ${className}`}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span>Previous</span>
  </PaginationLink>
);

const PaginationNext = ({ className = "", ...props }) => (
  <PaginationLink
    aria-label="Go to next page"
    className={`gap-1 pr-2.5 ${className}`}
    {...props}
  >
    <span>Next</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
);

const PaginationEllipsis = ({ className = "", ...props }) => (
  <span
    aria-hidden
    className={`flex h-9 w-9 items-center justify-center ${className}`}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
};
