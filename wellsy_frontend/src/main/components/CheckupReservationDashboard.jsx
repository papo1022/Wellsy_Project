import {
  useEffect,
  useState
} from "react";

import axios from "axios";

import "../styles/CheckupReservationDashboard.css";


const API_URL =
  "http://localhost:8006/wellsy/api/admin/checkup-reservations";


function CheckupReservationDashboard() {

  const today =
    new Date();

  const [year, setYear] =
    useState(
      today.getFullYear()
    );

  const [month, setMonth] =
    useState(
      today.getMonth() + 1
    );

  const [departmentId, setDepartmentId] =
    useState("");

  const [jobId, setJobId] =
    useState("");

  const [name, setName] =
    useState("");

  const [status, setStatus] =
    useState("");

  const [reservationList, setReservationList] =
    useState([]);

  const [loading, setLoading] =
    useState(true);


  // ======================================
  // 건강검진 예약 목록 조회
  // ======================================

  const selectReservationList =
    async () => {

      try {

        setLoading(true);

        const response =
          await axios.get(
            API_URL,
            {
              params: {

                year:
                  year,

                month:
                  month,

                departmentId:
                  departmentId || undefined,

                jobId:
                  jobId || undefined,

                name:
                  name || undefined,

                status:
                  status || undefined

              }
            }
          );


        setReservationList(
          response.data
        );


      } catch (error) {

        console.error(
          "건강검진 예약 현황 조회 실패",
          error
        );

      } finally {

        setLoading(false);

      }

    };


  // ======================================
  // 최초 조회
  // ======================================

  useEffect(() => {

    selectReservationList();

  }, []);


  // ======================================
  // 요약 정보
  // ======================================

  const totalCount =
    reservationList.length;


  const reservationCount =
    reservationList.filter(
      (item) =>
        item.status === "Y"
    ).length;


  const notCompletedCount =
    reservationList.filter(
      (item) =>
        item.status === "N"
    ).length;


  const cancelCount =
    reservationList.filter(
      (item) =>
        item.status === "C"
    ).length;


  return (

    <div className="checkup-dashboard">


      {/* ===================================
          제목
      =================================== */}

      <div className="checkup-title">

        <h2>
          건강검진 예약 현황
        </h2>

        <p>
          해당 월의 직원 건강검진 예약 현황을 조회합니다.
        </p>

      </div>



      {/* ===================================
          검색 조건
      =================================== */}

      <div className="checkup-search-box">


        {/* 연도 */}

        <select
          value={year}
          onChange={
            (e) =>
              setYear(
                Number(e.target.value)
              )
          }
        >

          <option value="2025">
            2025년
          </option>

          <option value="2026">
            2026년
          </option>

          <option value="2027">
            2027년
          </option>

        </select>



        {/* 월 */}

        <select
          value={month}
          onChange={
            (e) =>
              setMonth(
                Number(e.target.value)
              )
          }
        >

          {
            Array.from(
              {
                length: 12
              },
              (_, index) =>
                index + 1
            ).map(
              (monthValue) => (

                <option
                  key={monthValue}
                  value={monthValue}
                >

                  {monthValue}월

                </option>

              )
            )
          }

        </select>



        {/* 부서 */}

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

          <option value="1">
            개발부
          </option>

          <option value="2">
            인사부
          </option>

          <option value="3">
            영업부
          </option>

        </select>



        {/* 직급 */}

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

          <option value="1">
            사원
          </option>

          <option value="2">
            대리
          </option>

          <option value="3">
            과장
          </option>

        </select>



        {/* 예약 상태 */}

        <select
          value={status}
          onChange={
            (e) =>
              setStatus(
                e.target.value
              )
          }
        >

          <option value="">
            전체 상태
          </option>

          <option value="Y">
            예약
          </option>

          <option value="N">
            미완료
          </option>

          <option value="C">
            취소
          </option>

        </select>



        {/* 이름 */}

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



        {/* 조회 */}

        <button
          className="checkup-search-btn"
          onClick={
            selectReservationList
          }
        >
          조회
        </button>


      </div>



      {/* ===================================
          요약 카드
      =================================== */}

      <div className="checkup-card-container">


        <div className="checkup-card">

          <span>
            예약
          </span>

          <strong>
            {reservationCount}
          </strong>

          <p>
            명
          </p>

        </div>



        <div className="checkup-card">

          <span>
            미완료
          </span>

          <strong>
            {notCompletedCount}
          </strong>

          <p>
            명
          </p>

        </div>



        <div className="checkup-card">

          <span>
            취소
          </span>

          <strong>
            {cancelCount}
          </strong>

          <p>
            명
          </p>

        </div>


      </div>



      {/* ===================================
          목록
      =================================== */}

      <div className="checkup-table-box">

        <h3>
          {year}년 {month}월 예약 직원
        </h3>


        {
          loading
            ? (

              <p className="checkup-message">
                데이터를 불러오는 중입니다.
              </p>

            )
            : reservationList.length === 0
            ? (

              <p className="checkup-message">
                조회된 건강검진 예약 정보가 없습니다.
              </p>

            )
            : (

              <table className="checkup-table">

                <thead>

                  <tr>

                    <th>
                      예약번호
                    </th>

                    <th>
                      사번
                    </th>

                    <th>
                      이름
                    </th>

                    <th>
                      부서
                    </th>

                    <th>
                      직급
                    </th>

                    <th>
                      예약일
                    </th>

                    <th>
                      최근 검진일
                    </th>

                    <th>
                      병원
                    </th>

                    <th>
                      상태
                    </th>

                    <th>
                      메모
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {
                    reservationList.map(
                      (item) => (

                        <tr
                          key={
                            item.reservationId
                          }
                        >

                          <td>
                            {item.reservationId}
                          </td>

                          <td>
                            {item.employeeNo}
                          </td>

                          <td>
                            {item.name}
                          </td>

                          <td>
                            {item.departmentName ?? "-"}
                          </td>

                          <td>
                            {item.jobName ?? "-"}
                          </td>

                          <td>
                            {item.reservationDate ?? "-"}
                          </td>

                          <td>
                            {item.recentCheckupDate ?? "-"}
                          </td>

                          <td>
                            {item.hospitalName ?? "-"}
                          </td>

                          <td>
                            {
                              getStatusName(
                                item.status
                              )
                            }
                          </td>

                          <td>
                            {item.memo ?? "-"}
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


    </div>
  );
}


function getStatusName(status) {

  if (
    status === "Y"
  ) {

    return "예약";

  }


  if (
    status === "N"
  ) {

    return "미완료";

  }


  if (
    status === "C"
  ) {

    return "취소";

  }


  return "-";
}


export default CheckupReservationDashboard;