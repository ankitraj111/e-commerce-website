'use client'

import Link from 'next/link'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-white border-t mt-12">
      {/* Back to Top */}
      <button
        onClick={scrollToTop}
        className="w-full bg-[#37475a] hover:bg-[#485769] text-white text-sm py-4 transition-colors"
      >
        Back to top
      </button>

      {/* Main Footer */}
      <div className="bg-[#232f3e] text-white">
        <div className="max-w-[1500px] mx-auto px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Get to Know Us */}
            <div>
              <h3 className="font-bold text-base mb-3">Get to Know Us</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="text-gray-300 hover:underline">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-gray-300 hover:underline">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/press" className="text-gray-300 hover:underline">
                    Press Releases
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-300 hover:underline">
                    ShopHub Science
                  </Link>
                </li>
              </ul>
            </div>

            {/* Connect with Us */}
            <div>
              <h3 className="font-bold text-base mb-3">Connect with Us</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/facebook" className="text-gray-300 hover:underline">
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link href="/twitter" className="text-gray-300 hover:underline">
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link href="/instagram" className="text-gray-300 hover:underline">
                    Instagram
                  </Link>
                </li>
              </ul>
            </div>

            {/* Make Money with Us */}
            <div>
              <h3 className="font-bold text-base mb-3">Make Money with Us</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/sell" className="text-gray-300 hover:underline">
                    Sell on ShopHub
                  </Link>
                </li>
                <li>
                  <Link href="/affiliate" className="text-gray-300 hover:underline">
                    Become an Affiliate
                  </Link>
                </li>
                <li>
                  <Link href="/advertise" className="text-gray-300 hover:underline">
                    Advertise Your Products
                  </Link>
                </li>
                <li>
                  <Link href="/self-publish" className="text-gray-300 hover:underline">
                    Self-Publish with Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Let Us Help You */}
            <div>
              <h3 className="font-bold text-base mb-3">Let Us Help You</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/account" className="text-gray-300 hover:underline">
                    Your Account
                  </Link>
                </li>
                <li>
                  <Link href="/orders" className="text-gray-300 hover:underline">
                    Returns Centre
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="text-gray-300 hover:underline">
                    Help
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-300 hover:underline">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700">
          <div className="max-w-[1500px] mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Link href="/" className="text-xl font-bold">
                  .shop
                </Link>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-400">
                <Link href="/conditions" className="hover:underline">
                  Conditions of Use
                </Link>
                <Link href="/privacy" className="hover:underline">
                  Privacy Notice
                </Link>
                <Link href="/interest-ads" className="hover:underline">
                  Interest-Based Ads
                </Link>
              </div>
            </div>
            <div className="text-center text-xs text-gray-400 mt-4">
              © 2026, Made with ❤️ by Ankit
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
