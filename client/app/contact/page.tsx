"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import Header from "@/components/header"
import { toast } from "react-toastify" // เรียกใช้ Toast

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // จำลองการส่งข้อมูล (Simulation)
    setTimeout(() => {
      setIsSubmitting(false)
      // เรียกใช้ Toast แจ้งเตือนเมื่อส่งสำเร็จ
      toast.success("ส่งข้อความเรียบร้อยแล้ว! เราจะติดต่อกลับโดยเร็วที่สุด") 
      setFormData({ name: "", email: "", subject: "", message: "" })
    }, 1500)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-gray-50 to-background">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-primary">ติดต่อเรา</h1>
          <p className="text-muted-foreground text-lg">
            แผนกเทคโนโลยีสารสนเทศ วิทยาลัยเทคนิคกำแพงเพชร
          </p>
        </div>
        <div className="flex justify-center items-center"> 
          <div className="w-full max-w-xl">
            <Card className="h-full shadow-lg border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="text-2xl text-center">ช่องทางการติดต่อ</CardTitle>
                <CardDescription className="text-center">สอบถามข้อมูล ปรึกษาปัญหา หรือแจ้งเหตุขัดข้อง</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">ที่อยู่</h3>
                    <p className="text-muted-foreground">
                      แผนกเทคโนโลยีสารสนเทศ<br />
                      วิทยาลัยเทคนิคกำแพงเพชร<br />
                      50 ชุมชนปิ่นดำริห์ ถนนปิ่นดำริห์ ตำบลในเมือง อำเภอเมือง จังหวัดกำแพงเพชร
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">เว็บไซต์</h3>
                    <p className="text-muted-foreground">it.kpt.ac.th</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">เบอร์โทรศัพท์</h3>
                    <p className="text-muted-foreground">064 596 3754</p>
                  </div>
                </div>
                
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}