import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function CustomerServicePage() {
  return (
    <div className="min-h-screen bg-[#eaeded]">
      <Header />
      <main className="max-w-[1500px] mx-auto px-4 py-8">
        <div className="bg-white p-8 rounded">
          <h1 className="text-3xl font-bold mb-6">Customer Service</h1>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-bold mb-4">Contact Us</h2>
              <p className="mb-2">📧 Email: support@shophub.in</p>
              <p className="mb-2">📞 Phone: 1800-SHOP-HUB</p>
              <p className="mb-2">⏰ Hours: 24/7</p>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-4">Quick Links</h2>
              <ul className="space-y-2">
                <li><a href="#" className="text-[#007185] hover:text-[#c45500] hover:underline">Track Your Order</a></li>
                <li><a href="#" className="text-[#007185] hover:text-[#c45500] hover:underline">Returns & Refunds</a></li>
                <li><a href="#" className="text-[#007185] hover:text-[#c45500] hover:underline">Shipping Info</a></li>
                <li><a href="#" className="text-[#007185] hover:text-[#c45500] hover:underline">FAQ</a></li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
