import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function SellPage() {
  return (
    <div className="min-h-screen bg-[#eaeded]">
      <Header />
      <main className="max-w-[1500px] mx-auto px-4 py-8">
        <div className="bg-white p-8 rounded">
          <h1 className="text-3xl font-bold mb-6">Sell on ShopHub</h1>
          <p className="text-lg mb-6">Start your business and reach millions of customers</p>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="text-5xl mb-4">📦</div>
              <h3 className="font-bold mb-2">List Products</h3>
              <p className="text-sm text-gray-600">Easy product listing</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="font-bold mb-2">Earn Money</h3>
              <p className="text-sm text-gray-600">Competitive pricing</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="font-bold mb-2">Grow Business</h3>
              <p className="text-sm text-gray-600">Reach more customers</p>
            </div>
          </div>
          <button className="bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 px-8 py-3 rounded font-medium">
            Start Selling
          </button>
        </div>
      </main>
      <Footer />
    </div>
  )
}
