import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function RegistryPage() {
  return (
    <div className="min-h-screen bg-[#eaeded]">
      <Header />
      <main className="max-w-[1500px] mx-auto px-4 py-8">
        <div className="bg-white p-8 rounded">
          <h1 className="text-3xl font-bold mb-6">Gift Registry</h1>
          <p className="text-lg mb-4">Create and manage your gift registry for special occasions.</p>
          <button className="bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 px-6 py-3 rounded font-medium">
            Create Registry
          </button>
        </div>
      </main>
      <Footer />
    </div>
  )
}
