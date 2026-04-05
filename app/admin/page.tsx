'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminHeader from '@/components/admin/AdminHeader'
import AdminSidebar from '@/components/admin/AdminSidebar'
import DashboardStats from '@/components/admin/DashboardStats'
import RecentOrders from '@/components/admin/RecentOrders'
import SalesChart from '@/components/admin/SalesChart'

export default function AdminDashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    const user = localStorage.getItem('user')

    if (!token) {
      router.push('/login')
      return
    }

    // TODO: Validate admin role from backend
    // For now, assume admin role
    setIsAdmin(true)
    setIsAuthenticated(true)
  }, [router])

  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <AdminHeader />
          <main className="flex-1 px-6 py-8 overflow-auto">
            <div className="max-w-7xl mx-auto space-y-8">
              {/* Header */}
              <div>
                <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
                <p className="text-muted-foreground">Welcome back to your admin dashboard</p>
              </div>

              {/* Stats */}
              <DashboardStats />

              {/* Charts and Recent Orders */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <SalesChart />
                </div>
                <div>
                  <RecentOrders />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
