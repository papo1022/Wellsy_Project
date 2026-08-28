import ScheduleCalendar from "./ScheduleCalendar";
import BmiDashboard from "./BmiDashboard";
import WeeklyExerciseDashboard from "./WeeklyExerciseDashboard";
import HealthStatsDashboard from "./HealthStatsDashboard";
import { jwtDecode } from "jwt-decode";
import AdminHealthDashboard from "./AdminHealthDashboard";
import { useNavigate } from "react-router-dom";

import "../styles/MainDashboard.css";

// 로그아웃 처리를 위해 App.jsx로부터 setToken 함수를 전달받음
function MainDashboard({ setToken }) {

  // 클릭 시 이동할 수 있게 navigate 함수 생성
  const navigate = useNavigate();

  // 로그인시 저장해 둔 JWT 토큰을 꺼내옴
  const token = sessionStorage.getItem("token");
  let role = null;
  let name = null;
  
  if(token) {

    try {
      // 토큰 안에 들어 있는 정보(role, name, employeeNo 등)을 꺼냄
      
      const decoded = jwtDecode(token);

      role = decoded.role;
      name = decoded.name;

    } catch(error) {
      // 토큰이 손상됐거나 만료된 경우

      role = null;
      name = null;
    }
  }

  // 로그아웃 함수
  const handleLogout = () => {
    // 토큰 삭제
    sessionStorage.removeItem("token");
    setToken(null);
  }

  // 좌측 상단 간단 프로필 - 사원/관리자 공통으로 재사용
  const profileCard = (

    <div className="profile-card">
      <div className="profile-avatar" onClick={() => navigate("/my")}></div>
      <span className="profile-name" onClick={() => navigate("/my")}>
        {name} 님
        <span className="profile-role" onClick={() => navigate("/my")}>{role === "ADMIN" ? "관리자" : "사원"}</span>
      </span>
      <button className="logout-btn" onClick={handleLogout}>로그아웃</button>
    </div>
  )

  // role이 관리자(ADMIN)면 관리자 전용 화면, 아래로 안 내려가고 여기서 종료
  if(role === "ADMIN") {
    
    return (
      <div className="dashboard-container">

        <div>
          {profileCard}
          <AdminHealthDashboard />
        </div>

      </div>
    );
  }

  // 관리자가 아닌 경우 = 사원, 또는 로그인 X -> 기존 사원용 대시보드 위젯들
  return (
    <div className="dashboard-container">
      {profileCard}

      <section className="dashboard-section">
        <BmiDashboard />
      </section>

      <section className="dashboard-section">
        <HealthStatsDashboard />
      </section>

      <section className="dashboard-section">
        <WeeklyExerciseDashboard />
      </section>

      <section className="dashboard-section">
        <ScheduleCalendar />
      </section>
    </div>
  );

}


export default MainDashboard;