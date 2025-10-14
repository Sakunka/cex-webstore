import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function SkeletonCard() {
  return (
    <div className="mb-10 flex flex-col justify-between relative p-6 w-60 h-104 bg-gray-50 rounded-3xl">
      <div className="flex justify-center items-center pt-4 pb-8">
        <Skeleton height={120} width="100%" className="object-cover" />
      </div>

      <div className="space-y-3">
        <div className="text-lg font-semibold text-gray-900 leading-tight">
          <Skeleton height={24} width="80%" />
        </div>

        <div className="flex justify-between items-center pt-2">
          <div className="text-2xl font-bold text-gray-900">
            <Skeleton height={32} width={80} />
          </div>
        </div>
      </div>
    </div>
  );
}
