import {
  Routes,
  Route,
  Link
} from "react-router-dom";

import ScheduleCalendar
  from "./jjwcomponents/ScheduleCalendar";

import BmiDashboard
  from "./jjwcomponents/BmiDashboard";


function App() {

  return (
    <>
      <nav
        style={{
          padding: "15px 30px",
          background: "#ffffff",
          borderBottom: "1px solid #ddd",
          display: "flex",
          gap: "20px"
        }}
      >
        <Link to="/">
          홈
        </Link>


      </nav>


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


              {/* BMI */}
              <section
                style={{
                  marginTop: "40px"
                }}
              >
                <BmiDashboard />
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