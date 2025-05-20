"use client"

import type React from "react"

import { useEffect, useState } from "react"
import SurveyOverview from "@/components/survey-overview"
import MultipleChoiceResults from "@/components/multiple-choice-results"
import OpenEndedResults from "@/components/open-ended-results"
import BugReports from "@/components/bug-reports"
import CrossAnalysis from "@/components/cross-analysis"
import SentimentAnalysis from "@/components/sentiment-analysis"
import AdditionalInsights from "@/components/additional-insights"
import { setRendered } from "@/lib/global-temp"

// 오프스크린에서 모든 탭 내용을 렌더링하고 캡처하는 컴포넌트
export default function OffscreenTabsRenderer() {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // 컴포넌트가 마운트된 후 약간의 지연을 두고 준비 상태로 설정
    const timer = setTimeout(() => {
      setIsReady(true)
      console.log("OffscreenTabsRenderer is ready")

      // 차트 렌더링을 위한 추가 시간
      setTimeout(() => {
        // 모든 차트에 렌더링 완료 클래스 추가
        const charts = document.querySelectorAll(
          "#offscreen-tabs-container .recharts-wrapper, #offscreen-tabs-container .recharts-surface",
        )
        charts.forEach((chart) => {
          if (chart instanceof HTMLElement) {
            chart.classList.add("chart-rendered")
            console.log("Chart marked as rendered:", chart.id || "unnamed chart")
          }
        })
        console.log(`Marked ${charts.length} charts as rendered`)
        setRendered(true)
      }, 1500) // 차트 렌더링을 위한 3초 추가 대기
    }, 1500) // 초기 준비 시간을 2초로 설정

    return () => {
      clearTimeout(timer)
    }
  }, [])

  // 아직 준비되지 않았으면 아무것도 렌더링하지 않음
  if (!isReady) return null

  // 오프스크린 렌더링을 위한 스타일
  const offscreenStyle: React.CSSProperties = {
    position: "fixed",
    top: "-9999px",
    left: "-9999px",
    width: "800px", // 충분한 너비
    background: "rgb(31, 41, 55)",
    padding: "20px",
    color: "white",
    zIndex: -1000,
    visibility: "hidden",
    overflow: "visible",
    opacity: 1, // 투명도를 1로 설정하여 렌더링이 제대로 되도록 함
    display: "block", // 요소가 렌더링되도록 block으로 설정
  }

  // 각 탭 컨텐츠에 대한 공통 스타일
  const contentStyle: React.CSSProperties = {
    width: "100%",
    background: "rgb(31, 41, 55)",
    padding: "20px",
    color: "white",
    marginBottom: "50px",
    opacity: 1,
    visibility: "visible",
    display: "block",
  }

  return (
    <div style={offscreenStyle} id="offscreen-tabs-container">
      {/* 각 탭의 내용을 오프스크린에 렌더링 */}
      <div id="offscreen-overview" style={contentStyle}>
        <SurveyOverview />
      </div>

      <div id="offscreen-multiple-choice" style={contentStyle}>
        <MultipleChoiceResults />
      </div>

      <div id="offscreen-open-ended" style={contentStyle}>
        <OpenEndedResults />
      </div>

      <div id="offscreen-sentiment" style={contentStyle}>
        <SentimentAnalysis />
      </div>

      <div id="offscreen-bugs" style={contentStyle}>
        <BugReports />
      </div>

      <div id="offscreen-cross-analysis" style={contentStyle}>
        <CrossAnalysis />
      </div>

      <div id="offscreen-insights" style={contentStyle}>
        <AdditionalInsights />
      </div>
    </div>
  )
}
