import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function GiftCardsPage() {
  return (
    <div className="min-h-screen bg-[#eaeded]">
      <Header />
      <main className="max-w-[1500px] mx-auto px-4 py-8">
        <div className="bg-white p-8 rounded">
          <h1 className="text-3xl font-bold mb-6">Gift Cards</h1>
          <p className="text-lg mb-6">Give the perfect gift with ShopHub Gift Cards</p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border p-6 rounded text-center">
              <div className="text-4xl mb-4">🎁</div>
              <h3 className="font-bold mb-2">₹500</h3>
              <button className="bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 px-4 py-2 rounded text-sm">Buy Now</button>
            </div>
            <div className="border p-6 rounded text-center">
              <div className="text-4xl mb-4">🎁</div>
              <h3 className="font-bold mb-2">₹1000</h3>
              <button className="bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 px-4 py-2 rounded text-sm">Buy Now</button>
            </div>
            <div className="border p-6 rounded text-center">
              <div className="text-4xl mb-4">🎁</div>
              <h3 className="font-bold mb-2">₹5000</h3>
              <button className="bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 px-4 py-2 rounded text-sm">Buy Now</button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
