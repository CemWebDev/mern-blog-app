export default function PostSkeleton() {
  return (
    <article className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm animate-pulse">
      <div className="w-full h-48 bg-gray-200" />
      <div className="p-5">
        <div className="h-5 bg-gray-200 rounded mb-2 w-3/4" />
        <div className="h-4 bg-gray-200 rounded mb-4 w-2/3" />
        <div className="h-4 bg-gray-200 rounded mb-2 w-full" />
        <div className="h-4 bg-gray-200 rounded mb-4 w-5/6" />
        <div className="flex items-center justify-between">
          <div className="h-4 w-40 bg-gray-200 rounded" />
          <div className="h-4 w-12 bg-gray-200 rounded" />
        </div>
      </div>
    </article>
  );
}
