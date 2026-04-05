'use client'

import { Card } from '@/components/ui/card'
import { ShoppingCart, DollarSign, Users, TrendingUp } from 'lucide-react'

const stats = [
  {
    label: 'Total Orders',
    value: '2,456',
    change: '+12.5%',
    icon: ShoppingCart,
    color: 'text-blue-500',
  },
  {
    label: 'Revenue',
    value: '$24,580',
    change: '+8.2%',
    icon: DollarSign,
    color: 'text-green-500',
  },
  {
    label: 'Active Users',
    value: '1,234',
    change: '+5.3%',
    icon: Users,
    color: 'text-purple-500',
  },
  {
    label: 'Growth',
    value: '23%',
    change: '+2.1%',
    icon: TrendingUp,
    color: 'text-orange-500',
  },
]

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index} className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-muted-foreground">{stat.label}</h3>
              <Icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div>
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="text-sm text-green-600 mt-1">{stat.change} from last month</p>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
