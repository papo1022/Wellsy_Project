import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

import "../style/CheckupReservation.css";


const API_URL =
  "http://localhost:8006/wellsy/api/checkup-reservations";


function CheckupReservation() {

  // ==========================================
  // State
  // ==========================================

  const [reservationDate, setReservationDate] = useState("");
  const [recentCheckupDate, setRecentCheckupDate] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [memo, setMemo] = useState("");

  const [reservationList, setReservationList] = useState([]);
  const [loading, setLoading] = useState(true);


  // ==========================================
  // 로그인한 사원 번호
  // ==========================================

  const token = sessionStorage.getItem("token");

  let employeeNo = null;

  if (token) {

    try {

      const decoded = jwtDecode(token);

      employeeNo = decoded.employeeNo;

    } catch (error) {

      console.error("토큰 해석 실패", error);

    }

  }


  // ==========================================
  // 내 예약 목록 조회
  // ==========================================

  const selectMyReservationList = async () => {

    if (!employeeNo) {
      return;
    }

    try {

      const response = await axios.get(
        `${API_URL}/my`,
        {
          params: {
            employeeNo: employeeNo
          }
        }
      );

      setReservationList(response.data);

    } catch (error) {

      console.error(
        "건강검진 예약 조회 실패",
        error
      );

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    selectMyReservationList();

  }, []);


  // ==========================================
  // 예약 신청
  // ==========================================

  const insertReservation = async (e) => {

    e.preventDefault();


    if (!reservationDate) {

      alert("검진 희망일을 선택해주세요.");

      return;
    }


    if (!hospitalName.trim()) {

      alert("검진 병원을 입력해주세요.");

      return;
    }


    try {

      await axios.post(
        API_URL,
        {
          employeeNo: employeeNo,

          reservationDate: reservationDate,

          recentCheckupDate:
            recentCheckupDate || null,

          hospitalName:
            hospitalName.trim(),

          memo:
            memo.trim()
        }
      );


      alert(
        "건강검진 예약 신청이 완료되었습니다."
      );


      // 입력창 초기화
      setReservationDate("");
      setRecentCheckupDate("");
      setHospitalName("");
      setMemo("");


      // 목록 다시 조회
      selectMyReservationList();


    } catch (error) {

      console.error(
        "건강검진 예약 신청 실패",
        error
      );

      alert(
        "예약 신청 중 오류가 발생했습니다."
      );

    }

  };


  // ==========================================
  // 예약 취소
  // ==========================================

  const cancelReservation =
    async (reservationId) => {


      const result = window.confirm(
        "건강검진 예약을 취소하시겠습니까?"
      );


      if (!result) {
        return;
      }


      try {

        await axios.put(
          `${API_URL}/${reservationId}/cancel`
        );


        alert(
          "예약이 취소되었습니다."
        );


        selectMyReservationList();


      } catch (error) {

        console.error(
          "예약 취소 실패",
          error
        );

        alert(
          "예약 취소 중 오류가 발생했습니다."
        );

      }

    };


  // ==========================================
  // 상태 표시
  // ==========================================

  const getStatusInfo = (status) => {

    switch (status) {

      case "Y":

        return {
          text: "승인 완료",
          className: "status-approved"
        };


      case "N":

        return {
          text: "승인 대기",
          className: "status-waiting"
        };


      case "C":

        return {
          text: "취소",
          className: "status-canceled"
        };


      default:

        return {
          text: "-",
          className: ""
        };

    }

  };


  // ==========================================
  // 날짜 표시
  // ==========================================

  const formatDate = (date) => {

    if (!date) {
      return "-";
    }


    const dateObject =
      new Date(`${date}T00:00:00`);


    return dateObject.toLocaleDateString(
      "ko-KR",
      {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      }
    );

  };


  return (

    <div className="checkup-page">


      {/* ======================================
          페이지 제목
      ====================================== */}

      <div className="checkup-page-header">

        <div>

          <h1>
            건강검진
          </h1>

          <p>
            건강검진을 예약하고
            신청 현황을 확인할 수 있습니다.
          </p>

        </div>

      </div>



      {/* ======================================
          예약 신청
      ====================================== */}

      <section className="checkup-section">


        <div className="checkup-section-title">

          <div>

            <h2>
              건강검진 예약
            </h2>

            <p>
              희망하는 검진 정보를 입력해주세요.
            </p>

          </div>

        </div>



        <form
          className="checkup-form"
          onSubmit={insertReservation}
        >


          <div className="checkup-form-grid">


            {/* 검진 희망일 */}

            <div className="checkup-form-group">

              <label>
                검진 희망일
                <span>*</span>
              </label>

              <input
                type="date"
                value={reservationDate}
                min={
                  new Date()
                    .toISOString()
                    .split("T")[0]
                }
                onChange={
                  (e) =>
                    setReservationDate(
                      e.target.value
                    )
                }
              />

            </div>



            {/* 최근 건강검진일 */}

            <div className="checkup-form-group">

              <label>
                최근 건강검진일
              </label>

              <input
                type="date"
                value={recentCheckupDate}
                onChange={
                  (e) =>
                    setRecentCheckupDate(
                      e.target.value
                    )
                }
              />

            </div>



            {/* 병원 */}

            <div className="checkup-form-group checkup-form-wide">

              <label>
                검진 병원
                <span>*</span>
              </label>

              <input
                type="text"
                placeholder="검진 받을 병원을 입력해주세요."
                value={hospitalName}
                maxLength={100}
                onChange={
                  (e) =>
                    setHospitalName(
                      e.target.value
                    )
                }
              />

            </div>



            {/* 메모 */}

            <div className="checkup-form-group checkup-form-wide">

              <label>
                메모
              </label>

              <textarea
                placeholder="관리자에게 전달할 내용이 있다면 입력해주세요."
                value={memo}
                maxLength={500}
                onChange={
                  (e) =>
                    setMemo(
                      e.target.value
                    )
                }
              />

              <div className="memo-count">

                {memo.length} / 500

              </div>

            </div>


          </div>



          <div className="checkup-form-button-area">

            <button
              type="submit"
              className="checkup-submit-button"
            >
              예약 신청
            </button>

          </div>


        </form>


      </section>



      {/* ======================================
          예약 현황
      ====================================== */}

      <section className="checkup-section">


        <div className="checkup-section-title">

          <div>

            <h2>
              나의 예약 현황
            </h2>

            <p>
              신청한 건강검진 예약을 확인할 수 있습니다.
            </p>

          </div>


          <span className="reservation-count">

            총 {reservationList.length}건

          </span>

        </div>



        {/* 로딩 */}

        {
          loading ? (

            <div className="checkup-empty">

              예약 정보를 불러오는 중입니다.

            </div>

          ) : reservationList.length === 0 ? (

            /* 예약 없음 */

            <div className="checkup-empty">

              <div className="empty-icon">
                +
              </div>

              <strong>
                예약 내역이 없습니다.
              </strong>

              <p>
                위에서 건강검진 예약을 신청해보세요.
              </p>

            </div>

          ) : (

            /* 예약 목록 */

            <div className="reservation-list">


              {
                reservationList.map(
                  (reservation) => {


                    const status =
                      getStatusInfo(
                        reservation.status
                      );


                    return (

                      <div
                        className="reservation-card"
                        key={
                          reservation.reservationId
                        }
                      >


                        {/* 왼쪽 */}

                        <div className="reservation-main">


                          <div className="reservation-top">


                            <span
                              className={
                                `reservation-status ${status.className}`
                              }
                            >
                              {status.text}
                            </span>


                            <span className="reservation-number">

                              예약번호 #{reservation.reservationId}

                            </span>


                          </div>



                          <h3>

                            {
                              reservation.hospitalName
                              || "병원 미입력"
                            }

                          </h3>



                          <div className="reservation-info">


                            <div>

                              <span>
                                검진 희망일
                              </span>

                              <strong>

                                {
                                  formatDate(
                                    reservation.reservationDate
                                  )
                                }

                              </strong>

                            </div>


                            <div>

                              <span>
                                최근 검진일
                              </span>

                              <strong>

                                {
                                  formatDate(
                                    reservation.recentCheckupDate
                                  )
                                }

                              </strong>

                            </div>


                          </div>



                          {
                            reservation.memo &&
                            (

                              <div className="reservation-memo">

                                {reservation.memo}

                              </div>

                            )
                          }


                        </div>



                        {/* 오른쪽 버튼 */}

                        {
                          reservation.status !== "C" &&
                          (

                            <div className="reservation-action">

                              <button
                                type="button"
                                className="cancel-button"
                                onClick={
                                  () =>
                                    cancelReservation(
                                      reservation.reservationId
                                    )
                                }
                              >
                                예약 취소
                              </button>

                            </div>

                          )
                        }


                      </div>

                    );

                  }
                )
              }


            </div>

          )
        }


      </section>


    </div>

  );

}


export default CheckupReservation;