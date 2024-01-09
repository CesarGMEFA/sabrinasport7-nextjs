import { Skeleton } from "../skeleton";

export function SkeletonForm() {
  return (
    <section className="lg:w-2/4 mx-auto shadow-md">
      <section className="p-5 bg-white">
        <Skeleton className="w-64 h-6 mb-4" />

        <div className="mb-6">
          <Skeleton className="w-12 h-2 mb-3" />
          <Skeleton className="w-full h-6" />
        </div>

        <div className="mb-6">
          <Skeleton className="w-12 h-2 mb-3" />
          <Skeleton className="w-full h-6" />
        </div>

        <div className="mb-6">
          <Skeleton className="w-12 h-2 mb-3" />
          <Skeleton className="w-full h-6" />
        </div>

        {/* button skeleton */}
        <Skeleton className="w-14 h-6" />
      </section>
    </section>
  );
}
