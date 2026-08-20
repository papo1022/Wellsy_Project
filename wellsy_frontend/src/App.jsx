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

        <Link to="/schedule">
          개인 일정
        </Link>

        <Link to="/bmi">
          BMI 변화
        </Link>
      </nav>

      <Routes>

        <Route
          path="/"
          element={
            <div style={{ padding: "40px" }}>
              <h1>Wellsy</h1>

              <p>
                Wellsy 메인 페이지입니다.
              </p>
            </div>
          }
        />

        <Route
          path="/schedule"
          element={
            <ScheduleCalendar />
          }
        />

        <Route
          path="/bmi"
          element={
            <BmiDashboard />
          }
        />

      </Routes>
    </>
  );
}

export default App;