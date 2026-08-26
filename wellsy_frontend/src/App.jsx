import { Routes, Route } from 'react-router-dom';
import NoticeList from "./notice/components/NoticeList";
import NoticeEnrollForm from "./notice/components/NoticeEnrollForm";
import NoticeDetail from "./notice/components/NoticeDetail";
import NoticeUpdateForm from "./notice/components/NoticeUpdateForm";

import EmployeeList from "./employee/components/EmployeeList";
import EmployeeEnrollForm from "./employee/components/EmployeeEnrollForm";
import EmployeeDetail from "./employee/components/EmployeeDetail";
import EmployeeUpdateForm from "./employee/components/EmployeeUpdateForm";

import StatusList from "./status/components/StatusList";

import StatusDetail from "./status/components/StatusDetail";

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
        <Route path="/notice/enrollForm" element={<NoticeEnrollForm />} />
        <Route path="/notice/detail/:noticeId" element={<NoticeDetail />} />
        <Route path="/notice/updateForm" element={<NoticeUpdateForm />} />

        {/* 공통 - 마이페이지 */}
        <Route path="/my" element={<div>공통 - 마이페이지</div>} />



        {/* 관리자 - 사원관리 */}
        <Route path="/employee" element={<EmployeeList />} />
        <Route path="/employee/list" element={<EmployeeList />} />
        <Route path="/employee/enrollForm" element={<EmployeeEnrollForm />} />
        <Route path="/employee/detail/:employeeNo" element={<EmployeeDetail />} />
        <Route path="/employee/updateForm" element={<EmployeeUpdateForm />} />

        {/* 관리자 - 건강 검진 */}
        <Route path="/checkman" element={<div>관리자 - 건강 검진</div>} />

        {/* 관리자 - 통계 / 건강 리포트 */}
        <Route path="/status" element={<StatusList />} />
        <Route path="/status/warnings/:alertId" element={<StatusDetail />} />
      </Routes>

      <Footer />
    </div>
  )
}


export default App;