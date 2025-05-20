"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SurveyOverview from "@/components/survey-overview"
import MultipleChoiceResults from "@/components/multiple-choice-results"
import OpenEndedResults from "@/components/open-ended-results"
import SentimentAnalysis from "@/components/sentiment-analysis"
import BugReports from "@/components/bug-reports"
import CrossAnalysis from "@/components/cross-analysis"
import AdditionalInsights from "@/components/additional-insights"
import FeedbackViewer from "@/components/feedback-viewer"
import PdfExportButton from "@/components/pdf-export-button"
import OffscreenTabsRenderer from "@/components/offscreen-tabs-renderer"
import Image from "next/image"
import { Monitor } from "lucide-react"

export default function Home() {
  const [activeTab, setActiveTab] = useState("overview")

  // 전역 상태 설정 함수 노출
  if (typeof window !== "undefined") {
    ; (window as any).setActiveTab = setActiveTab
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      {/* 상단 네비게이션 바 */}
      <nav className="bg-gray-900 border-b border-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div>
            <Image
              src="/white-logo.svg"
              alt="Plithus"
              width={100}
              height={29}
            />
          </div>
          <div className="text-2xl font-medium font-bold">아르뷔엔의 겨울 테스트 개요</div>
          <PdfExportButton />
        </div>
      </nav>

      {/* 게임 정보 섹션 */}
      <div className="bg-gray-900 border-b border-gray-800 py-6">
        <div className="max-w-7xl mx-auto p-4 md:p-8 flex items-center">
          {/* 게임 이미지 */}
          <div className="flex-shrink-0 mr-20">
            <div className="w-40 h-40 rounded-md overflow-hidden">
              <Image
                src="/game-logo.png"
                alt="아르뷔엔의 겨울"
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* 게임 기본 정보 */}
          <div className="flex-1 grid grid-cols-3 gap-2">
            {/* 첫 번째 열 */}
            <div className="space-y-4">
              <div>
                <div className="text-gray-400 text-sm">게임 이름</div>
                <div className="font-medium">아르뷔엔의 겨울</div>
              </div>
              <div>
                <div className="text-gray-400 text-sm">게임사 이름</div>
                <div className="font-medium">오르투스게임즈</div>
              </div>
              <div>
                <div className="text-gray-400 text-sm">테스트 날짜</div>
                <div className="font-medium">2025.04.30 - 2025.05.07</div>
              </div>
            </div>

            {/* 두 번째 열 */}
            <div className="space-y-4">
              <div>
                <div className="text-gray-400 text-sm">테스트 기기</div>
                <div className="font-medium flex items-center">
                  <Monitor className="w-4 h-4 mr-1" />
                  윈도우 PC
                </div>
              </div>
              <div>
                <div className="text-gray-400 text-sm">장르</div>
                <div className="font-medium">스토리, 어드벤처, 전략</div>
              </div>
            </div>

            {/* 세 번째 열 */}
            <div className="space-y-4">
              <div>
                <div className="text-gray-400 text-sm">테스트 문항 수</div>
                <div className="font-medium">20개</div>
              </div>
              <div>
                <div className="text-gray-400 text-sm">테스트 참여 수</div>
                <div className="font-medium">80명</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 탭 컨텐츠 */}
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-64 md:sticky md:top-4 self-start">
              <TabsList className="flex-col h-auto bg-transparent space-y-2 w-full overflow-y-auto max-h-[calc(100vh-200px)]">
                <TabsTrigger
                  value="overview"
                  className="w-full justify-start tab-trigger-overview"
                  data-active={activeTab === "overview"}
                  id="tab-overview"
                >
                  1. 설문 개요
                </TabsTrigger>
                <TabsTrigger
                  value="multiple-choice"
                  className="w-full justify-start tab-trigger-multiple-choice"
                  data-active={activeTab === "multiple-choice"}
                  id="tab-multiple-choice"
                >
                  2. 객관식 응답 정리
                </TabsTrigger>
                <TabsTrigger
                  value="open-ended"
                  className="w-full justify-start tab-trigger-open-ended"
                  data-active={activeTab === "open-ended"}
                  id="tab-open-ended"
                >
                  3. 주관식 내용 요약
                </TabsTrigger>
                <TabsTrigger
                  value="sentiment"
                  className="w-full justify-start tab-trigger-sentiment"
                  data-active={activeTab === "sentiment"}
                  id="tab-sentiment"
                >
                  4. 감성 분류
                </TabsTrigger>
                <TabsTrigger
                  value="bugs"
                  className="w-full justify-start tab-trigger-bugs"
                  data-active={activeTab === "bugs"}
                  id="tab-bugs"
                >
                  5. 버그 및 개선사항
                </TabsTrigger>
                <TabsTrigger
                  value="cross-analysis"
                  className="w-full justify-start tab-trigger-cross-analysis"
                  data-active={activeTab === "cross-analysis"}
                  id="tab-cross-analysis"
                >
                  6. 교차분석 정리
                </TabsTrigger>
                <TabsTrigger
                  value="insights"
                  className="w-full justify-start tab-trigger-insights"
                  data-active={activeTab === "insights"}
                  id="tab-insights"
                >
                  7. 기타 인사이트
                </TabsTrigger>
                <TabsTrigger
                  value="feedback-viewer"
                  className="w-full justify-start tab-trigger-feedback-viewer"
                  data-active={activeTab === "feedback-viewer"}
                  id="tab-feedback-viewer"
                >
                  8. 유저 피드백 뷰어
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1">
              <TabsContent value="overview" className="mt-0 tab-content-overview" id="content-overview">
                <SurveyOverview />
              </TabsContent>
              <TabsContent
                value="multiple-choice"
                className="mt-0 tab-content-multiple-choice"
                id="content-multiple-choice"
              >
                <MultipleChoiceResults />
              </TabsContent>
              <TabsContent value="open-ended" className="mt-0 tab-content-open-ended" id="content-open-ended">
                <OpenEndedResults />
              </TabsContent>
              <TabsContent value="sentiment" className="mt-0 tab-content-sentiment" id="content-sentiment">
                <SentimentAnalysis />
              </TabsContent>
              <TabsContent value="bugs" className="mt-0 tab-content-bugs" id="content-bugs">
                <BugReports />
              </TabsContent>
              <TabsContent
                value="cross-analysis"
                className="mt-0 tab-content-cross-analysis"
                id="content-cross-analysis"
              >
                <CrossAnalysis />
              </TabsContent>
              <TabsContent value="insights" className="mt-0 tab-content-insights" id="content-insights">
                <AdditionalInsights />
              </TabsContent>
              <TabsContent
                value="feedback-viewer"
                className="mt-0 tab-content-feedback-viewer"
                id="content-feedback-viewer"
              >
                <FeedbackViewer />
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>

      {/* 오프스크린 탭 렌더러 */}
      <OffscreenTabsRenderer />
    </main>
  )
}
