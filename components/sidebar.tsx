"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronDown, ChevronUp } from "lucide-react"
import { TaskSearch } from "./task-search"
import { TaskDetailCard } from "./task-detail-card"
import type { ProcessFilter, EquipmentFilter, OperatorFilter, Task } from "@/lib/types"
import { designTokens } from "@/lib/design-tokens"

interface SidebarProps {
  processBlockValue: string
  onProcessBlockChange: (value: string) => void
  processFilters: ProcessFilter[]
  onProcessFilterChange: (id: string, checked: boolean) => void
  equipmentFilters: EquipmentFilter[]
  onEquipmentFilterChange: (id: string, checked: boolean) => void
  operatorFilters: OperatorFilter[]
  onOperatorFilterChange: (id: string, checked: boolean) => void
  onClearFilters: () => void
  selectedTask: Task | null
  allTasks: Task[]
  onTaskSelect: (task: Task) => void
  onTaskDragStart: (task: Task) => void
}

export function Sidebar({
  processBlockValue,
  onProcessBlockChange,
  processFilters,
  onProcessFilterChange,
  equipmentFilters,
  onEquipmentFilterChange,
  operatorFilters,
  onOperatorFilterChange,
  onClearFilters,
  selectedTask,
  allTasks,
  onTaskSelect,
  onTaskDragStart,
}: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [processExpanded, setProcessExpanded] = useState(false)
  const [operatorExpanded, setOperatorExpanded] = useState(false)
  const [equipmentExpanded, setEquipmentExpanded] = useState(false)

  // 検索機能
  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  // 検索結果のフィルタリング
  const filteredTasks = allTasks.filter((task) => {
    if (searchQuery) {
      return task.lotNo.toLowerCase().includes(searchQuery.toLowerCase())
    }
    return true
  })

  // 工程ブロック別にグループ化
  const groupedTasks = filteredTasks.reduce(
    (groups, task) => {
      const blockName = task.processBlock
      if (!groups[blockName]) {
        groups[blockName] = []
      }
      groups[blockName].push(task)
      return groups
    },
    {} as Record<string, Task[]>,
  )

  const handleTaskDragStart = (task: Task) => (e: React.DragEvent) => {
    onTaskDragStart(task)
    e.dataTransfer.effectAllowed = "move"
    e.dataTransfer.setData("text/plain", task.id)
  }

  // フィルターリストを表示用に分割する関数
  const getDisplayItems = <T extends { id: string; name: string; checked: boolean }>(items: T[], expanded: boolean) => {
    if (expanded || items.length <= 3) {
      return items
    }
    return items.slice(0, 3)
  }

  return (
    <div className="w-80 border-r flex flex-col" style={{ backgroundColor: designTokens.BACKGROUND_WHITE }}>
      <div className="p-4 space-y-6 flex-1 overflow-y-auto">
        {/* Process Block Filter */}
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: designTokens.TEXT_BLACK }}>
            工程ブロック
          </label>
          <Select value={processBlockValue} onValueChange={onProcessBlockChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="l-semi-auto">L半自動</SelectItem>
              <SelectItem value="c-semi-auto">C半自動</SelectItem>
              <SelectItem value="small-lot">小ロット</SelectItem>
              <SelectItem value="c-full-auto">C全自動</SelectItem>
              <SelectItem value="l-full-auto">L全自動</SelectItem>
              <SelectItem value="packaging">包装</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Process Filter */}
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: designTokens.TEXT_BLACK }}>
            工程
          </label>
          <div className="space-y-2">
            {getDisplayItems(processFilters, processExpanded).map((filter) => (
              <div key={filter.id} className="flex items-center space-x-2">
                <Checkbox
                  id={filter.id}
                  checked={filter.checked}
                  onCheckedChange={(checked) => onProcessFilterChange(filter.id, checked as boolean)}
                />
                <label
                  htmlFor={filter.id}
                  className="text-sm cursor-pointer"
                  style={{ color: designTokens.TEXT_BLACK }}
                >
                  {filter.name}
                </label>
              </div>
            ))}
            {processFilters.length > 3 && (
              <button
                onClick={() => setProcessExpanded(!processExpanded)}
                className="flex items-center space-x-1 text-sm hover:opacity-70 transition-opacity"
                style={{ color: designTokens.TEXT_LINK }}
              >
                {processExpanded ? (
                  <>
                    <ChevronUp className="h-3 w-3" />
                    <span>折りたたむ</span>
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-3 w-3" />
                    <span>さらに詳細を表示 ({processFilters.length - 3}件)</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Operator Filter */}
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: designTokens.TEXT_BLACK }}>
            担当者
          </label>
          <div className="space-y-2">
            {getDisplayItems(operatorFilters, operatorExpanded).map((filter) => (
              <div key={filter.id} className="flex items-center space-x-2">
                <Checkbox
                  id={filter.id}
                  checked={filter.checked}
                  onCheckedChange={(checked) => onOperatorFilterChange(filter.id, checked as boolean)}
                />
                <label
                  htmlFor={filter.id}
                  className="text-sm cursor-pointer"
                  style={{ color: designTokens.TEXT_BLACK }}
                >
                  {filter.name}
                </label>
              </div>
            ))}
            {operatorFilters.length > 3 && (
              <button
                onClick={() => setOperatorExpanded(!operatorExpanded)}
                className="flex items-center space-x-1 text-sm hover:opacity-70 transition-opacity"
                style={{ color: designTokens.TEXT_LINK }}
              >
                {operatorExpanded ? (
                  <>
                    <ChevronUp className="h-3 w-3" />
                    <span>折りたたむ</span>
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-3 w-3" />
                    <span>さらに詳細を表示 ({operatorFilters.length - 3}件)</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Equipment Filter */}
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: designTokens.TEXT_BLACK }}>
            設備
          </label>
          <div className="space-y-2">
            {getDisplayItems(equipmentFilters, equipmentExpanded).map((filter) => (
              <div key={filter.id} className="flex items-center space-x-2">
                <Checkbox
                  id={filter.id}
                  checked={filter.checked}
                  onCheckedChange={(checked) => onEquipmentFilterChange(filter.id, checked as boolean)}
                />
                <label
                  htmlFor={filter.id}
                  className="text-sm cursor-pointer"
                  style={{ color: designTokens.TEXT_BLACK }}
                >
                  {filter.name}
                </label>
              </div>
            ))}
            {equipmentFilters.length > 3 && (
              <button
                onClick={() => setEquipmentExpanded(!equipmentExpanded)}
                className="flex items-center space-x-1 text-sm hover:opacity-70 transition-opacity"
                style={{ color: designTokens.TEXT_LINK }}
              >
                {equipmentExpanded ? (
                  <>
                    <ChevronUp className="h-3 w-3" />
                    <span>折りたたむ</span>
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-3 w-3" />
                    <span>さらに詳細を表示 ({equipmentFilters.length - 3}件)</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        <Button variant="outline" onClick={onClearFilters} className="w-full bg-transparent">
          フィルタ解除
        </Button>
      </div>

      {/* Task Details Area */}
      <div className="border-t flex-1 flex flex-col" style={{ backgroundColor: designTokens.COLUMN_BACKGROUND }}>
        <div className="p-4">
          <h3
            className="font-medium mb-3"
            style={{
              fontSize: designTokens.FONT_SIZE_BASE,
              color: designTokens.TEXT_BLACK,
            }}
          >
            作業項目詳細
          </h3>

          {/* 検索機能 */}
          <TaskSearch onSearch={handleSearch} />

          {/* タスクカード一覧 */}
          <div className="max-h-96 overflow-y-auto">
            {Object.keys(groupedTasks).length > 0 ? (
              Object.entries(groupedTasks).map(([blockName, tasks]) => (
                <div key={blockName}>
                  {tasks.map((task) => (
                    <TaskDetailCard
                      key={task.id}
                      task={task}
                      isSelected={selectedTask?.id === task.id}
                      onClick={() => onTaskSelect(task)}
                      onDragStart={handleTaskDragStart(task)}
                    />
                  ))}
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-sm" style={{ color: designTokens.TEXT_GREY }}>
                  {searchQuery ? "検索結果が見つかりません" : "表示するタスクがありません"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
