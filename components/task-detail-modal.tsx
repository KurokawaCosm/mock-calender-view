"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { X } from "lucide-react"
import type { Task } from "@/lib/types"
import { designTokens } from "@/lib/design-tokens"

interface TaskDetailModalProps {
  task: Task | null
  isOpen: boolean
  onClose: () => void
  onSave: (updatedTask: Task) => void
}

interface SystemData {
  orderNo: string
  deliveryNo: number
  itemCode: string
  itemVersion: string
  customerCode: string
  orderQuantity: number
  completionDate: string
  instructionQuantity: number
  priority: string
  issuePlace: string
  issuedFlag: boolean
  issueDate: string
  scheduleFixed: boolean
  oemLotNo: string
  shippingType: string
  envId: string
  inputPriority: string
  inspectionStd: string
  inspectionType: string
  fractionType: string
  roundUnit: number
  regDate: string
  regTime: string
  regStaff: string
  updateDate: string
  updateTime: string
  updateStaff: string
  issueTime: string
  issuerCd: string
  lmLotNo: string
}

export function TaskDetailModal({ task, isOpen, onClose, onSave }: TaskDetailModalProps) {
  const [editedTask, setEditedTask] = useState<Task | null>(null)
  const [isFixed, setIsFixed] = useState(false)

  // モックの基幹システムデータ
  const systemData: SystemData = {
    orderNo: "12345678",
    deliveryNo: 1,
    itemCode: "ITEM001",
    itemVersion: "V1.0",
    customerCode: "CUST001",
    orderQuantity: 500,
    completionDate: "2025/07/30",
    instructionQuantity: 100,
    priority: "高",
    issuePlace: "工場A",
    issuedFlag: true,
    issueDate: "2025/07/25",
    scheduleFixed: false,
    oemLotNo: "OEM123456",
    shippingType: "通常出庫",
    envId: "ENV001",
    inputPriority: "1",
    inspectionStd: "標準",
    inspectionType: "全数検査",
    fractionType: "切り上げ",
    roundUnit: 10,
    regDate: "2025/07/20",
    regTime: "09:30:00",
    regStaff: "USER001",
    updateDate: "2025/07/25",
    updateTime: "14:15:00",
    updateStaff: "USER002",
    issueTime: "10:45:00",
    issuerCd: "ISSUER001",
    lmLotNo: "LM789012",
  }

  useEffect(() => {
    if (task) {
      setEditedTask({ ...task })
      setIsFixed(task.isManuallyAdjusted)
    }
  }, [task])

  const handleInputChange = (field: keyof Task, value: any) => {
    if (editedTask) {
      setEditedTask({
        ...editedTask,
        [field]: value,
      })
    }
  }

  const handleSave = () => {
    if (editedTask) {
      const updatedTask = {
        ...editedTask,
        isManuallyAdjusted: isFixed,
      }
      onSave(updatedTask)
      onClose()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose()
    }
  }

  if (!isOpen || !editedTask) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg shadow-xl"
        style={{
          backgroundColor: designTokens.BACKGROUND_WHITE,
          border: "1px solid #E0E0E0",
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        }}
      >
        {/* ヘッダー */}
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderBottomColor: "#E0E0E0" }}>
          <h2
            className="text-xl font-bold"
            style={{
              fontSize: designTokens.FONT_SIZE_XL,
              color: designTokens.TEXT_BLACK,
            }}
          >
            {editedTask.lotNo}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:opacity-70 transition-opacity"
            style={{ color: designTokens.TEXT_GREY }}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex">
          {/* 左側：工程管理情報 */}
          <div className="flex-1 p-6">
            <h3
              className="text-lg font-medium mb-4"
              style={{
                fontSize: designTokens.FONT_SIZE_L,
                color: designTokens.TEXT_BLACK,
              }}
            >
              工程管理情報
            </h3>

            <div className="space-y-4">
              {/* 工程・担当者 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="popup-process" className="text-sm font-medium mb-2 block">
                    工程
                  </Label>
                  <Input
                    id="popup-process"
                    value={editedTask.processName}
                    onChange={(e) => handleInputChange("processName", e.target.value)}
                    placeholder="工程名を入力"
                    className="w-full"
                  />
                </div>
                <div>
                  <Label htmlFor="popup-operator" className="text-sm font-medium mb-2 block">
                    担当者
                  </Label>
                  <Input
                    id="popup-operator"
                    value={editedTask.operator || ""}
                    onChange={(e) => handleInputChange("operator", e.target.value)}
                    placeholder="担当者名を入力"
                    className="w-full"
                  />
                </div>
              </div>

              {/* 設備・ステータス */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="popup-equipment" className="text-sm font-medium mb-2 block">
                    設備
                  </Label>
                  <Input
                    id="popup-equipment"
                    value={editedTask.equipment || ""}
                    onChange={(e) => handleInputChange("equipment", e.target.value)}
                    placeholder="設備名を入力"
                    className="w-full"
                  />
                </div>
                <div>
                  <Label htmlFor="popup-status" className="text-sm font-medium mb-2 block">
                    ステータス
                  </Label>
                  <Select
                    value={editedTask.status}
                    onValueChange={(value) => handleInputChange("status", value as Task["status"])}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="not_started">未着手</SelectItem>
                      <SelectItem value="in_progress">進行中</SelectItem>
                      <SelectItem value="completed">完了</SelectItem>
                      <SelectItem value="delayed">遅延</SelectItem>
                      <SelectItem value="at_risk">着手遅れ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* 工程開始日時・工程終了日時 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="popup-start-datetime" className="text-sm font-medium mb-2 block">
                    工程開始日時
                  </Label>
                  <Input
                    id="popup-start-datetime"
                    type="datetime-local"
                    value={editedTask.startTime ? `2025-07-28T${editedTask.startTime}` : ""}
                    onChange={(e) => {
                      const datetime = e.target.value
                      const time = datetime ? datetime.split("T")[1] : ""
                      handleInputChange("startTime", time)
                    }}
                    className="w-full"
                  />
                </div>
                <div>
                  <Label htmlFor="popup-end-datetime" className="text-sm font-medium mb-2 block">
                    工程終了日時
                  </Label>
                  <Input
                    id="popup-end-datetime"
                    type="datetime-local"
                    value={editedTask.endTime ? `2025-07-28T${editedTask.endTime}` : ""}
                    onChange={(e) => {
                      const datetime = e.target.value
                      const time = datetime ? datetime.split("T")[1] : ""
                      handleInputChange("endTime", time)
                    }}
                    className="w-full"
                  />
                </div>
              </div>

              {/* 工程納期・最終納期 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="popup-process-due" className="text-sm font-medium mb-2 block">
                    工程納期
                  </Label>
                  <Input
                    id="popup-process-due"
                    type="date"
                    value={editedTask.dueDate ? `2025-${editedTask.dueDate.replace("/", "-")}` : ""}
                    onChange={(e) => {
                      const date = e.target.value
                      const formattedDate = date ? date.split("-").slice(1).join("/") : ""
                      handleInputChange("dueDate", formattedDate)
                    }}
                    className="w-full"
                  />
                </div>
                <div>
                  <Label htmlFor="popup-due-date" className="text-sm font-medium mb-2 block">
                    最終納期
                  </Label>
                  <Input
                    id="popup-due-date"
                    type="date"
                    value={editedTask.dueDate ? `2025-${editedTask.dueDate.replace("/", "-")}` : ""}
                    onChange={(e) => {
                      const date = e.target.value
                      const formattedDate = date ? date.split("-").slice(1).join("/") : ""
                      handleInputChange("dueDate", formattedDate)
                    }}
                    className="w-full"
                  />
                </div>
              </div>

              {/* 計画変更固定フラグ */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="popup-fixed-flag"
                  checked={isFixed}
                  onCheckedChange={(checked) => setIsFixed(checked as boolean)}
                />
                <Label
                  htmlFor="popup-fixed-flag"
                  className="text-sm cursor-pointer"
                  style={{ color: designTokens.TEXT_BLACK }}
                >
                  計画変更を固定する
                </Label>
              </div>
            </div>
          </div>

          {/* 右側：組立指示情報 */}
          <div
            className="flex-1 p-6 border-l"
            style={{
              backgroundColor: designTokens.COLUMN_BACKGROUND,
              borderLeftColor: "#E0E0E0",
            }}
          >
            <h3
              className="text-lg font-medium mb-4"
              style={{
                fontSize: designTokens.FONT_SIZE_L,
                color: designTokens.TEXT_BLACK,
              }}
            >
              組立指示情報
            </h3>

            <div className="space-y-2 text-sm">
              <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                <div className="flex justify-between">
                  <span style={{ color: designTokens.TEXT_GREY }}>組立LOTNO:</span>
                  <span style={{ color: designTokens.TEXT_BLACK }}>{editedTask.lotNo}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: designTokens.TEXT_GREY }}>受注NO:</span>
                  <span style={{ color: designTokens.TEXT_BLACK }}>{systemData.orderNo}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: designTokens.TEXT_GREY }}>分納連番:</span>
                  <span style={{ color: designTokens.TEXT_BLACK }}>{systemData.deliveryNo}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: designTokens.TEXT_GREY }}>品目CD:</span>
                  <span style={{ color: designTokens.TEXT_BLACK }}>{systemData.itemCode}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: designTokens.TEXT_GREY }}>品目版数:</span>
                  <span style={{ color: designTokens.TEXT_BLACK }}>{systemData.itemVersion}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: designTokens.TEXT_GREY }}>得意先CD:</span>
                  <span style={{ color: designTokens.TEXT_BLACK }}>{systemData.customerCode}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: designTokens.TEXT_GREY }}>受注数:</span>
                  <span style={{ color: designTokens.TEXT_BLACK }}>{systemData.orderQuantity}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: designTokens.TEXT_GREY }}>組立完成日:</span>
                  <span style={{ color: designTokens.TEXT_BLACK }}>{systemData.completionDate}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: designTokens.TEXT_GREY }}>組立指示数:</span>
                  <span style={{ color: designTokens.TEXT_BLACK }}>{systemData.instructionQuantity}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: designTokens.TEXT_GREY }}>優先度:</span>
                  <span style={{ color: designTokens.TEXT_BLACK }}>{systemData.priority}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: designTokens.TEXT_GREY }}>指示書発行場所:</span>
                  <span style={{ color: designTokens.TEXT_BLACK }}>{systemData.issuePlace}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: designTokens.TEXT_GREY }}>発行済FLG:</span>
                  <span style={{ color: designTokens.TEXT_BLACK }}>{systemData.issuedFlag ? "済" : "未"}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: designTokens.TEXT_GREY }}>指示書発行日:</span>
                  <span style={{ color: designTokens.TEXT_BLACK }}>{systemData.issueDate}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: designTokens.TEXT_GREY }}>山積日固定FLG:</span>
                  <span style={{ color: designTokens.TEXT_BLACK }}>{systemData.scheduleFixed ? "固定" : "変動"}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: designTokens.TEXT_GREY }}>OEMLOTNO:</span>
                  <span style={{ color: designTokens.TEXT_BLACK }}>{systemData.oemLotNo}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: designTokens.TEXT_GREY }}>出庫区分:</span>
                  <span style={{ color: designTokens.TEXT_BLACK }}>{systemData.shippingType}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: designTokens.TEXT_GREY }}>環境識別文字:</span>
                  <span style={{ color: designTokens.TEXT_BLACK }}>{systemData.envId}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: designTokens.TEXT_GREY }}>投入優先度:</span>
                  <span style={{ color: designTokens.TEXT_BLACK }}>{systemData.inputPriority}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: designTokens.TEXT_GREY }}>検査基準区分:</span>
                  <span style={{ color: designTokens.TEXT_BLACK }}>{systemData.inspectionStd}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: designTokens.TEXT_GREY }}>検査区分:</span>
                  <span style={{ color: designTokens.TEXT_BLACK }}>{systemData.inspectionType}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: designTokens.TEXT_GREY }}>端数取扱区分:</span>
                  <span style={{ color: designTokens.TEXT_BLACK }}>{systemData.fractionType}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: designTokens.TEXT_GREY }}>端数まるめ単位数:</span>
                  <span style={{ color: designTokens.TEXT_BLACK }}>{systemData.roundUnit}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: designTokens.TEXT_GREY }}>登録日:</span>
                  <span style={{ color: designTokens.TEXT_BLACK }}>{systemData.regDate}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: designTokens.TEXT_GREY }}>登録時間:</span>
                  <span style={{ color: designTokens.TEXT_BLACK }}>{systemData.regTime}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: designTokens.TEXT_GREY }}>登録担当者CD:</span>
                  <span style={{ color: designTokens.TEXT_BLACK }}>{systemData.regStaff}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: designTokens.TEXT_GREY }}>更新日:</span>
                  <span style={{ color: designTokens.TEXT_BLACK }}>{systemData.updateDate}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: designTokens.TEXT_GREY }}>更新時間:</span>
                  <span style={{ color: designTokens.TEXT_BLACK }}>{systemData.updateTime}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: designTokens.TEXT_GREY }}>更新担当者CD:</span>
                  <span style={{ color: designTokens.TEXT_BLACK }}>{systemData.updateStaff}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: designTokens.TEXT_GREY }}>指示書発行時間:</span>
                  <span style={{ color: designTokens.TEXT_BLACK }}>{systemData.issueTime}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: designTokens.TEXT_GREY }}>指示書発行者CD:</span>
                  <span style={{ color: designTokens.TEXT_BLACK }}>{systemData.issuerCd}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: designTokens.TEXT_GREY }}>LM_LOTNO:</span>
                  <span style={{ color: designTokens.TEXT_BLACK }}>{systemData.lmLotNo}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ボタンエリア */}
        <div className="flex justify-end space-x-3 px-6 py-4 border-t" style={{ borderTopColor: "#E0E0E0" }}>
          <Button id="popup-cancel" variant="outline" onClick={onClose} className="px-6 bg-transparent">
            戻る
          </Button>
          <Button
            id="popup-complete"
            onClick={handleSave}
            className="px-6"
            style={{
              backgroundColor: designTokens.MAIN,
              color: designTokens.TEXT_WHITE,
            }}
          >
            変更完了
          </Button>
        </div>
      </div>
    </div>
  )
}
