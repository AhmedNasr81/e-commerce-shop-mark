import Link from "next/link";

export default function HelpCenter() {
  return (
    <div className="bg-white rounded-lg  text-center  shadow-lg p-8 pt-24">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Help Center</h1>

      <div className="space-y-8">
        {/* FAQ Section */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                How do I place an order?
              </h3>
              <p className="text-gray-600">
                Simply browse our products, add items to your cart, and proceed to checkout. You wll need to create an account or sign in to complete your purchase.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600">
                We accept all major credit cards, PayPal, and other secure payment methods.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                How long does shipping take?
              </h3>
              <p className="text-gray-600">
                Standard shipping takes 3-5 business days. Express shipping options are available for faster delivery.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                Can I return or exchange items?
              </h3>
              <p className="text-gray-600">
                Yes, we offer a 30-day return policy for most items. Items must be in original condition with tags attached.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                How do I track my order?
              </h3>
              <p className="text-gray-600">
                Once your order ships, you wll receive a tracking number via email. You can also track your order in your account.
              </p>
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Still Need Help?</h2>
          <p className="text-gray-600 mb-4">
            If you can not find the answer you are looking for, our customer service team is here to help.
          </p>
          <div className="flex space-x-4">
            <Link
              href="/contact"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="mailto:support@shopmart.com"
              className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              Email Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
