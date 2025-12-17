import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Noto_Sans_Thai } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const _notoSansThai = Noto_Sans_Thai({ subsets: ["thai"], weight: ["400", "500", "600", "700"] })

export const metadata: Metadata = {
  title: "Smoke Detection - ITKPT",
  description: "Smoke Detection Dashboard for real-time monitoring and alerts.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "https://img2.pic.in.th/pic/it2ca20dbd1f1f94c2.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "https://img2.pic.in.th/pic/it2ca20dbd1f1f94c2.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "https://img2.pic.in.th/pic/it2ca20dbd1f1f94c2.png",
        type: "image/png",
      },
    ],
    apple: "https://img2.pic.in.th/pic/it2ca20dbd1f1f94c2.png",
  },
}


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "url": "https://itkpt.online",
              "logo": "https://img2.pic.in.th/pic/it2ca20dbd1f1f94c2.png"
            })
          }}
        />
      </head>

      <body className={`font-sans antialiased ${_notoSansThai.className}`}>
        {children}
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
        />
        <Analytics />
      </body>
    </html>
  )
}
