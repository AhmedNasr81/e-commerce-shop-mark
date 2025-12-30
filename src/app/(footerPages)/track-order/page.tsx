import Link from "next/link";

export default function TrackOrder() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 pt-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Track Your Order</h1>

          <div className="space-y-8">
            {/* Enter Order Info */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Enter Your Order Information
              </h2>
              <form className="space-y-4">
                <div>
                  <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700">
                    Order Number
                  </label>
                  <input
                    id="orderNumber"
                    type="text"
                    placeholder="Enter your order number"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Track Order
                </button>
              </form>
            </div>

            {/* Order Status */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Status</h2>
              <div className="bg-gray-100 rounded-lg p-6 text-center">
                <p className="text-gray-600">
                  Enter your order number and email above to track your order status.
                </p>
              </div>
            </div>

            {/* Need Help */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Need Help?</h2>
              <p className="text-gray-600 mb-4">
                If you are having trouble tracking your order, please contact our customer service team.
              </p>
              <Link
                href="/contact"
                className="bg-gray-600 text-white py-2 px-6 rounded-md hover:bg-gray-700 transition-colors"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
