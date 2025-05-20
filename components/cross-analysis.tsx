import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts"

export default function CrossAnalysis() {
  // Gender × Genre Preference Satisfaction
  const genderGenreData = [
    { name: "매우 선호한다", 남자: 4.64, 여자: 4.7 },
    { name: "선호한다", 남자: 4.4, 여자: 4.28 },
    { name: "선호하지 않는다", 남자: 4.1, 여자: 3.33 },
  ]

  // Age × Genre Preference Satisfaction
  const ageGenreData = [
    { name: "10대", "매우 선호한다": 5.0, "선호하지 않는다": 4.5, 선호한다: 0 },
    { name: "20대", "매우 선호한다": 4.83, "선호하지 않는다": 3.8, 선호한다: 4.29 },
    { name: "30대", "매우 선호한다": 4.38, "선호하지 않는다": 3.8, 선호한다: 4.36 },
    { name: "40대 이상", "매우 선호한다": 4.5, "선호하지 않는다": 4.0, 선호한다: 4.5 },
  ]

  // Gender × Content Satisfaction
  const genderContentData = [
    { name: "그래픽 만족도", 남자: 4.41, 여자: 4.32 },
    { name: "밸런스 만족도", 남자: 3.04, 여자: 3.19 },
    { name: "조작감 만족도", 남자: 3.73, 여자: 3.52 },
    { name: "튜토리얼 만족도", 남자: 3.78, 여자: 4.0 },
  ]

  // Age × Overall Satisfaction (Star Rating)
  const ageRatingData = [
    { name: "10대", 별점: 4.5 },
    { name: "20대", 별점: 3.97 },
    { name: "30대", 별점: 3.89 },
    { name: "40대 이상", 별점: 3.29 },
  ]

  // Radar chart data for 20s female vs 30s male comparison
  const comparisonData = [
    { subject: "조작감 만족도", "20대 여성": 3.32, "30대 남성": 3.62 },
    { subject: "그래픽 만족도", "20대 여성": 4.37, "30대 남성": 4.31 },
    { subject: "밸런스 만족도", "20대 여성": 3.15, "30대 남성": 3.05 },
    { subject: "튜토리얼 만족도", "20대 여성": 3.95, "30대 남성": 3.75 },
    { subject: "스토리 만족도", "20대 여성": 4.25, "30대 남성": 4.15 },
  ]

  // Scatter plot data for playtime vs satisfaction
  const scatterData = [
    { x: 15, y: 3.8, z: 6, name: "10-20분" },
    { x: 25, y: 4.1, z: 17, name: "21-30분" },
    { x: 35, y: 4.3, z: 29, name: "31-40분" },
    { x: 45, y: 4.5, z: 28, name: "40분 초과" },
  ]

  // 커스텀 툴팁 스타일
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 p-2 border border-gray-700 rounded-md shadow-md">
          <p className="text-white font-medium">{label}</p>
          {payload.map((entry, index) => (
            <p key={`item-${index}`} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6 tab-content-cross-analysis">
      <h2 className="text-2xl font-bold">교차분석 정리 (시각화)</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gender × Genre Preference Satisfaction */}
        <Card className="bg-gray-800 border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-white">성별 × 장르 선호도 만족도</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={genderGenreData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 30,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="name" stroke="#aaa" tick={{ fill: "#fff" }} height={50} tickMargin={10} />
                  <YAxis domain={[0, 5]} stroke="#aaa" tick={{ fill: "#fff" }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="남자" fill="#4D96FF" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="여자" fill="#FF6B6B" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 flex justify-center space-x-6">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: "#4D96FF" }}></div>
                <span className="text-sm text-gray-300">남자</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: "#FF6B6B" }}></div>
                <span className="text-sm text-gray-300">여자</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Age × Overall Satisfaction (Star Rating) */}
        <Card className="bg-gray-800 border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-white">연령대 × 종합 만족도(별점)</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={ageRatingData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 30,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="name" stroke="#aaa" tick={{ fill: "#fff" }} height={50} tickMargin={10} />
                  <YAxis domain={[0, 5]} stroke="#aaa" tick={{ fill: "#fff" }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="별점"
                    stroke="#4D96FF"
                    strokeWidth={3}
                    dot={{ r: 6, fill: "#4D96FF" }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Gender × Content Satisfaction */}
        <Card className="bg-gray-800 border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-white">성별 × 콘텐츠 만족도</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={genderContentData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 30,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis
                    dataKey="name"
                    stroke="#aaa"
                    tick={{ fill: "#fff" }}
                    height={50}
                    tickMargin={10}
                    interval={0}
                    angle={-15}
                  />
                  <YAxis domain={[0, 5]} stroke="#aaa" tick={{ fill: "#fff" }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="남자" fill="#4D96FF" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="여자" fill="#FF6B6B" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 flex justify-center space-x-6">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: "#4D96FF" }}></div>
                <span className="text-sm text-gray-300">남자</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: "#FF6B6B" }}></div>
                <span className="text-sm text-gray-300">여자</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 20s Female vs 30s Male Comparison (Radar Chart) */}
        <Card className="bg-gray-800 border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-white">20대 여성 vs 30대 남성 비교</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={comparisonData}>
                  <PolarGrid stroke="#444" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: "#fff", fontSize: 11 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 5]} tick={{ fill: "#fff" }} />
                  <Radar name="20대 여성" dataKey="20대 여성" stroke="#FF6B6B" fill="#FF6B6B" fillOpacity={0.6} />
                  <Radar name="30대 남성" dataKey="30대 남성" stroke="#4D96FF" fill="#4D96FF" fillOpacity={0.6} />
                  <Tooltip content={<CustomTooltip />} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 flex justify-center space-x-6">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: "#FF6B6B" }}></div>
                <span className="text-sm text-gray-300">20대 여성</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: "#4D96FF" }}></div>
                <span className="text-sm text-gray-300">30대 남성</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Age × Genre Preference Satisfaction */}
        <Card className="bg-gray-800 border-0 col-span-1 md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-white">연령대 × 장르 선호도 만족도</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={ageGenreData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 30,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="name" stroke="#aaa" tick={{ fill: "#fff" }} height={50} tickMargin={10} />
                  <YAxis domain={[0, 5]} stroke="#aaa" tick={{ fill: "#fff" }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="매우 선호한다" fill="#4D96FF" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="선호한다" fill="#4CAF50" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="선호하지 않는다" fill="#FFD43B" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 flex justify-center space-x-6">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: "#4D96FF" }}></div>
                <span className="text-sm text-gray-300">매우 선호한다</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: "#4CAF50" }}></div>
                <span className="text-sm text-gray-300">선호한다</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: "#FFD43B" }}></div>
                <span className="text-sm text-gray-300">선호하지 않는다</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Playtime vs Satisfaction Scatter Plot */}
        <Card className="bg-gray-800 border-0 col-span-1 md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-white">플레이타임 × 만족도 관계</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 30,
                  }}
                >
                  <CartesianGrid stroke="#444" />
                  <XAxis
                    type="number"
                    dataKey="x"
                    name="플레이타임 (분)"
                    stroke="#aaa"
                    tick={{ fill: "#fff" }}
                    domain={[0, 50]}
                    label={{ value: "플레이타임 (분)", position: "bottom", fill: "#fff", offset: 15 }}
                  />
                  <YAxis
                    type="number"
                    dataKey="y"
                    name="만족도"
                    domain={[0, 5]}
                    stroke="#aaa"
                    tick={{ fill: "#fff" }}
                    label={{ value: "만족도", angle: -90, position: "left", fill: "#fff", offset: -5 }}
                  />
                  <ZAxis type="number" dataKey="z" range={[100, 500]} name="응답자 수" />
                  <Tooltip cursor={{ strokeDasharray: "3 3" }} content={<CustomTooltip />} />
                  <Scatter name="플레이타임 × 만��도" data={scatterData} fill="#4D96FF" shape="circle" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 flex justify-center">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: "#4D96FF" }}></div>
                <span className="text-sm text-gray-300">플레이타임 × 만족도 (원 크기: 응답자 수)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
