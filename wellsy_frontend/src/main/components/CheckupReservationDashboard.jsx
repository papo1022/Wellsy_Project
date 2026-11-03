import {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import axios from "axios";

import "../styles/CheckupReservationDashboard.css";


const API_URL =
  "/wellsy/api/checkup-reservation-dashboard";

const PAGE_SIZE = 10;


function CheckupReservationDashboard() {

  const navigate =
    useNavigate();

  const today =
    new Date();

  // ======================================
  // 검색 조건
  // ======================================

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


  // ======================================
  // 예약 목록
  // ======================================

  const [reservationList, setReservationList] =
    useState([]);

  const [summaryList, setSummaryList] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [page, setPage] =
    useState(0);

  const [totalPages, setTotalPages] =
    useState(0);

  const [totalElements, setTotalElements] =
    useState(0);


  // ======================================
  // 취소 명단 모달
  // ======================================

  const [cancelModalOpen, setCancelModalOpen] =
    useState(false);


  // ======================================
  // 건강검진 예약 목록 조회
  // ======================================

  const selectReservationList =
    async (targetPage = 0) => {

      try {

        setLoading(true);

        const commonParams = {
          year:
            year,

          month:
            month,

          departmentId:
            departmentId || undefined,

          jobId:
            jobId || undefined,

          name:
            name || undefined
        };

        const [pageResponse, summaryResponse] =
          await Promise.all([
            axios.get(
              API_URL,
              {
                params: {
                  ...commonParams,

                  status:
                    status || undefined,

                  page:
                    targetPage,

                  size:
                    PAGE_SIZE
                }
              }
            ),

            axios.get(
              `${API_URL}/summary`,
              {
                params: commonParams
              }
            )
          ]);

        setReservationList(
          pageResponse.data.content ?? []
        );

        setSummaryList(
          summaryResponse.data ?? []
        );

        setPage(
          pageResponse.data.number ?? targetPage
        );

        setTotalPages(
          pageResponse.data.totalPages ?? 0
        );

        setTotalElements(
          pageResponse.data.totalElements ?? 0
        );

      } catch (error) {

        console.error(
          "건강검진 예약 현황 조회 실패",
          error
        );

        setReservationList([]);
        setSummaryList([]);
        setTotalPages(0);
        setTotalElements(0);

      } finally {

        setLoading(false);

      }

    };


  // ======================================
  // 최초 조회
  // ======================================

  useEffect(() => {

    selectReservationList(0);

  }, []);


  // ======================================
  // 페이지 이동
  // ======================================

  const movePage = (nextPage) => {

    if (
      nextPage < 0 ||
      nextPage >= totalPages ||
      nextPage === page
    ) {
      return;
    }

    selectReservationList(nextPage);

  };


  // ======================================
  // 승인 완료
  // ======================================

  const reservationCount =
    summaryList.filter(
      (item) =>
        item.status === "Y"
    ).length;


  // ======================================
  // 승인 대기
  // ======================================

  const notCompletedCount =
    summaryList.filter(
      (item) =>
        item.status === "N"
    ).length;


  // ======================================
  // 취소 목록
  // ======================================

  const cancelList =
    summaryList.filter(
      (item) =>
        item.status === "C"
    );


  // ======================================
  // 취소 인원수
  // ======================================

  const cancelCount =
    cancelList.length;


  // ======================================
  // 일반 예약 테이블
  // 취소건 제외
  // ======================================

  const visibleReservationList =
    reservationList.filter(
      (item) =>
        item.status !== "C"
    );


  // ======================================
  // 취소 모달 열기
  // ======================================

  const openCancelModal = () => {

    setCancelModalOpen(true);

  };


  // ======================================
  // 취소 모달 닫기
  // ======================================

  const closeCancelModal = () => {

    setCancelModalOpen(false);

  };


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
            승인 완료
          </option>

          <option value="N">
            승인 대기
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
            () =>
              selectReservationList(0)
          }
        >
          조회
        </button>

      </div>


      {/* ===================================
          요약 카드
      =================================== */}

      <div className="checkup-card-container">


       {/* 승인 완료 */}

<div className="checkup-card">

  <span>
    승인 완료
  </span>

  <strong>
    {reservationCount}
  </strong>

  <p>
    명
  </p>

</div>


{/* 승인 대기 */}

<div
  className="checkup-card checkup-waiting-card"
  onClick={
    () =>
      navigate(
        "/checkman?tab=reservation"
      )
  }
>

  <span>
    승인 대기
  </span>

  <strong>
    {notCompletedCount}
  </strong>

  <p>
    명
  </p>

  <small className="checkup-waiting-card-guide">
    클릭하여 예약 승인
  </small>

</div>


        {/* ===================================
            취소 카드
            클릭하면 모달 표시
        =================================== */}

        <div
          className="checkup-card checkup-cancel-card"
          onClick={
            openCancelModal
          }
        >

          <span>
            취소
          </span>

          <strong>
            {cancelCount}
          </strong>

          <p>
            명
          </p>

          <small className="checkup-cancel-card-guide">
            클릭하여 명단 확인
          </small>

        </div>

      </div>


      {/* ===================================
          예약 직원 목록
      =================================== */}

      <div className="checkup-table-box">

        <h3>
          {year}년 {month}월 예약 직원
        </h3>

        <p className="checkup-total-count">
          전체 {totalElements}건
        </p>


        {
          loading
            ? (

              <p className="checkup-message">
                데이터를 불러오는 중입니다.
              </p>

            )

            : visibleReservationList.length === 0

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
                      visibleReservationList.map(
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


        {
          totalPages > 0
          &&
          (

            <div className="checkup-pagination">

              <button
                type="button"
                disabled={page === 0}
                onClick={
                  () => movePage(page - 1)
                }
              >
                &lt;
              </button>


              {
                Array.from(
                  { length: totalPages },
                  (_, index) => (

                    <button
                      type="button"
                      key={index}
                      className={
                        page === index
                          ? "active"
                          : ""
                      }
                      onClick={
                        () => movePage(index)
                      }
                    >
                      {index + 1}
                    </button>

                  )
                )
              }


              <button
                type="button"
                disabled={
                  page === totalPages - 1
                }
                onClick={
                  () => movePage(page + 1)
                }
              >
                &gt;
              </button>

            </div>

          )
        }

      </div>


      {/* ===================================
          취소 명단 모달
      =================================== */}

      {
        cancelModalOpen
        &&
        (

          <div
            className="checkup-cancel-modal-background"

            onMouseDown={
              (e) => {

                if (
                  e.target ===
                  e.currentTarget
                ) {

                  closeCancelModal();

                }

              }
            }
          >

            <div className="checkup-cancel-modal">


              {/* 모달 제목 */}

              <div className="checkup-cancel-modal-header">

                <div>

                  <h3>
                    취소 예약 명단
                  </h3>

                  <p>
                    {year}년 {month}월 취소 예약
                    {" "}
                    {cancelCount}건
                  </p>

                </div>


                <button
                  type="button"
                  className="checkup-cancel-modal-x"
                  onClick={
                    closeCancelModal
                  }
                >
                  ×
                </button>

              </div>


              {/* 취소 명단 */}

              <div className="checkup-cancel-modal-content">

                {
                  cancelList.length === 0
                  ?
                  (

                    <p className="checkup-message">
                      취소된 예약이 없습니다.
                    </p>

                  )
                  :
                  (

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
                            병원
                          </th>

                          <th>
                            메모
                          </th>

                        </tr>

                      </thead>


                      <tbody>

                        {
                          cancelList.map(
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
                                  {item.hospitalName ?? "-"}
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


              {/* 닫기 버튼 */}

              <div className="checkup-cancel-modal-footer">

                <button
                  type="button"
                  onClick={
                    closeCancelModal
                  }
                >
                  닫기
                </button>

              </div>

            </div>

          </div>

        )
      }


    </div>

  );

}


// ======================================
// 예약 상태
// ======================================

function getStatusName(status) {

  if (
    status === "Y"
  ) {

    return "승인 완료";

  }


  if (
    status === "N"
  ) {

    return "승인 대기";

  }


  if (
    status === "C"
  ) {

    return "취소";

  }


  return "-";

}


export default CheckupReservationDashboard;
