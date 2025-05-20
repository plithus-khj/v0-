import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function SentimentAnalysis() {
  // Sentiment data for chart
  const sentimentData = [
    {
      name: "튜토리얼 만족도",
      긍정: 21,
      부정: 5,
      혼합: 2,
      중립: 11,
    },
    {
      name: "그래픽 만족도",
      긍정: 31,
      부정: 1,
      혼합: 1,
      중립: 10,
    },
    {
      name: "밸런스 만족도",
      긍정: 17,
      부정: 11,
      혼합: 1,
      중립: 14,
    },
    {
      name: "재미 요소",
      긍정: 26,
      부정: 3,
      혼합: 2,
      중립: 13,
    },
    {
      name: "이탈 요소",
      긍정: 4,
      부정: 27,
      혼합: 4,
      중립: 15,
    },
  ]

  // Colors for sentiment chart - 이미지 참고하여 색상 변경
  const SENTIMENT_COLORS = {
    긍정: "#4D96FF",
    부정: "#FF6B6B",
    혼합: "#FFD43B",
    중립: "#9E9E9E",
  }

  // 커스텀 바 차트 툴팁
  const BarChartTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 p-2 border border-gray-700 rounded-md shadow-md">
          <p className="text-white font-medium">{label}</p>
          {payload.map((entry, index) => (
            <p key={`item-${index}`} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}명`}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6 tab-content-sentiment">
      <h2 className="text-2xl font-bold">감성 분류 (긍정/부정 응답)</h2>

      <Card className="bg-gray-800 border-0">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-white">문항별 감성 분류 결과</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={sentimentData}
                layout="vertical"
                margin={{
                  top: 20,
                  right: 30,
                  left: 120,
                  bottom: 20,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#444" horizontal={false} />
                <XAxis type="number" stroke="#aaa" />
                <YAxis
                  dataKey="name"
                  type="category"
                  width={120}
                  stroke="#aaa"
                  tick={{ fill: "#fff" }}
                  axisLine={false}
                />
                <Tooltip content={<BarChartTooltip />} />
                <Bar dataKey="긍정" fill={SENTIMENT_COLORS.긍정} radius={[0, 0, 0, 0]} />
                <Bar dataKey="부정" fill={SENTIMENT_COLORS.부정} radius={[0, 0, 0, 0]} />
                <Bar dataKey="혼합" fill={SENTIMENT_COLORS.혼합} radius={[0, 0, 0, 0]} />
                <Bar dataKey="중립" fill={SENTIMENT_COLORS.중립} radius={[0, 0, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex justify-center space-x-6">
            {Object.entries(SENTIMENT_COLORS).map(([key, color], index) => (
              <div key={`legend-${index}`} className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: color }}></div>
                <span className="text-sm text-gray-300">{key}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-0">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-white">요약 인사이트</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2 pl-4 text-gray-300">
            <li>전반적으로 그래픽과 재미 요소, 튜토리얼 관련 문항에서는 긍정 응답 비율이 높게 나타남</li>
            <li>
              반면 '이탈 요소' 관련 문항은 부정 응답이 월등히 많아, UX 문제나 진행 동선의 불친절함이 주요 이슈로 분석됨
            </li>
            <li>특히, 이탈 지점에서 힌트 부족, 방향성 안내 미흡, 버벅임 등이 자주 언급됨</li>
            <li>
              밸런스에 대한 의견은 긍정과 부정이 혼재되어 있어, 난이도 편차나 특정 구간의 밸런스 문제가 존재함을 시사
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
