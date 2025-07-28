"use client"

import type React from "react"
import type { Task } from "@/lib/types"
import { designTokens } from "@/lib/design-tokens"

interface TaskDetailCardProps {
  task: Task
  isSelected: boolean
  onClick: () => void
  onDragStart: (e: React.DragEvent) => void
}

export function TaskDetailCard({ task, isSelected, onClick, onDragStart }: TaskDetailCardProps) {
  const getProcessBlockDisplayName = (processBlock: string) => {
    switch (processBlock) {
      case "L半自動工程":
        return "L半自動"
      case "C半自動工程":
        return "C半自動"
      case "小ロット工程":
        return "小ロット"
      case "C全自動工程":
        return "C全自動"
      case "L全自動工程":
        return "L全自動"
      case "包装工程":
        return "包装"
      default:
        return processBlock
    }
  }

  const isPlanned = task.startTime && task.startTime !== "--:--"

  return (
    <div
      className="mb-2 rounded border cursor-pointer transition-all duration-200 hover:shadow-md"
      style={{
        backgroundColor: designTokens.BACKGROUND_WHITE,
        borderColor: isSelected ? designTokens.MAIN : "#E0E0E0",
        borderWidth: isSelected ? "2px" : "1px",
        boxShadow: isSelected ? "0 2px 8px rgba(88, 90, 224, 0.15)" : "0 1px 3px rgba(0, 0, 0, 0.1)",
      }}
      onClick={onClick}
      draggable
      onDragStart={onDragStart}
    >
      {/* カードヘッダー */}
      <div
        className="px-3 py-2 text-xs font-medium border-b"
        style={{
          backgroundColor: designTokens.COLUMN_BACKGROUND,
          color: designTokens.TEXT_BLACK,
          borderBottomColor: "#E0E0E0",
        }}
      >
        {getProcessBlockDisplayName(task.processBlock)}
      </div>

      {/* カード内容 */}
      <div className="p-3 space-y-1">
        {/* 組立LOTNO（太字） */}
        <div
          className="font-bold"
          style={{
            fontSize: designTokens.FONT_SIZE_BASE,
            color: designTokens.TEXT_BLACK,
          }}
        >
          組立LOTNO: {task.lotNo}
        </div>

        {/* その他の詳細情報 */}
        <div className="space-y-1 text-xs" style={{ color: designTokens.TEXT_BLACK }}>
          <div>工程: {task.processName}</div>
          <div>品目: {task.productCode}</div>
          <div>数量: {task.quantity}個</div>
          <div>工数: {task.workHours}h</div>
          <div>開始: {isPlanned ? task.startTime : "--:--"}</div>
          <div>終了: {isPlanned ? task.endTime : "--:--"}</div>
          <div>工程納期: {isPlanned ? task.dueDate : "--/--"}</div>
          <div>最終納期: {task.dueDate}</div>
          <div>担当: {isPlanned && task.operator ? task.operator : "----"}</div>
          <div>設備: {isPlanned && task.equipment ? task.equipment : "----"}</div>
        </div>
      </div>
    </div>
  )
}
