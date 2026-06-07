export function CardSkeleton() {
  return (
    <div className="card animate-pulse">
      <div className="bg-dark-700 h-48 rounded-lg mb-4"></div>
      <div className="bg-dark-700 h-4 w-3/4 rounded mb-2"></div>
      <div className="bg-dark-700 h-4 w-1/2 rounded"></div>
    </div>
  );
}

export function TableSkeleton({ rows = 5 }) {
  return (
    <div className="animate-pulse space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4">
          <div className="bg-dark-700 h-10 flex-1 rounded"></div>
          <div className="bg-dark-700 h-10 w-20 rounded"></div>
          <div className="bg-dark-700 h-10 w-20 rounded"></div>
        </div>
      ))}
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="animate-pulse space-y-6 p-8">
      <div className="bg-dark-700 h-8 w-64 rounded"></div>
      <div className="bg-dark-700 h-4 w-96 rounded"></div>
      <div className="grid grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-dark-700 h-32 rounded-xl"></div>
        ))}
      </div>
      <div className="bg-dark-700 h-64 rounded-xl"></div>
    </div>
  );
}
