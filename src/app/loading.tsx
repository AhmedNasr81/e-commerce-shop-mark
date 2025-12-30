export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>

        <p className="text-gray-700 font-medium text-lg">Loading...</p>
      </div>
    </div>
  );
}
