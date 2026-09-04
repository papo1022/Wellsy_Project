import { useEffect, useState } from "react";
import BloodPressure from "./mainboard/BloodPressure";
import BloodSugar from "./mainboard/BloodSugar";
import FourIntake from "./mainboard/FourIntake";
import HealthGrade from "./mainboard/HealthGrade";
import SleepTime from "./mainboard/SleepTime";

import "../../health/styles/Dashboard.css";
import BodyInfo from "./mainboard/BodyInfo";
import HealthWeekCalendar from "./mainboard/HealthWeekCalender";

function HealthDashboard() {

    const [basicData, setBasicData] = useState(null);
    const [sleepData, setSleepData] = useState(null);
    const [healthGrade, setHealthGrade] = useState(null);

    // 컴포넌트가 마운트될 때 오늘의 건강 데이터를 가져옴
    useEffect(() => {
        fetchHealthData();

        fetch("http://localhost:8006/wellsy/sleep/1")
            .then(response => response.json())
            .then(data => setSleepData(data))
            .catch(error => console.error("Error fetching sleep data:", error));

        fetch("http://localhost:8006/wellsy/health/grade/1")
            .then(response => response.text())
            .then(data => setHealthGrade(data))
            .catch(error =>
                console.error("Error fetching health grade:", error)
            );
    }, []);

    const fetchHealthData = () => {
        console.log("Fetching health data...");
        fetch("http://localhost:8006/wellsy/health/1")
            .then(response => response.json())
            .then(data => setBasicData(data))
            .catch(error => console.error("Error fetching health data:", error));
    };


    return (
        <div className="health-record-dashboard">
            <HealthGrade grade={healthGrade} />

            {/* 건강 캘린더 */}
            <HealthWeekCalendar />
            <div className="health-card-area">

                <div className="health-left-area">
                    <div className="health-top-area">
                        {/* 혈당, 혈압 */}
                        <BloodSugar bloodSugar={basicData?.bloodSugar} />
                        <BloodPressure systolicBp={basicData?.systolicBp} diastolicBp={basicData?.diastolicBp} />
                    </div>

                    {/* 수면 기록 */}
                    <SleepTime sleepData={sleepData} />

                    {/* 신체 기록 */}
                    <BodyInfo height={basicData?.height} weight={basicData?.weight} bmi={basicData?.bmi} onHealthUpdate={fetchHealthData} />
                </div>

                {/* 오늘의 건강 기록 */}
                <FourIntake caffeine={basicData?.caffeineAmount} alcohol={basicData?.alcoholAmount} smoking={basicData?.smokingCount} onHealthUpdate={fetchHealthData}/>

            </div>
        </div>
    );
}


// 내보내기
export default HealthDashboard;