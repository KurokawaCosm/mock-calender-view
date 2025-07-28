"use client"

import { Button } from "@/components/ui/button"
import type { Alert } from "@/lib/types"
import { designTokens } from "@/lib/design-tokens"

interface AlertBarProps {
  alerts: Alert[]
  onPlanningClick: () => void
}

export function AlertBar({ alerts, onPlanningClick }: AlertBarProps) {
  const getAlertColor = (type: Alert["type"]) => {
    switch (type) {
      case "delay":
        return designTokens.DANGER
      case "late_start":
        return designTokens.WARNING
      case "resource_conflict":
        return "#FFD700" // Yellow
      default:
        return designTokens.TEXT_GREY
    }
  }

  const getAlertLabel = (type: Alert["type"]) => {
    switch (type) {
      case "delay":
        return "納期遅延"
      case "late_start":
        return "着手遅れ"
      case "resource_conflict":
        return "リソース競合"
      default:
        return ""
    }
  }

  return (
    <div
      className="h-20 px-6 flex items-center justify-between border-b"
      style={{ backgroundColor: designTokens.BACKGROUND }}
    >
      <div className="flex items-center gap-4">
        {alerts.map((alert) => (
          <button
            key={alert.id}
            className="px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:opacity-80 transition-opacity"
            style={{
              backgroundColor: getAlertColor(alert.type),
              color: designTokens.TEXT_WHITE,
            }}
          >
            {getAlertLabel(alert.type)} {alert.count}件
          </button>
        ))}
      </div>

      <Button
        onClick={onPlanningClick}
        className="px-6"
        style={{
          backgroundColor: designTokens.MAIN,
          color: designTokens.TEXT_WHITE,
        }}
      >
        計画立案
      </Button>
    </div>
  )
}
