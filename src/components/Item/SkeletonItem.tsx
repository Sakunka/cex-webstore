import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function SkeletonItem() {
  return (
    <SkeletonTheme baseColor="#f3f4f6" highlightColor="#e5e7eb" duration={1.2}>
      <div className="flex flex-row justify-between relative p-4 sm:p-6 w-full sm:min-h-[560px] bg-gray-50 rounded-2xl sm:rounded-3xl animate-pulse">
        <div className="relative w-4/7 h-[380px] sm:h-[420px] bg-gray-200 rounded-lg overflow-hidden">
          <Skeleton height="100%" width="100%" />
        </div>

        <div className="w-3/7 pl-5 sm:space-y-3 mt-4">
          <div>
            <Skeleton height={25} width="95%" />
            <Skeleton height={25} width="95%" />
            <Skeleton height={25} width="95%" />
            <Skeleton height={25} width="95%" />
          </div>
          <div className="space-y-2">
            <Skeleton height={25} width="95%" />
            <Skeleton height={25} width="95%" />
            <Skeleton height={25} width="95%" />
            <Skeleton height={25} width="95%" />
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
}
