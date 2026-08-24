import { Routes, Route } from 'react-router-dom';
import Header from "./common/components/Header";
import Footer from "./common/components/Footer";

import ScheduleCalendar
  from "./jjwcomponents/ScheduleCalendar";

import BmiDashboard
  from "./jjwcomponents/BmiDashboard";

import WeeklyExerciseDashboard
  from "./jjwcomponents/WeeklyExerciseDashboard";

import HealthStatsDashboard
  from "./jjwcomponents/HealthStatsDashboard";


function App() {

  return (
    <div>
      <Header />

      <Routes>
        {/* 공통 - 대시보드 */}
        <Route path="/" element={
          <div style={{ padding: "40px" }}>
                <h1>
                  Wellsy
                </h1>

                <p>
                  Wellsy 메인 대시보드입니다.
                </p>


                {/* 건강 통계 */}
                <section
                  style={{
                    marginTop: "40px"
                  }}
                >
                  <HealthStatsDashboard />
                </section>


                {/* BMI */}
                <section
                  style={{
                    marginTop: "60px"
                  }}
                >
                  <BmiDashboard />
                </section>


                {/* 주간 운동량 */}
                <section
                  style={{
                    marginTop: "60px"
                  }}
                >
                  <WeeklyExerciseDashboard />
                </section>


                {/* 개인 일정 */}
                <section
                  style={{
                    marginTop: "60px"
                  }}
                >
                  <ScheduleCalendar />
                </section>
          </div>
        } />

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