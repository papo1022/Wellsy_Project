import {
  useEffect,
  useState
} from "react";

import axios from "axios";

import "../styles/HealthRiskDashboard.css";


const API_URL =
  "http://localhost:8006/wellsy/api/admin/health-risk";


function HealthRiskDashboard() {

  const [healthList, setHealthList] =
    useState([]);

  const [optionList, setOptionList] =
    useState([]);

  const [departmentId, setDepartmentId] =
    useState("");

  const [jobId, setJobId] =
    useState("");

  const [name, setName] =
    useState("");

  const [riskLevel, setRiskLevel] =
    useState("");

  const [selectedEmployee, setSelectedEmployee] =
    useState(null);

  const [loading, setLoading] =
    useState(true);


  // ======================================
  // 전체 옵션 조회
  // ======================================

  const selectOptions =
    async () => {

      try {

        const response =
          await axios.get(
            API_URL
          );

        setOptionList(
          response.data
        );

      } catch (error) {

        console.error(
          "검색 옵션 조회 실패",
          error
        );

      }

    };


  // ======================================
  // 건강 위험군 조회
  // ======================================

  const selectHealthRiskList =
    async () => {

      try {

        setLoading(true);


        const response =
          await axios.get(
            API_URL,
            {
              params: {

                departmentId:
                  departmentId ||
                  undefined,

                jobId:
                  jobId ||
                  undefined,

                name:
                  name ||
                  undefined,

                riskLevel:
                  riskLevel ||
                  undefined

              }
            }
          );


        setHealthList(
          response.data
        );


      } catch (error) {

        console.error(
          "건강 위험군 조회 실패",
          error
        );

      } finally {

        setLoading(false);

      }

    };


  useEffect(() => {

    selectOptions();

    selectHealthRiskList();

  }, []);


  // ======================================
  // 부서 목록
  // ======================================

  const departmentList =
    Array.from(
      new Map(
        optionList
          .filter(
            (item) =>
              item.departmentId != null
          )
          .map(
            (item) => [
              item.departmentId,
              {
                departmentId:
                  item.departmentId,

                departmentName:
                  item.departmentName
              }
            ]
          )
      ).values()
    );


  // ======================================
  // 직급 목록
  // ======================================

  const jobList =
    Array.from(
      new Map(
        optionList
          .filter(
            (item) =>
              item.jobId != null
          )
          .map(
            (item) => [
              item.jobId,
              {
                jobId:
                  item.jobId,

                jobName:
                  item.jobName
              }
            ]
          )
      ).values()
    );


  // ======================================
  // 요약
  // ======================================

  const totalCount =
    healthList.length;


  const normalCount =
    healthList.filter(
      (item) =>
        item.riskLevel === "NORMAL"
    ).length;


  const cautionCount =
    healthList.filter(
      (item) =>
        item.riskLevel === "CAUTION"
    ).length;


  const riskCount =
    healthList.filter(
      (item) =>
        item.riskLevel === "RISK"
    ).length;


  return (

    <div className="health-risk-dashboard">


      {/* 제목 */}

      <div className="health-risk-title">

        <h2>
          직원 건강 위험군 현황
        </h2>

        <p>
          직원의 최신 건강 기록을 기준으로
          건강 위험 상태를 확인합니다.
        </p>

      </div>



      {/* 요약 카드 */}

      <div className="health-risk-card-container">


        <div className="health-risk-card">

          <span>
            조회 직원
          </span>

          <strong>
            {totalCount}
          </strong>

          <p>명</p>

        </div>


        <div className="health-risk-card normal">

          <span>
            정상
          </span>

          <strong>
            {normalCount}
          </strong>

          <p>명</p>

        </div>


        <div className="health-risk-card caution">

          <span>
            주의
          </span>

          <strong>
            {cautionCount}
          </strong>

          <p>명</p>

        </div>


        <div className="health-risk-card risk">

          <span>
            위험
          </span>

          <strong>
            {riskCount}
          </strong>

          <p>명</p>

        </div>


      </div>



      {/* 검색 */}

      <div className="health-risk-search">


        <select
          value={departmentId}
          onChange={
            (e) =>
              setDepartmentId(
                e.target.value
              )
          }
        >

          <option value="">
            전체 부서
          </option>

          {
            departmentList.map(
              (department) => (

                <option
                  key={
                    department.departmentId
                  }
                  value={
                    department.departmentId
                  }
                >

                  {
                    department.departmentName
                  }

                </option>

              )
            )
          }

        </select>



        <select
          value={jobId}
          onChange={
            (e) =>
              setJobId(
                e.target.value
              )
          }
        >

          <option value="">
            전체 직급
          </option>

          {
            jobList.map(
              (job) => (

                <option
                  key={
                    job.jobId
                  }
                  value={
                    job.jobId
                  }
                >

                  {job.jobName}

                </option>

              )
            )
          }

        </select>



        <input
          type="text"
          value={name}
          placeholder="직원 이름"
          onChange={
            (e) =>
              setName(
                e.target.value
              )
          }
        />


        <select
          value={riskLevel}
          onChange={
            (e) =>
              setRiskLevel(
                e.target.value
              )
          }
        >

          <option value="">
            전체 위험도
          </option>

          <option value="NORMAL">
            정상
          </option>

          <option value="CAUTION">
            주의
          </option>

          <option value="RISK">
            위험
          </option>

        </select>


        <button
          onClick={
            selectHealthRiskList
          }
        >
          조회
        </button>


      </div>



      {/* 목록 */}

      <div className="health-risk-table-box">


        {
          loading
            ? (

              <p className="health-risk-message">
                데이터를 불러오는 중입니다.
              </p>

            )
            : healthList.length === 0
            ? (

              <p className="health-risk-message">
                조회된 직원이 없습니다.
              </p>

            )
            : (

              <table className="health-risk-table">

                <thead>

                  <tr>

                    <th>사번</th>

                    <th>이름</th>

                    <th>부서</th>

                    <th>직급</th>

                    <th>BMI</th>

                    <th>혈압</th>

                    <th>혈당</th>

                    <th>위험도</th>

                    <th>검진예약</th>

                    <th>상세</th>

                  </tr>

                </thead>


                <tbody>

                  {
                    healthList.map(
                      (item) => (

                        <tr
                          key={
                            item.employeeNo
                          }
                        >

                          <td>
                            {item.employeeNo}
                          </td>

                          <td>
                            {item.name}
                          </td>

                          <td>
                            {
                              item.departmentName
                              ?? "-"
                            }
                          </td>

                          <td>
                            {
                              item.jobName
                              ?? "-"
                            }
                          </td>

                          <td>
                            {
                              item.bmi != null
                                ? Number(
                                    item.bmi
                                  ).toFixed(2)
                                : "-"
                            }
                          </td>

                          <td>

                            {
                              item.systolicBp != null &&
                              item.diastolicBp != null
                                ? `${item.systolicBp}/${item.diastolicBp}`
                                : "-"
                            }

                          </td>

                          <td>

                            {
                              item.bloodSugar
                              ?? "-"
                            }

                          </td>


                          <td>

                            <span
                              className={
                                `risk-badge ${
                                  item.riskLevel
                                    .toLowerCase()
                                }`
                              }
                            >

                              {
                                getRiskName(
                                  item.riskLevel
                                )
                              }

                            </span>

                          </td>


                          <td>

                            {
                              item.checkupReserved
                                ? "예약"
                                : item.riskLevel ===
                                  "NORMAL"
                                ? "-"
                                : "미예약"
                            }

                          </td>


                          <td>

                            <button
                              className="health-risk-detail-btn"
                              onClick={
                                () =>
                                  setSelectedEmployee(
                                    item
                                  )
                              }
                            >

                              보기

                            </button>

                          </td>

                        </tr>

                      )
                    )
                  }

                </tbody>

              </table>

            )
        }

      </div>



      {/* 상세 모달 */}

      {
        selectedEmployee &&
        (

          <div
            className="health-risk-modal-background"

            onMouseDown={
              (e) => {

                if (
                  e.target ===
                  e.currentTarget
                ) {

                  setSelectedEmployee(
                    null
                  );

                }

              }
            }
          >


            <div className="health-risk-modal">


              <div className="health-risk-modal-header">

                <h3>
                  {
                    selectedEmployee.name
                  }
                  님 건강 위험 상세
                </h3>


                <button
                  onClick={
                    () =>
                      setSelectedEmployee(
                        null
                      )
                  }
                >
                  ×
                </button>

              </div>



              <div className="health-risk-employee-info">

                <p>
                  사번 :
                  {" "}
                  {
                    selectedEmployee.employeeNo
                  }
                </p>

                <p>
                  부서 :
                  {" "}
                  {
                    selectedEmployee.departmentName
                    ?? "-"
                  }
                </p>

                <p>
                  직급 :
                  {" "}
                  {
                    selectedEmployee.jobName
                    ?? "-"
                  }
                </p>

                <p>
                  기록일 :
                  {" "}
                  {
                    selectedEmployee.recordDate
                    ?? "-"
                  }
                </p>

              </div>


              <hr />


              <div className="health-risk-health-info">


                <div>

                  <span>
                    키
                  </span>

                  <strong>
                    {
                      selectedEmployee.height
                      ?? "-"
                    }
                    {" "}
                    cm
                  </strong>

                </div>


                <div>

                  <span>
                    체중
                  </span>

                  <strong>
                    {
                      selectedEmployee.weight
                      ?? "-"
                    }
                    {" "}
                    kg
                  </strong>

                </div>


                <div>

                  <span>
                    BMI
                  </span>

                  <strong>
                    {
                      selectedEmployee.bmi
                      ?? "-"
                    }
                  </strong>

                </div>


                <div>

                  <span>
                    혈압
                  </span>

                  <strong>

                    {
                      selectedEmployee.systolicBp
                      ?? "-"
                    }

                    /

                    {
                      selectedEmployee.diastolicBp
                      ?? "-"
                    }

                    {" "}
                    mmHg

                  </strong>

                </div>


                <div>

                  <span>
                    혈당
                  </span>

                  <strong>

                    {
                      selectedEmployee.bloodSugar
                      ?? "-"
                    }

                    {" "}
                    mg/dL

                  </strong>

                </div>


              </div>



              <div className="health-risk-result">

                <h4>
                  종합 위험도
                </h4>

                <span
                  className={
                    `risk-badge ${
                      selectedEmployee
                        .riskLevel
                        .toLowerCase()
                    }`
                  }
                >

                  {
                    getRiskName(
                      selectedEmployee
                        .riskLevel
                    )
                  }

                </span>

              </div>



              {
                selectedEmployee
                  .riskReasons
                  ?.length > 0 &&
                (

                  <div className="health-risk-reasons">

                    <h4>
                      위험 항목
                    </h4>

                    <ul>

                      {
                        selectedEmployee
                          .riskReasons
                          .map(
                            (
                              reason,
                              index
                            ) => (

                              <li
                                key={
                                  index
                                }
                              >

                                {reason}

                              </li>

                            )
                          )
                      }

                    </ul>

                  </div>

                )
              }



              <div className="health-risk-checkup">

                <strong>
                  건강검진 :
                </strong>

                {" "}

                {
                  selectedEmployee
                    .checkupReserved
                    ? "이번 달 예약됨"
                    : selectedEmployee
                        .riskLevel ===
                      "NORMAL"
                    ? "현재 검진 권장 대상 아님"
                    : "건강검진 확인 권장"
                }

              </div>


            </div>

          </div>

        )
      }


    </div>
  );
}


function getRiskName(
  riskLevel
) {

  if (
    riskLevel === "RISK"
  ) {

    return "위험";

  }


  if (
    riskLevel === "CAUTION"
  ) {

    return "주의";

  }


  return "정상";
}


export default HealthRiskDashboard;