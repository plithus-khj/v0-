"use client"

import type React from "react"

import { useRef, useEffect, forwardRef } from "react"

interface ChartWrapperProps {
  id: string
  children: React.ReactNode
  className?: string
}

// 차트를 감싸는 컴포넌트
const ChartWrapper = forwardRef<HTMLDivElement, ChartWrapperProps>(({ id, children, className }, ref) => {
  const localRef = useRef<HTMLDivElement>(null)
  const actualRef = (ref as React.RefObject<HTMLDivElement>) || localRef

  useEffect(() => {
    // 차트가 렌더링된 후 PDF 생성 컴포넌트에 등록
    const registerChart = (window as any).registerChart
    if (typeof registerChart === "function" && actualRef.current) {
      registerChart(id, actualRef.current)
    }
  }, [id, actualRef])

  return (
    <div ref={actualRef} id={`chart-${id}`} className={className} data-chart-id={id}>
      {children}
    </div>
  )
})

ChartWrapper.displayName = "ChartWrapper"

export default ChartWrapper
