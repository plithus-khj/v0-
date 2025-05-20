"use client"

import { useEffect, useState } from "react"
import html2canvas from "html2canvas"

// 각 탭의 내용을 미리 캡처하여 저장하는 컴포넌트
export default function TabContentCapturer() {
  const [isCapturing, setIsCapturing] = useState(false)

  useEffect(() => {
    // 전역 객체에 탭 캡처 이미지를 저장할 공간 생성
    if (typeof window !== "undefined") {
      ;(window as any).tabCaptureImages = (window as any).tabCaptureImages || {}

      // 탭 컨텐츠 캡처 함수 전역으로 노출
      ;(window as any).captureTabContent = async (tabId: string) => {
        try {
          setIsCapturing(true)
          console.log(`Capturing tab content for: ${tabId}`)

          // 1. React 상태를 통해 탭 전환
          if (typeof window !== "undefined" && (window as any).setActiveTab) {
            console.log(`Switching to tab ${tabId} via React state`)
            ;(window as any).setActiveTab(tabId)

            // 상태 변경 후 충분한 대기 시간
            console.log(`Waiting for tab content to render (0.5 seconds)...`)
            await new Promise((resolve) => setTimeout(resolve, 500))
          }

          // 2. 탭 컨텐츠 찾기
          const tabContent = document.querySelector(`.tab-content-${tabId}`) as HTMLElement | null
          if (!tabContent) {
            console.error(`Tab content for ${tabId} not found`)
            return null
          }

          // 3. 컨텐츠 캡처
          console.log(`Found content for tab ${tabId}, capturing...`)
          const canvas = await html2canvas(tabContent, {
            scale: 1.5,
            useCORS: true,
            logging: true,
            backgroundColor: "rgb(31, 41, 55)",
            allowTaint: true,
          })

          // 4. 이미지 데이터 저장
          const imageData = canvas.toDataURL("image/jpeg", 0.95)
          ;(window as any).tabCaptureImages[tabId] = imageData
          console.log(`Successfully captured content for tab ${tabId}`)

          return imageData
        } catch (error) {
          console.error(`Error capturing tab ${tabId}:`, error)
          return null
        } finally {
          setIsCapturing(false)
        }
      }

      // 모든 탭 캡처 함수 전역으로 노출
      ;(window as any).captureAllTabContents = async () => {
        const tabIds = ["overview", "multiple-choice", "open-ended", "sentiment", "bugs", "cross-analysis", "insights"]
        const originalActiveTab = document.querySelector("[data-state='active'][role='tab']") as HTMLElement | null
        const originalActiveTabValue = originalActiveTab?.getAttribute("value") || "overview"

        console.log(`Starting capture of all tabs. Original tab: ${originalActiveTabValue}`)

        const results = {}

        for (const tabId of tabIds) {
          const imageData = await (window as any).captureTabContent(tabId)
          if (imageData) {
            results[tabId] = imageData
          }
        }

        // 원래 탭으로 복원
        if (typeof window !== "undefined" && (window as any).setActiveTab) {
          console.log(`Restoring original tab: ${originalActiveTabValue}`)
          ;(window as any).setActiveTab(originalActiveTabValue)
        }

        return results
      }
    }

    return () => {
      // 컴포넌트 언마운트 시 함수 제거
      if (typeof window !== "undefined") {
        delete (window as any).captureTabContent
        delete (window as any).captureAllTabContents
      }
    }
  }, [])

  // 이 컴포넌트는 UI를 렌더링하지 않음
  return null
}
