export interface Task {
  id: string
  lotNo: string
  processBlock: string
  processName: string
  productCode: string
  quantity: number
  workHours: number
  dueDate: string
  operator?: string
  equipment?: string
  startTime: string
  endTime: string
  status: "not_started" | "in_progress" | "completed" | "delayed" | "at_risk"
  isManuallyAdjusted: boolean
}

export interface ProcessFilter {
  id: string
  name: string
  checked: boolean
}

export interface EquipmentFilter {
  id: string
  name: string
  checked: boolean
}

export interface OperatorFilter {
  id: string
  name: string
  checked: boolean
}

export interface Alert {
  id: string
  type: "delay" | "late_start" | "resource_conflict"
  count: number
  tasks: Task[]
}
