import ScheduleCalendar from "./ScheduleCalendar";
import BmiDashboard from "./BmiDashboard";
import WeeklyExerciseDashboard from "./WeeklyExerciseDashboard";
import HealthStatsDashboard from "./HealthStatsDashboard";


function MainDashboard() {

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