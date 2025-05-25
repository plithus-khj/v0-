import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

export default function MultipleChoiceResults() {
  // Star rating data
  const ratingData = [
    { name: "5점", value: 19, percentage: "24%" },
    { name: "4점", value: 40, percentage: "50%" },
    { name: "3점", value: 15, percentage: "19%" },
    { name: "2점", value: 6, percentage: "7%" },
  ]

  // Satisfaction data for bar chart
  const satisfactionData = [
    {
      name: "튜토리얼",
      매우만족: 19,
      만족: 46,
      불만족: 15,
      매우불만족: 0,
    },
    {
      name: "그래픽",
      매우만족: 40,
      만족: 35,
      불만족: 5,
      매우불만족: 0,
    },
    {
      name: "밸런스",
      매우만족: 9,
      만족: 34,
      불만족: 30,
      매우불만족: 7,
    },
    {
      name: "조작감/UI",
      매우만족: 23,
      만족: 33,
      불만족: 21,
      매우불만족: 3,
    },
    {
      name: "스토리/연출",
      매우만족: 38,
      만족: 30,
      불만족: 11,
      매우불만족: 1,
    },
    {
      name: "오브젝트 밀도",
      매우만족: 4,
      만족: 29,
      불만족: 35,
      매우불만족: 12,
    },
  ]

  // Recommendation intention data
  const recommendData = [
    { name: "매우 긍정", value: 19, percentage: "24%" },
    { name: "긍정", value: 45, percentage: "56%" },
    { name: "부정", value: 15, percentage: "19%" },
    { name: "매우 부정", value: 1, percentage: "1%" },
  ]

  // Colors for charts - 이미지 참고하여 색상 변경
  const COLORS = ["#4D96FF", "#4CAF50", "#FFD43B", "#FF6B6B"]
  const SATISFACTION_COLORS = ["#4CAF50", "#8BC34A", "#FFC107", "#F44336"]

  // 커스텀 툴팁 스타일
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 p-2 border border-gray-700 rounded-md shadow-md">
          <p className="text-white font-medium">{`${payload[0].name}: ${payload[0].value}명 (${payload[0].payload.percentage})`}</p>
        </div>
      )
    }
    return null
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
    <div className="space-y-6 tab-content-multiple-choice">
      <h2 className="text-2xl font-bold">아르뷔엔의 겨울 FGT 설문 객관식 응답 정리</h2>
      <p className="text-gray-300">총 응답자: 80명</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Star Rating Distribution */}
        <Card className="bg-gray-800 border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-white">별점 분포</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-64 flex items-center justify-center">
              <div className="w-full max-w-[200px] aspect-square relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                    <Pie
                      data={ratingData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="transparent"
                    >
                      {ratingData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  <div className="text-3xl font-bold text-white">4.0</div>
                  <div className="text-sm text-gray-400">평균</div>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <div className="grid grid-cols-2 gap-2">
                {ratingData.map((entry, index) => (
                  <div key={`legend-${index}`} className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <span className="text-sm text-gray-300">{`${entry.name} ${entry.percentage}`}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recommendation Intention */}
        <Card className="bg-gray-800 border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-white">지속적 플레이·지인 추천 의향</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-64 flex items-center justify-center">
              <div className="w-full max-w-[200px] aspect-square relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                    <Pie
                      data={recommendData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="transparent"
                    >
                      {recommendData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  <div className="text-3xl font-bold text-white">80%</div>
                  <div className="text-sm text-gray-400">긍정</div>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <div className="grid grid-cols-2 gap-2">
                {recommendData.map((entry, index) => (
                  <div key={`legend-${index}`} className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <span className="text-sm text-gray-300">{`${entry.name} ${entry.percentage}`}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Satisfaction Metrics */}
        <Card className="bg-gray-800 border-0 col-span-1 md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-white">콘텐츠 만족도</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={satisfactionData}
                  layout="vertical"
                  margin={{
                    top: 20,
                    right: 30,
                    left: 100,
                    bottom: 20,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" horizontal={false} />
                  <XAxis type="number" stroke="#aaa" />
                  <YAxis
                    dataKey="name"
                    type="category"
                    width={100}
                    stroke="#aaa"
                    tick={{ fill: "#fff" }}
                    axisLine={false}
                  />
                  <Tooltip content={<BarChartTooltip />} />
                  <Bar dataKey="매우만족" stackId="a" fill={SATISFACTION_COLORS[0]} radius={[0, 0, 0, 0]} />
                  <Bar dataKey="만족" stackId="a" fill={SATISFACTION_COLORS[1]} radius={[0, 0, 0, 0]} />
                  <Bar dataKey="불만족" stackId="a" fill={SATISFACTION_COLORS[2]} radius={[0, 0, 0, 0]} />
                  <Bar dataKey="매우불만족" stackId="a" fill={SATISFACTION_COLORS[3]} radius={[0, 0, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex justify-center space-x-6">
              {["매우만족", "만족", "불만족", "매우불만족"].map((item, index) => (
                <div key={`legend-${index}`} className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: SATISFACTION_COLORS[index] }}
                  ></div>
                  <span className="text-sm text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
