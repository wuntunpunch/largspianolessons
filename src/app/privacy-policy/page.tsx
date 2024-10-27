import Link from "next/link";
import Footer from "@/components/footer";

export default function PrivacyPolicy() {
  return (
    <>
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-lg shadow-md p-8">
            {/* Header */}
            <h1 className="text-3xl font-bold mb-8">
              Privacy Policy for Largs Piano Lessons
            </h1>
            <p className="text-gray-600 mb-8">
              Last updated: {new Date().toLocaleDateString("en-GB")}
            </p>

            {/* Introduction */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p className="text-gray-700 mb-4">
                Welcome to Largs Piano Lessons. This privacy policy explains how
                we collect, use, and protect your personal information when you
                use our website.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                2. Information We Collect
              </h2>

              <h3 className="text-xl font-semibold mb-3">
                2.1 Information You Provide
              </h3>
              <p className="text-gray-700 mb-4">
                When you use our contact form, we collect:
              </p>
              <ul className="list-disc list-inside mb-4 text-gray-700">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Any additional information you provide in your message</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">
                2.2 Information Automatically Collected
              </h3>
              <p className="text-gray-700 mb-4">
                We use Google Analytics to collect:
              </p>
              <ul className="list-disc list-inside mb-4 text-gray-700">
                <li>Pages you visit on our website</li>
                <li>Time spent on each page</li>
                <li>Your approximate location (city/region level)</li>
                <li>Device type and browser information</li>
                <li>Referral source (how you found our website)</li>
              </ul>
            </section>

            {/* How We Use Cookies */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                3. How We Use Cookies
              </h2>
              <p className="text-gray-700 mb-4">
                Our website uses cookies to improve your browsing experience and
                to help us understand how visitors use our site.
              </p>

              <h3 className="text-xl font-semibold mb-3">
                3.1 Essential Cookies
              </h3>
              <ul className="list-disc list-inside mb-4 text-gray-700">
                <li>Purpose: To make our website work properly</li>
                <li>These cookies do not collect personal information</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">
                3.2 Analytics Cookies (Google Analytics)
              </h3>
              <ul className="list-disc list-inside mb-4 text-gray-700">
                <li>Purpose: To understand how visitors use our website</li>
                <li>Provider: Google Analytics</li>
                <li>Data collected: Page views, time on site, pages visited</li>
                <li>Duration: Up to 2 years</li>
                <li>
                  You can opt-out of these cookies using our cookie consent
                  banner
                </li>
              </ul>
            </section>

            {/* How We Use Your Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                4. How We Use Your Information
              </h2>
              <p className="text-gray-700 mb-4">We use your information to:</p>
              <ul className="list-disc list-inside mb-4 text-gray-700">
                <li>Respond to your enquiries about piano lessons</li>
                <li>Improve our website and services</li>
                <li>Understand how visitors use our website</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            {/* Data Protection */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                5. Data Protection
              </h2>
              <p className="text-gray-700 mb-4">We protect your data by:</p>
              <ul className="list-disc list-inside mb-4 text-gray-700">
                <li>Only collecting what we need</li>
                <li>Storing it securely</li>
                <li>Never selling it to third parties</li>
                <li>Regularly reviewing our privacy practices</li>
              </ul>
            </section>

            {/* Your Rights */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
              <p className="text-gray-700 mb-4">
                Under GDPR, you have the right to:
              </p>
              <ul className="list-disc list-inside mb-4 text-gray-700">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Withdraw consent for data processing</li>
                <li>Request a copy of your data</li>
                <li>Lodge a complaint with the ICO</li>
              </ul>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                7. Contact Information
              </h2>
              <p className="text-gray-700 mb-4">
                For any privacy-related questions, please contact:
              </p>
              <div className="text-gray-700">
                <p>Colin Young</p>
                <p>Email: colin@colinyoung.scot</p>
                <p>Address: 100 Brisbane Road, Largs, KA30 8NN</p>
              </div>
            </section>

            {/* Changes to Policy */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                8. Changes to This Policy
              </h2>
              <p className="text-gray-700">
                We may update this privacy policy occasionally. We will post any
                changes on this page and update the &quot;Last updated&quot;
                date.
              </p>
            </section>

            {/* Back to Home Link */}
            <div className="mt-12 pt-4 border-t">
              <Link
                href="/"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
