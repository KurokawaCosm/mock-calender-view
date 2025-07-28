"use client"

import type React from "react"

import { useState } from "react"
import { Search, X } from "lucide-react"
import { designTokens } from "@/lib/design-tokens"

interface TaskSearchProps {
  onSearch: (query: string) => void
  placeholder?: string
}

export function TaskSearch({ onSearch, placeholder = "組立LOTNOで検索..." }: TaskSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = () => {
    onSearch(searchQuery)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const handleClear = () => {
    setSearchQuery("")
    onSearch("")
  }

  return (
    <div className="relative mb-4">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className="w-full pl-8 pr-8 py-2 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-opacity-50"
          style={{
            borderColor: "#E0E0E0",
            backgroundColor: designTokens.BACKGROUND_WHITE,
            color: designTokens.TEXT_BLACK,
            focusRingColor: designTokens.MAIN,
          }}
        />

        {/* 検索アイコン */}
        <Search
          className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 cursor-pointer"
          style={{ color: designTokens.TEXT_GREY }}
          onClick={handleSearch}
        />

        {/* クリアアイコン */}
        {searchQuery && (
          <X
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 cursor-pointer hover:opacity-70"
            style={{ color: designTokens.TEXT_GREY }}
            onClick={handleClear}
          />
        )}
      </div>
    </div>
  )
}
