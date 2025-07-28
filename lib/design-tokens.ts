// Design System Tokens for AI Scheduler
export const designTokens = {
  // Main Colors
  MAIN: "#585AE0",
  MAIN_DARKEN: "#4648B8",
  SUCCESS: "#24C56E",
  SUCCESS_DARKEN: "#1DA15A",

  // Text Colors
  TEXT_BLACK: "#2D2D2D",
  TEXT_WHITE: "#FFFFFF",
  TEXT_GREY: "#64748B",
  TEXT_LINK: "#585AE0",

  // Background Colors
  BACKGROUND: "#EEEEFF",
  BACKGROUND_WHITE: "#FFFFFF",
  COLUMN_BACKGROUND: "#F8F8FF",

  // State Colors
  DANGER: "#E01E5A",
  DANGER_BACKGROUND: "#FDE8E8",
  WARNING: "#FF9500",
  WARNING_BACKGROUND: "#FFF3E0",
  SUCCESS_BACKGROUND: "#E6F6EC",

  // Calendar Colors (adjusted for better visibility)
  CALENDAR_NOT_STARTED: "#24C56E", // Green - safe state
  CALENDAR_IN_PROGRESS: "#4A90E2", // Soft blue - active state
  CALENDAR_COMPLETED: "#8B9DC3", // Soft gray-blue - inactive state
  CALENDAR_DELAYED: "#E85D75", // Soft red - danger state
  CALENDAR_AT_RISK: "#F4A261", // Soft orange - warning state

  // Font Sizes
  FONT_SIZE_XXL: "32px",
  FONT_SIZE_XL: "24px",
  FONT_SIZE_L: "20px",
  FONT_SIZE_M: "16px",
  FONT_SIZE_BASE: "14px",
  FONT_SIZE_S: "12px",
  FONT_SIZE_XS: "11px",

  // Line Heights
  LINE_HEIGHT_TIGHT: 1.25,
  LINE_HEIGHT_NORMAL: 1.5,
  LINE_HEIGHT_NONE: 1.0,

  // Font Weights
  FONT_WEIGHT_BOLD: 700,
  FONT_WEIGHT_NORMAL: 400,
} as const
