import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Header from "./common/components/Header";
import Footer from "./common/components/Footer";

// TODO: 백엔드 연결 테스트를 위한 컴포넌트 (반드시 지울 것)
function App() {
  const [message, setMessage] = useState('백엔드 연결 확인 중...')

  useEffect(() => {
    fetch("http://localhost:8006/wellsy/test")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`)
        }

        return response.text()
      })
      .then((data) => {
        setMessage(data)
      })
      .catch((error) => {
        console.error(error)
        setMessage('백엔드 연결 실패')
      })
  }, [])

  return (
    //로그인이 되었다면
    <div>
      <Header />
      <h1>Wellsy</h1>
      <p>{message}</p>

      <Routes>
        {/* 공통 - 대시보드 */}
        <Route path="/" element={<div>대시보드</div>} />

        {/*사원 - 건강*/}
        <Route path="/health" element={<div>사원 - 건강 관리</div>} />

        {/* 사원 - 건강검진 */}
        <Route path="/check" element={<div>사원 - 건강검진</div>} />

        {/* 사원 - AI 챗봇 */}
        <Route path="/chat" element={<div>사원 - AI 챗봇</div>} />



        {/* 공통 - 공지사항 */}
        <Route path="/notice" element={<div>공통 - 공지사항</div>} />

        {/* 공통 - 마이페이지 */}
        <Route path="/my" element={<div>공통 - 마이페이지</div>} />



        {/* 관리자 - 사원관리 */}
        <Route path="/employ" element={<div>관리자 - 사원관리</div>} />

        {/* 관리자 - 건강 검진 */}
        <Route path="/checkman" element={<div>관리자 - 건강 검진</div>} />

        {/* 관리자 - 통계 / 건강 리포트 */}
        <Route path="/status" element={<div>관리자 - 통계 / 건강 리포트</div>} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App