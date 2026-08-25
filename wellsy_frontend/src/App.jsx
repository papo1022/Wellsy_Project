import { Routes, Route } from 'react-router-dom';
import NoticeList from "./notice/components/NoticeList";
import Header from "./common/components/Header";
import Footer from "./common/components/Footer";
import MainDashboard from "./main/components/MainDashboard";
import HealthDashboard from "./health/components/HealthDashboard";



function App() {

  return (
    <div>
      <Header />

      <Routes>
        {/* 공통 - 대시보드 */}
        <Route path="/" element={<MainDashboard />} />

        {/*사원 - 건강*/}
        <Route path="/health" element={<HealthDashboard />} />

        {/* 사원 - 건강검진 */}
        <Route path="/check" element={<div>사원 - 건강검진</div>} />

        {/* 사원 - AI 챗봇 */}
        <Route path="/chat" element={<div>사원 - AI 챗봇</div>} />



        {/* 공통 - 공지사항 */}
        <Route path="/notice" element={<NoticeList />} />

        {/* 공통 - 마이페이지 */}
        <Route path="/my" element={<div>공통 - 마이페이지</div>} />



        {/* 관리자 - 사원관리 */}
        <Route path="/employee" element={<div>관리자 - 사원관리</div>} />

        {/* 관리자 - 건강 검진 */}
        <Route path="/checkman" element={<div>관리자 - 건강 검진</div>} />

        {/* 관리자 - 통계 / 건강 리포트 */}
        <Route path="/status" element={<div>관리자 - 통계 / 건강 리포트</div>} />
      </Routes>

      <Footer />
    </div>
  )
}


export default App;