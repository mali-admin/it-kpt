// "use client"

// import { format } from "date-fns"
// import { AlertCircle, CheckCircle2 } from "lucide-react"

// export default function RecentActivity() {
//   const activities = [
//     { id: 1, type: "detection", room: "Room 002", time: "2025-11-11T14:43:00", message: "ตรวจจับการสูบบุหรี่" },
//     { id: 2, type: "clear", room: "Room 002", time: "2025-11-11T14:10:00", message: "ควันบุหรี่หายไป" },
//     { id: 3, type: "detection", room: "Room 001", time: "2025-11-11T10:36:00", message: "ตรวจจับการสูบบุหรี่" },
//     { id: 4, type: "detection", room: "Room 002", time: "2025-11-11T15:10:00", message: "ตรวจจับการสูบบุหรี่" },
//   ]

//   return (
//     <div className="space-y-2">
//       {activities.map((activity) => (
//         <div
//           key={activity.id}
//           className="flex items-center gap-4 p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
//         >
//           <div className="flex-shrink-0">
//             {activity.type === "detection" ? (
//               <AlertCircle className="w-5 h-5 text-red-600" />
//             ) : (
//               <CheckCircle2 className="w-5 h-5 text-emerald-600" />
//             )}
//           </div>
//           <div className="flex-1 min-w-0">
//             <p className="font-medium text-foreground">{activity.message}</p>
//             <p className="text-xs text-muted-foreground">{activity.room}</p>
//           </div>
//           <div className="text-right flex-shrink-0">
//             <p className="text-xs font-medium text-foreground">{format(new Date(activity.time), "HH:mm")}</p>
//             <p className="text-xs text-muted-foreground">{format(new Date(activity.time), "MMM d")}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }
"use client"
import { useEffect, useState } from "react"
import { format } from "date-fns"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { getLogs } from "@/api/log"
import { getRooms } from "@/api/room"

interface Log {
  id: string
  status: "safe" | "detection" | "offline"
  timestamp: Date
  secretKey: string
}

interface Room {
  id: string
  name: string
  secretKey: string
  location: string
}

export default function RecentActivity() {
  const [activities, setActivities] = useState<Log[]>([]);
  const [rooms, setRooms] = useState<Record<string, { name: string; location: string }>>({});
  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    try {
      const logRes = await getLogs();
      const fetchedLogs = logRes.data || [];
      
      const roomRes = await getRooms();
      const fetchedRooms = roomRes.data.rooms || [];
      
      const roomMap: Record<string, { name: string; location: string }> = {};
      fetchedRooms.forEach((r: Room) => {
        roomMap[r.secretKey] = {
          name: r.name,
          location: r.location
        };
      });
      setRooms(roomMap);
      setActivities(fetchedLogs);
    } catch (error) {
      console.error("Error fetching logs/rooms:", error);
      setActivities([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
    const interval = setInterval(fetchAll, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-muted-foreground">Loading activities...</p>
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-muted-foreground">No recent activities</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {activities.map((activity) => {
        const room = rooms[activity.secretKey];
        
        return (
          <div
            key={activity.id}
            className="flex items-center gap-4 p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
          >
            <div className="flex-shrink-0">
              {activity.status === "detection" ? (
                <AlertCircle className="w-5 h-5 text-red-600" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground">{room?.name || "Unknown Room"}</p>
              <p className="text-xs text-muted-foreground">{room?.location || "Unknown Location"}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-xs font-medium text-foreground">
                {format(new Date(activity.timestamp), "HH:mm")}
              </p>
              <p className="text-xs text-muted-foreground">
                {format(new Date(activity.timestamp), "MMM d")}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  )
}