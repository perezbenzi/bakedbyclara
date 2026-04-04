export function ProductSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden animate-pulse">
      <div className="aspect-square bg-gray-200" />
      <div className="p-3">
        <div className="h-4 bg-gray-200 rounded-full w-3/4 mb-2" />
        <div className="h-3 bg-gray-200 rounded-full w-full mb-1" />
        <div className="h-3 bg-gray-200 rounded-full w-2/3 mb-4" />
        <div className="flex items-center justify-between">
          <div className="h-4 bg-gray-200 rounded-full w-16" />
          <div className="w-8 h-8 bg-gray-200 rounded-full" />
        </div>
      </div>
    </div>
  );
}
