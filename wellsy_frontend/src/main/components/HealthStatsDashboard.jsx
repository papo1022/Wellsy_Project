import {
  useEffect,
  useState
} from "react";

import axios from "axios";

import "../styles/HealthStatsDashboard.css";


const API_URL =
  "http://localhost:8006/wellsy/api/health-stats";

const EMPLOYEE_NO = 1;


function HealthStatsDashboard() {

  const [healthList, setHealthList] =
    useState([]);

  const [loading, setLoading] =
    useState(true);


  // 건강 기록 조회
  const selectHealthStats =
    async () => {

      try {

        const response =
          await axios.get(
            API_URL,
            {
              params: {
                employeeNo: EMPLOYEE_NO
              }
            }
          );

        setHealthList(
          response.data
        );

      } catch (error) {

        console.error(
          "건강통계 조회 실패",
          error
        );

      } finally {

        setLoading(false);

      }

    };


  useEffect(() => {

    selectHealthStats();

  }, []);


  if (loading) {

    return (
      <div className="health-dashboard">
        건강 데이터를 불러오는 중입니다.
      </div>
    );

  }


  if (healthList.length === 0) {

    return (
      <div className="health-dashboard">

        <h2>
          건강 통계
        </h2>

        <p>
          등록된 건강 기록이 없습니다.
        </p>

      </div>
    );

  }


  // 가장 최근 건강 기록
  const latest =
    healthList[
      healthList.length - 1
    ];


  return (
    <div className="health-dashboard">

      <div className="health-title">

        <h2>
          건강 통계
        </h2>

        <p>
          최근 건강 기록입니다.
        </p>

      </div>


      <div className="health-card-container">


        {/* 체중 */}
        <div className="health-card">

          <span>
            체중
          </span>

          <strong>
            {latest.weight !== null
              ? `${Number(latest.weight).toFixed(1)} kg`
              : "-"}
          </strong>

        </div>


        {/* 혈압 */}
        <div className="health-card">

          <span>
            혈압
          </span>

          <strong>
            {latest.systolicBp !== null &&
             latest.diastolicBp !== null

              ? `${latest.systolicBp}/${latest.diastolicBp}`

              : "-"}
          </strong>

          <p>
            mmHg
          </p>

        </div>


        {/* 혈당 */}
        <div className="health-card">

          <span>
            혈당
          </span>

          <strong>
            {latest.bloodSugar !== null
              ? Number(latest.bloodSugar).toFixed(1)
              : "-"}
          </strong>

          <p>
            mg/dL
          </p>

        </div>


      </div>

    </div>
  );
}


export default HealthStatsDashboard;