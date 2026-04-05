'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { Star } from 'lucide-react'

const deals = [
  { id: 1, name: 'Wireless Earbuds', price: 1999, originalPrice: 4999, discount: 60, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop', rating: 4.5 },
  { id: 2, name: 'USB-C Cable', price: 299, originalPrice: 899, discount: 67, image: 'https://images.unsplash.com/photo-1609034227505-5876f6aa4e90?w=400&h=400&fit=crop', rating: 4.3 },
  { id: 3, name: 'Phone Stand', price: 399, originalPrice: 999, discount: 60, image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop', rating: 4.6 },
  { id: 7, name: 'Bluetooth Speaker', price: 2999, originalPrice: 5999, discount: 50, image: 'https://images.unsplash.com/photo-1589003077984-894e133814c9?w=400&h=400&fit=crop', rating: 4.5 },
  { id: 8, name: 'Smartwatch Pro', price: 8999, originalPrice: 15999, discount: 44, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop', rating: 4.3 },
]

export default function DealsPage() {
  return (
    <div className="min-h-screen bg-[#eaeded]">
      <Header />
      <main className="max-w-[1500px] mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">Today's Deals</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {deals.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <div className="bg-white p-4 rounded hover:shadow-lg transition-shadow">
                <div className="aspect-square mb-3 relative">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded" />
                  <div className="absolute top-2 left-2 bg-[#cc0c39] text-white px-2 py-1 text-xs font-bold rounded">
                    {product.discount}% off
                  </div>
                </div>
                <h3 className="text-sm mb-2 line-clamp-2">{product.name}</h3>
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex items-center bg-[#007185] text-white px-1 py-0.5 rounded text-xs">
                    {product.rating} <Star size={10} className="ml-0.5 fill-white" />
                  </div>
                </div>
                <div className="text-xl font-bold text-[#b12704]">₹{product.price.toLocaleString('en-IN')}</div>
                <div className="text-xs text-gray-500 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</div>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
