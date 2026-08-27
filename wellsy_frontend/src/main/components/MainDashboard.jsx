import ScheduleCalendar from "./ScheduleCalendar";
import BmiDashboard from "./BmiDashboard";
import WeeklyExerciseDashboard from "./WeeklyExerciseDashboard";
import HealthStatsDashboard from "./HealthStatsDashboard";
import { jwtDecode } from "jwt-decode";
import AdminHealthDashboard from "./AdminHealthDashboard";


function MainDashboard() {

  // 로그인시 저장해 둔 JWT 토큰을 꺼내옴
  const token = sessionStorage.getItem("token");
  let role = null;
  
  if(token) {

    try {
      // 토큰 안에 들어 있는 정보(role, name, employeeNo 등)을 꺼냄
      role = jwtDecode(token).role;

    } catch(error) {
      // 토큰이 손상됐거나 만료된 경우
      role = null;
    }
  }

  // role이 관리자(ADMIN)면 관리자 전용 화면, 아래로 안 내려가고 여기서 종료
  if(role === "ADMIN") {
    
    return (
      <div>

        <AdminHealthDashboard />

      </div>
    );
  }

  // 관리자가 아닌 경우 = 사원, 또는 로그인 X -> 기존 사원용 대시보드 위젯들
  return (
    <div style={{ padding: "40px" }}>
      <h1>
        Wellsy
      </h1>

      <p>
        Wellsy 메인 대시보드입니다.
      </p>


      <section style={{ marginTop: "40px" }}>
        <HealthStatsDashboard />
      </section>


      <section style={{ marginTop: "60px" }}>
        <BmiDashboard />
      </section>


      <section style={{ marginTop: "60px" }}>
        <WeeklyExerciseDashboard />
      </section>


      <section style={{ marginTop: "60px" }}>
        <ScheduleCalendar />
      </section>
    </div>
  );

}


export default MainDashboard;