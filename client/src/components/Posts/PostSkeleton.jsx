export default function PostSkeleton() {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm animate-pulse">
      <div className="h-5 bg-gray-200 rounded mb-3 w-2/3" />
      <div className="h-4 bg-gray-200 rounded mb-2" />
      <div className="h-4 bg-gray-200 rounded mb-4 w-5/6" />
      <div className="h-4 bg-gray-200 rounded w-1/3" />
    </div>
  );
}
