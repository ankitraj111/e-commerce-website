'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import { FilterSidebar } from '@/components/FilterSidebar'
import { Spinner } from '@/components/ui/spinner'

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category')
  
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [sortBy, setSortBy] = useState('relevance')
  const [isLoading, setIsLoading] = useState(true)
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string[] }>({})

  // Mock data with INR prices
  const mockProducts = [
    {
      id: 1,
      name: 'Premium Wireless Headphones',
      price: 12999,
      originalPrice: 14999,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
      category: 'Electronics',
      brand: 'AudioMax',
      inStock: true,
    },
    {
      id: 2,
      name: 'Luxury Watch Collection',
      price: 39999,
      originalPrice: 49999,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1523170335684-f042f1dac5e0?w=500&h=500&fit=crop',
      category: 'Fashion',
      brand: 'TimeKeeper',
      inStock: true,
    },
    {
      id: 3,
      name: 'Designer Backpack',
      price: 16499,
      originalPrice: 19999,
      rating: 4.3,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
      category: 'Fashion',
      brand: 'StyleBag',
      inStock: true,
    },
    {
      id: 4,
      name: 'Smart Watch Pro',
      price: 26999,
      originalPrice: 34999,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
      category: 'Electronics',
      brand: 'TechWatch',
      inStock: true,
    },
    {
      id: 5,
      name: 'Professional Camera',
      price: 84999,
      originalPrice: 99999,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1614008375890-cb53b6c5f8d9?w=500&h=500&fit=crop',
      category: 'Electronics',
      brand: 'ProCamera',
      inStock: false,
    },
    {
      id: 6,
      name: 'Elegant Sunglasses',
      price: 10499,
      originalPrice: 12999,
      rating: 4.4,
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop',
      category: 'Fashion',
      brand: 'Shades',
      inStock: true,
    },
    {
      id: 7,
      name: 'Portable Speaker',
      price: 7999,
      originalPrice: 9999,
      rating: 4.2,
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop',
      category: 'Electronics',
      brand: 'SoundBox',
      inStock: true,
    },
    {
      id: 8,
      name: 'Cotton T-Shirt',
      price: 899,
      originalPrice: 1499,
      rating: 4.1,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
      category: 'Fashion',
      brand: 'ComfortWear',
      inStock: true,
    },
  ]

  const filterOptions = [
    {
      name: 'Category',
      options: [
        { label: 'Electronics', value: 'Electronics', count: 5 },
        { label: 'Fashion', value: 'Fashion', count: 3 },
      ],
    },
    {
      name: 'Price Range',
      options: [
        { label: 'Under ₹5,000', value: '0-5000' },
        { label: '₹5,000 - ₹15,000', value: '5000-15000' },
        { label: '₹15,000 - ₹50,000', value: '15000-50000' },
        { label: 'Above ₹50,000', value: '50000+' },
      ],
    },
    {
      name: 'Rating',
      options: [
        { label: '4★ & above', value: '4' },
        { label: '3★ & above', value: '3' },
        { label: '2★ & above', value: '2' },
      ],
    },
    {
      name: 'Stock Status',
      options: [
        { label: 'In Stock', value: 'in-stock' },
        { label: 'Out of Stock', value: 'out-of-stock' },
      ],
    },
  ]

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      let filtered = mockProducts
      
      // Filter by category from URL if present
      if (categoryParam && categoryParam !== 'all') {
        const categoryName = categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)
        filtered = mockProducts.filter(p => 
          p.category.toLowerCase() === categoryParam.toLowerCase() ||
          categoryParam.toLowerCase().includes(p.category.toLowerCase())
        )
      }
      
      setProducts(filtered)
      setIsLoading(false)
    }, 300)
  }, [categoryParam])

  useEffect(() => {
    let filtered = [...products]

    // Apply filters
    Object.entries(selectedFilters).forEach(([filterName, values]) => {
      if (values.length === 0) return

      if (filterName === 'Category') {
        filtered = filtered.filter((p) => values.includes(p.category))
      } else if (filterName === 'Price Range') {
        filtered = filtered.filter((p) => {
          return values.some((range) => {
            if (range === '0-5000') return p.price <= 5000
            if (range === '5000-15000') return p.price > 5000 && p.price <= 15000
            if (range === '15000-50000') return p.price > 15000 && p.price <= 50000
            if (range === '50000+') return p.price > 50000
            return false
          })
        })
      } else if (filterName === 'Rating') {
        filtered = filtered.filter((p) =>
          values.some((rating) => p.rating >= parseInt(rating))
        )
      } else if (filterName === 'Stock Status') {
        filtered = filtered.filter((p) => {
          if (values.includes('in-stock')) return p.inStock
          if (values.includes('out-of-stock')) return !p.inStock
          return true
        })
      }
    })

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        filtered.reverse()
        break
      case 'relevance':
      default:
        break
    }

    setFilteredProducts(filtered)
  }, [products, selectedFilters, sortBy])

  const handleFilterChange = (filterName: string, value: string, checked: boolean) => {
    setSelectedFilters((prev) => {
      const updated = { ...prev }
      if (!updated[filterName]) {
        updated[filterName] = []
      }
      if (checked) {
        updated[filterName].push(value)
      } else {
        updated[filterName] = updated[filterName].filter((v) => v !== value)
      }
      return updated
    })
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />

      <main className="flex-1 px-4 py-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground">
              {categoryParam && categoryParam !== 'all' 
                ? `${categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1).replace('-', ' & ')} Products`
                : 'All Products'}
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Showing {filteredProducts.length} products
            </p>
          </div>

          <div className="flex gap-6">
            {/* Sidebar - Desktop */}
            <div className="hidden lg:block w-72">
              <FilterSidebar filters={filterOptions} onFilterChange={handleFilterChange} />
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Sort Options */}
              <div className="flex items-center justify-between mb-6 bg-white rounded-lg p-4">
                <span className="text-sm text-muted-foreground">
                  Sort by:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm border border-border rounded px-3 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="relevance">Relevance</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rating</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>

              {/* Products Grid */}
              {isLoading ? (
                <div className="flex justify-center items-center py-20">
                  <Spinner />
                </div>
              ) : filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-white rounded-lg">
                  <p className="text-muted-foreground text-lg">No products found</p>
                  <p className="text-muted-foreground text-sm mt-2">Try adjusting your filters</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
