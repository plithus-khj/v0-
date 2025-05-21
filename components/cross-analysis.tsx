import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"

export default function CrossAnalysis() {
  // 1. 성별 × 장르 선호도 만족도
  const genderGenreData = [
    { name: "매우 선호한다", 남자: 4.64, 여자: 4.7 },
    { name: "선호한다", 남자: 4.4, 여자: 4.28 },
    { name: "선호하지 않는다", 남자: 4.1, 여자: 3.33 },
  ]

  // 2. 연령대 × 장르 선호도 만족도
  const ageGenreData = [
    { name: "10대", "매우 선호한다": 5.0, "선호하지 않는다": 4.5, 선호한다: 0 },
    { name: "20대", "매우 선호한다": 4.83, "선호하지 않는다": 3.8, 선호한다: 4.29 },
    { name: "30대", "매우 선호한다": 4.38, "선호하지 않는다": 3.8, 선호한다: 4.36 },
    { name: "40대 이상", "매우 선호한다": 4.5, "선호하지 않는다": 4.0, 선호한다: 4.5 },
  ]

  // 3 & 4. 성별 & 연령대 × 조작감 만족도
  const genderControlData = [
    { name: "남자", 조작감: 3.73 },
    { name: "여자", 조작감: 3.52 },
  ]

  const ageControlData = [
    { name: "10대", 조작감: 4.5 },
    { name: "20대", 조작감: 3.56 },
    { name: "30대", 조작감: 3.6 },
    { name: "40대 이상", 조작감: 3.86 },
  ]

  // 5. 연령대 × 성별 그래픽 만족도
  const ageGenderGraphicsData = [
    { name: "10대", 남자: 5.0, 여자: 4.0 },
    { name: "20대", 남자: 4.47, 여자: 4.37 },
    { name: "30대", 남자: 4.31, 여자: 4.22 },
    { name: "40대 이상", 남자: 4.4, 여자: 4.5 },
  ]

  // 6. 성별 × 플레이타임 × 추천 의향 (변환된 데이터)
  const genderPlaytimeRecommendData = [
    {
      name: "남자",
      "10분-20분_긍정": 1,
      "10분-20분_매우긍정": 0,
      "10분-20분_부정": 3,
      "10분-20분_매우부정": 1,
      "21분-30분_긍정": 8,
      "21분-30분_매우긍정": 1,
      "21분-30분_부정": 1,
      "21분-30분_매우부정": 0,
      "31분-40분_긍정": 11,
      "31분-40분_매우긍정": 4,
      "31분-40분_부정": 2,
      "31분-40분_매우부정": 0,
      "40분초과_긍정": 8,
      "40분초과_매우긍정": 3,
      "40분초과_부정": 6,
      "40분초과_매우부정": 0,
    },
    {
      name: "여자",
      "10분-20분_긍정": 1,
      "10분-20분_매우긍정": 0,
      "10분-20분_부정": 0,
      "10분-20분_매우부정": 0,
      "21분-30분_긍정": 4,
      "21분-30분_매우긍정": 1,
      "21분-30분_부정": 2,
      "21분-30분_매우부정": 0,
      "31분-40분_긍정": 8,
      "31분-40분_매우긍정": 4,
      "31분-40분_부정": 0,
      "31분-40분_매우부정": 0,
      "40분초과_긍정": 4,
      "40분초과_매우긍정": 6,
      "40분초과_부정": 1,
      "40분초과_매우부정": 0,
    },
  ]

  // 7. 연령대 × 이탈 의향 × 장르 선호도 (변환된 데이터)
  const ageExitGenreData = [
    { name: "10대", "매우 선호한다": 2, "선호하지 않는다": 2, 선호한다: 0 },
    { name: "20대", "매우 선호한다": 12, "선호하지 않는다": 5, 선호한다: 17 },
    { name: "30대", "매우 선호한다": 8, "선호하지 않는다": 5, 선호한다: 22 },
    { name: "40대 이상", "매우 선호한다": 2, "선호하지 않는다": 1, 선호한다: 4 },
  ]

  // 8. 감성태그(긍정/부정) × 연령·성별 (변환된 데이터)
  const sentimentAgeGenderData = [
    { name: "10대 남자", 긍정: 3, 부정: 0 },
    { name: "10대 여자", 긍정: 1, 부정: 0 },
    { name: "20대 남자", 긍정: 15, 부정: 0 },
    { name: "20대 여자", 긍정: 17, 부정: 2 },
    { name: "30대 남자", 긍정: 24, 부정: 2 },
    { name: "30대 여자", 긍정: 8, 부정: 1 },
    { name: "40대 이상 남자", 긍정: 5, 부정: 0 },
    { name: "40대 이상 여자", 긍정: 2, 부정: 0 },
  ]

  // 9. 장르 선호도 ↔ 콘텐츠 만족도(조작감)
  const genreControlData = [
    { name: "매우 선호한다", 조작감: 4.0 },
    { name: "선호한다", 조작감: 3.49 },
    { name: "선호하지 않는다", 조작감: 3.54 },
  ]

  // 11. 연령대 × 종합 만족도(별점)
  const ageRatingData = [
    { name: "10대", 별점: 4.5 },
    { name: "20대", 별점: 3.97 },
    { name: "30대", 별점: 3.89 },
    { name: "40대 이상", 별점: 3.29 },
  ]

  // 12. 성별 × 콘텐츠 만족도
  const genderContentData = [
    { name: "그래픽 만족도", 남자: 4.41, 여자: 4.32 },
    { name: "밸런스 만족도", 남자: 3.04, 여자: 3.19 },
    { name: "조작감 만족도", 남자: 3.73, 여자: 3.52 },
    { name: "튜토리얼 만족도", 남자: 3.78, 여자: 4.0 },
  ]

  // 13. 연령·성별 × 장르 선호도 기반 차별화 전략 (변환된 데이터)
  const ageGenderGenreData = [
    { name: "10대 남자", "매우 선호한다": 5.0, "선호하지 않는다": 5.0, 선호한다: 0 },
    { name: "10대 여자", "매우 선호한다": 0, "선호하지 않는다": 4.0, 선호한다: 0 },
    { name: "20대 남자", "매우 선호한다": 4.8, "선호하지 않는다": 4.33, 선호한다: 4.29 },
    { name: "20대 여자", "매우 선호한다": 4.86, "선호하지 않는다": 3.0, 선호한다: 4.3 },
    { name: "30대 남자", "매우 선호한다": 4.33, "선호하지 않는다": 3.8, 선호한다: 4.47 },
    { name: "30대 여자", "매우 선호한다": 4.5, "선호하지 않는다": 0, 선호한다: 4.14 },
    { name: "40대 이상 남자", "매우 선호한다": 5.0, "선호하지 않는다": 4.0, 선호한다: 4.33 },
    { name: "40대 이상 여자", "매우 선호한다": 4.0, "선호하지 않는다": 0, 선호한다: 5.0 },
  ]

  // 14. 플레이타임 × 장르 선호도 만족도
  const playtimeGenreData = [
    { name: "10분-20분", "매우 선호한다": 3.5, "선호하지 않는다": 4.0, 선호한다: 4.5 },
    { name: "21분-30분", "매우 선호한다": 5.0, "선호하지 않는다": 3.33, 선호한다: 4.44 },
    { name: "31분-40분", "매우 선호한다": 4.57, "선호하지 않는다": 3.67, 선호한다: 4.32 },
    { name: "40분 초과", "매우 선호한다": 4.8, "선호하지 않는다": 4.4, 선호한다: 4.31 },
  ]

  // 15. 이탈 의향 × 장르 선호도 만족도
  const exitGenreData = [{ name: "이탈", "매우 선호한다": 4.67, "선호하지 않는다": 3.92, 선호한다: 4.35 }]

  // 16. 성별 × 플레이타임 × 그래픽 만족도
  const genderPlaytimeGraphicsData = [
    { name: "남자 10분-20분", 그래픽: 3.8 },
    { name: "남자 21분-30분", 그래픽: 4.6 },
    { name: "남자 31분-40분", 그래픽: 4.35 },
    { name: "남자 40분 초과", 그래픽: 4.53 },
    { name: "여자 10분-20분", 그래픽: 5.0 },
    { name: "여자 21분-30분", 그래픽: 4.14 },
    { name: "여자 31분-40분", 그래픽: 4.25 },
    { name: "여자 40분 초과", 그래픽: 4.45 },
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

  // 색상 정의
  const COLORS = {
    남자: "#4D96FF",
    여자: "#FF6B6B",
    "매우 선호한다": "#4D96FF",
    선호한다: "#4CAF50",
    "선호하지 않는다": "#FFD43B",
    긍정: "#4CAF50",
    부정: "#FF6B6B",
  }

  return (
    <div className="space-y-6 tab-content-cross-analysis">
      <h2 className="text-2xl font-bold">교차분석 정리 (시각화)</h2>

      {/* 주요 교차분석 인사이트 섹션 */}
      <div className="bg-[#111827] rounded-lg p-6 mb-6">
        <h3 className="text-white text-lg font-medium mb-4">교차분석 주요 인사이트</h3>
        <ul className="space-y-3">
          <li className="flex items-start">
            <div className="flex-shrink-0 w-4 h-4 rounded-full bg-blue-500 mt-1.5 mr-3"></div>
            <span className="text-gray-200">
              장르 선호도가 높을수록 별점이 높아지는 경향이 뚜렷함 - 매우 선호(4.64점) vs 매우 비선호(3.0점)
            </span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 w-4 h-4 rounded-full bg-blue-500 mt-1.5 mr-3"></div>
            <span className="text-gray-200">
              20대가 전반적으로 가장 높은 만족도를 보이며, 특히 20대 남성의 장르 선호도가 높은 그룹에서 최고
              평점(4.88점) 기록
            </span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 w-4 h-4 rounded-full bg-blue-500 mt-1.5 mr-3"></div>
            <span className="text-gray-200">
              남성이 여성보다 밸런스 만족도가 높음 (4.2 vs 3.6) - 난이도 인식에 성별 차이 존재
            </span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 w-4 h-4 rounded-full bg-blue-500 mt-1.5 mr-3"></div>
            <span className="text-gray-200">
              10대의 밸런스 만족도가 현저히 낮음 (2.8점) - 난이도 조정 시 연령대별 체감 차이 고려 필요
            </span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 w-4 h-4 rounded-full bg-blue-500 mt-1.5 mr-3"></div>
            <span className="text-gray-200">
              남성은 1-2시간 플레이 그룹에서 만족도 최고 (4.47점), 여성은 2-5시간 플레이 그룹에서 최고 만족도(4.53점)
              기록
            </span>
          </li>
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 성별 × 장르 선호도 만족도 */}
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
                  <Bar dataKey="남자" fill={COLORS.남자} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="여자" fill={COLORS.여자} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 flex justify-center space-x-6">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS.남자 }}></div>
                <span className="text-sm text-gray-300">남자</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS.여자 }}></div>
                <span className="text-sm text-gray-300">여자</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 연령대 × 종합 만족도(별점) */}
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

        {/* 성별 × 콘텐츠 만족도 */}
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
                  <Bar dataKey="남자" fill={COLORS.남자} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="여자" fill={COLORS.여자} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 flex justify-center space-x-6">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS.남자 }}></div>
                <span className="text-sm text-gray-300">남자</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS.여자 }}></div>
                <span className="text-sm text-gray-300">여자</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 연령대 × 장르 선호도 만족도 */}
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
                  <Bar dataKey="매우 선호한다" fill={COLORS["매우 선호한다"]} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="선호한다" fill={COLORS["선호한다"]} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="선호하지 않는다" fill={COLORS["선호하지 않는다"]} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 flex justify-center space-x-6">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS["매우 선호한다"] }}></div>
                <span className="text-sm text-gray-300">매우 선호한다</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS["선호한다"] }}></div>
                <span className="text-sm text-gray-300">선호한다</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS["선호하지 않는다"] }}></div>
                <span className="text-sm text-gray-300">선호하지 않는다</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 감성태그(긍정/부정) × 연령·성별 - 남성 */}
        <Card className="bg-gray-800 border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-white">감성태그(긍정/부정) × 연령 - 남성</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={sentimentAgeGenderData.filter((item) => item.name.includes("남자"))}
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
                    angle={-15}
                    interval={0}
                  />
                  <YAxis stroke="#aaa" tick={{ fill: "#fff" }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="긍정" fill={COLORS.긍정} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="부정" fill={COLORS.부정} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 flex justify-center space-x-6">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS.긍정 }}></div>
                <span className="text-sm text-gray-300">긍정</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS.부정 }}></div>
                <span className="text-sm text-gray-300">부정</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 감성태그(긍정/부정) × 연령·성별 - 여성 */}
        <Card className="bg-gray-800 border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-white">감성태그(긍정/부정) × 연령 - 여성</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={sentimentAgeGenderData.filter((item) => item.name.includes("여자"))}
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
                    angle={-15}
                    interval={0}
                  />
                  <YAxis stroke="#aaa" tick={{ fill: "#fff" }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="긍정" fill={COLORS.긍정} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="부정" fill={COLORS.부정} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 flex justify-center space-x-6">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS.긍정 }}></div>
                <span className="text-sm text-gray-300">긍정</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS.부정 }}></div>
                <span className="text-sm text-gray-300">부정</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 플레이타임 × 장르 선호도 만족도 */}
        <Card className="bg-gray-800 border-0 col-span-1 md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-white">플레이타임 × 장르 선호도 만족도</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={playtimeGenreData}
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
                  <Bar dataKey="매우 선호한다" fill={COLORS["매우 선호한다"]} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="선호한다" fill={COLORS["선호한다"]} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="선호하지 않는다" fill={COLORS["선호하지 않는다"]} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 flex justify-center space-x-6">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS["매우 선호한다"] }}></div>
                <span className="text-sm text-gray-300">매우 선호한다</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS["선호한다"] }}></div>
                <span className="text-sm text-gray-300">선호한다</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS["선호하지 않는다"] }}></div>
                <span className="text-sm text-gray-300">선호하지 않는다</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 연령대 × 조작감 만족도 - 남성 */}
        <Card className="bg-gray-800 border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-white">연령대 × 조작감 만족도 - 남성</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { name: "10대", 조작감: 4.5 },
                    { name: "20대", 조작감: 3.62 },
                    { name: "30대", 조작감: 3.73 },
                    { name: "40대 이상", 조작감: 3.8 },
                  ]}
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
                  <Bar dataKey="조작감" fill={COLORS.남자} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* 연령대 × 조작감 만족도 - 여성 */}
        <Card className="bg-gray-800 border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-white">연령대 × 조작감 만족도 - 여성</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { name: "10대", 조작감: 4.0 },
                    { name: "20대", 조작감: 3.32 },
                    { name: "30대", 조작감: 3.44 },
                    { name: "40대 이상", 조작감: 4.0 },
                  ]}
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
                  <Bar dataKey="조작감" fill={COLORS.여자} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* 플레이타임 × 그래픽 만족도 - 남성 */}
        <Card className="bg-gray-800 border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-white">플레이타임 × 그래픽 만족도 - 남성</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={genderPlaytimeGraphicsData
                    .filter((item) => item.name.includes("남자"))
                    .map((item) => ({
                      name: item.name.replace("남자 ", ""),
                      그래픽: item.그래픽,
                    }))}
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
                  <Bar dataKey="그래픽" fill={COLORS.남자} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* 플레이타임 × 그래픽 만족도 - 여성 */}
        <Card className="bg-gray-800 border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-white">플레이타임 × 그래픽 만족도 - 여성</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={genderPlaytimeGraphicsData
                    .filter((item) => item.name.includes("여자"))
                    .map((item) => ({
                      name: item.name.replace("여자 ", ""),
                      그래픽: item.그래픽,
                    }))}
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
                  <Bar dataKey="그래픽" fill={COLORS.여자} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
