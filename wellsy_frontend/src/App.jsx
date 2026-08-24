import {
  Routes,
  Route,
  Link
} from "react-router-dom";

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
    <>
      
        <Link to="/">
          홈
        </Link>
      


      <Routes>

        {/* 홈 */}
        <Route
          path="/"
          element={
            <div
              style={{
                padding: "40px"
              }}
            >
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
          }
        />

      </Routes>
    </>
  );
}


export default App;