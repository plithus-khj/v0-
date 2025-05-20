"use client"

import { Card, CardContent } from "@/components/ui/card"

export default function BugReports() {
  return (
    <div className="space-y-6 tab-content-bugs">
      <h2 className="text-2xl font-bold">버그 및 개선사항 정리</h2>
      <p className="text-gray-300 mb-4">총 14건의 버그 및 개선사항 보고</p>

      {/* 섹션 1: 버그 유형별 요약 */}
      <div className="mb-8">
        <div className="bg-blue-600 text-white py-3 px-4 rounded-t-lg font-bold text-lg flex items-center">
          <span className="mr-2">📊</span> 버그 유형별 요약
        </div>
        <Card className="rounded-t-none bg-gray-800 border-t-0 border-blue-600 border-2">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <div className="bg-red-500/20 p-2 rounded-full mr-3 mt-1">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">렉/성능 문제</h3>
                  <p className="text-gray-300 text-sm">
                    "게임 진행 도중 렉이 심하다", "버벅임", "화면 멈춤 발생" 등{" "}
                    <span className="text-white font-medium">다수</span> 보고됨
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-yellow-500/20 p-2 rounded-full mr-3 mt-1">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">게임 진행 불가</h3>
                  <p className="text-gray-300 text-sm">
                    "소포가 안 나와서 진행이 불가", "지도에 힌트가 없어 막힘" 등{" "}
                    <span className="text-white font-medium">일부</span> 보고됨
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-green-500/20 p-2 rounded-full mr-3 mt-1">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">시각 오류</h3>
                  <p className="text-gray-300 text-sm">
                    "캐릭터가 특정 지형에서 멈춤", "고드름이 떨어지지 않음" 등{" "}
                    <span className="text-white font-medium">적음</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-500/20 p-2 rounded-full mr-3 mt-1">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">버그 없음</h3>
                  <p className="text-gray-300 text-sm">
                    "특별한 버그는 발견되지 않았다", "전체적으로 깔끔했다" 등{" "}
                    <span className="text-white font-medium">다수</span>
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 섹션 2: 버그 상세 유형 및 개선 사항 */}
      <div className="mb-8">
        <div className="bg-purple-600 text-white py-3 px-4 rounded-t-lg font-bold text-lg flex items-center">
          <span className="mr-2">🛠️</span> 버그 상세 유형 및 개선 사항
        </div>
        <Card className="rounded-t-none bg-gray-800 border-t-0 border-purple-600 border-2">
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="min-w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-xl mr-4">
                  🎯
                </div>
                <div>
                  <h3 className="font-semibold text-red-400 text-lg mb-2">게임진행 불가 (6건)</h3>
                  <div className="space-y-2 pl-1">
                    <div className="flex items-start">
                      <span className="text-red-400 mr-2">•</span>
                      <p className="text-gray-300">
                        <span className="text-white font-medium">사례:</span> 튜토리얼 방식 불친절, 힌트 부족, 반복된
                        리소스 부족 등
                      </p>
                    </div>
                    <div className="flex items-start">
                      <span className="text-red-400 mr-2">•</span>
                      <p className="text-gray-300">
                        <span className="text-white font-medium">개선방안:</span> 튜토리얼 단계 보강, 구역별 자원 분포
                        밸런싱 → <span className="text-green-400 font-medium">✅ 즉시 개선 필요</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <div className="min-w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center text-xl mr-4">
                  🧭
                </div>
                <div>
                  <h3 className="font-semibold text-yellow-400 text-lg mb-2">UX 불편 (2건)</h3>
                  <div className="space-y-2 pl-1">
                    <div className="flex items-start">
                      <span className="text-yellow-400 mr-2">•</span>
                      <p className="text-gray-300">
                        <span className="text-white font-medium">사례:</span> 힌트/경고창이 ESC로만 닫히는 구조, 조작
                        흐름 단절
                      </p>
                    </div>
                    <div className="flex items-start">
                      <span className="text-yellow-400 mr-2">•</span>
                      <p className="text-gray-300">
                        <span className="text-white font-medium">개선방안:</span> 인터페이스 내 직관적 조작 지원 (X버튼
                        등 추가) → <span className="text-green-400 font-medium">✅ 즉시 개선 가능</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <div className="min-w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-xl mr-4">
                  🖼️
                </div>
                <div>
                  <h3 className="font-semibold text-blue-400 text-lg mb-2">시각적 오류 (2건)</h3>
                  <div className="space-y-2 pl-1">
                    <div className="flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      <p className="text-gray-300">
                        <span className="text-white font-medium">사례:</span> 화면 이동 시 카메라 고정, 고드름
                        애니메이션 미작동
                      </p>
                    </div>
                    <div className="flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      <p className="text-gray-300">
                        <span className="text-white font-medium">개선방안:</span> 맵 오브젝트 및 물리 반응 로직 점검 →{" "}
                        <span className="text-gray-400 font-medium">🛠 장기 개선 과제</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <div className="min-w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-xl mr-4">
                  🌀
                </div>
                <div>
                  <h3 className="font-semibold text-purple-400 text-lg mb-2">렉/지연/튕김 (4건)</h3>
                  <div className="space-y-2 pl-1">
                    <div className="flex items-start">
                      <span className="text-purple-400 mr-2">•</span>
                      <p className="text-gray-300">
                        <span className="text-white font-medium">사례:</span> 오브젝트 클릭 반응 지연, 몬스터와 상호작용
                        불일치
                      </p>
                    </div>
                    <div className="flex items-start">
                      <span className="text-purple-400 mr-2">•</span>
                      <p className="text-gray-300">
                        <span className="text-white font-medium">개선방안:</span> 최적화 패치, 인터랙션 방식 개선 →{" "}
                        <span className="text-yellow-400 font-medium">⏳ 중기 개선 항목</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 섹션 3: 개선 우선순위 */}
      <div>
        <div className="bg-green-600 text-white py-3 px-4 rounded-t-lg font-bold text-lg flex items-center">
          <span className="mr-2">📋</span> 개선 우선순위 및 로드맵
        </div>
        <Card className="rounded-t-none bg-gray-800 border-t-0 border-green-600 border-2">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="relative pl-8 pb-8 border-l-2 border-green-500">
                <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-green-500"></div>
                <h3 className="text-white font-semibold mb-2">1단계: 즉시 개선 (1주 이내)</h3>
                <ul className="space-y-1 text-gray-300">
                  <li className="flex items-center">
                    <span className="text-green-400 mr-2">✓</span> 튜토리얼 단계 보강 및 힌트 시스템 개선
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-400 mr-2">✓</span> UI 직관성 개선 (X버튼 추가, 조작 안내 등)
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-400 mr-2">✓</span> 구역별 자원 분포 밸런싱
                  </li>
                </ul>
              </div>

              <div className="relative pl-8 pb-8 border-l-2 border-yellow-500">
                <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-yellow-500"></div>
                <h3 className="text-white font-semibold mb-2">2단계: 중기 개선 (2-3주)</h3>
                <ul className="space-y-1 text-gray-300">
                  <li className="flex items-center">
                    <span className="text-yellow-400 mr-2">⟳</span> 성능 최적화 및 렉 개선
                  </li>
                  <li className="flex items-center">
                    <span className="text-yellow-400 mr-2">⟳</span> 인터랙션 방식 개선 및 반응성 향상
                  </li>
                </ul>
              </div>

              <div className="relative pl-8">
                <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-blue-500"></div>
                <h3 className="text-white font-semibold mb-2">3단계: 장기 개선 (출시 전)</h3>
                <ul className="space-y-1 text-gray-300">
                  <li className="flex items-center">
                    <span className="text-blue-400 mr-2">⚙️</span> 맵 오브젝트 및 물리 반응 로직 점검
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-400 mr-2">⚙️</span> 전체 게임 밸런스 최종 조정
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
