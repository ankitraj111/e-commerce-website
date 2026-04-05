'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react'

interface Deal {
  id: number
  title: string
  price: number
  originalPrice: number
  discount: number
  image: string
  endsIn: number
}

interface FlashDealsProps {
  deals: Deal[]
}

export function FlashDeals({ deals }: FlashDealsProps) {
  const [timeLeft, setTimeLeft] = useState<{ [key: number]: string }>({})

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft: { [key: number]: string } = {}
      deals.forEach((deal) => {
        const diff = deal.endsIn - Date.now()
        if (diff > 0) {
          const hours = Math.floor(diff / (1000 * 60 * 60))
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
          const seconds = Math.floor((diff % (1000 * 60)) / 1000)
          newTimeLeft[deal.id] = `${hours}h ${minutes}m ${seconds}s`
        } else {
          newTimeLeft[deal.id] = 'Expired'
        }
      })
      setTimeLeft(newTimeLeft)
    }, 1000)

    return () => clearInterval(timer)
  }, [deals])

  const scroll = (direction: 'left' | 'right') => {
    const container = document.getElementById('flash-deals-container')
    if (!container) return
    const scrollAmount = 250
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }

  return (
    <div className="relative">
      <div
        id="flash-deals-container"
        className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide py-2"
      >
        {deals.map((deal) => (
          <Link key={deal.id} href={`/products/${deal.id}`}>
            <div className="flex-shrink-0 w-[180px] bg-white border border-gray-200 rounded hover:shadow-md transition-shadow p-3">
              <div className="aspect-square overflow-hidden bg-gray-50 flex items-center justify-center mb-2 relative">
                <img
                  src={deal.image}
                  alt={deal.title}
                  className="max-w-full max-h-full object-contain"
                />
                <div className="absolute top-2 left-2 bg-[#cc0c39] text-white px-2 py-1 text-xs font-bold rounded">
                  {deal.discount}% off
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-xs text-red-600">
                  <Clock size={12} />
                  <span>{timeLeft[deal.id] || 'Loading...'}</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-base font-normal">
                    <span className="text-xs align-super">₹</span>
                    {deal.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs line-through text-gray-500">
                    ₹{deal.originalPrice.toLocaleString('en-IN')}
                  </span>
                </div>
                <h3 className="text-xs line-clamp-2 hover:text-[#c45500] transition-colors">
                  {deal.title}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Scroll Buttons */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 rounded-r shadow-md p-2 hover:bg-gray-50 transition-colors"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 rounded-l shadow-md p-2 hover:bg-gray-50 transition-colors"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  )
}
