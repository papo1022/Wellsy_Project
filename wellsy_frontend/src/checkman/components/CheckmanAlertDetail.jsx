import { useEffect, useState } from "react";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import {
    selectCheckmanAlertApi,
    updateCheckmanAlertApi
} from "../api/checkmanApi";

import "../styles/Checkman.css";


function CheckmanAlertDetail() {

    let navigate = useNavigate();

    const alertId
        = useParams().alertId;


    const [alert, setAlert]
        = useState(null);


    // =========================================
    // 알림 상세조회
    // =========================================

    const selectAlert = async () => {

        try {

            const response
                = await selectCheckmanAlertApi(
                    alertId
                );


            setAlert(
                response.data
            );


        } catch(error) {

            console.log(
                "건강 이상 알림 상세조회 실패!"
            );

            console.log(error);
        }

    };


    useEffect(() => {

        selectAlert();

    }, [alertId]);


    // =========================================
    // 확인 처리
    // =========================================

    const updateAlertRead = async () => {

        if(
            !window.confirm(
                "해당 알림을 확인 처리하시겠습니까?"
            )
        ) {

            return;
        }


        try {

            const response
                = await updateCheckmanAlertApi(
                    alertId
                );


            if(response.data === "success") {

                alert("확인 처리되었습니다.");

                selectAlert();

            } else {

                alert(
                    "이미 확인된 알림입니다."
                );
            }


        } catch(error) {

            console.log(
                "알림 확인 처리 실패!"
            );

            console.log(error);
        }

    };


    if(alert == null) {

        return (

            <div className="checkman-dashboard">

                <div className="checkman-card">

                    알림 정보를 불러오는 중입니다.

                </div>

            </div>

        );

    }


    return (

        <div className="checkman-dashboard">


            <div className="checkman-card-area">


                <div className="checkman-card">


                    <div className="checkman-detail-header">


                        <div>

                            <h2>
                                건강 이상 알림 상세
                            </h2>

                            <p>

                                { alert.employeeName }

                                {" · "}

                                {
                                    alert.departmentName
                                    ??
                                    "-"
                                }

                            </p>

                        </div>


                        <span
                            className={
                                alert.isRead === "Y"
                                ?
                                "checkman-read"
                                :
                                "checkman-unread"
                            }
                        >

                            {
                                alert.isRead === "Y"
                                ?
                                "확인완료"
                                :
                                "미확인"
                            }

                        </span>

                    </div>


                    {/* 알림 정보 */}
                    <div className="checkman-detail-section">

                        <h3>
                            알림 정보
                        </h3>


                        <div className="checkman-detail-grid">


                            <div className="checkman-detail-item">

                                <span>
                                    직원
                                </span>

                                <strong>
                                    { alert.employeeName }
                                </strong>

                            </div>


                            <div className="checkman-detail-item">

                                <span>
                                    알림 유형
                                </span>

                                <strong>
                                    { alert.alertType }
                                </strong>

                            </div>


                            <div className="checkman-detail-item">

                                <span>
                                    심각도
                                </span>

                                <strong>
                                    { alert.severity }
                                </strong>

                            </div>


                            <div className="checkman-detail-item">

                                <span>
                                    발생일
                                </span>

                                <strong>

                                    {
                                        alert.alertCreatedAt
                                        ?.replace(
                                            "T",
                                            " "
                                        )
                                        .substring(
                                            0,
                                            19
                                        )
                                    }

                                </strong>

                            </div>

                        </div>


                        <div className="checkman-message-box">

                            { alert.message }

                        </div>

                    </div>


                    {/* 검진결과 */}
                    <div className="checkman-detail-section">

                        <h3>
                            건강검진 결과
                        </h3>


                        <div className="checkman-detail-grid">


                            <div className="checkman-detail-item">

                                <span>
                                    결과 등급
                                </span>

                                <strong>
                                    {
                                        alert.resultGrade
                                        ??
                                        "-"
                                    }
                                </strong>

                            </div>


                            <div className="checkman-detail-item">

                                <span>
                                    혈압
                                </span>

                                <strong>

                                    {
                                        alert.checkupSystolicBp != null
                                        &&
                                        alert.checkupDiastolicBp != null
                                        ?
                                        `${alert.checkupSystolicBp}/${alert.checkupDiastolicBp}`
                                        :
                                        "-"
                                    }

                                </strong>

                            </div>


                            <div className="checkman-detail-item">

                                <span>
                                    혈당
                                </span>

                                <strong>
                                    {
                                        alert.checkupBloodSugar
                                        ??
                                        "-"
                                    }
                                </strong>

                            </div>


                            <div className="checkman-detail-item">

                                <span>
                                    총 콜레스테롤
                                </span>

                                <strong>
                                    {
                                        alert.totalCholesterol
                                        ??
                                        "-"
                                    }
                                </strong>

                            </div>


                            <div className="checkman-detail-item">

                                <span>
                                    병원
                                </span>

                                <strong>
                                    {
                                        alert.hospitalName
                                        ??
                                        "-"
                                    }
                                </strong>

                            </div>


                            <div className="checkman-detail-item">

                                <span>
                                    검진 예약일
                                </span>

                                <strong>
                                    {
                                        alert.reservationDate
                                        ??
                                        "-"
                                    }
                                </strong>

                            </div>


                        </div>


                        {
                            alert.resultDetail
                            &&
                            (
                                <div className="checkman-message-box">

                                    {
                                        alert.resultDetail
                                    }

                                </div>
                            )
                        }

                    </div>


                    <div className="checkman-btn-area">


                        <button
                            type="button"

                            className="checkman-btn checkman-btn-secondary"

                            onClick={ () => {

                                navigate("/checkman");

                            }}
                        >
                            목록으로
                        </button>


                        {
                            alert.isRead === "N"
                            &&
                            (
                                <button
                                    type="button"

                                    className="checkman-btn checkman-btn-primary"

                                    onClick={
                                        updateAlertRead
                                    }
                                >
                                    확인완료
                                </button>
                            )
                        }


                    </div>


                </div>

            </div>

        </div>

    );

}


export default CheckmanAlertDetail;