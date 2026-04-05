'use client'

import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const orders = [
  { id: 'ORD-001', customer: 'John Doe', amount: '$299.99', status: 'completed' },
  { id: 'ORD-002', customer: 'Jane Smith', amount: '$159.99', status: 'pending' },
  { id: 'ORD-003', customer: 'Mike Johnson', amount: '$599.99', status: 'processing' },
  { id: 'ORD-004', customer: 'Sarah Williams', amount: '$249.99', status: 'completed' },
]

const statusColors: Record<string, string> = {
  completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  processing: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
}

export default function RecentOrders() {
  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Recent Orders</h2>
        <Link href="/admin/orders">
          <Button variant="outline" size="sm">
            View All
          </Button>
        </Link>
      </div>

      <div className="space-y-3">
        {orders.map(order => (
          <div key={order.id} className="flex items-center justify-between p-3 bg-muted rounded-lg text-sm">
            <div>
              <p className="font-medium">{order.id}</p>
              <p className="text-muted-foreground text-xs">{order.customer}</p>
            </div>
            <div className="flex items-center gap-3">
              <p className="font-semibold">{order.amount}</p>
              <Badge className={statusColors[order.status]}>
                {order.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
