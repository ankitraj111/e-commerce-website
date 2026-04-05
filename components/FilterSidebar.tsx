'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FilterCategory {
  name: string
  options: { label: string; value: string; count?: number }[]
}

interface FilterSidebarProps {
  filters: FilterCategory[]
  onFilterChange: (filterName: string, value: string, checked: boolean) => void
}

export function FilterSidebar({ filters, onFilterChange }: FilterSidebarProps) {
  const [expandedFilters, setExpandedFilters] = useState<Set<string>>(
    new Set(filters.map((f) => f.name))
  )

  const toggleFilter = (filterName: string) => {
    const newExpanded = new Set(expandedFilters)
    if (newExpanded.has(filterName)) {
      newExpanded.delete(filterName)
    } else {
      newExpanded.add(filterName)
    }
    setExpandedFilters(newExpanded)
  }

  return (
    <div className="bg-white rounded-lg p-4 h-fit sticky top-20">
      <h2 className="text-lg font-bold text-foreground mb-4">Filters</h2>

      <div className="space-y-4">
        {filters.map((filter) => (
          <div key={filter.name} className="border-b border-border pb-4 last:border-b-0">
            <button
              onClick={() => toggleFilter(filter.name)}
              className="w-full flex items-center justify-between py-2 hover:text-primary transition"
            >
              <h3 className="font-semibold text-foreground text-sm">{filter.name}</h3>
              <ChevronDown
                size={18}
                className={`transition-transform ${
                  expandedFilters.has(filter.name) ? 'rotate-180' : ''
                }`}
              />
            </button>

            {expandedFilters.has(filter.name) && (
              <div className="space-y-2 mt-3">
                {filter.options.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center gap-3 cursor-pointer hover:text-primary transition"
                  >
                    <input
                      type="checkbox"
                      onChange={(e) =>
                        onFilterChange(filter.name, option.value, e.target.checked)
                      }
                      className="w-4 h-4 rounded border-border"
                    />
                    <span className="text-sm text-foreground flex-1">{option.label}</span>
                    {option.count !== undefined && (
                      <span className="text-xs text-muted-foreground">({option.count})</span>
                    )}
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <button className="w-full mt-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition font-semibold text-sm">
        Clear All Filters
      </button>
    </div>
  )
}
