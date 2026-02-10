// ShimmerGrid.jsx
export default function ShimmerGrid() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 animate-pulse">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-4 p-4  bg-gray-100">
          <div className="h-40 bg-gray-300 rounded-lg"></div>
          <div className="h-6 w-3/4 bg-gray-300 rounded-md"></div>
          <div className="h-6 w-1/2 bg-gray-300 rounded-md"></div>
          <div className="h-10 w-50 bg-gray-400 rounded-md"></div>
        </div>
      ))}
    </div>
  );
}
