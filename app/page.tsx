'use client'

import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ProductCarousel } from '@/components/ProductCarousel'
import { FlashDeals } from '@/components/FlashDeals'

// Mock data - replace with API calls
const mockFlashDeals = [
  {
    id: 1,
    title: 'Wireless Earbuds',
    price: 1999,
    originalPrice: 4999,
    discount: 60,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
    endsIn: Date.now() + 5 * 60 * 60 * 1000,
  },
  {
    id: 2,
    title: 'USB-C Cable',
    price: 299,
    originalPrice: 899,
    discount: 67,
    image: 'https://images.unsplash.com/photo-1609034227505-5876f6aa4e90?w=300&h=300&fit=crop',
    endsIn: Date.now() + 5 * 60 * 60 * 1000,
  },
  {
    id: 3,
    title: 'Phone Stand',
    price: 399,
    originalPrice: 999,
    discount: 60,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=300&h=300&fit=crop',
    endsIn: Date.now() + 5 * 60 * 60 * 1000,
  },
  {
    id: 4,
    title: 'Screen Protector',
    price: 199,
    originalPrice: 599,
    discount: 67,
    image: 'https://images.unsplash.com/photo-1525966222134-fceb466e6e85?w=300&h=300&fit=crop',
    endsIn: Date.now() + 5 * 60 * 60 * 1000,
  },
  {
    id: 5,
    title: 'Phone Case',
    price: 499,
    originalPrice: 1499,
    discount: 67,
    image: 'https://images.unsplash.com/photo-1592286927505-1def25e2c81d?w=300&h=300&fit=crop',
    endsIn: Date.now() + 5 * 60 * 60 * 1000,
  },
  {
    id: 6,
    title: 'Charging Dock',
    price: 799,
    originalPrice: 1999,
    discount: 60,
    image: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=300&h=300&fit=crop',
    endsIn: Date.now() + 5 * 60 * 60 * 1000,
  },
]

const mockElectronics = [
  {
    id: 7,
    title: 'Wireless Bluetooth Speaker',
    price: 2999,
    originalPrice: 5999,
    image: 'https://images.unsplash.com/photo-1589003077984-894e133814c9?w=300&h=300&fit=crop',
    rating: 4.5,
  },
  {
    id: 8,
    title: 'Smartwatch Pro',
    price: 8999,
    originalPrice: 15999,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
    rating: 4.3,
  },
  {
    id: 9,
    title: 'Portable Power Bank',
    price: 1599,
    originalPrice: 3999,
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=300&h=300&fit=crop',
    rating: 4.6,
  },
  {
    id: 10,
    title: 'LED Desk Lamp',
    price: 1199,
    originalPrice: 2999,
    image: 'https://images.unsplash.com/photo-1565636192335-14c46fa1120d?w=300&h=300&fit=crop',
    rating: 4.4,
  },
  {
    id: 11,
    title: 'Mechanical Keyboard',
    price: 3499,
    originalPrice: 7999,
    image: 'https://images.unsplash.com/photo-1587829191301-30ec70fec38f?w=300&h=300&fit=crop',
    rating: 4.7,
  },
  {
    id: 12,
    title: 'Wireless Mouse',
    price: 799,
    originalPrice: 1999,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=300&h=300&fit=crop',
    rating: 4.5,
  },
]

