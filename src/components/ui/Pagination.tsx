import { FaCaretLeft, FaCaretRight } from "react-icons/fa";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: any) {
  function handlePrevious() {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  }

  function handleNext() {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  }

  function handlePageClick(pageNumber: number) {
    onPageChange(pageNumber);
  }

  function renderPageNumbers() {
    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`rounded-full px-2 ${
            currentPage === i ? "border-1 border-black black" : ""
          }`}
        >
          {i}
        </button>
      );
    }

    return pages;
  }

  if (totalPages <= 0) {
    return null;
  }

  return (
    <div className="flex flex-row gap-2 justify-center mb-10 items-center">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`rounded-full px-2 py-2 ${
          currentPage === 1
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-red-500 text-white hover: cursor-pointer"
        }`}
      >
        <FaCaretLeft />
      </button>

      {renderPageNumbers()}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`rounded-full px-2 py-2 ${
          currentPage === totalPages
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-red-500 text-white hover: cursor-pointer"
        }`}
      >
        <FaCaretRight />
      </button>
    </div>
  );
}
