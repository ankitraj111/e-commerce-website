'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { ArrowLeft, Lock } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function CheckoutPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      // TODO: Integrate with Stripe API
      // const response = await fetch('/api/checkout', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // })

      // Mock payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))

      toast({
        title: 'Order Confirmed',
        description: 'Your order has been placed successfully. Order number: ORD-123456',
      })

      router.push('/orders')
    } catch (error) {
      toast({
        title: 'Payment Failed',
        description: 'Unable to process your payment. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const orderTotal = 724.97

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />

      <main className="flex-1 px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <Link href="/cart" className="flex items-center gap-2 text-primary hover:underline mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </Link>

          <h1 className="text-4xl font-bold mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Shipping Address */}
                <Card className="p-6 space-y-4">
                  <h2 className="text-xl font-bold">Shipping Address</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      required
                    />
                    <Input
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      required
                    />
                  </div>
                  <Input
                    placeholder="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                  <Input
                    placeholder="Street Address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                  />
                  <div className="grid grid-cols-3 gap-3">
                    <Input
                      placeholder="City"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      required
                    />
                    <Input
                      placeholder="State"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      required
                    />
                    <Input
                      placeholder="ZIP Code"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      required
                    />
                  </div>
                </Card>

                {/* Payment Information */}
                <Card className="p-6 space-y-4">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <Lock className="w-5 h-5" />
                    Payment Information
                  </h2>
                  <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg text-sm text-blue-700 dark:text-blue-300">
                    <Lock className="w-4 h-4" />
                    Your payment information is secure and encrypted
                  </div>
                  <Input
                    placeholder="Cardholder Name"
                    value={formData.cardName}
                    onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                    required
                  />
                  <Input
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                    maxLength={19}
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="MM/YY"
                      value={formData.expiry}
                      onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                      required
                    />
                    <Input
                      placeholder="CVC"
                      value={formData.cvc}
                      onChange={(e) => setFormData({ ...formData, cvc: e.target.value })}
                      maxLength={4}
                      required
                    />
                  </div>
                </Card>

                <Button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-lg"
                >
                  {isProcessing ? 'Processing Payment...' : 'Complete Purchase'}
                </Button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="p-6 space-y-6 sticky top-24 h-fit">
                <h2 className="text-2xl font-bold">Order Summary</h2>

                {/* Items */}
                <div className="space-y-2 border-b border-border pb-4">
                  <div className="flex justify-between">
                    <span>Premium Headphones x1</span>
                    <span>$179.99</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Designer Backpack x2</span>
                    <span>$424.98</span>
                  </div>
                </div>

                {/* Totals */}
                <div className="space-y-3 border-b border-border pb-4">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>$604.97</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Tax (10%)</span>
                    <span>$60.50</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                </div>

                <div className="flex justify-between text-2xl font-bold">
                  <span>Total</span>
                  <span className="text-primary">${orderTotal.toFixed(2)}</span>
                </div>

                <p className="text-xs text-muted-foreground text-center">
                  By completing this purchase, you agree to our terms and conditions
                </p>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
