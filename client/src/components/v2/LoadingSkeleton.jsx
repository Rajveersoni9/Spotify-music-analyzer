const LoadingSkeleton = () => {
  return (
    <div className="flex-1 p-8 space-y-8 animate-pulse w-full">
      <div className="flex justify-between w-full h-12">
        <div className="w-48 bg-white/5 rounded-full"></div>
        <div className="w-32 bg-white/5 rounded-full"></div>
      </div>
      
      <div className="w-full h-64 bg-white/5 rounded-3xl"></div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
           <div className="h-64 bg-white/5 rounded-3xl"></div>
           <div className="h-96 bg-white/5 rounded-3xl"></div>
        </div>
        <div className="space-y-8">
           <div className="h-64 bg-white/5 rounded-3xl"></div>
           <div className="h-48 bg-white/5 rounded-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
