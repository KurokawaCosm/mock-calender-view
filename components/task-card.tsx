"use client"

import type React from "react"

import type { Task } from "@/lib/types"
import { designTokens } from "@/lib/design-tokens"
import { Edit3 } from "lucide-react"

interface TaskCardProps {
  task: Task
  onClick: () => void
  onDragStart: (e: React.DragEvent) => void
}

export function TaskCard({ task, onClick, onDragStart }: TaskCardProps) {
  const getStatusColor = (status: Task["status"]) => {
    switch (status) {
      case "not_started":
        return designTokens.CALENDAR_NOT_STARTED
      case "in_progress":
        return designTokens.CALENDAR_IN_PROGRESS
      case "completed":
        return designTokens.CALENDAR_COMPLETED
      case "delayed":
        return designTokens.CALENDAR_DELAYED
      case "at_risk":
        return designTokens.CALENDAR_AT_RISK
      default:
        return designTokens.TEXT_GREY
    }
  }

  const getStatusLabel = (status: Task["status"]) => {
    switch (status) {
      case "not_started":
        return "未着手"
      case "in_progress":
        return "進行中"
      case "completed":
        return "完了"
      case "delayed":
        return "遅延"
      case "at_risk":
        return "着手遅れ"
      default:
        return ""
    }
  }

  return (
    <div
      className="p-2 rounded border cursor-pointer hover:shadow-md transition-shadow relative"
      style={{
        backgroundColor: designTokens.BACKGROUND_WHITE,
        borderColor: getStatusColor(task.status),
        borderWidth: "2px",
        zIndex: 50, // Add this line to bring the task card to the front
      }}
      onClick={onClick}
      draggable
      onDragStart={onDragStart}
    >
      {/* Status Badge */}
      <div
        className="absolute top-1 right-1 px-1 py-0.5 rounded text-xs font-medium"
        style={{
          backgroundColor: getStatusColor(task.status),
          color: designTokens.TEXT_WHITE,
          fontSize: "10px",
        }}
      >
        {getStatusLabel(task.status)}
      </div>

      {/* Manual Adjustment Flag */}
      {task.isManuallyAdjusted && (
        <div className="absolute bottom-1 right-1">
          <Edit3 className="h-3 w-3" style={{ color: designTokens.TEXT_GREY }} />
        </div>
      )}

      <div className="space-y-1">
        <div
          className="font-bold truncate pr-12"
          style={{
            fontSize: designTokens.FONT_SIZE_S,
            color: designTokens.TEXT_BLACK,
          }}
        >
          {task.lotNo}
        </div>

        <div className="text-xs" style={{ color: designTokens.TEXT_GREY }}>
          {task.processName}
        </div>

        <div className="text-xs" style={{ color: designTokens.TEXT_GREY }}>
          納期: {task.dueDate}
        </div>

        {task.operator && (
          <div className="text-xs" style={{ color: designTokens.TEXT_GREY }}>
            {task.operator}
          </div>
        )}

        {task.equipment && (
          <div className="text-xs" style={{ color: designTokens.TEXT_GREY }}>
            {task.equipment}
          </div>
        )}
      </div>
    </div>
  )
}
