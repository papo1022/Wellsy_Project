// 필수 라이브러리
import { useState } from "react";
import { Route, Routes } from 'react-router-dom';

// 디자인 가이드
import "./common/styles/Variables.css";

// 건강 관련 컴포넌트
import Calendar from "./health/components/dataCrud/CalendarDetail";
import Meal from "./health/components/dataCrud/MealDetail";
import SleepForm from "./health/components/dataCrud/SleepForm";
import ThreeForm from "./health/components/dataCrud/ThreeForm";

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

import CheckmanList from "./checkman/components/CheckmanList";
import CheckmanAlertDetail from "./checkman/components/CheckmanAlertDetail";

import Header from "./common/components/Header";
import HealthDashboard from "./health/components/HealthDashboard";
import MainDashboard from "./main/components/MainDashboard";
import CheckupReservation from "./check/components/CheckupReservation";

import MyPage from "./my/components/MyPage";
import ChatWindow from "./ai/components/ChatWindow";

import LoginForm from "./login/components/LoginForm";
import FindAccount from "./login/components/FindAccount";
import "./login/styles/Login.css";


function App() {

  // sessionStorage에 저장된 토큰을 초기값으로 State 세팅
  const [token, setToken] = useState(sessionStorage.getItem("token"));

  // 로그인 안 한 상태: 로그인 화면만 보여줌
  if (token == null) {

    return (

      <Routes>
        <Route path="/login" element={<LoginForm setToken={setToken} />} />
        <Route path="/find-account" element={<FindAccount />} />
        {/* 그 외 모든 주소는 로그인 화면으로 */}
        <Route path="*" element={<LoginForm setToken={setToken} />} />
      </Routes>

    );
  }

  // 로그인 한 상태: 대시보드
  return (
    <div>
      <Header setToken={setToken} />

      <div style={{ marginLeft: "200px" }}>
        <Routes>

          {/* 공통 - 대시보드 (로그인한 사람만) */}
          <Route path="/" element={<MainDashboard setToken={setToken} />} />

          {/*사원 - 건강*/}
          <Route path="/health" element={<HealthDashboard />} />

          <Route path="/health/meal" element={<Meal />} />
          <Route path="/health/three" element={<ThreeForm />} />

          <Route path="/health/calendar" element={<Calendar />} />

          <Route path="/health/sleep" element={<SleepForm />} />



          {/* 사원 - 건강검진 */}
          <Route path="/check" element={<CheckupReservation />} />

          {/* 사원 - AI 챗봇 */}
          <Route path="/chat" element={<ChatWindow />} />



          {/* 공통 - 공지사항 */}
          <Route path="/notice" element={<NoticeList />} />
          <Route path="/notice/enrollForm" element={<NoticeEnrollForm />} />
          <Route path="/notice/detail/:noticeId" element={<NoticeDetail />} />
          <Route path="/notice/updateForm" element={<NoticeUpdateForm />} />

          {/* 공통 - 마이페이지 */}
          <Route path="/my" element={<MyPage />} />


          {/* 관리자 - 사원관리 */}
          <Route path="/employee" element={<EmployeeList />} />
          <Route path="/employee/list" element={<EmployeeList />} />
          <Route path="/employee/enrollForm" element={<EmployeeEnrollForm />} />
          <Route path="/employee/detail/:employeeNo" element={<EmployeeDetail />} />
          <Route path="/employee/updateForm" element={<EmployeeUpdateForm />} />

          {/* ================================= */}
          {/* 관리자 직원 건강관리 */}
          {/* ================================= */}

          <Route path="/checkman" element={<CheckmanList />} />
          <Route path="/checkman/alerts/:alertId" element={<CheckmanAlertDetail />} />

          {/* 관리자 - 통계 / 건강 리포트 */}
          <Route path="/status" element={<StatusList />} />
          <Route path="/status/warnings/:alertId" element={<StatusDetail />} />
        </Routes>
      </div>

    </div>
  )
}


export default App;
