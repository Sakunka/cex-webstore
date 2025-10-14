"use client";

import { useState } from "react";
import Loader from "@/components/ui/Loader";
import Filters from "@/components/Filters/Filters";
import Items from "@/components/Filters/Items";
import Pagination from "@/components/ui/Pagination";
import useFilters from "@/hooks/useFilters";
import { useItems } from "@/hooks/game/useItems";

type Filters = Record<string, string[]>;

export default function Games() {
  const [appliedFilters, setAppliedFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const { isLoading: filtersLoading, data: filtersData } = useFilters("phone");

  const {
    isLoading: dataLoading,
    data,
    isError,
  } = useItems("phone", currentPage, appliedFilters);

  const handleFiltersApply = (filters: Filters) => {
    setAppliedFilters(filters);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (filtersLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader width={80} height={100} />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col lg:flex-row flex-1">
        <aside className="w-full lg:w-64 xl:w-72 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
          <Filters
            data={filtersData?.data}
            loading={filtersLoading}
            onFiltersApply={handleFiltersApply}
          />
        </aside>

        <main className="flex-1">
          {isError ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="text-center p-4">
                <p className="text-red-500 text-lg font-semibold mb-2">
                  Something went wrong
                </p>
              </div>
            </div>
          ) : (
            <Items data={data?.data || []} loading={dataLoading} type="phone" />
          )}
        </main>
      </div>

      {data && data?.data?.totalPage > 1 && (
        <div className="sticky bottom-0 bg-white border-t border-gray-200 py-4 px-4 sm:px-6 md:px-8 shadow-lg">
          <Pagination
            currentPage={currentPage}
            totalPages={data.totalPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}
