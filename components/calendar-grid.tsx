"use client"

import type React from "react"

import type { Task, ProcessFilter } from "@/lib/types"
import { TaskCard } from "./task-card"
import { designTokens } from "@/lib/design-tokens"
import { useState, useEffect } from "react"

interface CalendarGridProps {
  tasks: Task[]
  processFilters: ProcessFilter[]
  onTaskSelect: (task: Task) => void
  onTaskMove: (taskId: string, newTime: string, newProcess: string) => void
}

export function CalendarGrid({ tasks, processFilters, onTaskSelect, onTaskMove }: CalendarGridProps) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [draggedTask, setDraggedTask] = useState<Task | null>(null)

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  // Generate time slots (8:00 - 19:00, 30-minute intervals)
  const timeSlots = []
  for (let hour = 8; hour < 19; hour++) {
    timeSlots.push(`${hour.toString().padStart(2, "0")}:00`)
    timeSlots.push(`${hour.toString().padStart(2, "0")}:30`)
  }
  timeSlots.push("19:00")

  const activeProcesses = processFilters.filter((p) => p.checked)

  const getCurrentTimePosition = () => {
    // Fixed to 11:00 for demo
    const targetHour = 11
    const targetMinute = 0

    if (targetHour < 8 || targetHour >= 19) return null

    const totalMinutes = (targetHour - 8) * 60 + targetMinute
    const position = (totalMinutes / 30) * 40 // 40px per 30-minute slot
    return position
  }

  const handleDragStart = (task: Task) => (e: React.DragEvent) => {
    setDraggedTask(task)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDrop = (timeSlot: string, processName: string) => (e: React.DragEvent) => {
    e.preventDefault()
    if (draggedTask) {
      onTaskMove(draggedTask.id, timeSlot, processName)
      setDraggedTask(null)
    }
  }

  const getTasksForSlot = (timeSlot: string, processName: string) => {
    return tasks.filter((task) => {
      const taskStartTime = task.startTime.substring(0, 5) // HH:MM format
      return taskStartTime === timeSlot && task.processName === processName
    })
  }

  const currentTimePosition = getCurrentTimePosition()

  return (
    <div className="flex-1 overflow-auto">
      <div className="relative">
        {/* Header */}
        <div className="sticky top-0 z-30 flex border-b" style={{ backgroundColor: designTokens.BACKGROUND_WHITE }}>
          <div
            className="border-r flex items-center justify-center text-xs sticky left-0 z-40"
            style={{
              width: "64px",
              minWidth: "64px",
              maxWidth: "64px",
              padding: "0.25rem",
              backgroundColor: designTokens.COLUMN_BACKGROUND,
              color: designTokens.TEXT_GREY,
              boxSizing: "border-box",
            }}
          >
            時間
          </div>
          {activeProcesses.map((process) => (
            <div
              key={process.id}
              className="flex-1 min-w-[200px] p-2 border-r text-center font-medium sticky top-0 z-40"
              style={{
                backgroundColor: designTokens.COLUMN_BACKGROUND,
                fontSize: designTokens.FONT_SIZE_S,
              }}
            >
              {process.name}
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className="relative">
          {timeSlots.map((timeSlot, index) => (
            <div key={timeSlot} className="flex border-b h-10">
              {/* Time Column */}
              <div
                className="border-r flex items-center justify-center text-xs sticky left-0 z-30"
                style={{
                  width: "64px",
                  minWidth: "64px",
                  maxWidth: "64px",
                  padding: "0.25rem",
                  backgroundColor: designTokens.BACKGROUND_WHITE,
                  color: designTokens.TEXT_GREY,
                  boxSizing: "border-box",
                }}
              >
                {timeSlot}
              </div>

              {/* Process Columns */}
              {activeProcesses.map((process) => (
                <div
                  key={`${timeSlot}-${process.id}`}
                  className="flex-1 min-w-[200px] p-1 border-r relative"
                  style={{
                    backgroundColor: index % 2 === 0 ? designTokens.BACKGROUND_WHITE : designTokens.COLUMN_BACKGROUND,
                  }}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop(timeSlot, process.name)}
                >
                  {getTasksForSlot(timeSlot, process.name).map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onClick={() => onTaskSelect(task)}
                      onDragStart={handleDragStart(task)}
                    />
                  ))}
                </div>
              ))}
            </div>
          ))}

          {/* Current Time Line - Fixed at 11:00 */}
          {currentTimePosition !== null && (
            <div
              className="absolute left-0 right-0 z-40 pointer-events-none"
              style={{
                top: `${currentTimePosition + 40}px`, // +40 for header height
                height: "3px",
                backgroundColor: designTokens.DANGER,
                boxShadow: "0 0 4px rgba(224, 30, 90, 0.5)",
              }}
            >
              {/* Time indicator dot */}
              <div
                className="absolute right-2 -top-1"
                style={{
                  width: "8px",
                  height: "8px",
                  backgroundColor: designTokens.DANGER,
                  borderRadius: "50%",
                  border: "2px solid white",
                }}
              />
              {/* Time label */}
              <div
                className="absolute right-12 -top-2 text-xs font-medium px-1 rounded"
                style={{
                  backgroundColor: designTokens.DANGER,
                  color: designTokens.TEXT_WHITE,
                  fontSize: "10px",
                }}
              >
                11:00
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
