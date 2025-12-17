"use client"

import Link from "next/link"
import { Menu } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Header() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 max-w-6xl">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center">
              <img src="https://img2.pic.in.th/pic/it2ca20dbd1f1f94c2.png" alt="" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">ITKPT</h1>
              <p className="text-xs text-muted-foreground">ระบบตรวจจับควัน</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/contact" className="text-foreground font-medium hover:text-blue-600 transition-colors">
              ติดต่อเรา
            </Link>

            <button
              onClick={() => {
                localStorage.removeItem("token");
                router.push("/");
                toast.warning("ออกจากระบบเรียบร้อยแล้ว");
              }}
              className="px-3 py-2 bg-red-600 text-white font-medium rounded hover:bg-red-700 transition"
            >
              ออกจากระบบ
            </button>
          </nav>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <Menu size={24} className="text-foreground" />
          </button>
        </div>

        {menuOpen && (
          <nav className="md:hidden flex flex-col gap-4 mt-4 pt-4 border-t border-border">
            <Link href="/contact" className="text-foreground font-medium hover:text-blue-600 transition-colors">
              ติดต่อเรา
            </Link>

            <button
              onClick={() => {
                localStorage.removeItem("token");
                router.push("/");
                toast.warning("ออกจากระบบเรียบร้อยแล้ว");
              }}
              className="text-red-600 font-medium hover:opacity-80 transition-colors text-left"
            >
              ออกจากระบบ
            </button>
          </nav>
        )}
      </div>
    </header>
  )
}
