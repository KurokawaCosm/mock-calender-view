"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Settings, Bell, User } from "lucide-react"
import Image from "next/image"
import { designTokens } from "@/lib/design-tokens"

interface HeaderProps {
  currentDate: string
  viewMode: "day" | "week"
  onPrevPeriod: () => void
  onNextPeriod: () => void
  onToday: () => void
  onViewModeChange: (mode: "day" | "week") => void
}

export function Header({ currentDate, viewMode, onPrevPeriod, onNextPeriod, onToday, onViewModeChange }: HeaderProps) {
  return (
    <header
      className="h-16 px-6 flex items-center justify-between border-b"
      style={{
        backgroundColor: designTokens.BACKGROUND_WHITE,
        color: designTokens.TEXT_BLACK,
      }}
    >
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <Image src="/logo.svg" alt="AI Scheduler" width={192} height={192} />
      </div>

      {/* Center Section */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={onPrevPeriod} className="p-2">
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <Button variant="outline" size="sm" onClick={onToday} className="px-3 bg-transparent">
          今日
        </Button>

        <span className="mx-4 font-medium min-w-[200px] text-center" style={{ fontSize: designTokens.FONT_SIZE_BASE }}>
          {currentDate}
        </span>

        <Button variant="ghost" size="sm" onClick={onNextPeriod} className="p-2">
          <ChevronRight className="h-4 w-4" />
        </Button>

        <div className="flex ml-4 border rounded-md">
          <Button
            variant={viewMode === "day" ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewModeChange("day")}
            className="rounded-r-none"
            style={{
              backgroundColor: viewMode === "day" ? designTokens.MAIN : "transparent",
              color: viewMode === "day" ? designTokens.TEXT_WHITE : designTokens.TEXT_BLACK,
            }}
          >
            日
          </Button>
          <Button
            variant={viewMode === "week" ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewModeChange("week")}
            className="rounded-l-none"
            style={{
              backgroundColor: viewMode === "week" ? designTokens.MAIN : "transparent",
              color: viewMode === "week" ? designTokens.TEXT_WHITE : designTokens.TEXT_BLACK,
            }}
          >
            週
          </Button>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm">
          計画
        </Button>
        <Button variant="ghost" size="sm">
          データ管理
        </Button>
        <Button variant="ghost" size="sm" className="p-2">
          <Settings className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="p-2 relative">
          <Bell className="h-4 w-4" />
          <span
            className="absolute -top-1 -right-1 h-4 w-4 rounded-full text-xs flex items-center justify-center"
            style={{
              backgroundColor: designTokens.DANGER,
              color: designTokens.TEXT_WHITE,
              fontSize: "10px",
            }}
          >
            3
          </span>
        </Button>
        <Button variant="ghost" size="sm" className="p-2">
          <User className="h-4 w-4" />
        </Button>
      </div>
    </header>
  )
}
