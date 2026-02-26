"use client";

// ============================================
// Loading & Skeleton Components
// ============================================

import React from "react";

// Full Page Loader
export const PageLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-white/80 z-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin" />
        <p className="text-gray-600 font-medium">Loading...</p>
      </div>
    </div>
  );
};

// Inline Spinner
interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ size = "md", className = "" }) => {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4",
  };

  return (
    <div
      className={`${sizeClasses[size]} border-amber-200 border-t-amber-600 rounded-full animate-spin ${className}`}
    />
  );
};

// Skeleton Base
interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = "" }) => {
  return <div className={`animate-pulse bg-gray-200 rounded ${className}`} />;
};

// Sculpture Card Skeleton
export const SculptureCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Skeleton className="aspect-[4/3]" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <div className="flex items-center justify-between pt-2">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>
    </div>
  );
};

// Sculpture Grid Skeleton
interface SculptureGridSkeletonProps {
  count?: number;
}

export const SculptureGridSkeleton: React.FC<SculptureGridSkeletonProps> = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <SculptureCardSkeleton key={index} />
      ))}
    </div>
  );
};

// Table Skeleton
interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

export const TableSkeleton: React.FC<TableSkeletonProps> = ({ rows = 5, columns = 4 }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="border-b px-6 py-4">
        <div className="flex gap-4">
          {Array.from({ length: columns }).map((_, index) => (
            <Skeleton key={index} className="h-4 flex-1" />
          ))}
        </div>
      </div>
      <div className="divide-y">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="px-6 py-4 flex gap-4">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <Skeleton key={colIndex} className="h-4 flex-1" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

// Detail Page Skeleton
export const DetailPageSkeleton: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="space-y-4">
          <Skeleton className="aspect-square rounded-lg" />
          <div className="flex gap-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="w-20 h-20 rounded-lg" />
            ))}
          </div>
        </div>

        {/* Details Section */}
        <div className="space-y-6">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-6 w-1/3" />
          <div className="space-y-2 pt-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          <div className="grid grid-cols-2 gap-4 pt-4">
            <Skeleton className="h-12 rounded-lg" />
            <Skeleton className="h-12 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};
