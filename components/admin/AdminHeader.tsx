'use client'

import { Button } from '@/components/ui/button'
import { LogOut, Bell, Settings } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function AdminHeader() {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    router.push('/')
  }

  return (
    <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
      <div className="text-foreground">
        <p className="text-sm text-muted-foreground">Admin Dashboard</p>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Bell className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="w-5 h-5" />
        </Button>
        <Button variant="ghost" onClick={handleLogout} className="text-destructive hover:text-destructive/90">
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </header>
  )
}
