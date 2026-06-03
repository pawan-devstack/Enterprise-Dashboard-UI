function TableSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 animate-pulse">

      <div className="space-y-4">

        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="h-10 bg-gray-300 rounded"
          />
        ))}

      </div>

    </div>
  );
}

export default TableSkeleton;