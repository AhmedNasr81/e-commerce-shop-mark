export default function TermsOfService() {
  return (
    <main className="container mx-auto sm:pt-18 pt-60">
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              Terms of Service
            </h1>

            <div className="prose max-w-none">
              <p className="text-gray-600 mb-6">
                <strong>Last updated:</strong> 9/20/2025
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Acceptance of Terms
              </h2>
              <p className="text-gray-600 mb-4">
                By accessing and using ShopMart, you accept and agree to be bound by the terms and provision of this agreement.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Use License
              </h2>
              <p className="text-gray-600 mb-4">
                Permission is granted to temporarily download one copy of the materials on ShopMart for personal, non-commercial transitory viewing only.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Product Information
              </h2>
              <p className="text-gray-600 mb-4">
                We strive to provide accurate product information, but we do not warrant that product descriptions or other content is accurate, complete, reliable, or error-free.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Pricing and Payment
              </h2>
              <p className="text-gray-600 mb-4">
                All prices are subject to change without notice. Payment is due at the time of purchase.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Returns and Refunds
              </h2>
              <p className="text-gray-600 mb-4">
                Returns are accepted within 30 days of purchase. Items must be in original condition with all tags attached.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Contact Information
              </h2>
              <p className="text-gray-600 mb-4">
                If you have any questions about these Terms of Service, please contact us at{" "}
                <a
                  href="mailto:legal@shopmart.com"
                  className="text-blue-600 hover:underline"
                >
                  legal@shopmart.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>

     
    </main>
  );
}
