"use client";

import Filters from "@/components/Filters/Filters";
import Items from "@/components/Filters/Items";
import Loader from "@/components/ui/Loader";
import Pagination from "@/components/ui/Pagination";
import { useItems } from "@/hooks/game/useItems";
import useFilters from "@/hooks/useFilters";
import { useState } from "react";

type Filters = Record<string, string[]>;

export default function Games() {
  const [appliedFilters, setAppliedFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const { isLoading: filtersLoading, data: filtersData } = useFilters("game");

  const {
    isLoading: dataLoading,
    data,
    error: gamesError,
    isError,
  } = useItems("game", currentPage, appliedFilters);

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
                  Oops! Something went wrong
                </p>
                <p className="text-gray-600">
                  {gamesError?.message || "Failed to load games"}
                </p>
              </div>
            </div>
          ) : (
            <Items data={data?.data || []} loading={dataLoading} type="game" />
          )}
        </main>
      </div>

      {data && data?.data?.totalPage > 1 && (
        <div className="z-1000 sticky bottom-0 bg-white border-t border-gray-200 pt-6 px-4 sm:px-6 md:px-8 shadow-lg">
          <Pagination
            currentPage={currentPage}
            totalPages={data?.data?.totalPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}