const mockFashion = [
  {
    id: 13,
    title: 'Cotton T-Shirt',
    price: 499,
    originalPrice: 1299,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop',
    rating: 4.3,
  },
  {
    id: 14,
    title: 'Denim Jeans',
    price: 1599,
    originalPrice: 3999,
    image: 'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=300&h=300&fit=crop',
    rating: 4.4,
  },
  {
    id: 15,
    title: 'Sports Running Shoes',
    price: 2999,
    originalPrice: 5999,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
    rating: 4.6,
  },
  {
    id: 16,
    title: 'Casual Sneakers',
    price: 2499,
    originalPrice: 4999,
    image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=300&h=300&fit=crop',
    rating: 4.5,
  },
  {
    id: 17,
    title: 'Winter Jacket',
    price: 3999,
    originalPrice: 7999,
    image: 'https://images.unsplash.com/photo-1539533057440-7d8f3d69a4e2?w=300&h=300&fit=crop',
    rating: 4.2,
  },
  {
    id: 18,
    title: 'Baseball Cap',
    price: 399,
    originalPrice: 999,
    image: 'https://images.unsplash.com/photo-1572535967248-b37e16b61bbf?w=300&h=300&fit=crop',
    rating: 4.1,
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-[#eaeded]">
      <Header />

      <main className="max-w-[1500px] mx-auto px-2 sm:px-4">
        {/* Hero Banner */}
        <div className="relative -mt-16 mb-6">
          <div className="h-[400px] bg-gradient-to-b from-teal-400 via-teal-300 to-transparent">
            <img
              src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1500&h=400&fit=crop"
              alt="Hero"
              className="w-full h-full object-cover opacity-90"
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#eaeded] to-transparent" />
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6 -mt-20 relative z-10">
          {[
            { title: 'Mobiles & Accessories', img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop', link: '/products?category=mobiles' },
            { title: 'Electronics', img: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=300&fit=crop', link: '/products?category=electronics' },
            { title: 'Fashion', img: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=300&fit=crop', link: '/products?category=fashion' },
            { title: 'Home & Kitchen', img: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=300&h=300&fit=crop', link: '/products?category=home' },
            { title: 'Books', img: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=300&h=300&fit=crop', link: '/products?category=books' },
            { title: 'Sports & Fitness', img: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=300&h=300&fit=crop', link: '/products?category=sports' },
            { title: 'Toys & Games', img: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=300&h=300&fit=crop', link: '/products?category=toys' },
            { title: 'Beauty & Personal Care', img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop', link: '/products?category=beauty' },
          ].map((cat, idx) => (
            <Link key={idx} href={cat.link}>
              <div className="bg-white p-5 hover:shadow-lg transition-shadow cursor-pointer h-full">
                <h3 className="font-bold text-lg mb-3">{cat.title}</h3>
                <div className="aspect-square overflow-hidden mb-3">
                  <img
                    src={cat.img}
                    alt={cat.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>
                <Link href={cat.link} className="text-sm text-[#007185] hover:text-[#c45500] hover:underline">
                  Shop now
                </Link>
              </div>
            </Link>
          ))}
        </div>

        {/* Flash Deals */}
        <div className="bg-white p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Today's Deals</h2>
            <Link href="/deals" className="text-sm text-[#007185] hover:text-[#c45500] hover:underline">
              See all deals
            </Link>
          </div>
          <FlashDeals deals={mockFlashDeals} />
        </div>

        {/* Electronics */}
        <div className="bg-white p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Electronics</h2>
            <Link href="/products?category=electronics" className="text-sm text-[#007185] hover:text-[#c45500] hover:underline">
              See more
            </Link>
          </div>
          <ProductCarousel products={mockElectronics} />
        </div>

        {/* Fashion */}
        <div className="bg-white p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Fashion</h2>
            <Link href="/products?category=fashion" className="text-sm text-[#007185] hover:text-[#c45500] hover:underline">
              See more
            </Link>
          </div>
          <ProductCarousel products={mockFashion} />
        </div>

        {/* Sign in Banner */}
        <div className="bg-white p-8 text-center mb-6">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-xl mb-4">See personalized recommendations</h3>
            <Link href="/login">
              <button className="bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 px-8 py-2 rounded text-sm font-medium transition-colors">
                Sign in
              </button>
            </Link>
            <p className="text-sm mt-3">
              New customer?{' '}
              <Link href="/signup" className="text-[#007185] hover:text-[#c45500] hover:underline">
                Start here.
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
