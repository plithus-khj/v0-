import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

export default function SurveyOverview() {
  // Gender distribution data
  const genderData = [
    { name: "남자", value: 49, percentage: "61%" },
    { name: "여자", value: 31, percentage: "39%" },
  ]

  // Age distribution data
  const ageData = [
    { name: "30대", value: 35, percentage: "44%" },
    { name: "20대", value: 34, percentage: "43%" },
    { name: "40대 이상", value: 7, percentage: "9%" },
    { name: "10대", value: 4, percentage: "5%" },
  ]

  // Game preference data
  const preferenceData = [
    { name: "매우 선호한다", value: 24, percentage: "30%" },
    { name: "선호한다", value: 43, percentage: "54%" },
    { name: "선호하지 않는다", value: 13, percentage: "16%" },
  ]

  // Play time distribution data
  const playTimeData = [
    { name: "40분 초과", value: 28, percentage: "35%" },
    { name: "31–40분", value: 29, percentage: "36%" },
    { name: "21–30분", value: 17, percentage: "21%" },
    { name: "10–20분", value: 6, percentage: "8%" },
  ]

  // Colors for charts - 이미지 참고하여 색상 변경
  const COLORS = ["#4D96FF", "#FF6B6B", "#FFD43B", "#4CAF50"]

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

  // 커스텀 레전드 렌더러
  const renderColorfulLegendText = (value, entry) => {
    return <span className="text-gray-300 text-sm">{value}</span>
  }

  return (
    <div className="space-y-6 tab-content-overview">
      <h2 className="text-2xl font-bold">아르뷔엔의 겨울 FGT 설문 데이터 요약</h2>
      <p className="text-gray-300">
        총 응답자 수: <span className="font-bold">80명</span> | 설문 문항 수: 객관식 12문항 + 주관식 8문항
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gender Distribution */}
        <Card className="bg-gray-800 border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-white">성별 분포</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-64 flex items-center justify-center">
              <div className="w-full max-w-[200px] aspect-square relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                    <Pie
                      data={genderData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="transparent"
                    >
                      {genderData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  <div className="text-3xl font-bold text-white">61%</div>
                  <div className="text-sm text-gray-400">남자</div>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <div className="flex justify-center space-x-6">
                {genderData.map((entry, index) => (
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

        {/* Age Distribution */}
        <Card className="bg-gray-800 border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-white">연령대 분포</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-64 flex items-center justify-center">
              <div className="w-full max-w-[200px] aspect-square relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                    <Pie
                      data={ageData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="transparent"
                    >
                      {ageData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  <div className="text-3xl font-bold text-white">44%</div>
                  <div className="text-sm text-gray-400">30대</div>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <div className="grid grid-cols-2 gap-2">
                {ageData.map((entry, index) => (
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

        {/* Game Preference */}
        <Card className="bg-gray-800 border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-white">해당 게임 장르 선호도</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-64 flex items-center justify-center">
              <div className="w-full max-w-[200px] aspect-square relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                    <Pie
                      data={preferenceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="transparent"
                    >
                      {preferenceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  <div className="text-3xl font-bold text-white">84%</div>
                  <div className="text-sm text-gray-400">선호</div>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <div className="grid grid-cols-1 gap-2">
                {preferenceData.map((entry, index) => (
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

        {/* Play Time Distribution */}
        <Card className="bg-gray-800 border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-white">플레이 타임 분포</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-64 flex items-center justify-center">
              <div className="w-full max-w-[200px] aspect-square relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                    <Pie
                      data={playTimeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="transparent"
                    >
                      {playTimeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  <div className="text-3xl font-bold text-white">71%</div>
                  <div className="text-sm text-gray-400">31분↑</div>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <div className="grid grid-cols-2 gap-2">
                {playTimeData.map((entry, index) => (
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
      </div>
    </div>
  )
}
