"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useState, useEffect } from "react"

export default function FeedbackViewer() {
  const [iframeHeight, setIframeHeight] = useState("800px")

  // Adjust iframe height based on window size
  useEffect(() => {
    const updateHeight = () => {
      const height = window.innerHeight - 300 // Subtract header and padding
      setIframeHeight(`${Math.max(600, height)}px`)
    }

    updateHeight()
    window.addEventListener("resize", updateHeight)
    return () => window.removeEventListener("resize", updateHeight)
  }, [])

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">유저 피드백 뷰어</h2>
      <p className="text-gray-300 mb-4">CSV 파일을 업로드하여 유저 피드백 데이터를 분석하고 시각화할 수 있습니다.</p>

      <Card className="bg-gray-700 overflow-hidden">
        <CardContent className="p-0">
          <iframe
            src="https://v0-csv-x0.vercel.app/"
            width="100%"
            height={iframeHeight}
            className="border-0"
            title="유저 피드백 뷰어"
            sandbox="allow-scripts allow-same-origin allow-forms"
          />
        </CardContent>
      </Card>
    </div>
  )
}
