"use client"

import { useEffect, useState } from "react"
import { Check, AlertCircle, WifiOff, Clock, Flame, Pencil,Trash2  } from "lucide-react"
import { getRooms ,updateRoom,deleteRoom } from "@/api/room"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
interface Room {
  id: string
  name: string
  location: string
  status: "safe" | "detection" | "offline",
  secretKey: string
  lastDetection: string
  detectionsToday: number
}

export default function RoomGrid() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)
  const [editingRoom, setEditingRoom] = useState<Room | null>(null)
  const [editForm, setEditForm] = useState({ id: "", name: "", location: "" })
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const fetchRooms = async () => {
    try {
      const response = await getRooms()
      const normalized = (response.data.rooms || []).map((r: any) => ({
        id: r.id || r._id || `${r.name}-${r.location}`,
        name: r.name,
        location: r.location,
        status: r.status,
        secretKey: r.secretKey,
        lastDetection: r.lastDetection,
        detectionsToday: r.detectionsToday,
      }))
      setRooms(normalized)
    } catch (error) {
      console.error("Error fetching rooms:", error)
      setRooms([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRooms()
    const interval = setInterval(fetchRooms, 10000)
    return () => clearInterval(interval)
  }, [])

  const handleEditClick = (room: Room) => {
    setEditingRoom(room)
    setEditForm({ id: room.id, name: room.name, location: room.location })
    setIsEditDialogOpen(true)
  }

  const handleSaveEdit = async () => {
    if (!editingRoom) return;

    try {
      await updateRoom(editForm.id, {
        name: editForm.name,
        location: editForm.location,
      });

      setRooms((prev) =>
        prev.map((room) =>
          room.id === editForm.id
            ? { ...room, name: editForm.name, location: editForm.location }
            : room
        )
      );

      console.log("Saving room:", { id: editForm.id, ...editForm });

      setIsEditDialogOpen(false);

    } catch (error) {
      console.error("Failed to update room:", error);
    }
    
  }
  
  const handleDeleteClick = (room: Room) => {
    try {
      deleteRoom(room.id);
      setRooms((prev) => prev.filter((r) => r.id !== room.id));
    } catch (error) {
      console.error("Failed to delete room:", error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "safe":
        return "bg-emerald-50 border-emerald-200 hover:border-emerald-300"
      case "detection":
        return "bg-red-50 border-red-200 hover:border-red-300"
      case "offline":
        return "bg-gray-50 border-gray-200 hover:border-gray-300"
      default:
        return "bg-blue-50 border-blue-200"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "safe":
        return "ปลอดภัย"
      case "detection":
        return "ตรวจจับการสูบบุหรี่"
      case "offline":
        return "ออฟไลน์"
      default:
        return "ไม่ทราบ"
    }
  }

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case "safe":
        return "text-emerald-600"
      case "detection":
        return "text-red-600"
      case "offline":
        return "text-gray-600"
      default:
        return "text-blue-600"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "safe":
        return <Check className="w-5 h-5 text-emerald-600" />
      case "detection":
        return <AlertCircle className="w-5 h-5 text-red-600" />
      case "offline":
        return <WifiOff className="w-5 h-5 text-gray-400" />
      default:
        return null
    }
  }

  if (loading) return <div className="text-center py-10 text-gray-500">กำลังโหลดข้อมูล...</div>
  if (rooms.length === 0) return <div className="text-center py-10 text-gray-400">ไม่มีข้อมูลห้องที่ตรวจพบ</div>

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {rooms.map((room) => (
          <div
            key={room.id}
            className={`border-2 rounded-2xl p-6 cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${getStatusColor(room.status)}`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg text-foreground"></h3>
                <h3 className="font-bold text-lg text-foreground">{room.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">📍  {room.location}</p>
                <p className="text-sm text-muted-foreground mt-1">🔒 เลขเครื่อง : {room.secretKey}</p>
              </div>
              <div className="flex gap-2">
                
                {getStatusIcon(room.status)}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-current border-opacity-15">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs font-medium text-muted-foreground">วันนี้</span>
                </div>
                <p className="text-sm font-semibold text-foreground">{room.detectionsToday} ครั้ง</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs font-medium text-muted-foreground">ตรวจจับล่าสุด</span>
                </div>
                <p className="text-xs text-foreground">{room.lastDetection}</p>
              </div>
            </div>

            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                {getStatusIcon(room.status)}
                <span className={`text-sm font-bold ${getStatusTextColor(room.status)}`}>
                  {getStatusLabel(room.status)}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                    onClick={() => handleEditClick(room)}
                    className="p-2 hover:bg-black/10 rounded-lg transition-colors"
                    aria-label="แก้ไขห้อง"
                  >
                    <Pencil className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(room)}
                    className="p-2 hover:bg-red-600/30 rounded-lg transition-colors"
                    aria-label="ลบห้อง"
                  >
                    <Trash2  className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
            </div>

          </div>
        ))}
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>แก้ไขข้อมูลห้อง</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="room-name">ชื่อห้อง</Label>
              <Input
                id="room-name"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                placeholder="ใส่ชื่อห้อง"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="room-location">ตำแหน่ง</Label>
              <Input
                id="room-location"
                value={editForm.location}
                onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                placeholder="ใส่ตำแหน่ง"
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              ยกเลิก
            </Button>
            <Button type="button" onClick={handleSaveEdit} className="bg-blue-900 hover:opacity-80 text-white">
              บันทึก
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
