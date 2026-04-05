'use client'

import { Card } from '@/components/ui/card'

export default function SalesChart() {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <h2 className="text-lg font-bold">Monthly Sales</h2>
        <div className="h-64 flex items-end justify-between gap-2 p-4 bg-muted/30 rounded-lg">
          {[65, 59, 80, 81, 56, 55, 40, 88, 76, 67, 82, 75].map((value, i) => (
            <div
              key={i}
              className="flex-1 bg-primary rounded-t-md transition-all hover:opacity-80"
              style={{ height: `${(value / 100) * 100}%` }}
              title={`${value}k`}
            />
          ))}
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Jan</span>
          <span>Dec</span>
        </div>
      </div>
    </Card>
  )
}
