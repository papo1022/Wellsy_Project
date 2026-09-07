import { useEffect, useState } from "react";
import { selectTodayMealApi } from "../api/mealApi";
import { jwtDecode } from "jwt-decode";

import BloodPressure from "./mainboard/BloodPressure";
import BloodSugar from "./mainboard/BloodSugar";
import FourIntake from "./mainboard/FourIntake";
import HealthGrade from "./mainboard/HealthGrade";
import SleepTime from "./mainboard/SleepTime";

import "../../health/styles/Dashboard.css";
import BodyInfo from "./mainboard/BodyInfo";
import HealthWeekCalendar from "./mainboard/HealthWeekCalender";

function HealthDashboard() {

    const token = sessionStorage.getItem("token");

    const employeeNo = token
        ? jwtDecode(token).employeeNo
        : null;

    const [basicData, setBasicData] = useState(null);
    const [sleepData, setSleepData] = useState(null);
    const [healthGrade, setHealthGrade] = useState(null);
    const [mealCalories, setMealCalories] = useState(null);

    // 컴포넌트가 마운트될 때 오늘의 건강 데이터를 가져옴
    useEffect(() => {
        fetchHealthData();
        fetchSleepData();
        fetchHealthGrade();
        fetchMealData();
    }, []);

    const fetchHealthData = () => {

        return fetch(`http://localhost:8006/wellsy/health/${employeeNo}`)
            .then(response => {

                if (!response.ok) {
                    throw new Error(
                        `HTTP error: ${response.status}`
                    );
                }

                return response.text();
            })
            .then(text => {

                if (!text) {
                    setBasicData(null);
                    return;
                }

                setBasicData(JSON.parse(text));
            })
            .catch(error =>
                console.error(
                    "Error fetching health data:",
                    error
                )
            );
    };

    const fetchSleepData = () => {

        return fetch(`http://localhost:8006/wellsy/sleep/${employeeNo}`)
            .then(response => {

                if (!response.ok) {
                    throw new Error(
                        `HTTP error: ${response.status}`
                    );
                }

                return response.text();
            })
            .then(text => {

                if (!text) {
                    setSleepData(null);
                    return;
                }

                setSleepData(JSON.parse(text));
            })
            .catch(error =>
                console.error(
                    "Error fetching sleep data:",
                    error
                )
            );
    };

    const fetchHealthGrade = () => {

        return fetch(
            `http://localhost:8006/wellsy/health/grade/${employeeNo}`
        )
            .then(response => response.text())
            .then(data => {
                setHealthGrade(data || null);
            })
            .catch(error =>
                console.error(
                    "Error fetching health grade:",
                    error
                )
            );
    };

    const fetchMealData = () => {
        return selectTodayMealApi(employeeNo)
            .then(response => {
                setMealCalories(
                    response.data?.totalNutrition?.calories ?? 0
                );
            })
            .catch(error => {
                console.error(
                    "Error fetching meal data:",
                    error
                );

                setMealCalories(null);
            });
    };

    const refreshHealthData = async () => {
        await fetchHealthData();
        await fetchHealthGrade();
    };

    const refreshSleepData = async () => {
        await fetchSleepData();
        await fetchHealthGrade();
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
                        <BloodPressure 
                            systolicBp={basicData?.systolicBp} 
                            diastolicBp={basicData?.diastolicBp} />
                    </div>

                    {/* 수면 기록 */}
                    <SleepTime 
                        employeeNo={employeeNo}
                        sleepData={sleepData} 
                        onHealthUpdate={refreshSleepData} />

                    {/* 신체 기록 */}
                    <BodyInfo 
                        employeeNo={employeeNo}
                        height={basicData?.height} 
                        weight={basicData?.weight} 
                        bmi={basicData?.bmi} 
                        onHealthUpdate={refreshHealthData} />
                </div>

                {/* 오늘의 건강 기록 */}
                <FourIntake 
                    employeeNo={employeeNo}
                    meal={mealCalories} 
                    caffeine={basicData?.caffeineAmount} 
                    alcohol={basicData?.alcoholAmount} 
                    smoking={basicData?.smokingCount} 
                    onHealthUpdate={refreshHealthData} />

            </div>
        </div>
    );
}


// 내보내기
export default HealthDashboard;