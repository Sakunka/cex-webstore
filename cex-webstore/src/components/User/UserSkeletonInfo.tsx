import Skeleton from "react-loading-skeleton";

export default function UserInfoSkeleton() {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <Skeleton className="h-7 w-32" />
      </div>

      <ul className="space-y-6">
        <li className="bg-gray-100 p-4 rounded">
          <div className="flex justify-between items-center mb-4">
            <Skeleton className="h-6 w-28" />
            <Skeleton className="h-8 w-12" />
          </div>
          <div className="md:flex md:space-x-8">
            <div className="mb-4 md:mb-0 md:w-1/2">
              <Skeleton className="h-4 w-20 mb-2" />
              <Skeleton className="h-5 w-24" />
            </div>
            <div className="md:w-1/2">
              <Skeleton className="h-4 w-20 mb-2" />
              <Skeleton className="h-5 w-28" />
            </div>
          </div>
        </li>

        <li className="bg-gray-100 p-4 rounded">
          <div className="flex justify-between items-center mb-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-8 w-12" />
          </div>
          <Skeleton className="h-5 w-48" />
        </li>

        <li className="bg-gray-100 p-4 rounded">
          <div className="flex justify-between items-center mb-2">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-8 w-12" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-5 w-56" />
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-5 w-32" />
          </div>
        </li>

        <li className="bg-gray-100 p-4 rounded">
          <div className="flex justify-between items-center">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-4 w-28" />
          </div>
        </li>
      </ul>
    </>
  );
}
