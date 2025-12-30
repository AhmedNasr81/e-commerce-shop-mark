
export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
      
      <div className="flex flex-col items-center gap-4">

        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-black text-white font-bold text-xl">
            S
          </span>
          <h1 className="text-3xl font-bold">ShopMart</h1>
        </div>

        <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin" />

        <p className="text-gray-600 font-medium text-lg">
          Loading...
        </p>

      </div>
    </div>
  )
}
