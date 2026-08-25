import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BloodPressure from "./BloodPressure";
import BloodSugar from "./BloodSugar";
import FourIntake from "./FourIntake";
import SleepCard from "./SleepTime";

import "../../health/styles/Dashboard.css";
import BodyInfo from "./BodyInfo";

function HealthDashboard() {

    // 화면 깜빡임 없이 URL 주소를 전환해줄 navigate 함수
    let navigate = useNavigate();

    // 조회된 데이터를 담을 배열 형태의 State 변수
    const [dataList, setDataList] = useState([]);


    return (
        <div className="health-dashboard">
            <div className="health-card-area">

                <div className="health-left-area">
                    <div className="health-top-area">
                        <BloodSugar />
                        <BloodPressure />
                    </div>
                    <SleepCard />
                    <BodyInfo />
                </div>

                <FourIntake />
                
            </div>
        </div>
    );
}


// 내보내기
export default HealthDashboard;