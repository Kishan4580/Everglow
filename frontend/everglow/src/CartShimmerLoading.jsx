export default function CartShimmerLoading (){
     return (
    <div className="flex flex-col gap-4 md:gap-6 p-4 animate-pulse">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex gap-4 p-4  bg-gray-100">
          <div className="h-10 bg-gray-300 rounded-lg"></div>
          <div className="flex justify-between">
          <div className="h-6 w-3/4 bg-gray-300 rounded-md"></div>
          <div className="h-6 w-1/2 bg-gray-300 rounded-md"></div>
          </div>
          <div className="h-10 w-50 bg-gray-400 rounded-md"></div>
        </div>
      ))}
    </div>
  );
}