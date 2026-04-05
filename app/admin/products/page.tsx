'use client'

import { useState } from 'react'
import AdminHeader from '@/components/admin/AdminHeader'
import AdminSidebar from '@/components/admin/AdminSidebar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Edit, Trash2, Plus, Search } from 'lucide-react'

interface Product {
  id: number
  name: string
  price: number
  category: string
  stock: number
  status: 'active' | 'inactive'
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: 'Premium Headphones', price: 199.99, category: 'Electronics', stock: 45, status: 'active' },
    { id: 2, name: 'Designer Watch', price: 599.99, category: 'Accessories', stock: 12, status: 'active' },
    { id: 3, name: 'Luxury Backpack', price: 249.99, category: 'Bags', stock: 8, status: 'inactive' },
  ])
  const [searchTerm, setSearchTerm] = useState('')

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <AdminHeader />
          <main className="flex-1 px-6 py-8 overflow-auto">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold mb-2">Products</h1>
                  <p className="text-muted-foreground">Manage your product inventory</p>
                </div>
                <Button className="bg-primary text-primary-foreground">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </div>

              {/* Search */}
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Table */}
              <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-muted border-b border-border">
                      <tr>
                        <th className="px-6 py-3 text-left font-semibold">Name</th>
                        <th className="px-6 py-3 text-left font-semibold">Category</th>
                        <th className="px-6 py-3 text-left font-semibold">Price</th>
                        <th className="px-6 py-3 text-left font-semibold">Stock</th>
                        <th className="px-6 py-3 text-left font-semibold">Status</th>
                        <th className="px-6 py-3 text-left font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map(product => (
                        <tr key={product.id} className="border-b border-border hover:bg-muted/30 transition">
                          <td className="px-6 py-4">{product.name}</td>
                          <td className="px-6 py-4">{product.category}</td>
                          <td className="px-6 py-4 font-semibold">${product.price.toFixed(2)}</td>
                          <td className="px-6 py-4">{product.stock} units</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              product.status === 'active'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                            }`}>
                              {product.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 flex gap-2">
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
