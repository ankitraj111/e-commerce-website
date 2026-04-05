'use client'

import Link from 'next/link'
import { Search, ShoppingCart, Menu, MapPin, User, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

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

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [cartCount, setCartCount] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    const userData = localStorage.getItem('user')
    if (token) {
      setIsAuthenticated(true)
      if (userData) {
        setUser(JSON.parse(userData))
      }
    }

    const cart = localStorage.getItem('cart')
    if (cart) {
      try {
        const cartData = JSON.parse(cart)
        setCartCount(Array.isArray(cartData) ? cartData.length : 0)
      } catch {
        setCartCount(0)
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    setIsAuthenticated(false)
    router.push('/')
  }

  return (
    <header className="bg-[#131921] sticky top-0 z-50">
      {/* Main Header */}
      <div className="bg-[#131921] text-white">
        <div className="max-w-[1500px] mx-auto px-2 sm:px-3">
          <div className="flex items-center gap-2 sm:gap-3 py-2">
            {/* Logo */}
            <Link href="/" className="flex items-center px-2 py-1 border border-transparent hover:border-white rounded transition-all">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold tracking-tight">.shop</span>
                <span className="text-xs">.in</span>
              </div>
            </Link>

            {/* Deliver to */}
            <div className="hidden lg:flex items-start gap-1 px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer transition-all">
              <MapPin size={20} className="mt-0.5" />
              <div className="flex flex-col leading-tight">
                <span className="text-xs text-gray-300">Delivering to New Delhi 110092</span>
                <span className="text-sm font-bold">Update location</span>
              </div>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-4xl">
              <div className="flex items-center w-full h-[40px] shadow-sm">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center justify-center gap-1 bg-[#f3f3f3] text-gray-700 px-3 text-sm hover:bg-[#e3e3e3] rounded-l-md transition-colors h-full border-r border-gray-300">
                      <span>All</span>
                      <ChevronDown size={14} className="text-gray-600" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="z-50 w-48">
                    {categories.map((cat) => (
                      <DropdownMenuItem key={cat} asChild>
                        <Link href={`/products?category=${cat.toLowerCase()}`} className="cursor-pointer">
                          {cat}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <input
                  type="text"
                  placeholder="Search ShopHub.in"
                  className="flex-1 h-full px-4 text-base text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#febd69] focus:ring-inset"
                />
                <button className="bg-[#febd69] hover:bg-[#f3a847] px-4 rounded-r-md transition-colors h-full flex items-center justify-center min-w-[45px]">
                  <Search size={22} className="text-gray-900" strokeWidth={2.5} />
                </button>
              </div>
            </div>

            {/* Search Bar - Mobile */}
            <div className="flex md:hidden flex-1 max-w-md">
              <div className="flex items-center w-full h-[36px]">
                <input
                  type="text"
                  placeholder="Search"
                  className="flex-1 h-full px-3 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#febd69] rounded-l-md"
                />
                <button className="bg-[#febd69] hover:bg-[#f3a847] px-3 rounded-r-md transition-colors h-full flex items-center justify-center">
                  <Search size={20} className="text-gray-900" strokeWidth={2.5} />
                </button>
              </div>
            </div>

            {/* Language Selector */}
            <div className="hidden lg:flex items-center gap-1 px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer transition-all">
              <div className="w-6 h-4 bg-white rounded-sm flex items-center justify-center text-xs">
                🇮🇳
              </div>
              <span className="text-sm font-bold">EN</span>
              <ChevronDown size={12} />
            </div>

            {/* Account & Lists */}
            <div className="hidden lg:flex items-center">
              {isAuthenticated && user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex flex-col px-2 py-1 border border-transparent hover:border-white rounded text-left transition-all">
                      <span className="text-xs">Hello, {user.name?.split(' ')[0]}</span>
                      <span className="text-sm font-bold flex items-center gap-1">
                        Account & Lists
                        <ChevronDown size={12} />
                      </span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 z-50">
                    <DropdownMenuItem asChild>
                      <Link href="/account" className="cursor-pointer">Your Account</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/orders" className="cursor-pointer">Your Orders</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/wishlist" className="cursor-pointer">Your Wish List</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/login" className="flex flex-col px-2 py-1 border border-transparent hover:border-white rounded text-left transition-all">
                  <span className="text-xs">Hello, sign in</span>
                  <span className="text-sm font-bold">Account & Lists</span>
                </Link>
              )}
            </div>

            {/* Returns & Orders */}
            <Link href="/orders" className="hidden lg:flex flex-col px-2 py-1 border border-transparent hover:border-white rounded text-left transition-all">
              <span className="text-xs">Returns</span>
              <span className="text-sm font-bold">& Orders</span>
            </Link>

            {/* Cart */}
            <Link href="/cart" className="flex items-center gap-1 px-2 py-1 border border-transparent hover:border-white rounded transition-all relative">
              <div className="relative">
                <ShoppingCart size={32} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 left-3 bg-[#f08804] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-sm font-bold mt-3">Cart</span>
            </Link>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="lg:hidden p-2 border border-transparent hover:border-white rounded"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Category Bar */}
      <div className="bg-[#232f3e] text-white">
        <div className="max-w-[1500px] mx-auto px-2 sm:px-3">
          <div className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-hide text-sm">
            <button className="flex items-center gap-1 px-2 py-1 border border-transparent hover:border-white rounded font-bold whitespace-nowrap transition-all">
              <Menu size={18} />
              All
            </button>
            {categories.slice(1).map((cat) => (
              <Link
                key={cat}
                href={`/products?category=${cat.toLowerCase()}`}
                className="px-2 py-1 border border-transparent hover:border-white rounded whitespace-nowrap transition-all"
              >
                {cat}
              </Link>
            ))}
            <Link href="/deals" className="px-2 py-1 border border-transparent hover:border-white rounded whitespace-nowrap transition-all text-[#febd69] font-bold">
              Today's Deals
            </Link>
            <Link href="/customer-service" className="px-2 py-1 border border-transparent hover:border-white rounded whitespace-nowrap transition-all">
              Customer Service
            </Link>
            <Link href="/registry" className="px-2 py-1 border border-transparent hover:border-white rounded whitespace-nowrap transition-all">
              Registry
            </Link>
            <Link href="/gift-cards" className="px-2 py-1 border border-transparent hover:border-white rounded whitespace-nowrap transition-all">
              Gift Cards
            </Link>
            <Link href="/sell" className="px-2 py-1 border border-transparent hover:border-white rounded whitespace-nowrap transition-all">
              Sell
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white text-gray-900 border-t shadow-lg animate-slide-in">
          <div className="max-w-[1500px] mx-auto px-4 py-4 space-y-2">
            {!isAuthenticated && (
              <Link href="/login" className="block px-4 py-3 bg-[#ffd814] hover:bg-[#f7ca00] rounded text-center font-medium transition-colors">
                Sign In
              </Link>
            )}
            <div className="space-y-1">
              <div className="font-bold text-lg px-4 py-2">Shop by Category</div>
              {categories.map((cat) => (
                <Link
                  key={cat}
                  href={`/products?category=${cat.toLowerCase()}`}
                  className="block px-4 py-2 hover:bg-gray-100 rounded transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {cat}
                </Link>
              ))}
            </div>
            {isAuthenticated && (
              <>
                <div className="border-t pt-2 mt-2">
                  <div className="font-bold text-lg px-4 py-2">Your Account</div>
                  <Link href="/account" className="block px-4 py-2 hover:bg-gray-100 rounded transition-colors">
                    Your Account
                  </Link>
                  <Link href="/orders" className="block px-4 py-2 hover:bg-gray-100 rounded transition-colors">
                    Your Orders
                  </Link>
                  <Link href="/wishlist" className="block px-4 py-2 hover:bg-gray-100 rounded transition-colors">
                    Your Wish List
                  </Link>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded text-red-600 transition-colors"
                >
                  Sign Out
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
