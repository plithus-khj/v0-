"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, Loader2 } from "lucide-react"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"
import { isRendered } from "@/lib/global-temp"

export default function PdfExportButton() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)

  const generatePDF = async () => {
    if (!isRendered()) {
      alert("데이터를 로딩중 입니다")
      return
    }

    setIsGenerating(true)
    setProgress(0)

    try {
      console.log("Starting PDF generation...")

      // Create PDF
      const pdf = new jsPDF({
        orientation: "p",
        unit: "mm",
        format: "a4",
      })

      // 모든 페이지에 배경색 적용
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()

      // 표지 페이지 생성 (이미지 기반 방식으로 변경)
      await generateCoverPage(pdf, pageWidth, pageHeight)

      setProgress(10) // 표지 생성 완료

      // Define tabs to include in PDF (excluding the 8th tab - feedback viewer)
      const tabIds = [
        { id: "overview", title: "1. 설문 개요" },
        { id: "multiple-choice", title: "2. 객관식 응답 정리" },
        { id: "open-ended", title: "3. 주관식 내용 요약" },
        { id: "sentiment", title: "4. 감성 분류" },
        { id: "bugs", title: "5. 버그 및 개선사항" },
        { id: "cross-analysis", title: "6. 교차분석 정리" },
        { id: "insights", title: "7. 기타 인사이트" },
      ]

      // 백그라운드에서 모든 탭 컨텐츠 렌더링 및 캡처
      const preparedContents = []

      // 오프스크린 컨텐츠 사용
      for (let i = 0; i < tabIds.length; i++) {
        const tab = tabIds[i]
        console.log(`Preparing offscreen content for tab: ${tab.id}`)

        // 오프스크린 컨텐츠 찾기
        const offscreenContent = document.querySelector(`#offscreen-${tab.id}`) as HTMLElement | null

        if (offscreenContent) {
          console.log(`Found offscreen content for tab: ${tab.id}`)

          // 컨텐츠 복제 및 스타일 조정
          const contentClone = offscreenContent.cloneNode(true) as HTMLElement
          contentClone.style.width = `${pageWidth * 3.779527559}px`
          contentClone.style.background = "rgb(31, 41, 55)"
          contentClone.style.padding = "20px"
          contentClone.style.color = "white"
          contentClone.style.display = "block"
          contentClone.style.visibility = "visible"
          contentClone.style.position = "static"
          contentClone.style.opacity = "1"

          // 차트 요소 스타일 조정
          const charts = contentClone.querySelectorAll(".recharts-wrapper")
          charts.forEach((chart) => {
            if (chart instanceof HTMLElement) {
              chart.style.width = "100%"
              chart.style.height = "auto"
              chart.style.minHeight = "300px"
            }
          })

          // 준비된 컨텐츠 저장
          preparedContents.push({
            tab: tab,
            content: contentClone,
          })
        } else {
          console.warn(`Could not find offscreen content for tab: ${tab.id}, creating static content`)

          // 정적 컨텐츠 생성 및 저장
          const staticContent = document.createElement("div")
          staticContent.innerHTML = getStaticHtmlContent(tab.id, tab.title)
          staticContent.style.width = `${pageWidth * 3.779527559}px`
          staticContent.style.background = "rgb(31, 41, 55)"
          staticContent.style.padding = "20px"
          staticContent.style.color = "white"

          preparedContents.push({
            tab: tab,
            content: staticContent,
            isStatic: true,
          })
        }

        // 진행 상태 업데이트 (10% 커버 페이지 + 70% 컨텐츠 준비)
        setProgress(10 + Math.floor(((i + 1) / tabIds.length) * 70))
      }

      // 준비된 컨텐츠를 PDF에 추가
      for (let i = 0; i < preparedContents.length; i++) {
        const item = preparedContents[i]
        try {
          // Create section title page
          pdf.addPage()
          applyPageBackground(pdf) // 배경색 적용
          await generateSectionTitle(pdf, pageWidth, pageHeight, item.tab.title)

          // Create content page
          pdf.addPage()
          applyPageBackground(pdf) // 배경색 적용

          // 컨텐츠 캡처 및 PDF에 추가
          if (item.isStatic) {
            console.log(`Adding static content for tab: ${item.tab.id}`)
            await captureAndAddToPDF(pdf, item.content)
          } else {
            console.log(`Capturing and adding content for tab: ${item.tab.id}`)
            await captureAndAddToPDF(pdf, item.content)
          }

          // 진행 상태 업데이트 (80% 컨텐츠 준비 + 20% PDF 생성)
          setProgress(80 + Math.floor(((i + 1) / preparedContents.length) * 20))
        } catch (error) {
          console.error(`Error adding tab ${item.tab.id} to PDF:`, error)

          // 오류 발생 시 정적 내용으로 대체
          pdf.addPage()
          applyPageBackground(pdf) // 배경색 적용
          await generateSectionTitle(pdf, pageWidth, pageHeight, item.tab.title)
          pdf.addPage()
          applyPageBackground(pdf) // 배경색 적용
          await generateStaticTabContent(pdf, item.tab.id, item.tab.title)
        }
      }

      // Save the PDF
      pdf.save("아르뷔엔의_겨울_테스트_리포트.pdf")
      console.log("PDF generation completed successfully")
      setProgress(100)
    } catch (error) {
      console.error("PDF 생성 중 오류가 발생했습니다:", error)
      alert("PDF 생성 중 오류가 발생했습니다. 다시 시도해주세요.")
    } finally {
      setIsGenerating(false)
    }
  }

  // 표지 페이지 생성 (이미지 기반 방식)
  const generateCoverPage = async (pdf: jsPDF, pageWidth: number, pageHeight: number) => {
    // 배경색 적용
    pdf.setFillColor(31, 41, 55) // 웹사이트 배경색
    pdf.rect(0, 0, pageWidth, pageHeight, "F")

    // 표지 내용을 담을 HTML 요소 생성
    const coverDiv = document.createElement("div")
    coverDiv.style.width = `${pageWidth * 3.779527559}px`
    coverDiv.style.height = `${pageHeight * 3.779527559}px`
    coverDiv.style.background = "rgb(31, 41, 55)"
    coverDiv.style.color = "white"
    coverDiv.style.fontFamily = "Arial, sans-serif"
    coverDiv.style.position = "fixed"
    coverDiv.style.top = "-9999px"
    coverDiv.style.left = "-9999px"
    coverDiv.style.zIndex = "-1000"
    coverDiv.style.display = "flex"
    coverDiv.style.flexDirection = "column"
    coverDiv.style.alignItems = "center"
    coverDiv.style.justifyContent = "center"
    coverDiv.style.padding = "40px"
    coverDiv.style.boxSizing = "border-box"
    coverDiv.style.textAlign = "center"

    // 게임 이미지 추가
    const imgContainer = document.createElement("div")
    imgContainer.style.width = "80%"
    imgContainer.style.maxWidth = "400px"
    imgContainer.style.marginBottom = "40px"

    const img = document.createElement("img")
    img.src = "/game-cover.png"
    img.style.width = "100%"
    img.style.height = "auto"
    img.style.objectFit = "contain"

    imgContainer.appendChild(img)
    coverDiv.appendChild(imgContainer)

    // 제목 추가
    const title = document.createElement("h1")
    title.textContent = "테스트 피드백 분석 리포트"
    title.style.fontSize = "28px"
    title.style.marginBottom = "20px"
    title.style.fontWeight = "bold"
    coverDiv.appendChild(title)

    // 게임 정보 추가
    const gameInfo = document.createElement("div")
    gameInfo.style.marginTop = "40px"

    const gameName = document.createElement("p")
    gameName.textContent = "게임이름: 아르뷔엔의 겨울"
    gameName.style.fontSize = "16px"
    gameName.style.marginBottom = "10px"
    gameInfo.appendChild(gameName)

    const testerCount = document.createElement("p")
    testerCount.textContent = "테스터 수: 80명"
    testerCount.style.fontSize = "16px"
    gameInfo.appendChild(testerCount)

    coverDiv.appendChild(gameInfo)

    // 푸터 추가
    const footer = document.createElement("div")
    footer.style.marginTop = "auto"
    footer.style.fontSize = "12px"
    footer.textContent = "© 2025 플리더스"
    coverDiv.appendChild(footer)

    // DOM에 추가
    document.body.appendChild(coverDiv)

    try {
      // 이미지 로드 완료 대기
      await new Promise((resolve) => {
        if (img.complete) {
          resolve(true)
        } else {
          img.onload = () => resolve(true)
          img.onerror = () => resolve(false)
        }
      })

      // HTML을 캔버스로 변환
      const canvas = await html2canvas(coverDiv, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "rgb(31, 41, 55)",
      })

      // 캔버스를 이미지로 변환하여 PDF에 추가
      const imgData = canvas.toDataURL("image/jpeg", 1.0)
      pdf.addImage(imgData, "JPEG", 0, 0, pageWidth, pageHeight)
    } finally {
      // 임시 요소 제거
      document.body.removeChild(coverDiv)
    }
  }

  // 이미지를 Base64로 변환하는 함수
  const getBase64Image = (imgUrl: string): Promise<string | null> => {
    return new Promise((resolve) => {
      const img = new Image()
      img.crossOrigin = "Anonymous" // CORS 이슈 방지
      img.onload = () => {
        try {
          const canvas = document.createElement("canvas")
          canvas.width = img.width
          canvas.height = img.height
          const ctx = canvas.getContext("2d")
          if (ctx) {
            ctx.drawImage(img, 0, 0)
            const dataURL = canvas.toDataURL("image/png")
            resolve(dataURL)
          } else {
            console.error("Canvas context is null")
            resolve(null)
          }
        } catch (error) {
          console.error("Error converting image to base64:", error)
          resolve(null)
        }
      }
      img.onerror = () => {
        console.error("Error loading image:", imgUrl)
        resolve(null)
      }
      img.src = imgUrl
    })
  }

  // 페이지 배경색 적용 함수
  const applyPageBackground = (pdf: jsPDF) => {
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    pdf.setFillColor(31, 41, 55)
    pdf.rect(0, 0, pageWidth, pageHeight, "F")
  }

  // Generate section title page
  const generateSectionTitle = async (pdf: jsPDF, pageWidth: number, pageHeight: number, title: string) => {
    const sectionDiv = document.createElement("div")
    sectionDiv.style.width = `${pageWidth * 3.779527559}px`
    sectionDiv.style.height = `${pageHeight * 3.779527559}px`
    sectionDiv.style.background = "rgb(31, 41, 55)"
    sectionDiv.style.color = "white"
    sectionDiv.style.fontFamily = "Arial, sans-serif"
    sectionDiv.style.position = "fixed"
    sectionDiv.style.top = "-9999px"
    sectionDiv.style.left = "-9999px"
    sectionDiv.style.zIndex = "-1000"

    sectionDiv.innerHTML = `
      <div style="height: 100%; display: flex; justify-content: center; align-items: center; text-align: center;">
        <h2 style="font-size: 28px;">${title}</h2>
      </div>
    `

    document.body.appendChild(sectionDiv)

    try {
      const canvas = await html2canvas(sectionDiv, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "rgb(31, 41, 55)",
      })

      const imgData = canvas.toDataURL("image/jpeg", 1.0)
      pdf.addImage(imgData, "JPEG", 0, 0, pageWidth, pageHeight)
    } finally {
      document.body.removeChild(sectionDiv)
    }
  }

  // Capture content and add to PDF
  const captureAndAddToPDF = async (pdf: jsPDF, contentElement: HTMLElement) => {
    // 컨테이너 생성 및 DOM에 추가
    const container = document.createElement("div")
    container.style.position = "fixed"
    container.style.top = "-9999px"
    container.style.left = "-9999px"
    container.style.zIndex = "-1000"
    container.appendChild(contentElement)
    document.body.appendChild(container)

    try {
      // 렌더링 완료를 위한 대기
      console.log(`Waiting for content to stabilize before capture...`)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // 컨텐츠 캡처
      const canvas = await html2canvas(contentElement, {
        scale: 1.5,
        useCORS: true,
        logging: true,
        backgroundColor: "rgb(31, 41, 55)",
        allowTaint: true,
        foreignObjectRendering: false,
        onclone: (clonedDoc) => {
          // 클론된 문서에서 차트 요소 스타일 추가 조정
          const clonedCharts = clonedDoc.querySelectorAll(".recharts-wrapper")
          clonedCharts.forEach((chart) => {
            if (chart instanceof HTMLElement) {
              chart.style.width = "100%"
              chart.style.height = "auto"
              chart.style.minHeight = "300px"
              chart.style.display = "block"
              chart.style.visibility = "visible"
              chart.style.overflow = "visible"
            }
          })
        },
      })

      // 이미지 크기 계산
      const imgWidth = pdf.internal.pageSize.getWidth()
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      // PDF에 이미지 추가
      if (imgHeight <= pdf.internal.pageSize.getHeight()) {
        // 한 페이지에 들어가는 경우
        pdf.addImage(canvas.toDataURL("image/jpeg", 0.95), "JPEG", 0, 0, imgWidth, imgHeight)
      } else {
        // 여러 페이지에 나눠서 추가
        let heightLeft = imgHeight
        let position = 0
        let isFirstPage = true

        while (heightLeft > 0) {
          if (!isFirstPage) {
            pdf.addPage()
            applyPageBackground(pdf) // 배경색 적용
          }

          pdf.addImage(canvas.toDataURL("image/jpeg", 0.95), "JPEG", 0, position, imgWidth, imgHeight)

          heightLeft -= pdf.internal.pageSize.getHeight()
          position -= pdf.internal.pageSize.getHeight()
          isFirstPage = false
        }
      }
    } finally {
      // 컨테이너 제거
      document.body.removeChild(container)
    }
  }

  // 정적 탭 내용 생성 (fallback)
  const generateStaticTabContent = async (pdf: jsPDF, tabId: string, title: string) => {
    // 정적 컨텐츠 컴포넌트 생성
    const contentDiv = document.createElement("div")
    contentDiv.style.width = `${pdf.internal.pageSize.getWidth() * 3.779527559}px`
    contentDiv.style.background = "rgb(31, 41, 55)"
    contentDiv.style.padding = "20px"
    contentDiv.style.color = "white"
    contentDiv.style.fontFamily = "Arial, sans-serif"
    contentDiv.style.position = "fixed"
    contentDiv.style.top = "-9999px"
    contentDiv.style.left = "-9999px"
    contentDiv.style.zIndex = "-1000"

    // 정적 내용 생성
    contentDiv.innerHTML = getStaticHtmlContent(tabId, title)

    document.body.appendChild(contentDiv)

    try {
      // 컨텐츠 캡처
      const canvas = await html2canvas(contentDiv, {
        scale: 1.5,
        useCORS: true,
        logging: false,
        backgroundColor: "rgb(31, 41, 55)",
      })

      // 이미지 크기 계산
      const imgWidth = pdf.internal.pageSize.getWidth()
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      // PDF에 이미지 추가
      if (imgHeight <= pdf.internal.pageSize.getHeight()) {
        // 한 페이지에 들어가는 경우
        pdf.addImage(canvas.toDataURL("image/jpeg", 0.95), "JPEG", 0, 0, imgWidth, imgHeight)
      } else {
        // 여러 페이지에 나눠서 추가
        let heightLeft = imgHeight
        let position = 0
        let isFirstPage = true

        while (heightLeft > 0) {
          if (!isFirstPage) {
            pdf.addPage()
            applyPageBackground(pdf) // 배경색 적용
          }

          pdf.addImage(canvas.toDataURL("image/jpeg", 0.95), "JPEG", 0, position, imgWidth, imgHeight)

          heightLeft -= pdf.internal.pageSize.getHeight()
          position -= pdf.internal.pageSize.getHeight()
          isFirstPage = false
        }
      }
    } finally {
      // 컨테이너 제거
      document.body.removeChild(contentDiv)
    }
  }

  // 각 탭에 대한 정적 HTML 내용 생성
  const getStaticHtmlContent = (tabId: string, title: string) => {
    switch (tabId) {
      case "overview":
        return `
          <div style="padding: 20px;">
            <h2 style="font-size: 24px; margin-bottom: 20px;">${title}</h2>
            <p style="margin-bottom: 15px;">총 응답자 수: <strong>80명</strong> | 설문 문항 수: 객관식 12문항 + 주관식 8문항</p>
            
            <div style="margin-top: 30px;">
              <h3 style="font-size: 18px; margin-bottom: 10px;">성별 분포</h3>
              <p>남자: 61% (49명), 여자: 39% (31명)</p>
            </div>
            
            <div style="margin-top: 20px;">
              <h3 style="font-size: 18px; margin-bottom: 10px;">연령대 분포</h3>
              <p>30대: 44% (35명), 20대: 43% (34명), 40대 이상: 9% (7명), 10대: 5% (4명)</p>
            </div>
            
            <div style="margin-top: 20px;">
              <h3 style="font-size: 18px; margin-bottom: 10px;">게임 장르 선호도</h3>
              <p>매우 선호한다: 30% (24명), 선호한다: 54% (43명), 선호하지 않는다: 16% (13명)</p>
            </div>
            
            <div style="margin-top: 20px;">
              <h3 style="font-size: 18px; margin-bottom: 10px;">플레이 타임 분포</h3>
              <p>40분 초과: 35% (28명), 31–40분: 36% (29명), 21–30분: 21% (17명), 10–20분: 8% (6명)</p>
            </div>
          </div>
        `

      case "multiple-choice":
        return `
          <div style="padding: 20px;">
            <h2 style="font-size: 24px; margin-bottom: 20px;">${title}</h2>
            <p style="margin-bottom: 15px;">총 응답자: 80명</p>
            
            <div style="margin-top: 30px;">
              <h3 style="font-size: 18px; margin-bottom: 10px;">별점 분포</h3>
              <p>5점: 24% (19명), 4점: 50% (40명), 3점: 19% (15명), 2점: 7% (6명)</p>
            </div>
            
            <div style="margin-top: 20px;">
              <h3 style="font-size: 18px; margin-bottom: 10px;">지속적 플레이·지인 추천 의향</h3>
              <p>매우 긍정: 24% (19명), 긍정: 56% (45명), 부정: 19% (15명), 매우 부정: 1% (1명)</p>
            </div>
            
            <div style="margin-top: 20px;">
              <h3 style="font-size: 18px; margin-bottom: 10px;">콘텐츠 만족도</h3>
              <ul style="list-style-type: disc; padding-left: 20px;">
                <li style="margin-bottom: 5px;">튜토리얼: 매우만족 19명, 만족 46명, 불만족 15명, 매우불만족 0명</li>
                <li style="margin-bottom: 5px;">그래픽: 매우만족 40명, 만족 35명, 불만족 5명, 매우불만족 0명</li>
                <li style="margin-bottom: 5px;">밸런스: 매우만족 9명, 만족 34명, 불만족 30명, 매우불만족 7명</li>
                <li style="margin-bottom: 5px;">조작감/UI: 매우만족 23명, 만족 33명, 불만족 21명, 매우불만족 3명</li>
                <li style="margin-bottom: 5px;">스토리/연출: 매우만족 38명, 만족 30명, 불만족 11명, 매우불만족 1명</li>
                <li style="margin-bottom: 5px;">오브젝트 밀도: 매우만족 4명, 만족 29명, 불만족 35명, 매우불만족 12명</li>
              </ul>
            </div>
          </div>
        `

      case "open-ended":
        return `
          <div style="padding: 20px;">
            <h2 style="font-size: 24px; margin-bottom: 20px;">${title}</h2>
            
            <div style="margin-top: 20px;">
              <h3 style="font-size: 18px; margin-bottom: 10px;">📌 워드클라우드 분석</h3>
              <p style="margin-bottom: 10px;">각 문항별 주요 키워드는 다음과 같습니다:</p>
              
              <div style="margin-left: 15px;">
                <p style="margin-bottom: 5px;"><strong>튜토리얼 만족도:</strong> "설명", "자연스럽다", "진입", "흐름", "헷갈림"</p>
                <p style="margin-bottom: 5px;"><strong>그래픽 만족도:</strong> "분위기", "아름답다", "동화 같다", "캐릭터", "맵 디자인"</p>
                <p style="margin-bottom: 5px;"><strong>밸런스 만족도:</strong> "난이도", "단서", "추리", "방해 요소", "힌트"</p>
                <p style="margin-bottom: 5px;"><strong>재미 요소:</strong> "찾기", "탐색", "추리게임", "단서 활용", "몰입"</p>
                <p style="margin-bottom: 5px;"><strong>이탈 요소:</strong> "진행 막힘", "힌트 부족", "렉", "답답함", "방향성 부족"</p>
              </div>
            </div>
            
            <div style="margin-top: 30px;">
              <h3 style="font-size: 18px; margin-bottom: 10px;">🧾 반복 언급된 의견 (Top 5)</h3>
              <ol style="padding-left: 20px;">
                <li style="margin-bottom: 8px;"><strong>그래픽/분위기 만족</strong> – 아트 스타일, 배경, 사운드 등에서 몰입감이 좋다는 반응 다수</li>
                <li style="margin-bottom: 8px;"><strong>단서 찾기 재미</strong> – 단서 수집과 퍼즐 구성에서 흥미롭다는 피드백 많음</li>
                <li style="margin-bottom: 8px;"><strong>렉 발생과 인터랙션 문제</strong> – 일부 구간에서 클릭 반응 지연이나 렉 문제 제기</li>
                <li style="margin-bottom: 8px;"><strong>진행 막힘</strong> – 특정 구간에서 힌트 부족이나 길 찾기 어려움 호소</li>
                <li style="margin-bottom: 8px;"><strong>튜토리얼 혼란</strong> – 설명 부족 또는 자연스럽지 못한 튜토리얼 흐름 지적</li>
              </ol>
            </div>
            
            <div style="margin-top: 30px;">
              <h3 style="font-size: 18px; margin-bottom: 10px;">🔍 종합 인사이트</h3>
              <ul style="list-style-type: disc; padding-left: 20px;">
                <li style="margin-bottom: 8px;">유저는 '분위기'와 '탐색 기반의 추리 요소'를 강점으로 인식하고 있음 → 유지 및 강조 필요</li>
                <li style="margin-bottom: 8px;">UX 전반(힌트, 안내, 인터랙션)의 개선이 플레이 지속성과 이탈률에 큰 영향을 미침</li>
                <li style="margin-bottom: 8px;">튜토리얼과 초반 진입 설계가 다소 부족한 것으로 나타나, 첫인상 개선을 위한 구조 보완 필요</li>
                <li style="margin-bottom: 8px;">렉/지연 반응 등의 기술적 문제는 테스트 환경이나 최적화 개선을 통해 해소 가능성 있음</li>
              </ul>
            </div>
          </div>
        `

      case "sentiment":
        return `
          <div style="padding: 20px;">
            <h2 style="font-size: 24px; margin-bottom: 20px;">${title}</h2>
            
            <div style="margin-top: 20px;">
              <h3 style="font-size: 18px; margin-bottom: 10px;">문항별 감성 분류 결과</h3>
              <ul style="list-style-type: disc; padding-left: 20px;">
                <li style="margin-bottom: 5px;">튜토리얼 만족도: 긍정 21명, 부정 5명, 혼합 2명, 중립 11명</li>
                <li style="margin-bottom: 5px;">그래픽 만족도: 긍정 31명, 부정 1명, 혼합 1명, 중립 10명</li>
                <li style="margin-bottom: 5px;">밸런스 만족도: 긍정 17명, 부정 11명, 혼합 1명, 중립 14명</li>
                <li style="margin-bottom: 5px;">재미 요소: 긍정 26명, 부정 3명, 혼합 2명, 중립 13명</li>
                <li style="margin-bottom: 5px;">이탈 요소: 긍정 4명, 부정 27명, 혼합 4명, 중립 15명</li>
              </ul>
            </div>
            
            <div style="margin-top: 30px;">
              <h3 style="font-size: 18px; margin-bottom: 10px;">요약 인사이트</h3>
              <ul style="list-style-type: disc; padding-left: 20px;">
                <li style="margin-bottom: 8px;">전반적으로 그래픽과 재미 요소, 튜토리얼 관련 문항에서는 긍정 응답 비율이 높게 나타남</li>
                <li style="margin-bottom: 8px;">반면 '이탈 요소' 관련 문항은 부정 응답이 월등히 많아, UX 문제나 진행 동선의 불친절함이 주요 이슈로 분석됨</li>
                <li style="margin-bottom: 8px;">특히, 이탈 지점에서 힌트 부족, 방향성 안내 미흡, 버벅임 등이 자주 언급됨</li>
                <li style="margin-bottom: 8px;">밸런스에 대한 의견은 긍정과 부정이 혼재되어 있어, 난이도 편차나 특정 구간의 밸런스 문제가 존재함을 시사</li>
              </ul>
            </div>
          </div>
        `

      case "bugs":
        return `
          <div style="padding: 20px;">
            <h2 style="font-size: 24px; margin-bottom: 20px;">${title}</h2>
            
            <div style="margin-top: 20px;">
              <h3 style="font-size: 18px; margin-bottom: 10px;">버그 유형별 요약</h3>
              <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                <tr style="border-bottom: 1px solid #555;">
                  <th style="text-align: left; padding: 8px; width: 25%;">버그 유형</th>
                  <th style="text-align: left; padding: 8px; width: 15%;">빈도</th>
                  <th style="text-align: left; padding: 8px; width: 60%;">주요 내용 및 예시</th>
                </tr>
                <tr style="border-bottom: 1px solid #444;">
                  <td style="padding: 8px;">렉/성능 문제</td>
                  <td style="padding: 8px;">다수</td>
                  <td style="padding: 8px;">"게임 진행 도중 렉이 심하다", "버벅임", "화면 멈춤 발생" 등</td>
                </tr>
                <tr style="border-bottom: 1px solid #444;">
                  <td style="padding: 8px;">게임 진행 불가</td>
                  <td style="padding: 8px;">일부</td>
                  <td style="padding: 8px;">"소포가 안 나와서 진행이 불가", "지도에 힌트가 없어 막힘" 등</td>
                </tr>
                <tr style="border-bottom: 1px solid #444;">
                  <td style="padding: 8px;">시각 오류</td>
                  <td style="padding: 8px;">적음</td>
                  <td style="padding: 8px;">"캐릭터가 특정 지형에서 멈춤", "고드름이 떨어지지 않음" 등</td>
                </tr>
                <tr style="border-bottom: 1px solid #444;">
                  <td style="padding: 8px;">버그 없음</td>
                  <td style="padding: 8px;">다수</td>
                  <td style="padding: 8px;">"특별한 버그는 발견되지 않았다", "전체적으로 깔끔했다" 등</td>
                </tr>
              </table>
            </div>
            
            <div style="margin-top: 30px;">
              <h3 style="font-size: 18px; margin-bottom: 10px;">버그 상세 유형 및 개선 사항</h3>
              
              <div style="margin-top: 15px;">
                <h4 style="color: #ff6b6b; margin-bottom: 5px;">🎯 게임진행 불가 (6건)</h4>
                <p style="margin-left: 15px; margin-bottom: 5px;">- 사례: 튜토리얼 방식 불친절, 힌트 부족, 반복된 리소스 부족 등</p>
                <p style="margin-left: 15px;">- 개선방안: 튜토리얼 단계 보강, 구역별 자원 분포 밸런싱 → ✅ 즉시 개선 필요</p>
              </div>
              
              <div style="margin-top: 15px;">
                <h4 style="color: #ffd43b; margin-bottom: 5px;">🧭 UX 불편 (2건)</h4>
                <p style="margin-left: 15px; margin-bottom: 5px;">- 사례: 힌트/경고창이 ESC로만 닫히는 구조, 조작 흐름 단절</p>
                <p style="margin-left: 15px;">- 개선방안: 인터페이스 내 직관적 조작 지원 (X버튼 등 추가) → ✅ 즉시 개선 가능</p>
              </div>
            </div>
          </div>
        `

      case "cross-analysis":
        return `
          <div style="padding: 20px;">
            <h2 style="font-size: 24px; margin-bottom: 20px;">${title}</h2>
            
            <div style="margin-top: 20px;">
              <h3 style="font-size: 18px; margin-bottom: 10px;">성별 × 장르 선호도 만족도</h3>
              <ul style="list-style-type: disc; padding-left: 20px;">
                <li style="margin-bottom: 5px;">매우 선호한다: 남자 4.64점, 여자 4.7점</li>
                <li style="margin-bottom: 5px;">선호한다: 남자 4.4점, 여자 4.28점</li>
                <li style="margin-bottom: 5px;">선호하지 않는다: 남자 4.1점, 여자 3.33점</li>
              </ul>
            </div>
            
            <div style="margin-top: 25px;">
              <h3 style="font-size: 18px; margin-bottom: 10px;">연령대 × 종합 만족도(별점)</h3>
              <ul style="list-style-type: disc; padding-left: 20px;">
                <li style="margin-bottom: 5px;">10대: 4.5점</li>
                <li style="margin-bottom: 5px;">20대: 3.97점</li>
                <li style="margin-bottom: 5px;">30대: 3.89점</li>
                <li style="margin-bottom: 5px;">40대 이상: 3.29점</li>
              </ul>
            </div>
            
            <div style="margin-top: 25px;">
              <h3 style="font-size: 18px; margin-bottom: 10px;">성별 × 콘텐츠 만족도</h3>
              <ul style="list-style-type: disc; padding-left: 20px;">
                <li style="margin-bottom: 5px;">그래픽 만족도: 남자 4.41점, 여자 4.32점</li>
                <li style="margin-bottom: 5px;">밸런스 만족도: 남자 3.04점, 여자 3.19점</li>
                <li style="margin-bottom: 5px;">조작감 만족도: 남자 3.73점, 여자 3.52점</li>
                <li style="margin-bottom: 5px;">튜토리얼 만족도: 남자 3.78점, 여자 4.0점</li>
              </ul>
            </div>
            
            <div style="margin-top: 25px;">
              <h3 style="font-size: 18px; margin-bottom: 10px;">플레이타임 × 만족도 관계</h3>
              <ul style="list-style-type: disc; padding-left: 20px;">
                <li style="margin-bottom: 5px;">10-20분: 3.8점 (6명)</li>
                <li style="margin-bottom: 5px;">21-30분: 4.1점 (17명)</li>
                <li style="margin-bottom: 5px;">31-40분: 4.3점 (29명)</li>
                <li style="margin-bottom: 5px;">40분 초과: 4.5점 (28명)</li>
              </ul>
              <p style="margin-top: 10px;">→ 플레이타임이 길수록 만족도가 높아지는 경향이 있음</p>
            </div>
          </div>
        `

      case "insights":
        return `
          <div style="padding: 20px;">
            <h2 style="font-size: 24px; margin-bottom: 20px;">${title}</h2>
            
            <div style="margin-top: 20px;">
              <h3 style="font-size: 18px; margin-bottom: 10px;">감성 분석 요약 (Sentiment Analysis)</h3>
              <ul style="list-style-type: disc; padding-left: 20px;">
                <li style="margin-bottom: 8px;"><strong>긍정 응답 다수:</strong> 게임의 콘셉트, 캐릭터, 그래픽, 추리 요소에 대해 전반적으로 긍정적 의견이 많았음</li>
                <li style="margin-bottom: 8px;"><strong>혼합 반응:</strong> '기대된다'면서도 조작이나 시스템 등 일부 미흡함을 지적하는 혼합적 피드백 다수</li>
                <li style="margin-bottom: 8px;"><strong>부정 응답은 소수지만 명확함:</strong> 렉, 버그, 조작 불편 등 구체적 문제점을 지적한 경우</li>
                <li style="margin-bottom: 8px;"><strong>감성 분포:</strong> 긍정 44건 / 부정 3건 / 혼합 8건 / 중립 25건</li>
              </ul>
            </div>
            
            <div style="margin-top: 30px;">
              <h3 style="font-size: 18px; margin-bottom: 10px;">UI/UX·감성 분석 & 개선 아이디어</h3>
              
              <div style="margin-top: 15px;">
                <h4 style="margin-bottom: 5px;">자주 언급된 불편:</h4>
                <ul style="list-style-type: disc; padding-left: 20px;">
                  <li style="margin-bottom: 5px;">ESC 버튼만으로 창 닫기 가능, X버튼 없음</li>
                  <li style="margin-bottom: 5px;">설명 문구가 부족하거나 흐름이 끊김</li>
                  <li style="margin-bottom: 5px;">아이템 이동 시 반복 클릭 필요, 다중 선택 없음</li>
                </ul>
              </div>
              
              <div style="margin-top: 15px;">
                <h4 style="margin-bottom: 5px;">개선 아이디어:</h4>
                <ul style="list-style-type: disc; padding-left: 20px;">
                  <li style="margin-bottom: 5px;">직관적인 UI (닫기 버튼, 빠른 접근 등)</li>
                  <li style="margin-bottom: 5px;">명확한 시각 피드백 (아이템 강조, 진행 방향 등)</li>
                  <li style="margin-bottom: 5px;">반복적 조작 요소 최소화 (퀵슬롯, 자동 겹치기 등)</li>
                </ul>
              </div>
            </div>
            
            <div style="margin-top: 30px;">
              <h3 style="font-size: 18px; margin-bottom: 10px;">최종 피드백 키워드 인사이트 요약</h3>
              <ol style="padding-left: 20px;">
                <li style="margin-bottom: 8px;"><strong>플레이 흐름과 몰입 중심의 구조 강화 요구</strong>
                  <p style="margin-top: 5px;">유저들은 스토리 전개와 몰입 요소에 긍정적이지만, 흐름을 방해하는 버벅임/단절/설명 부족에 민감하게 반응</p>
                </li>
                <li style="margin-bottom: 8px;"><strong>게임 내 안내 부족 반복 지적</strong>
                  <p style="margin-top: 5px;">명확한 목적 제시 없이 유도되는 플레이 흐름은 혼란을 주며, 시각 가이드·퀘스트 안내·상호작용 구조 강화 필요</p>
                </li>
              </ol>
            </div>
          </div>
        `

      default:
        return `
          <div style="padding: 20px;">
            <h2 style="font-size: 24px; margin-bottom: 20px;">${title}</h2>
            <p>이 섹션에 대한 내용을 불러올 수 없습니다.</p>
          </div>
        `
    }
  }

  return (
    <div className="flex items-center">
      {isGenerating && (
        <div className="mr-3 flex items-center">
          <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-300 ease-in-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="ml-2 text-xs text-gray-300">{progress}%</span>
        </div>
      )}
      <Button onClick={generatePDF} disabled={isGenerating} className="bg-[#2e7df7] hover:bg-blue-600 text-white">
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            PDF 생성 중...
          </>
        ) : (
          <>
            <Download className="mr-2 h-4 w-4" />
            PDF 출력
          </>
        )}
      </Button>
    </div>
  )
}
