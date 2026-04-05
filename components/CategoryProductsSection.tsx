'use client'

import { useState } from 'react'
import ProductCard from './ProductCard'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const categories = [
  'All',
  'Mobiles',
  'Electronics',
  'Fashion',
  'Home & Kitchen',
  'Books',
  'Sports',
  'Toys',
  'Beauty',
  'Grocery',
]

// Extended product database
const allProducts = [
  // Mobiles
  {
    id: 1,
    name: 'Premium Wireless Earbuds Pro',
    price: 1999,
    originalPrice: 4999,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&h=500&fit=crop',
    category: 'Mobiles',
    inStock: true,
  },
  {
    id: 2,
    name: 'Fast Charging USB-C Cable 2m',
    price: 299,
    originalPrice: 899,
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1609034227505-5876f6aa4e90?w=500&h=500&fit=crop',
    category: 'Mobiles',
    inStock: true,
  },
  {
    id: 3,
    name: 'Adjustable Phone Stand Holder',
    price: 399,
    originalPrice: 999,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop',
    category: 'Mobiles',
    inStock: true,
  },
  {
    id: 4,
    name: 'Tempered Glass Screen Protector',
    price: 199,
    originalPrice: 599,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&h=500&fit=crop',
    category: 'Mobiles',
    inStock: true,
  },
  
  // Electronics
  {
    id: 5,
    name: 'Wireless Bluetooth Speaker',
    price: 2999,
    originalPrice: 5999,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1589003077984-894e133814c9?w=500&h=500&fit=crop',
    category: 'Electronics',
    inStock: true,
  },
  {
    id: 6,
    name: 'Smartwatch Pro with GPS',
    price: 8999,
    originalPrice: 15999,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
    category: 'Electronics',
    inStock: true,
  },
  {
    id: 7,
    name: 'Portable Power Bank 20000mAh',
    price: 1599,
    originalPrice: 3999,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop',
    category: 'Electronics',
    inStock: true,
  },
  {
    id: 8,
    name: 'LED Desk Lamp with USB Port',
    price: 1199,
    originalPrice: 2999,
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1565636192335-14c46fa1120d?w=500&h=500&fit=crop',
    category: 'Electronics',
    inStock: true,
  },
  
  // Fashion
  {
    id: 9,
    name: 'Premium Cotton T-Shirt',
    price: 499,
    originalPrice: 1299,
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
    category: 'Fashion',
    inStock: true,
  },
  {
    id: 10,
    name: 'Slim Fit Denim Jeans',
    price: 1599,
    originalPrice: 3999,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&h=500&fit=crop',
    category: 'Fashion',
    inStock: true,
  },
  {
    id: 11,
    name: 'Sports Running Shoes',
    price: 2999,
    originalPrice: 5999,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
    category: 'Fashion',
    inStock: true,
  },
  {
    id: 12,
    name: 'Casual Sneakers',
    price: 2499,
    originalPrice: 4999,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500&h=500&fit=crop',
    category: 'Fashion',
    inStock: true,
  },
  
  // Home & Kitchen
  {
    id: 13,
    name: 'Non-Stick Cookware Set',
    price: 3499,
    originalPrice: 6999,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=500&h=500&fit=crop',
    category: 'Home & Kitchen',
    inStock: true,
  },
  {
    id: 14,
    name: 'Electric Kettle 1.8L',
    price: 899,
    originalPrice: 1999,
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1563822249366-3efb6c2b7e9a?w=500&h=500&fit=crop',
    category: 'Home & Kitchen',
    inStock: true,
  },
  {
    id: 15,
    name: 'Microwave Oven 20L',
    price: 5999,
    originalPrice: 9999,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=500&h=500&fit=crop',
    category: 'Home & Kitchen',
    inStock: true,
  },
  {
    id: 16,
    name: 'Vacuum Cleaner',
    price: 4499,
    originalPrice: 7999,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500&h=500&fit=crop',
    category: 'Home & Kitchen',
    inStock: true,
  },
  
  // Books
  {
    id: 17,
    name: 'The Psychology of Money',
    price: 299,
    originalPrice: 499,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500&h=500&fit=crop',
    category: 'Books',
    inStock: true,
  },
  {
    id: 18,
    name: 'Atomic Habits',
    price: 349,
    originalPrice: 599,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&h=500&fit=crop',
    category: 'Books',
    inStock: true,
  },
  {
    id: 19,
    name: 'Rich Dad Poor Dad',
    price: 279,
    originalPrice: 499,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=500&h=500&fit=crop',
    category: 'Books',
    inStock: true,
  },
  {
    id: 20,
    name: 'Think and Grow Rich',
    price: 199,
    originalPrice: 399,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&h=500&fit=crop',
    category: 'Books',
    inStock: true,
  },
  
  // Sports
  {
    id: 21,
    name: 'Yoga Mat with Carry Bag',
    price: 799,
    originalPrice: 1999,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=500&fit=crop',
    category: 'Sports',
    inStock: true,
  },
  {
    id: 22,
    name: 'Dumbbell Set 10kg',
    price: 1499,
    originalPrice: 2999,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&h=500&fit=crop',
    category: 'Sports',
    inStock: true,
  },
  {
    id: 23,
    name: 'Cricket Bat Professional',
    price: 2999,
    originalPrice: 5999,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=500&h=500&fit=crop',
    category: 'Sports',
    inStock: true,
  },
  {
    id: 24,
    name: 'Football Size 5',
    price: 699,
    originalPrice: 1499,
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=500&h=500&fit=crop',
    category: 'Sports',
    inStock: true,
  },
  
  // Beauty
  {
    id: 25,
    name: 'Face Serum Vitamin C',
    price: 599,
    originalPrice: 1299,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&h=500&fit=crop',
    category: 'Beauty',
    inStock: true,
  },
  {
    id: 26,
    name: 'Hair Dryer Professional',
    price: 1999,
    originalPrice: 3999,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=500&h=500&fit=crop',
    category: 'Beauty',
    inStock: true,
  },
  {
    id: 27,
    name: 'Makeup Brush Set 12pcs',
    price: 899,
    originalPrice: 1999,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500&h=500&fit=crop',
    category: 'Beauty',
    inStock: true,
  },
  {
    id: 28,
    name: 'Perfume Gift Set',
    price: 1499,
    originalPrice: 2999,
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&h=500&fit=crop',
    category: 'Beauty',
    inStock: true,
  },
]

export default function CategoryProductsSection() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [scrollPosition, setScrollPosition] = useState(0)

  const filteredProducts =
    selectedCategory === 'All'
      ? allProducts
      : allProducts.filter((p) => p.category === selectedCategory)

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category)
    setScrollPosition(0)
  }

  const scrollCategories = (direction: 'left' | 'right') => {
    const container = document.getElementById('category-scroll')
    if (container) {
      const scrollAmount = direction === 'left' ? -200 : 200
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <div className="bg-white p-5 mb-6">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">Shop by Category</h2>
        <p className="text-sm text-gray-600">
          Showing {filteredProducts.length} products
          {selectedCategory !== 'All' && ` in ${selectedCategory}`}
        </p>
      </div>

      {/* Category Navigation */}
      <div className="relative mb-6">
        <button
          onClick={() => scrollCategories('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100 transition-colors"
          aria-label="Scroll left"
        >
          <ChevronLeft size={20} />
        </button>

        <div
          id="category-scroll"
          className="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth px-10"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`px-6 py-2 rounded-full whitespace-nowrap font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-[#131921] text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <button
          onClick={() => scrollCategories('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100 transition-colors"
          aria-label="Scroll right"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found in this category</p>
        </div>
      )}
    </div>
  )
}
