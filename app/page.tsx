"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { AlertBar } from "@/components/alert-bar"
import { Sidebar } from "@/components/sidebar"
import { CalendarGrid } from "@/components/calendar-grid"
import { TaskDetailModal } from "@/components/task-detail-modal"
import type { Task, ProcessFilter, EquipmentFilter, OperatorFilter, Alert } from "@/lib/types"
import { designTokens } from "@/lib/design-tokens"

export default function ProductionPlanningPage() {
  const [currentDate, setCurrentDate] = useState("2025/07/28 (月)")
  const [viewMode, setViewMode] = useState<"day" | "week">("day")
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [processBlockValue, setProcessBlockValue] = useState("l-semi-auto")
  const [draggedTask, setDraggedTask] = useState<Task | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalTask, setModalTask] = useState<Task | null>(null)

  // Sample data - Current time is 11:00
  const [tasks, setTasks] = useState<Task[]>([
    // L0401 Process Lane
    {
      id: "1",
      lotNo: "ABC12345",
      processBlock: "L半自動工程",
      processName: "L0401",
      productCode: "XYZ001",
      quantity: 100,
      workHours: 2.0,
      dueDate: "07/28",
      operator: "田中",
      equipment: "設備A",
      startTime: "08:00",
      endTime: "10:00",
      status: "completed",
      isManuallyAdjusted: false,
    },
    {
      id: "2",
      lotNo: "DEF67890",
      processBlock: "L半自動工程",
      processName: "L0401",
      productCode: "XYZ002",
      quantity: 120,
      workHours: 1.0,
      dueDate: "07/28",
      operator: "田中",
      equipment: "設備A",
      startTime: "10:15",
      endTime: "11:15",
      status: "in_progress",
      isManuallyAdjusted: false,
    },
    {
      id: "3",
      lotNo: "GHI11111",
      processBlock: "L半自動工程",
      processName: "L0401",
      productCode: "XYZ003",
      quantity: 85,
      workHours: 1.5,
      dueDate: "07/28",
      operator: "田中",
      equipment: "設備A",
      startTime: "11:30",
      endTime: "13:00",
      status: "not_started",
      isManuallyAdjusted: false,
    },
    {
      id: "4",
      lotNo: "JKL22222",
      processBlock: "L半自動工程",
      processName: "L0401",
      productCode: "XYZ004",
      quantity: 115,
      workHours: 2.5,
      dueDate: "07/28",
      operator: "田中",
      equipment: "設備A",
      startTime: "13:15",
      endTime: "15:45",
      status: "not_started",
      isManuallyAdjusted: false,
    },
    {
      id: "5",
      lotNo: "MNO33333",
      processBlock: "L半自動工程",
      processName: "L0401",
      productCode: "XYZ005",
      quantity: 98,
      workHours: 2.0,
      dueDate: "07/28",
      operator: "田中",
      equipment: "設備A",
      startTime: "16:00",
      endTime: "18:00",
      status: "not_started",
      isManuallyAdjusted: false,
    },
    {
      id: "6",
      lotNo: "PQR44444",
      processBlock: "L半自動工程",
      processName: "L0401",
      productCode: "XYZ006",
      quantity: 75,
      workHours: 1.0,
      dueDate: "07/28",
      operator: "田中",
      equipment: "設備A",
      startTime: "18:15",
      endTime: "19:15",
      status: "not_started",
      isManuallyAdjusted: false,
    },

    // L0601 Process Lane
    {
      id: "7",
      lotNo: "STU55555",
      processBlock: "L半自動工程",
      processName: "L0601",
      productCode: "XYZ007",
      quantity: 150,
      workHours: 2.5,
      dueDate: "07/28",
      operator: "佐藤",
      equipment: "設備B",
      startTime: "08:00",
      endTime: "10:30",
      status: "completed",
      isManuallyAdjusted: false,
    },
    {
      id: "8",
      lotNo: "VWX66666",
      processBlock: "L半自動工程",
      processName: "L0601",
      productCode: "XYZ008",
      quantity: 90,
      workHours: 1.0,
      dueDate: "07/28",
      operator: "佐藤",
      equipment: "設備B",
      startTime: "10:45",
      endTime: "11:45",
      status: "in_progress",
      isManuallyAdjusted: false,
    },
    {
      id: "9",
      lotNo: "YZA77777",
      processBlock: "L半自動工程",
      processName: "L0601",
      productCode: "XYZ009",
      quantity: 95,
      workHours: 2.0,
      dueDate: "07/28",
      operator: "佐藤",
      equipment: "設備B",
      startTime: "12:00",
      endTime: "14:00",
      status: "at_risk",
      isManuallyAdjusted: false,
    },
    {
      id: "10",
      lotNo: "BCD88888",
      processBlock: "L半自動工程",
      processName: "L0601",
      productCode: "XYZ010",
      quantity: 88,
      workHours: 1.5,
      dueDate: "07/28",
      operator: "佐藤",
      equipment: "設備B",
      startTime: "14:15",
      endTime: "15:45",
      status: "at_risk",
      isManuallyAdjusted: false,
    },
    {
      id: "11",
      lotNo: "EFG99999",
      processBlock: "L半自動工程",
      processName: "L0601",
      productCode: "XYZ011",
      quantity: 108,
      workHours: 2.0,
      dueDate: "07/28",
      operator: "佐藤",
      equipment: "設備B",
      startTime: "16:00",
      endTime: "18:00",
      status: "not_started",
      isManuallyAdjusted: false,
    },
    {
      id: "12",
      lotNo: "HIJ10101",
      processBlock: "L半自動工程",
      processName: "L0601",
      productCode: "XYZ012",
      quantity: 82,
      workHours: 1.0,
      dueDate: "07/28",
      operator: "佐藤",
      equipment: "設備B",
      startTime: "18:15",
      endTime: "19:15",
      status: "not_started",
      isManuallyAdjusted: false,
    },

    // L0602 Process Lane
    {
      id: "13",
      lotNo: "KLM11111",
      processBlock: "L半自動工程",
      processName: "L0602",
      productCode: "XYZ013",
      quantity: 200,
      workHours: 3.0,
      dueDate: "07/28",
      operator: "鈴木",
      equipment: "設備C",
      startTime: "08:00",
      endTime: "11:00",
      status: "completed",
      isManuallyAdjusted: false,
    },
    {
      id: "14",
      lotNo: "NOP12121",
      processBlock: "L半自動工程",
      processName: "L0602",
      productCode: "XYZ014",
      quantity: 130,
      workHours: 2.5,
      dueDate: "07/28",
      operator: "鈴木",
      equipment: "設備C",
      startTime: "11:15",
      endTime: "13:45",
      status: "not_started",
      isManuallyAdjusted: false,
    },
    {
      id: "15",
      lotNo: "QRS13131",
      processBlock: "L半自動工程",
      processName: "L0602",
      productCode: "XYZ015",
      quantity: 140,
      workHours: 3.5,
      dueDate: "07/28",
      operator: "鈴木",
      equipment: "設備C",
      startTime: "14:00",
      endTime: "17:30",
      status: "not_started",
      isManuallyAdjusted: false,
    },
    {
      id: "16",
      lotNo: "TUV14141",
      processBlock: "L半自動工程",
      processName: "L0602",
      productCode: "XYZ016",
      quantity: 110,
      workHours: 1.5,
      dueDate: "07/28",
      operator: "鈴木",
      equipment: "設備C",
      startTime: "17:45",
      endTime: "19:15",
      status: "not_started",
      isManuallyAdjusted: false,
    },

    // L0801 Process Lane
    {
      id: "17",
      lotNo: "WXY15151",
      processBlock: "L半自動工程",
      processName: "L0801",
      productCode: "XYZ017",
      quantity: 75,
      workHours: 1.5,
      dueDate: "07/28",
      operator: "山田",
      equipment: "設備D",
      startTime: "08:00",
      endTime: "09:30",
      status: "completed",
      isManuallyAdjusted: false,
    },
    {
      id: "18",
      lotNo: "ZAB16161",
      processBlock: "L半自動工程",
      processName: "L0801",
      productCode: "XYZ018",
      quantity: 70,
      workHours: 1.0,
      dueDate: "07/28",
      operator: "山田",
      equipment: "設備D",
      startTime: "09:45",
      endTime: "10:45",
      status: "completed",
      isManuallyAdjusted: false,
    },
    {
      id: "19",
      lotNo: "CDE17171",
      processBlock: "L半自動工程",
      processName: "L0801",
      productCode: "XYZ019",
      quantity: 65,
      workHours: 1.5,
      dueDate: "07/28",
      operator: "山田",
      equipment: "設備D",
      startTime: "11:00",
      endTime: "12:30",
      status: "in_progress",
      isManuallyAdjusted: false,
    },
    {
      id: "20",
      lotNo: "FGH18181",
      processBlock: "L半自動工程",
      processName: "L0801",
      productCode: "XYZ020",
      quantity: 135,
      workHours: 3.0,
      dueDate: "07/28",
      operator: "山田",
      equipment: "設備D",
      startTime: "12:45",
      endTime: "15:45",
      status: "not_started",
      isManuallyAdjusted: false,
    },
    {
      id: "21",
      lotNo: "IJK19191",
      processBlock: "L半自動工程",
      processName: "L0801",
      productCode: "XYZ021",
      quantity: 103,
      workHours: 2.0,
      dueDate: "07/28",
      operator: "山田",
      equipment: "設備D",
      startTime: "16:00",
      endTime: "18:00",
      status: "not_started",
      isManuallyAdjusted: false,
    },
    {
      id: "22",
      lotNo: "LMN20202",
      processBlock: "L半自動工程",
      processName: "L0801",
      productCode: "XYZ022",
      quantity: 89,
      workHours: 1.0,
      dueDate: "07/28",
      operator: "山田",
      equipment: "設備D",
      startTime: "18:15",
      endTime: "19:15",
      status: "not_started",
      isManuallyAdjusted: false,
    },

    // L0802 Process Lane
    {
      id: "23",
      lotNo: "OPQ21212",
      processBlock: "L半自動工程",
      processName: "L0802",
      productCode: "XYZ023",
      quantity: 80,
      workHours: 2.0,
      dueDate: "07/28",
      operator: "田中",
      equipment: "設備A",
      startTime: "08:00",
      endTime: "10:00",
      status: "completed",
      isManuallyAdjusted: false,
    },
    {
      id: "24",
      lotNo: "RST22222",
      processBlock: "L半自動工程",
      processName: "L0802",
      productCode: "XYZ024",
      quantity: 110,
      workHours: 1.0,
      dueDate: "07/28",
      operator: "田中",
      equipment: "設備A",
      startTime: "10:15",
      endTime: "11:15",
      status: "in_progress",
      isManuallyAdjusted: false,
    },
    {
      id: "25",
      lotNo: "UVW23232",
      processBlock: "L半自動工程",
      processName: "L0802",
      productCode: "XYZ025",
      quantity: 105,
      workHours: 2.0,
      dueDate: "07/28",
      operator: "田中",
      equipment: "設備A",
      startTime: "11:30",
      endTime: "13:30",
      status: "not_started",
      isManuallyAdjusted: false,
    },
    {
      id: "26",
      lotNo: "XYZ24242",
      processBlock: "L半自動工程",
      processName: "L0802",
      productCode: "XYZ026",
      quantity: 125,
      workHours: 2.5,
      dueDate: "07/28",
      operator: "田中",
      equipment: "設備A",
      startTime: "13:45",
      endTime: "16:15",
      status: "delayed",
      isManuallyAdjusted: false,
    },
    {
      id: "27",
      lotNo: "ABC25252",
      processBlock: "L半自動工程",
      processName: "L0802",
      productCode: "XYZ027",
      quantity: 82,
      workHours: 1.5,
      dueDate: "07/28",
      operator: "田中",
      equipment: "設備A",
      startTime: "16:30",
      endTime: "18:00",
      status: "delayed",
      isManuallyAdjusted: false,
    },
    {
      id: "28",
      lotNo: "DEF26262",
      processBlock: "L半自動工程",
      processName: "L0802",
      productCode: "XYZ028",
      quantity: 119,
      workHours: 1.0,
      dueDate: "07/28",
      operator: "田中",
      equipment: "設備A",
      startTime: "18:15",
      endTime: "19:15",
      status: "not_started",
      isManuallyAdjusted: false,
    },

    // Additional unplanned tasks for demonstration
    {
      id: "34",
      lotNo: "UNP11111",
      processBlock: "L半自動工程",
      processName: "L0401",
      productCode: "XYZ034",
      quantity: 150,
      workHours: 3.0,
      dueDate: "07/29",
      operator: "",
      equipment: "",
      startTime: "",
      endTime: "",
      status: "not_started",
      isManuallyAdjusted: false,
    },
    {
      id: "35",
      lotNo: "UNP22222",
      processBlock: "L半自動工程",
      processName: "L0601",
      productCode: "XYZ035",
      quantity: 200,
      workHours: 4.0,
      dueDate: "07/29",
      operator: "",
      equipment: "",
      startTime: "",
      endTime: "",
      status: "not_started",
      isManuallyAdjusted: false,
    },
    {
      id: "36",
      lotNo: "UNP33333",
      processBlock: "L半自動工程",
      processName: "L0602",
      productCode: "XYZ036",
      quantity: 120,
      workHours: 2.5,
      dueDate: "07/29",
      operator: "",
      equipment: "",
      startTime: "",
      endTime: "",
      status: "not_started",
      isManuallyAdjusted: false,
    },
    {
      id: "37",
      lotNo: "UNP44444",
      processBlock: "L半自動工程",
      processName: "L0401",
      productCode: "XYZ037",
      quantity: 180,
      workHours: 3.5,
      dueDate: "07/30",
      operator: "",
      equipment: "",
      startTime: "",
      endTime: "",
      status: "not_started",
      isManuallyAdjusted: false,
    },
    {
      id: "38",
      lotNo: "UNP55555",
      processBlock: "L半自動工程",
      processName: "L0601",
      productCode: "XYZ038",
      quantity: 95,
      workHours: 2.0,
      dueDate: "07/30",
      operator: "",
      equipment: "",
      startTime: "",
      endTime: "",
      status: "not_started",
      isManuallyAdjusted: false,
    },
    {
      id: "39",
      lotNo: "UNP66666",
      processBlock: "L半自動工程",
      processName: "L0602",
      productCode: "XYZ039",
      quantity: 220,
      workHours: 4.5,
      dueDate: "07/31",
      operator: "",
      equipment: "",
      startTime: "",
      endTime: "",
      status: "not_started",
      isManuallyAdjusted: false,
    },
    {
      id: "40",
      lotNo: "UNP77777",
      processBlock: "L半自動工程",
      processName: "L0801",
      productCode: "XYZ040",
      quantity: 160,
      workHours: 3.0,
      dueDate: "07/31",
      operator: "",
      equipment: "",
      startTime: "",
      endTime: "",
      status: "not_started",
      isManuallyAdjusted: false,
    },
    {
      id: "41",
      lotNo: "UNP88888",
      processBlock: "L半自動工程",
      processName: "L0802",
      productCode: "XYZ041",
      quantity: 140,
      workHours: 2.5,
      dueDate: "08/01",
      operator: "",
      equipment: "",
      startTime: "",
      endTime: "",
      status: "not_started",
      isManuallyAdjusted: false,
    },
    {
      id: "42",
      lotNo: "UNP99999",
      processBlock: "C半自動工程",
      processName: "C0201",
      productCode: "XYZ042",
      quantity: 75,
      workHours: 1.5,
      dueDate: "08/01",
      operator: "",
      equipment: "",
      startTime: "",
      endTime: "",
      status: "not_started",
      isManuallyAdjusted: false,
    },
    {
      id: "43",
      lotNo: "UNP10101",
      processBlock: "C半自動工程",
      processName: "C0301",
      productCode: "XYZ043",
      quantity: 110,
      workHours: 2.0,
      dueDate: "08/02",
      operator: "",
      equipment: "",
      startTime: "",
      endTime: "",
      status: "not_started",
      isManuallyAdjusted: false,
    },
    {
      id: "44",
      lotNo: "UNP11111",
      processBlock: "小ロット工程",
      processName: "S0101",
      productCode: "XYZ044",
      quantity: 25,
      workHours: 1.0,
      dueDate: "08/02",
      operator: "",
      equipment: "",
      startTime: "",
      endTime: "",
      status: "not_started",
      isManuallyAdjusted: false,
    },
    {
      id: "45",
      lotNo: "UNP12121",
      processBlock: "小ロット工程",
      processName: "S0201",
      productCode: "XYZ045",
      quantity: 30,
      workHours: 1.5,
      dueDate: "08/03",
      operator: "",
      equipment: "",
      startTime: "",
      endTime: "",
      status: "not_started",
      isManuallyAdjusted: false,
    },
    {
      id: "46",
      lotNo: "UNP13131",
      processBlock: "C全自動工程",
      processName: "CA0101",
      productCode: "XYZ046",
      quantity: 300,
      workHours: 5.0,
      dueDate: "08/03",
      operator: "",
      equipment: "",
      startTime: "",
      endTime: "",
      status: "not_started",
      isManuallyAdjusted: false,
    },
    {
      id: "47",
      lotNo: "UNP14141",
      processBlock: "L全自動工程",
      processName: "LA0101",
      productCode: "XYZ047",
      quantity: 250,
      workHours: 4.0,
      dueDate: "08/04",
      operator: "",
      equipment: "",
      startTime: "",
      endTime: "",
      status: "not_started",
      isManuallyAdjusted: false,
    },
    {
      id: "48",
      lotNo: "UNP15151",
      processBlock: "包装工程",
      processName: "P0101",
      productCode: "XYZ048",
      quantity: 500,
      workHours: 6.0,
      dueDate: "08/05",
      operator: "",
      equipment: "",
      startTime: "",
      endTime: "",
      status: "not_started",
      isManuallyAdjusted: false,
    },
  ])

  const [processFilters, setProcessFilters] = useState<ProcessFilter[]>([
    { id: "l0401", name: "L0401", checked: true },
    { id: "l0601", name: "L0601", checked: true },
    { id: "l0602", name: "L0602", checked: true },
    { id: "l0801", name: "L0801", checked: true },
    { id: "l0802", name: "L0802", checked: true },
    { id: "l0803", name: "L0803", checked: true },
    { id: "l0804", name: "L0804", checked: true },
  ])

  const [equipmentFilters, setEquipmentFilters] = useState<EquipmentFilter[]>([
    { id: "eq-a", name: "設備A", checked: true },
    { id: "eq-b", name: "設備B", checked: true },
    { id: "eq-c", name: "設備C", checked: true },
    { id: "eq-d", name: "設備D", checked: true },
    { id: "eq-e", name: "設備E", checked: true },
    { id: "eq-f", name: "設備F", checked: true },
  ])

  const [operatorFilters, setOperatorFilters] = useState<OperatorFilter[]>([
    { id: "tanaka", name: "田中", checked: true },
    { id: "sato", name: "佐藤", checked: true },
    { id: "suzuki", name: "鈴木", checked: true },
    { id: "yamada", name: "山田", checked: true },
    { id: "watanabe", name: "渡辺", checked: true },
    { id: "ito", name: "伊藤", checked: true },
    { id: "nakamura", name: "中村", checked: true },
  ])

  const [alerts] = useState<Alert[]>([
    { id: "1", type: "delay", count: 1, tasks: [] },
    { id: "2", type: "late_start", count: 1, tasks: [] },
    { id: "3", type: "resource_conflict", count: 0, tasks: [] },
  ])

  const handlePrevPeriod = () => {
    console.log("Previous period")
  }

  const handleNextPeriod = () => {
    console.log("Next period")
  }

  const handleToday = () => {
    setCurrentDate("2025/07/28 (月)")
  }

  const handleViewModeChange = (mode: "day" | "week") => {
    setViewMode(mode)
    if (mode === "week") {
      setCurrentDate("07/28 - 08/03")
    } else {
      setCurrentDate("2025/07/28 (月)")
    }
  }

  const handleProcessFilterChange = (id: string, checked: boolean) => {
    setProcessFilters((prev) => prev.map((filter) => (filter.id === id ? { ...filter, checked } : filter)))
  }

  const handleEquipmentFilterChange = (id: string, checked: boolean) => {
    setEquipmentFilters((prev) => prev.map((filter) => (filter.id === id ? { ...filter, checked } : filter)))
  }

  const handleOperatorFilterChange = (id: string, checked: boolean) => {
    setOperatorFilters((prev) => prev.map((filter) => (filter.id === id ? { ...filter, checked } : filter)))
  }

  const handleClearFilters = () => {
    setProcessFilters((prev) => prev.map((filter) => ({ ...filter, checked: true })))
    setEquipmentFilters((prev) => prev.map((filter) => ({ ...filter, checked: true })))
    setOperatorFilters((prev) => prev.map((filter) => ({ ...filter, checked: true })))
    setProcessBlockValue("l-semi-auto")
  }

  const handleTaskMove = (taskId: string, newTime: string, newProcess: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              startTime: newTime,
              processName: newProcess,
              isManuallyAdjusted: true,
            }
          : task,
      ),
    )
  }

  const handleTaskDragStart = (task: Task) => {
    setDraggedTask(task)
  }

  const handlePlanningClick = () => {
    console.log("Planning clicked")
  }

  const handleTaskSelect = (task: Task) => {
    setSelectedTask(task)
    setModalTask(task)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setModalTask(null)
  }

  const handleTaskSave = (updatedTask: Task) => {
    setTasks((prev) => prev.map((task) => (task.id === updatedTask.id ? updatedTask : task)))
    setSelectedTask(updatedTask)
  }

  // Filter tasks based on current filters
  const filteredTasks = tasks.filter((task) => {
    const processMatch = processFilters.find((p) => p.name === task.processName)?.checked ?? false
    const equipmentMatch = equipmentFilters.find((e) => e.name === task.equipment)?.checked ?? true
    const operatorMatch = operatorFilters.find((o) => o.name === task.operator)?.checked ?? true

    return processMatch && equipmentMatch && operatorMatch
  })

  return (
    <div className="h-screen flex flex-col" style={{ backgroundColor: designTokens.BACKGROUND }}>
      <Header
        currentDate={currentDate}
        viewMode={viewMode}
        onPrevPeriod={handlePrevPeriod}
        onNextPeriod={handleNextPeriod}
        onToday={handleToday}
        onViewModeChange={handleViewModeChange}
      />

      <AlertBar alerts={alerts} onPlanningClick={handlePlanningClick} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          processBlockValue={processBlockValue}
          onProcessBlockChange={setProcessBlockValue}
          processFilters={processFilters}
          onProcessFilterChange={handleProcessFilterChange}
          equipmentFilters={equipmentFilters}
          onEquipmentFilterChange={handleEquipmentFilterChange}
          operatorFilters={operatorFilters}
          onOperatorFilterChange={handleOperatorFilterChange}
          onClearFilters={handleClearFilters}
          selectedTask={selectedTask}
          allTasks={tasks}
          onTaskSelect={handleTaskSelect}
          onTaskDragStart={handleTaskDragStart}
        />

        <CalendarGrid
          tasks={filteredTasks}
          processFilters={processFilters}
          onTaskSelect={handleTaskSelect}
          onTaskMove={handleTaskMove}
        />
      </div>

      <TaskDetailModal task={modalTask} isOpen={isModalOpen} onClose={handleModalClose} onSave={handleTaskSave} />
    </div>
  )
}
