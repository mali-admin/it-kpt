"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";
import { login } from "@/api/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "react-toastify";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState({ username: '', password: '' })

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/dashboard");
    }
  }, []);

  const handleOnChange = (e:any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e:any) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await login(form);
      const token = response.data.token;
      toast.success("ยินดีต้อนรับเข้าสู่ระบบ");

      if (token) {
        localStorage.setItem("token", token);
        router.push("/dashboard");
      } else {
        router.back();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
    setIsLoading(false)
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-background flex items-center justify-center p-4">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary/5 rounded-full blur-3xl opacity-20"></div>
        </div>

        <div className="relative w-full max-w-md">
          <Card className="shadow-lg-soft border-0">
            <CardHeader className="space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-bold text-2xl text-center w-full">ITKPT</span>
              </div>
              <CardTitle className="text-2xl">เข้าสู่ระบบ</CardTitle>
              <CardDescription>ระบบตรวจจับควันบุหรี่อัจฉริยะ</CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="username" className="text-sm font-medium">
                    ชื่อผู้ใช้
                  </label>
                  <Input
                    id="username"
                    name="username" 
                    type="text"
                    placeholder="admin"
                    value={form.username}
                    onChange={handleOnChange}
                    required
                    className="h-10"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-sm font-medium">
                      รหัสผ่าน
                    </label>
                  </div>
                  <Input
                    id="password"
                    name="password" 
                    type="password"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={handleOnChange}
                    required
                    className="h-10"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-10 bg-blue-900 hover:opacity-80 text-white font-medium "
                  disabled={isLoading}
                >
                  {isLoading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="mt-4 text-center text-xs text-muted-foreground">
            <p>© 2025 ITKPT Smoke Detection System. สงวนลิขสิทธิ์</p>
          </div>
        </div>
      </div>
    </>
  )
}
