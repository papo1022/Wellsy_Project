// 필수 라이브러리
import { useState } from "react";
import { Route, Routes } from 'react-router-dom';

// 건강 관련 컴포넌트
import Calendar from "./health/components/dataCrud/CalendarDetail";
import AlcoholForm from "./health/components/dataCrud/AlcoholForm";
import SmokingForm from "./health/components/dataCrud/SmokingForm";
import BodyForm from "./health/components/dataCrud/BodyForm";
import Caffeine from "./health/components/dataCrud/CaffeineForm";
import Meal from "./health/components/dataCrud/MealDetail";
import SleepForm from "./health/components/dataCrud/SleepForm";

// 공지사항 관련 컴포넌트
import NoticeDetail from "./notice/components/NoticeDetail";
import NoticeEnrollForm from "./notice/components/NoticeEnrollForm";
import NoticeList from "./notice/components/NoticeList";
import NoticeUpdateForm from "./notice/components/NoticeUpdateForm";

// 사원 관련 컴포넌트
import EmployeeDetail from "./employee/components/EmployeeDetail";
import EmployeeEnrollForm from "./employee/components/EmployeeEnrollForm";
import EmployeeList from "./employee/components/EmployeeList";
import EmployeeUpdateForm from "./employee/components/EmployeeUpdateForm";

import StatusList from "./status/components/StatusList";

import StatusDetail from "./status/components/StatusDetail";

import Header from "./common/components/Header";
import Footer from "./common/components/Footer";
import HealthDashboard from "./health/components/HealthDashboard";
import MainDashboard from "./main/components/MainDashboard";

import AdminHealthDashboard 
  from "./main/components/AdminHealthDashboard";

import CheckupReservationDashboard
from "./main/components/CheckupReservationDashboard";

import LoginForm from "./login/components/LoginForm";


function App() {

  // sessionStorage에 저장된 토큰을 초기값으로 State 세팅
  const [token, setLoginUser] = useState(sessionStorage.getItem("token"));

  // 로그인 안 한 상태: 로그인 화면만 보여줌
  if(token == null) {

    return (

      <div>
        <LoginForm setLoginUser={setLoginUser} />
      </div>

    );
  }

  // 로그인 한 상태: 대시보드
  return (
    <div>
      <Header setLoginUser={setLoginUser} />

      <Routes>

        {/* 공통 - 대시보드 (로그인한 사람만) */}
        <Route path="/" element={<MainDashboard />} />

        {/*사원 - 건강*/}
        <Route path="/health" element={<HealthDashboard />} />
        <Route path="/health/bodyform" element={<BodyForm />} />

        <Route path="/health/meal" element={<Meal />} />
        <Route path="/health/caffeine" element={<Caffeine />} />
        <Route path="/health/alcohol" element={<AlcoholForm />} />
        <Route path="/health/smoking" element={<SmokingForm />} />

        <Route path="/health/calendar" element={<Calendar />} />

        <Route path="/health/sleep" element={<SleepForm />} />

 

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