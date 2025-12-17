"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { isTokenExpired } from "@/utils/auth"

import Header from "@/components/header"
import RoomGrid from "@/components/room-grid"
import RecentActivity from "@/components/recent-activity"

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/");
      return;
    }

    if (isTokenExpired(token)) {
      localStorage.removeItem("token");
      router.push("/");
    }

    const interval = setInterval(() => {
      const token = localStorage.getItem("token");
      if (!token || isTokenExpired(token)) {
        localStorage.removeItem("token");
        router.push("/");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <section className="mt-12">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-foreground">สถานะห้องน้ำ</h2>
            <p className="text-sm text-muted-foreground mt-1">
              การตรวจสอบแบบเรียลไทม์ในทุกสถานที่
            </p>
          </div>
          <RoomGrid />
        </section>

        <section className="mt-12 mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-foreground">แจ้งเตือนล่าสุด</h2>
            <p className="text-sm text-muted-foreground mt-1">
              เหตุการณ์และการทำงานของระบบล่าสุด
            </p>
          </div>
          <RecentActivity />
        </section>
      </main>
    </div>
  )
}
