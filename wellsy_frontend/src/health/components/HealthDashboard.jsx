import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BloodPressure from "./mainboard/BloodPressure";
import BloodSugar from "./mainboard/BloodSugar";
import FourIntake from "./mainboard/FourIntake";
import SleepTime from "./mainboard/SleepTime";
import HealthGrade from "./mainboard/HealthGrade";

import "../../health/styles/Dashboard.css";
import BodyInfo from "./mainboard/BodyInfo";
import HealthWeekCalendar from "./mainboard/HealthWeekCalender";
 
function HealthDashboard() {

    // 화면 깜빡임 없이 URL 주소를 전환해줄 navigate 함수
    let navigate = useNavigate();

    // 조회된 데이터를 담을 배열 형태의 State 변수
    const [dataList, setDataList] = useState([]);


    return (
        <div className="health-dashboard">
            {/* 건강 등급 */}
            <HealthGrade />

            {/* 건강 캘린더 */}
            <HealthWeekCalendar />
            <div className="health-card-area">

                <div className="health-left-area">
                    <div className="health-top-area">
                        {/* 혈당, 혈압 */}
                        <BloodSugar />
                        <BloodPressure />
                    </div>

                    {/* 수면 기록 */}
                    <SleepTime />

                    {/* 신체 기록 */}
                    <BodyInfo />
                </div>

                {/* 오늘의 건강 기록 */}
                <FourIntake />
                
            </div>
        </div>
    );
}


// 내보내기
export default HealthDashboard;