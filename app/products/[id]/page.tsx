'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Star, ShoppingCart, Heart, Share2, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'

// Complete Product Database
const ALL_PRODUCTS: { [key: string]: any } = {
  '1': {
    id: 1,
    name: 'Wireless Earbuds with Charging Case',
    price: 1999,
    originalPrice: 4999,
    rating: 4.5,
    reviews: 2543,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=800&h=800&fit=crop',
    ],
    description: 'Premium wireless earbuds with active noise cancellation.',
    features: ['Active Noise Cancellation', '24h battery', 'Bluetooth 5.0', 'IPX4 water resistant'],
  },
  '2': {
    id: 2,
    name: 'USB-C Fast Charging Cable 2M',
    price: 299,
    originalPrice: 899,
    rating: 4.3,
    reviews: 1823,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1609034227505-5876f6aa4e90?w=800&h=800&fit=crop',
    ],
    description: 'Durable USB-C charging cable with fast charging support.',
    features: ['Fast charging 60W', '2 meter length', 'Braided design', 'Universal compatibility'],
  },
  '3': {
    id: 3,
    name: 'Adjustable Phone Stand Holder',
    price: 399,
    originalPrice: 999,
    rating: 4.6,
    reviews: 3421,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1527814050087-3793815479db?w=800&h=800&fit=crop',
    ],
    description: 'Universal adjustable phone stand with 360-degree rotation.',
    features: ['360° rotation', 'Adjustable height', 'Non-slip base', 'Aluminum build'],
  },
  '4': {
    id: 4,
    name: 'Tempered Glass Screen Protector',
    price: 199,
    originalPrice: 599,
    rating: 4.4,
    reviews: 5234,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1525966222134-fceb466e6e85?w=800&h=800&fit=crop',
    ],
    description: '9H hardness tempered glass screen protector.',
    features: ['9H hardness', 'Oleophobic coating', 'Crystal clear', 'Easy installation'],
  },
  '5': {
    id: 5,
    name: 'Premium Phone Case',
    price: 499,
    originalPrice: 1499,
    rating: 4.5,
    reviews: 2876,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1592286927505-1def25e2c81d?w=800&h=800&fit=crop',
    ],
    description: 'Protective phone case with shock absorption.',
    features: ['Shock absorption', 'Slim design', 'Raised edges', 'Wireless charging compatible'],
  },
  '6': {
    id: 6,
    name: 'Wireless Charging Dock',
    price: 799,
    originalPrice: 1999,
    rating: 4.4,
    reviews: 1654,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=800&h=800&fit=crop',
    ],
    description: 'Fast wireless charging dock for all Qi-enabled devices.',
    features: ['15W fast charging', 'LED indicator', 'Non-slip surface', 'Universal compatibility'],
  },
  '7': {
    id: 7,
    name: 'Wireless Bluetooth Speaker',
    price: 2999,
    originalPrice: 5999,
    rating: 4.5,
    reviews: 1876,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1589003077984-894e133814c9?w=800&h=800&fit=crop',
    ],
    description: 'Portable Bluetooth speaker with 360-degree sound.',
    features: ['360° sound', '12h battery', 'IPX7 waterproof', 'Bluetooth 5.0'],
  },
  '8': {
    id: 8,
    name: 'Smartwatch Pro',
    price: 8999,
    originalPrice: 15999,
    rating: 4.3,
    reviews: 2341,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop',
    ],
    description: 'Advanced smartwatch with fitness tracking and health monitoring.',
    features: ['Heart rate monitor', 'GPS tracking', '20+ sports modes', '7 days battery'],
  },
  '9': {
    id: 9,
    name: 'Portable Power Bank 20000mAh',
    price: 1599,
    originalPrice: 3999,
    rating: 4.6,
    reviews: 3245,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&h=800&fit=crop',
    ],
    description: 'High capacity power bank with fast charging support.',
    features: ['20000mAh capacity', 'Fast charging', 'Dual USB ports', 'LED display'],
  },
  '10': {
    id: 10,
    name: 'LED Desk Lamp',
    price: 1199,
    originalPrice: 2999,
    rating: 4.4,
    reviews: 1543,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1565636192335-14c46fa1120d?w=800&h=800&fit=crop',
    ],
    description: 'Adjustable LED desk lamp with multiple brightness levels.',
    features: ['Adjustable brightness', 'Touch control', 'USB charging port', 'Eye protection'],
  },
  '11': {
    id: 11,
    name: 'Mechanical Gaming Keyboard',
    price: 3499,
    originalPrice: 7999,
    rating: 4.7,
    reviews: 2876,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1587829191301-30ec70fec38f?w=800&h=800&fit=crop',
    ],
    description: 'RGB mechanical keyboard with blue switches.',
    features: ['Mechanical switches', 'RGB backlight', 'Anti-ghosting', 'Durable build'],
  },
  '12': {
    id: 12,
    name: 'Wireless Gaming Mouse',
    price: 799,
    originalPrice: 1999,
    rating: 4.5,
    reviews: 1987,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1527814050087-3793815479db?w=800&h=800&fit=crop',
    ],
    description: 'Ergonomic wireless mouse with adjustable DPI.',
    features: ['Wireless 2.4GHz', 'Adjustable DPI', 'Ergonomic design', '6 buttons'],
  },
  '13': {
    id: 13,
    name: 'Premium Cotton T-Shirt',
    price: 499,
    originalPrice: 1299,
    rating: 4.3,
    reviews: 3456,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop',
    ],
    description: 'Comfortable cotton t-shirt for everyday wear.',
    features: ['100% cotton', 'Breathable fabric', 'Regular fit', 'Machine washable'],
  },
  '14': {
    id: 14,
    name: 'Classic Denim Jeans',
    price: 1599,
    originalPrice: 3999,
    rating: 4.4,
    reviews: 2765,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=800&h=800&fit=crop',
    ],
    description: 'Classic fit denim jeans with stretch comfort.',
    features: ['Stretch denim', 'Classic fit', '5-pocket design', 'Durable construction'],
  },
  '15': {
    id: 15,
    name: 'Sports Running Shoes',
    price: 2999,
    originalPrice: 5999,
    rating: 4.6,
    reviews: 4321,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop',
    ],
    description: 'Lightweight running shoes with cushioned sole.',
    features: ['Cushioned sole', 'Breathable mesh', 'Lightweight', 'Anti-slip grip'],
  },
  '16': {
    id: 16,
    name: 'Casual Sneakers',
    price: 2499,
    originalPrice: 4999,
    rating: 4.5,
    reviews: 3654,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&h=800&fit=crop',
    ],
    description: 'Stylish casual sneakers for everyday wear.',
    features: ['Comfortable fit', 'Durable sole', 'Stylish design', 'Easy to clean'],
  },
  '17': {
    id: 17,
    name: 'Winter Jacket',
    price: 3999,
    originalPrice: 7999,
    rating: 4.2,
    reviews: 1876,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1539533057440-7d8f3d69a4e2?w=800&h=800&fit=crop',
    ],
    description: 'Warm winter jacket with insulated lining.',
    features: ['Insulated lining', 'Water resistant', 'Multiple pockets', 'Adjustable hood'],
  },
  '18': {
    id: 18,
    name: 'Baseball Cap',
    price: 399,
    originalPrice: 999,
    rating: 4.1,
    reviews: 2345,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1572535967248-b37e16b61bbf?w=800&h=800&fit=crop',
    ],
    description: 'Classic baseball cap with adjustable strap.',
    features: ['Adjustable strap', 'Breathable fabric', 'Classic design', 'One size fits all'],
  },
}

