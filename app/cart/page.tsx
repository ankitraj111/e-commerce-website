'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Trash2, ArrowLeft, Plus, Minus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Empty } from '@/components/ui/empty'

interface CartItem {
  id: number
  productId: number
  productName: string
  price: number
  quantity: number
  image: string
}

export default function CartPage() {
  const router = useRouter()
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      productId: 1,
      productName: 'Premium Wireless Headphones',
      price: 12999,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
    },
    {
      id: 2,
      productId: 3,
      productName: 'Designer Backpack',
      price: 16499,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop',
    },
  ])

  const handleUpdateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) return
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ))
  }

  const handleRemoveItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id))
  }

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const tax = subtotal * 0.1
  const shipping = subtotal > 100 ? 0 : 10
  const total = subtotal + tax + shipping

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center space-y-6">
            <Empty title="Your cart is empty" description="Start shopping to add items to your cart" />
            <Link href="/products">
              <Button className="w-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />

      <main className="flex-1 px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <Link href="/products" className="flex items-center gap-2 text-primary hover:underline mb-8">
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>

          <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="border border-border rounded-lg p-4 md:p-6 flex gap-4">
                  {/* Image */}
                  <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 bg-muted rounded-md overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0 space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg md:text-xl">{item.productName}</h3>
                      <p className="text-2xl font-bold text-primary mt-2">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Quantity:</span>
                      <div className="flex items-center border border-border rounded-md">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          className="rounded-none"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value) || 1)}
                          className="w-12 text-center border-x border-border outline-none bg-background"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          className="rounded-none"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Remove */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-destructive hover:bg-destructive/10 flex-shrink-0"
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="border border-border rounded-lg p-6 space-y-6 sticky top-24">
                <h2 className="text-2xl font-bold">Order Summary</h2>

                <div className="space-y-3 border-b border-border pb-4">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Tax (18% GST)</span>
                    <span>₹{Math.round(tax).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Delivery</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-green-600 font-semibold">Free</span>
                      ) : (
                        `₹${shipping}`
                      )}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between text-2xl font-bold">
                  <span>Total</span>
                  <span className="text-primary">₹{Math.round(total).toLocaleString('en-IN')}</span>
                </div>

                <Button
                  onClick={() => router.push('/checkout')}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  size="lg"
                >
                  Proceed to Checkout
                </Button>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => router.push('/products')}
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
