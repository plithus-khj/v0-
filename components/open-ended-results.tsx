"use client"

import { Card, CardContent } from "@/components/ui/card"

export default function OpenEndedResults() {
  return (
    <div className="space-y-6 tab-content-open-ended">
      <h2 className="text-2xl font-bold">주관식 내용 요약 (워드클라우드 & 반복 의견 + 인사이트)</h2>
      <p className="text-gray-300 mb-4">유저 피드백 분석을 통한 주관식 응답 요약</p>

      {/* 섹션 1: 워드클라우드 분석 */}
      <div className="mb-8">
        <div className="bg-blue-600 text-white py-3 px-4 rounded-t-lg font-bold text-lg flex items-center">
          <span className="mr-2 text-xl">📌</span> 워드클라우드 분석
        </div>
        <Card className="rounded-t-none bg-gray-800 border-t-0 border-blue-600 border-2">
          <CardContent className="pt-6">
            <p className="mb-4 text-gray-300">각 문항별 주요 키워드는 다음과 같습니다:</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <div className="bg-purple-500/20 p-2 rounded-full mr-3 mt-1">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">튜토리얼 만족도</h3>
                  <p className="text-gray-300 text-sm">"설명", "자연스럽다", "진입", "흐름", "헷갈림"</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-green-500/20 p-2 rounded-full mr-3 mt-1">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">그래픽 만족도</h3>
                  <p className="text-gray-300 text-sm">"분위기", "아름답다", "동화 같다", "캐릭터", "맵 디자인"</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-yellow-500/20 p-2 rounded-full mr-3 mt-1">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">밸런스 만족도</h3>
                  <p className="text-gray-300 text-sm">"난이도", "단서", "추리", "방해 요소", "힌트"</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-500/20 p-2 rounded-full mr-3 mt-1">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">재미 요소</h3>
                  <p className="text-gray-300 text-sm">"찾기", "탐색", "추리게임", "단서 활용", "몰입"</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-red-500/20 p-2 rounded-full mr-3 mt-1">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">이탈 요소</h3>
                  <p className="text-gray-300 text-sm">"진행 막힘", "힌트 부족", "렉", "답답함", "방향성 부족"</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 섹션 2: 반복 언급된 의견 */}
      <div className="mb-8">
        <div className="bg-green-600 text-white py-3 px-4 rounded-t-lg font-bold text-lg flex items-center">
          <span className="mr-2 text-xl">🧾</span> 반복 언급된 의견 (Top 5)
        </div>
        <Card className="rounded-t-none bg-gray-800 border-t-0 border-green-600 border-2">
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="min-w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-xl mr-4">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-white text-lg mb-2">그래픽/분위기 만족</h3>
                  <p className="text-gray-300 pl-1">아트 스타일, 배경, 사운드 등에서 몰입감이 좋다는 반응 다수</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="min-w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-xl mr-4">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-white text-lg mb-2">단서 찾기 재미</h3>
                  <p className="text-gray-300 pl-1">단서 수집과 퍼즐 구성에서 흥미롭다는 피드백 많음</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="min-w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-xl mr-4">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-white text-lg mb-2">렉 발생과 인터랙션 문제</h3>
                  <p className="text-gray-300 pl-1">일부 구간에서 클릭 반응 지연이나 렉 문제 제기</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="min-w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-xl mr-4">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-white text-lg mb-2">진행 막힘</h3>
                  <p className="text-gray-300 pl-1">특정 구간에서 힌트 부족이나 길 찾기 어려움 호소</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="min-w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center text-xl mr-4">
                  5
                </div>
                <div>
                  <h3 className="font-semibold text-white text-lg mb-2">튜토리얼 혼란</h3>
                  <p className="text-gray-300 pl-1">설명 부족 또는 자연스럽지 못한 튜토리얼 흐름 지적</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 섹션 3: 종합 인사이트 */}
      <div>
        <div className="bg-purple-600 text-white py-3 px-4 rounded-t-lg font-bold text-lg flex items-center">
          <span className="mr-2 text-xl">🔍</span> 종합 인사이트
        </div>
        <Card className="rounded-t-none bg-gray-800 border-t-0 border-purple-600 border-2">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-purple-500/20 p-2 rounded-full mr-3 mt-1">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                </div>
                <div>
                  <p className="text-gray-300">
                    <span className="text-white font-medium">
                      유저는 '분위기'와 '탐색 기반의 추리 요소'를 강점으로 인식하고 있음
                    </span>{" "}
                    → 유지 및 강조 필요
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-purple-500/20 p-2 rounded-full mr-3 mt-1">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                </div>
                <div>
                  <p className="text-gray-300">
                    <span className="text-white font-medium">
                      UX 전반(힌트, 안내, 인터랙션)의 개선이 플레이 지속성과 이탈률에 큰 영향을 미침
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-purple-500/20 p-2 rounded-full mr-3 mt-1">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                </div>
                <div>
                  <p className="text-gray-300">
                    <span className="text-white font-medium">
                      튜토리얼과 초반 진입 설계가 다소 부족한 것으로 나타나
                    </span>
                    , 첫인상 개선을 위한 구조 보완 필요
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-purple-500/20 p-2 rounded-full mr-3 mt-1">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                </div>
                <div>
                  <p className="text-gray-300">
                    <span className="text-white font-medium">렉/지연 반응 등의 기술적 문제는</span> 테스트 환경이나
                    최적화 개선을 통해 해소 가능성 있음
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
