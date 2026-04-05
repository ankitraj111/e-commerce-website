'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Star } from 'lucide-react'
import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  discountPercent?: number
  rating: number
  image: string
  category: string
  inStock: boolean
}

export default function ProductCard({ product }: { product: Product }) {
  const { toast } = useToast()
  const [isAdding, setIsAdding] = useState(false)

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : product.discountPercent || 0

  const handleAddToCart = async () => {
    setIsAdding(true)
    try {
      toast({
        title: 'Added to cart',
        description: `${product.name} has been added to your cart.`,
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add item to cart.',
        variant: 'destructive',
      })
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded hover:shadow-lg transition-shadow p-4 flex flex-col h-full">
      {/* Image */}
      <Link href={`/products/${product.id}`} className="block mb-3">
        <div className="relative aspect-square overflow-hidden bg-gray-50 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="max-w-full max-h-full object-contain hover:scale-105 transition-transform duration-300"
          />
          {discount > 0 && (
            <div className="absolute top-2 left-2 bg-[#cc0c39] text-white px-2 py-1 text-xs font-bold">
              {discount}% off
            </div>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-white/90 flex items-center justify-center">
              <span className="text-red-600 font-semibold">Currently unavailable</span>
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <Link href={`/products/${product.id}`}>
          <h3 className="text-sm mb-2 line-clamp-2 hover:text-[#c45500] transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.round(product.rating)
                    ? 'fill-[#ffa41c] text-[#ffa41c]'
                    : 'fill-gray-200 text-gray-200'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-[#007185]">(2,543)</span>
        </div>

        {/* Price */}
        <div className="mb-3">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-normal">
              <span className="text-xs align-super">₹</span>
              {product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>
          {product.originalPrice && (
            <div className="text-xs text-gray-600">
              Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')} ({discount}%)
            </div>
          )}
        </div>

        {/* Delivery Info */}
        <div className="text-xs text-gray-600 mb-3">
          Get it by <span className="font-semibold">Tomorrow</span>
        </div>

        {/* Add to Cart */}
        <Button
          onClick={handleAddToCart}
          disabled={!product.inStock || isAdding}
          className="w-full bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 font-normal shadow-sm"
        >
          {isAdding ? 'Adding...' : product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </div>
    </div>
  )
}
