"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// 각 탭의 정적 내용을 생성하는 컴포넌트
export default function StaticTabContent({ tabId }: { tabId: string }) {
  switch (tabId) {
    case "overview":
      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">아르뷔엔의 겨울 FGT 설문 데이터 요약</h2>
          <p className="text-gray-300">
            총 응답자 수: <span className="font-bold">80명</span> | 설문 문항 수: 객관식 12문항 + 주관식 8문항
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gray-700">
              <CardHeader>
                <CardTitle className="text-lg">성별 분포</CardTitle>
              </CardHeader>
              <CardContent>
                <p>남자: 61% (49명), 여자: 39% (31명)</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-700">
              <CardHeader>
                <CardTitle className="text-lg">연령대 분포</CardTitle>
              </CardHeader>
              <CardContent>
                <p>30대: 44% (35명), 20대: 43% (34명), 40대 이상: 9% (7명), 10대: 5% (4명)</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-700">
              <CardHeader>
                <CardTitle className="text-lg">해당 게임 장르 선호도</CardTitle>
              </CardHeader>
              <CardContent>
                <p>매우 선호한다: 30% (24명), 선호한다: 54% (43명), 선호하지 않는다: 16% (13명)</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-700">
              <CardHeader>
                <CardTitle className="text-lg">플레이 타임 분포</CardTitle>
              </CardHeader>
              <CardContent>
                <p>40분 초과: 35% (28명), 31–40분: 36% (29명), 21–30분: 21% (17명), 10–20분: 8% (6명)</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )

    case "multiple-choice":
      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">아르뷔엔의 겨울 FGT 설문 객관식 응답 정리</h2>
          <p className="text-gray-300">총 응답자: 80명</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gray-700">
              <CardHeader>
                <CardTitle className="text-lg">별점 분포</CardTitle>
              </CardHeader>
              <CardContent>
                <p>5점: 24% (19명), 4점: 50% (40명), 3점: 19% (15명), 2점: 7% (6명)</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-700">
              <CardHeader>
                <CardTitle className="text-lg">지속적 플레이·지인 추천 의향</CardTitle>
              </CardHeader>
              <CardContent>
                <p>매우 긍정: 24% (19명), 긍정: 56% (45명), 부정: 19% (15명), 매우 부정: 1% (1명)</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-700 col-span-1 md:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">콘텐츠 만족도</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>튜토리얼: 매우만족 19명, 만족 46명, 불만족 15명, 매우불만족 0명</li>
                  <li>그래픽: 매우만족 40명, 만족 35명, 불만족 5명, 매우불만족 0명</li>
                  <li>밸런스: 매우만족 9명, 만족 34명, 불만족 30명, 매우불만족 7명</li>
                  <li>조작감/UI: 매우만족 23명, 만족 33명, 불만족 21명, 매우불만족 3명</li>
                  <li>스토리/연출: 매우만족 38명, 만족 30명, 불만족 11명, 매우불만족 1명</li>
                  <li>오브젝트 밀도: 매우만족 4명, 만족 29명, 불만족 35명, 매우불만족 12명</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      )

    // 다른 탭에 대한 정적 내용도 추가할 수 있습니다
    default:
      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">탭 내용을 불러올 수 없습니다</h2>
          <p className="text-gray-300">해당 탭의 내용을 표시할 수 없습니다.</p>
        </div>
      )
  }
}
