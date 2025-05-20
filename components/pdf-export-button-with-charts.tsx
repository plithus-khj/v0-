"use client"

import { useState } from "react"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"

export default function PdfExportButtonWithCharts() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)

  const generatePDF = async () => {
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

      // 각 탭에 대해 처리
      for (let i = 0; i < tabIds.length; i++) {
        const tab = tabIds[i]
        try {
          console.log(`\n========== Processing tab: ${tab.id} ==========`)

          // 1. 오프스크린 탭 컨텐츠 찾기
          const offscreenTabContent = document.querySelector(`#offscreen-${tab.id}`) as HTMLElement | null

          if (offscreenTabContent) {
            console.log(`Found offscreen content for tab: ${tab.id}`)

            // 2. 섹션 제목 페이지 생성
            pdf.addPage()
            applyPageBackground(pdf) // 배경색 적용
            await generateSectionTitle(pdf, pageWidth, pageHeight, tab.title)

            // 3. 컨텐츠 페이지 생성
            pdf.addPage()
            applyPageBackground(pdf) // 배경색 적용

            // 4. 오프스크린 컨텐츠 캡처 및 PDF에 추가
            await captureOffscreenContent(pdf, offscreenTabContent, tab.id)
            console.log(`Successfully captured offscreen content for tab: ${tab.id}`)
          } else {
            console.error(`Could not find offscreen content for tab: ${tab.id}, using static content instead`)
            // 오프스크린 컨텐츠를 찾지 못한 경우 정적 내용으로 대체
            pdf.addPage()
            applyPageBackground(pdf) // 배경색 적용
            await generateSectionTitle(pdf, pageWidth, pageHeight, tab.title)
            pdf.addPage()
            applyPageBackground(pdf) // 배경색 적용
            await generateStaticTabContent(pdf, tab.id, tab.title)
          }

          // 진행 상태 업데이트
          setProgress(10 + Math.floor(((i + 1) / tabIds.length) * 90))
        } catch (error) {
          console.error(`Error processing tab ${tab.id}:`, error)
          // 오류 발생 시 정적 내용으로 대체
          pdf.addPage()
          applyPageBackground(pdf) // 배경색 적용
          await generateSectionTitle(pdf, pageWidth, pageHeight, tab.title)
          pdf.addPage()
          applyPageBackground(pdf) // 배경색 적용
          await generateStaticTabContent(pdf, tab.id, tab.title)
        }
      }

      // Save the PDF - 파일명 업데이트
      pdf.save("아르뷔엔의_겨울_테스트_리포트.pdf")
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
    footer.textContent = "© 2025 오르투스게임즈"
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

  // 오프스크린 컨텐츠 캡처 및 PDF에 추가
  const captureOffscreenContent = async (pdf: jsPDF, contentElement: HTMLElement, tabId: string) => {
    try {
      console.log(`Capturing offscreen content for tab: ${tabId}`)

      // 컨텐츠 복제 및 스타일 조정
      const contentClone = contentElement.cloneNode(true) as HTMLElement
      contentClone.style.width = `${pdf.internal.pageSize.getWidth() * 3.779527559}px`
      contentClone.style.background = "rgb(31, 41, 55)"
      contentClone.style.padding = "20px"
      contentClone.style.color = "white"
      contentClone.style.display = "block"
      contentClone.style.visibility = "visible"
      contentClone.style.position = "static"
      contentClone.style.opacity = "1"

      // 차트 요소 스타일 조정
      const charts = contentClone.querySelectorAll(".recharts-wrapper")
      console.log(`Found ${charts.length} charts in offscreen content for tab ${tabId}`)
      charts.forEach((chart, index) => {
        if (chart instanceof HTMLElement) {
          console.log(`Styling chart ${index} for tab ${tabId}`)
          chart.style.width = "100%"
          chart.style.height = "auto"
          chart.style.minHeight = "300px"
          chart.style.display = "block"
          chart.style.visibility = "visible"
          chart.style.overflow = "visible"
        }
      })

      // 컨테이너 생성 및 DOM에 추가
      const container = document.createElement("div")
      container.style.position = "fixed"
      container.style.top = "-9999px"
      container.style.left = "-9999px"
      container.style.zIndex = "-1000"
      container.style.width = contentClone.style.width
      container.style.background = contentClone.style.background
      container.appendChild(contentClone)
      document.body.appendChild(container)

      console.log(`Content clone for tab ${tabId} added to DOM, waiting for rendering...`)
      // 렌더링 대기
      await new Promise((resolve) => setTimeout(resolve, 500))

      try {
        // 컨텐츠 캡처
        console.log(`Starting html2canvas capture for tab ${tabId}...`)
        const canvas = await html2canvas(contentClone, {
          scale: 1.5,
          useCORS: true,
          logging: true,
          backgroundColor: "rgb(31, 41, 55)",
          allowTaint: true,
          onclone: (clonedDoc) => {
            console.log(`html2canvas cloning document for tab ${tabId}...`)
            // 클론된 문서에서 차트 요소 스타일 추가 조정
            const clonedCharts = clonedDoc.querySelectorAll(".recharts-wrapper")
            console.log(`Styling ${clonedCharts.length} charts in cloned document for tab ${tabId}`)
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

        console.log(`Canvas capture complete for tab ${tabId}, adding to PDF...`)

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

        console.log(`Content for tab ${tabId} successfully added to PDF`)
      } finally {
        // 컨테이너 제거
        document.body.removeChild(container)
      }
    } catch (error) {
      console.error(`Error capturing offscreen content for tab ${tabId}:`, error)
      throw error // 오류를 상위로 전파하여 정적 내용으로 대체할 수 있도록 함
    }
  }

  // 섹션 제목 생성 함수
  const generateSectionTitle = async (pdf: jsPDF, pageWidth: number, pageHeight: number, title: string) => {
    // 섹션 제목 페이지를 HTML로 생성
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
    sectionDiv.style.display = "flex"
    sectionDiv.style.justifyContent = "center"
    sectionDiv.style.alignItems = "center"

    // 제목 추가
    const titleElement = document.createElement("h2")
    titleElement.textContent = title
    titleElement.style.fontSize = "28px"
    titleElement.style.fontWeight = "bold"
    sectionDiv.appendChild(titleElement)

    // DOM에 추가
    document.body.appendChild(sectionDiv)

    try {
      // HTML을 캔버스로 변환
      const canvas = await html2canvas(sectionDiv, {
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
      document.body.removeChild(sectionDiv)
    }
  }

  // 정적 탭 컨텐츠 생성 함수 (오프스크린 렌더링에 실패했을 경우)
  const generateStaticTabContent = async (pdf: jsPDF, tabId: string, title: string) => {
    // 정적 컨텐츠 페이지를 HTML로 생성
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

    // 제목 추가
    const titleElement = document.createElement("h2")
    titleElement.textContent = `${title} (정적 내용)`
    titleElement.style.fontSize = "24px"
    titleElement.style.marginBottom = "20px"
    contentDiv.appendChild(titleElement)

    // 내용 추가
    const contentElement = document.createElement("p")
    contentElement.textContent = `이 탭(${tabId})의 내용을 렌더링하는 데 문제가 발생했습니다. 정적 내용으로 대체됩니다.`
    contentElement.style.marginBottom = "20px"
    contentDiv.appendChild(contentElement)

    // DOM에 추가
    document.body.appendChild(contentDiv)

    try {
      // HTML을 캔버스로 변환
      const canvas = await html2canvas(contentDiv, {
        scale: 1.5,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "rgb(31, 41, 55)",
      })

      // 캔버스를 이미지로 변환하여 PDF에 추가
      const imgData = canvas.toDataURL("image/jpeg", 0.95)
      pdf.addImage(
        imgData,
        "JPEG",
        0,
        0,
        pdf.internal.pageSize.getWidth(),
        (canvas.height * pdf.internal.pageSize.getWidth()) / canvas.width,
      )
    } finally {
      // 임시 요소 제거
      document.body.removeChild(contentDiv)
    }
  }

  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-500"
      onClick={generatePDF}
      disabled={isGenerating}
    >
      {isGenerating ? `PDF 생성 중... (${progress}%)` : "PDF로 내보내기"}
    </button>
  )
}
