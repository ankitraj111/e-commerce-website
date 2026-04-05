'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface Product {
  id: number
  title: string
  price: number
  originalPrice?: number
  image: string
  rating?: number
}

interface ProductCarouselProps {
  title: string
  products: Product[]
  autoScroll?: boolean
}

export function ProductCarousel({
  title,
  products,
  autoScroll = true,
}: ProductCarouselProps) {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const scroll = (direction: 'left' | 'right') => {
    const container = document.getElementById(`carousel-${title}`)
    if (!container) return

    const scrollAmount = 320
    const newPosition =
      direction === 'left'
        ? scrollPosition - scrollAmount
        : scrollPosition + scrollAmount

    container.scrollLeft = newPosition
    setScrollPosition(newPosition)
    updateScrollButtons(newPosition, container)
  }

  const updateScrollButtons = (position: number, container: HTMLElement) => {
    setCanScrollLeft(position > 0)
    setCanScrollRight(position < container.scrollWidth - container.clientWidth - 10)
  }

  useEffect(() => {
    const container = document.getElementById(`carousel-${title}`)
    if (container) {
      updateScrollButtons(scrollPosition, container)

      const handleScroll = () => {
        setScrollPosition(container.scrollLeft)
        updateScrollButtons(container.scrollLeft, container)
      }

      container.addEventListener('scroll', handleScroll)
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [title, scrollPosition])

  return (
    <div className="relative">
      <div
        id={`carousel-${title}`}
        className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide"
      >
        {products.map((product) => (
          <div key={product.id} className="flex-shrink-0 w-[200px]">
            <Link href={`/products/${product.id}`}>
              <div className="bg-white border border-gray-200 rounded hover:shadow-md transition-shadow p-3 h-full flex flex-col">
                <div className="aspect-square overflow-hidden bg-gray-50 flex items-center justify-center mb-2">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="max-w-full max-h-full object-contain hover:scale-105 transition-transform"
                  />
                </div>
                <div className="flex-1 flex flex-col">
                  <h3 className="text-sm line-clamp-2 mb-2 hover:text-[#c45500] transition-colors">
                    {product.title}
                  </h3>
                  <div className="mt-auto">
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-normal">
                        <span className="text-xs align-super">₹</span>
                        {product.price.toLocaleString('en-IN')}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs line-through text-gray-500">
                          ₹{product.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                    {product.rating && (
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-xs text-[#ffa41c]">★</span>
                        <span className="text-xs">{product.rating}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Scroll Buttons */}
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 rounded-r shadow-md p-3 hover:bg-gray-50 transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
      )}
      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 rounded-l shadow-md p-3 hover:bg-gray-50 transition-colors"
        >
          <ChevronRight size={24} />
        </button>
      )}
    </div>
  )
}
