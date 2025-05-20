"use client"

import { useEffect, useState } from "react"
import html2canvas from "html2canvas"

// 탭 ID에 해당하는 제목 반환
function getTabTitle(tabId: string): string {
  switch (tabId) {
    case "overview":
      return "설문 개요"
    case "multiple-choice":
      return "객관식 응답 정리"
    case "open-ended":
      return "주관식 내용 요약"
    case "sentiment":
      return "감성 분류"
    case "bugs":
      return "버그 및 개선사항"
    case "cross-analysis":
      return "교차분석 정리"
    case "insights":
      return "기타 인사이트"
    case "feedback-viewer":
      return "유저 피드백 뷰어"
    default:
      return tabId
  }
}

// 각 탭의 내용을 미리 캡처하여 저장하는 컴포넌트
export default function PreCaptureTabs() {
  const [isCapturing, setIsCapturing] = useState(false)

  useEffect(() => {
    // 전역 객체에 탭 캡처 이미지를 저장할 공간 생성
    if (typeof window !== "undefined") {
      ;(window as any).tabCaptureImages = (window as any).tabCaptureImages || {}

      // 프로그래매틱하게 탭 전환하기
      const switchToTab = async (tabId: string) => {
        try {
          console.log(`Attempting to switch to tab: ${tabId}`)

          // 1. React 상태를 통해 탭 전환 시도
          if (typeof window !== "undefined" && (window as any).setActiveTab) {
            console.log(`Switching to tab ${tabId} via React state`)
            ;(window as any).setActiveTab(tabId)
            await new Promise((resolve) => setTimeout(resolve, 2000))

            // 상태 변경 후 탭이 활성화되었는지 확인
            const activeTab = document.querySelector("[data-state='active'][role='tab']") as HTMLElement | null
            if (activeTab?.getAttribute("value") === tabId) {
              console.log(`Successfully switched to tab ${tabId} via React state`)
              return true
            }
          }

          // 2. 다양한 선택자로 DOM 요소 클릭 시도
          const tabSelectors = [
            `[role="tab"][value="${tabId}"]`,
            `.tab-trigger-${tabId}`,
            `.w-full.justify-start[value="${tabId}"]`,
            `button[value="${tabId}"]`,
          ]

          for (const selector of tabSelectors) {
            const tabElement = document.querySelector(selector) as HTMLElement | null
            if (tabElement) {
              console.log(`Found tab element with selector: ${selector}`)
              tabElement.click()
              console.log(`Clicked tab element`)
              await new Promise((resolve) => setTimeout(resolve, 2000))

              // 클릭 후 탭이 활성화되었는지 확인
              const activeTab = document.querySelector("[data-state='active'][role='tab']") as HTMLElement | null
              if (activeTab?.getAttribute("value") === tabId) {
                console.log(`Successfully switched to tab ${tabId} via click`)
                return true
              }
            }
          }

          // 3. 텍스트 내용으로 탭 찾기
          const tabTitle = getTabTitle(tabId)
          document.querySelectorAll('[role="tab"], .w-full.justify-start').forEach((element) => {
            if (element.textContent?.includes(tabTitle)) {
              console.log(`Found tab by text content: ${tabTitle}`)
              ;(element as HTMLElement).click()
            }
          })
          await new Promise((resolve) => setTimeout(resolve, 2000))

          // 4. 인덱스 기반 탭 전환 시도
          const tabsList = document.querySelector(".flex-col.h-auto.bg-transparent.space-y-2")
          if (tabsList) {
            const tabIndex = [
              "overview",
              "multiple-choice",
              "open-ended",
              "sentiment",
              "bugs",
              "cross-analysis",
              "insights",
              "feedback-viewer",
            ].indexOf(tabId)

            if (tabIndex >= 0 && tabIndex < tabsList.children.length) {
              console.log(`Clicking tab by index: ${tabIndex}`)
              ;(tabsList.children[tabIndex] as HTMLElement).click()
              await new Promise((resolve) => setTimeout(resolve, 2000))
              return true
            }
          }

          // 5. 마지막 수단: 모든 탭 요소 순회하며 클릭
          console.log(`Trying all possible tab elements...`)
          const allPossibleTabs = document.querySelectorAll('.w-full.justify-start, [role="tab"]')
          for (let i = 0; i < allPossibleTabs.length; i++) {
            const tab = allPossibleTabs[i] as HTMLElement
            console.log(`Trying tab ${i}: ${tab.textContent?.trim()}`)
            tab.click()
            await new Promise((resolve) => setTimeout(resolve, 1000))

            // 탭 컨텐츠가 표시되는지 확인
            const activePanel = document.querySelector('[role="tabpanel"][data-state="active"]')
            if (activePanel) {
              console.log(`Found active panel after clicking tab ${i}`)
              return true
            }
          }

          console.error(`Failed to switch to tab: ${tabId} after trying all methods`)
          return false
        } catch (error) {
          console.error(`Error switching to tab ${tabId}:`, error)
          return false
        }
      }
      // 탭 캡처 함수 전역으로 노출
      ;(window as any).captureTabForPdf = async (tabId: string) => {
        try {
          setIsCapturing(true)

          // 탭 트리거 찾기 - 여러 선택자 시도
          let tabTrigger = null

          // 1. 기본 선택자
          tabTrigger = document.querySelector(`[role="tab"][value="${tabId}"]`)

          // 2. 클래스 기반 선택자
          if (!tabTrigger) {
            const allTabs = document.querySelectorAll(".flex-col .justify-start")
            for (const tab of allTabs) {
              if (tab.textContent?.includes(tabId) || tab.textContent?.includes(getTabTitle(tabId))) {
                tabTrigger = tab
                break
              }
            }
          }

          // 3. 텍스트 내용으로 찾기
          if (!tabTrigger) {
            document.querySelectorAll('[role="tab"]').forEach((element) => {
              if (
                element.textContent?.toLowerCase().includes(tabId) ||
                element.textContent?.includes(getTabTitle(tabId))
              ) {
                tabTrigger = element
              }
            })
          }

          // 4. TabsTrigger 컴포넌트 찾기
          if (!tabTrigger) {
            tabTrigger = document.querySelector(`.w-full[value="${tabId}"]`)
          }

          // 5. 일반적인 탭 UI 요소 찾기
          if (!tabTrigger) {
            const possibleTabs = document.querySelectorAll(".w-full.justify-start")
            for (let i = 0; i < possibleTabs.length; i++) {
              const tab = possibleTabs[i]
              const tabText = tab.textContent?.toLowerCase() || ""
              if (tabText.includes(tabId) || tabId === `tab-${i}`) {
                tabTrigger = tab
                break
              }
            }
          }

          // 탭을 찾지 못한 경우 로그 출력 후 null 반환
          if (!tabTrigger) {
            console.error(
              `Tab trigger for ${tabId} not found. Available tabs:`,
              Array.from(document.querySelectorAll(".w-full.justify-start")).map((el) => el.textContent),
            )
            return null
          }

          // 현재 활성 탭 저장
          const currentActiveTab = document.querySelector("[data-state='active'][role='tab']") as HTMLElement | null
          const currentActiveTabValue = currentActiveTab?.getAttribute("value")

          // 탭 활성화
          // tabTrigger.click()
          const tabSwitched = await switchToTab(tabId)
          if (!tabSwitched) {
            console.error(`Failed to switch to tab ${tabId}`)
            return null
          }

          // 차트 렌더링 대기
          await new Promise((resolve) => setTimeout(resolve, 3000))

          // 탭 컨텐츠 찾기
          const tabContent = document.querySelector(`[role="tabpanel"][data-state="active"]`) as HTMLElement | null
          if (!tabContent) {
            console.error(`Tab content for ${tabId} not found`)
            return null
          }

          // 컨텐츠 캡처
          const canvas = await html2canvas(tabContent, {
            scale: 1.5,
            useCORS: true,
            logging: false,
            backgroundColor: "rgb(31, 41, 55)",
            allowTaint: true,
          })

          // 이미지 데이터 저장
          const imageData = canvas.toDataURL("image/jpeg", 0.95)
          ;(window as any).tabCaptureImages[tabId] = imageData

          // 원래 탭으로 복원
          if (currentActiveTabValue) {
            const originalTab = document.querySelector(
              `[role="tab"][value="${currentActiveTabValue}"]`,
            ) as HTMLElement | null
            if (originalTab) {
              originalTab.click()
            }
          }

          return imageData
        } catch (error) {
          console.error(`Error capturing tab ${tabId}:`, error)
          return null
        } finally {
          setIsCapturing(false)
        }
      }

      // 모든 탭 캡처 함수 전역으로 노출
      ;(window as any).captureAllTabsForPdf = async () => {
        const tabIds = ["overview", "multiple-choice", "open-ended", "sentiment", "bugs", "cross-analysis", "insights"]

        for (const tabId of tabIds) {
          await (window as any).captureTabForPdf(tabId)
        }

        return (window as any).tabCaptureImages
      }
    }

    return () => {
      // 컴포넌트 언마운트 시 함수 제거
      if (typeof window !== "undefined") {
        delete (window as any).captureTabForPdf
        delete (window as any).captureAllTabsForPdf
      }
    }
  }, [])

  // 이 컴포넌트는 UI를 렌더링하지 않음
  return null
}
