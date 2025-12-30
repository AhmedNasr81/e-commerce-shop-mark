export default function AboutPage() {
  return (
    <main className="container mx-auto sm:pt-18 pt-60">
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              About ShopMart
            </h1>

            <div className="prose max-w-none">
              <p className="text-lg text-gray-600 mb-6">
                ShopMart is your one-stop destination for the latest technology, fashion, and lifestyle products. We are committed to providing quality products with fast shipping and excellent customer service.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Our Mission
              </h2>
              <p className="text-gray-600 mb-6">
                To make shopping for quality products easy, convenient, and enjoyable for everyone. We believe that everyone deserves access to the latest and best products at competitive prices.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Our Values
              </h2>
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                <li>Quality: We only sell products that meet our high standards</li>
                <li>Customer Service: Your satisfaction is our priority</li>
                <li>Innovation: We stay ahead of trends to bring you the latest products</li>
                <li>Trust: We build lasting relationships with our customers</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Why Choose ShopMart?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Fast Shipping</h3>
                  <p className="text-gray-600">Quick and reliable delivery to your doorstep</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Quality Guarantee</h3>
                  <p className="text-gray-600">All products are carefully selected and tested</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">24/7 Support</h3>
                  <p className="text-gray-600">Our customer service team is always here to help</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Easy Returns</h3>
                  <p className="text-gray-600">Hassle-free return policy for your peace of mind</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

     
    </main>
  );
}
