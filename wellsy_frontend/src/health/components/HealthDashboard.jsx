import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function HealthDashboard() {

    // 화면 깜빡임 없이 URL 주소를 전환해줄 navigate 함수
    let navigate = useNavigate();

    // 조회된 데이터를 담을 배열 형태의 State 변수
    const [dataList, setDataList] = useState([]);


    return (

        <div>
            으악
        </div>
    );
}


// 내보내기
export default HealthDashboard;