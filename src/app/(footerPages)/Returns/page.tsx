export default function ReturnsExchanges() {
  return (
    <main className="container mx-auto sm:pt-18 pt-60">
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              Returns & Exchanges
            </h1>

            <div className="space-y-8">
              {/* Return Policy */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Return Policy
                </h2>
                <p className="text-gray-600 mb-4">
                  We want you to be completely satisfied with your purchase. If you,re not happy with your order, we,ll make it right.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-blue-900 mb-2">
                    30-Day Return Window
                  </h3>
                  <p className="text-blue-800">
                    You have 30 days from the delivery date to return or exchange your items.
                  </p>
                </div>
              </div>

              {/* Return Conditions */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Return Conditions
                </h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Items must be in original condition with all tags attached</li>
                  <li>Items must be unworn, unwashed, and unused</li>
                  <li>Original packaging should be included when possible</li>
                  <li>Some items may be excluded from returns (see product page for details)</li>
                </ul>
              </div>

              {/* How to Return */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  How to Return
                </h2>
                <div className="space-y-4">
                  {[1,2,3,4].map((step) => (
                    <div key={step} className="flex items-start space-x-3">
                      <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                        {step}
                      </div>
                      <div>
                        {step === 1 && (
                          <>
                            <h3 className="font-semibold text-gray-900">Contact Us</h3>
                            <p className="text-gray-600">Email us at returns@shopmart.com with your order number</p>
                          </>
                        )}
                        {step === 2 && (
                          <>
                            <h3 className="font-semibold text-gray-900">Get Return Label</h3>
                            <p className="text-gray-600">We,ll send you a prepaid return shipping label</p>
                          </>
                        )}
                        {step === 3 && (
                          <>
                            <h3 className="font-semibold text-gray-900">Ship Your Return</h3>
                            <p className="text-gray-600">Package your items and drop off at any authorized location</p>
                          </>
                        )}
                        {step === 4 && (
                          <>
                            <h3 className="font-semibold text-gray-900">Receive Refund</h3>
                            <p className="text-gray-600">We,ll process your refund within 5-7 business days</p>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Questions */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Questions?</h2>
                <p className="text-gray-600 mb-4">
                  If you have any questions about returns or exchanges, please don,t hesitate to contact us.
                </p>
                <a
                  href="/contact"
                  className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Contact Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