export default function ProductDetailPage() {
  const params = useParams()
  const { toast } = useToast()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  const productId = params.id as string
  const product = ALL_PRODUCTS[productId]

  if (!product) {
    return (
      <div className="min-h-screen bg-[#eaeded]">
        <Header />
        <main className="max-w-[1500px] mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-4">The product you're looking for doesn't exist.</p>
          <Link href="/" className="text-[#007185] hover:text-[#c45500] hover:underline">
            Back to Home
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

  const handleAddToCart = () => {
    toast({
      title: 'Added to cart',
      description: `${product.name} has been added to your cart.`,
    })
  }

  return (
    <div className="min-h-screen bg-[#eaeded]">
      <Header />

      <main className="max-w-[1500px] mx-auto px-2 sm:px-4 py-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-4">
          <Link href="/" className="text-[#007185] hover:text-[#c45500] hover:underline">
            Home
          </Link>
          <ChevronRight size={14} />
          <span className="text-gray-600">Product</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Images */}
          <div className="lg:col-span-5">
            <div className="bg-white p-6 rounded">
              <div className="aspect-square bg-white flex items-center justify-center border border-gray-200 rounded">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-contain p-4"
                />
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-2 mt-4">
                  {product.images.map((img: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-16 h-16 border-2 rounded ${
                        selectedImage === idx ? 'border-[#007185]' : 'border-gray-300'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-4">
            <div className="bg-white p-6 rounded">
              <h1 className="text-2xl mb-4">{product.name}</h1>

              <div className="flex items-center gap-2 mb-4 pb-4 border-b">
                <div className="flex items-center bg-[#007185] text-white px-2 py-1 rounded text-sm">
                  {product.rating} <Star size={14} className="ml-1 fill-white" />
                </div>
                <span className="text-sm text-[#007185]">{product.reviews.toLocaleString()} ratings</span>
              </div>

              <div className="mb-4 pb-4 border-b">
                <div className="text-sm text-gray-600 mb-1">M.R.P.: <span className="line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span></div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl text-[#b12704]">₹{product.price.toLocaleString('en-IN')}</span>
                </div>
                <div className="text-sm text-gray-700 mt-1">
                  You Save: ₹{(product.originalPrice - product.price).toLocaleString('en-IN')} ({discount}%)
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-bold mb-2">About this item</h3>
                <p className="text-sm text-gray-700 mb-3">{product.description}</p>
                <ul className="space-y-1">
                  {product.features.map((feature: string, idx: number) => (
                    <li key={idx} className="text-sm text-gray-700 flex gap-2">
                      <span className="text-[#007185]">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Buy Box */}
          <div className="lg:col-span-3">
            <div className="bg-white p-4 rounded border sticky top-20">
              <div className="text-3xl text-[#b12704] mb-2">
                ₹{product.price.toLocaleString('en-IN')}
              </div>
              <div className="text-sm mb-3">
                <span className="text-[#007185]">FREE delivery</span> <span className="font-bold">Tomorrow</span>
              </div>
              <div className="text-lg text-green-700 mb-4">In Stock</div>

              <div className="mb-4">
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full border rounded px-3 py-2 text-sm"
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>Qty: {num}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Button
                  onClick={handleAddToCart}
                  className="w-full bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900"
                >
                  Add to Cart
                </Button>
                <Button className="w-full bg-[#ffa41c] hover:bg-[#ff9000] text-gray-900">
                  Buy Now
                </Button>
              </div>

              <div className="mt-4 pt-4 border-t text-sm space-y-2">
                <div>Ships from: ShopHub</div>
                <div>Sold by: ShopHub</div>
                <div className="text-xs text-gray-600">🔒 Secure transaction</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
