import ScheduleCalendar from "./ScheduleCalendar";
import BmiDashboard from "./BmiDashboard";
import WeeklyExerciseDashboard from "./WeeklyExerciseDashboard";
import HealthStatsDashboard from "./HealthStatsDashboard";
import AdminHealthDashboard from "./AdminHealthDashboard";


import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

import "../styles/MainDashboard.css";

function MainDashboard({ setToken }) {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  let role = null;
  let name = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      role = decoded.role;
      name = decoded.name;
    } catch (error) {
      role = null;
      name = null;
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setToken(null);
  };

  const profileCard = (
    <div className="profile-card">
      <div
        className="profile-avatar"
        onClick={() => navigate("/my")}
      />

      <span
        className="profile-name"
        onClick={() => navigate("/my")}
      >
        {name} 님

        <span className="profile-role">
          {role === "ADMIN" ? "관리자" : "사원"}
        </span>
      </span>

      <button
        className="logout-btn"
        onClick={handleLogout}
      >
        로그아웃
      </button>
    </div>
  );

  if (role === "ADMIN") {
  return (
    <div className="dashboard-container">
      {profileCard}

      <AdminHealthDashboard />
    </div>
  );
}

  return (
    <div className="dashboard-container">
      {profileCard}

      <div className="employee-dashboard-grid">
        {/* 왼쪽: BMI → 주간 운동량 */}
        <div className="dashboard-column dashboard-column-left">
          <section className="dashboard-widget">
            <BmiDashboard />
          </section>

          <section className="dashboard-widget">
            <WeeklyExerciseDashboard />
          </section>
        </div>

        {/* 오른쪽: 건강 통계 → 기존 위치의 캘린더 */}
        <div className="dashboard-column dashboard-column-right">
          <section className="dashboard-widget">
            <HealthStatsDashboard />
          </section>

          <section className="dashboard-widget">
            <ScheduleCalendar />
          </section>
        </div>
      </div>
    </div>
  );
}

export default MainDashboard;
