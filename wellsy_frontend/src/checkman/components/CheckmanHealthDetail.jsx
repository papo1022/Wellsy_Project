import { useEffect, useState } from "react";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import {
    selectCheckmanApi
} from "../api/CheckmanApi";

import "../styles/Checkman.css";


function CheckmanHealthDetail() {

    let navigate = useNavigate();

    const healthRecordId
        = useParams().healthRecordId;


    const [checkman, setCheckman]
        = useState(null);


    useEffect(() => {

        const selectCheckman = async () => {

            try {

                const response
                    = await selectCheckmanApi(
                        healthRecordId
                    );


                setCheckman(
                    response.data
                );


            } catch(error) {

                console.log(
                    "건강정보 상세조회 실패!"
                );

                console.log(error);
            }

        };


        selectCheckman();

    }, [healthRecordId]);


    if(checkman == null) {

        return (

            <div className="checkman-dashboard">

                <div className="checkman-card">

                    건강정보를 불러오는 중입니다.

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
                                건강정보 상세
                            </h2>

                            <p>

                                { checkman.employeeName }

                                {" · "}

                                {
                                    checkman.departmentName
                                    ??
                                    "-"
                                }

                                {" · "}

                                {
                                    checkman.recordDate
                                }

                            </p>

                        </div>


                        <button
                            type="button"

                            className="checkman-btn checkman-btn-secondary"

                            onClick={ () => {

                                navigate(-1);

                            }}
                        >
                            뒤로가기
                        </button>

                    </div>


                    {/* ================================= */}
                    {/* 신체 정보 */}
                    {/* ================================= */}

                    <div className="checkman-detail-section">

                        <h3>
                            신체 정보
                        </h3>


                        <div className="checkman-detail-grid">


                            <div className="checkman-detail-item">

                                <span>
                                    키
                                </span>

                                <strong>

                                    {
                                        checkman.height
                                        ??
                                        "-"
                                    }

                                    {
                                        checkman.height != null
                                        &&
                                        " cm"
                                    }

                                </strong>

                            </div>


                            <div className="checkman-detail-item">

                                <span>
                                    체중
                                </span>

                                <strong>

                                    {
                                        checkman.weight
                                        ??
                                        "-"
                                    }

                                    {
                                        checkman.weight != null
                                        &&
                                        " kg"
                                    }

                                </strong>

                            </div>


                            <div className="checkman-detail-item">

                                <span>
                                    BMI
                                </span>

                                <strong>
                                    {
                                        checkman.bmi
                                        ??
                                        "-"
                                    }
                                </strong>

                            </div>


                            <div className="checkman-detail-item">

                                <span>
                                    기록일
                                </span>

                                <strong>
                                    {
                                        checkman.recordDate
                                    }
                                </strong>

                            </div>


                        </div>

                    </div>


                    {/* ================================= */}
                    {/* 건강 수치 */}
                    {/* ================================= */}

                    <div className="checkman-detail-section">

                        <h3>
                            건강 수치
                        </h3>


                        <div className="checkman-detail-grid">


                            <div className="checkman-detail-item">

                                <span>
                                    혈압
                                </span>

                                <strong>

                                    {
                                        checkman.systolicBp != null
                                        &&
                                        checkman.diastolicBp != null
                                        ?
                                        `${checkman.systolicBp}/${checkman.diastolicBp}`
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
                                        checkman.bloodSugar
                                        ??
                                        "-"
                                    }

                                    {
                                        checkman.bloodSugar != null
                                        &&
                                        " mg/dL"
                                    }

                                </strong>

                            </div>


                            <div className="checkman-detail-item">

                                <span>
                                    카페인
                                </span>

                                <strong>

                                    {
                                        checkman.caffeineAmount
                                        ??
                                        "-"
                                    }

                                    {
                                        checkman.caffeineAmount != null
                                        &&
                                        " mg"
                                    }

                                </strong>

                            </div>


                            <div className="checkman-detail-item">

                                <span>
                                    흡연
                                </span>

                                <strong>

                                    {
                                        checkman.smokingCount
                                        ??
                                        "-"
                                    }

                                    {
                                        checkman.smokingCount != null
                                        &&
                                        " 개비"
                                    }

                                </strong>

                            </div>


                            <div className="checkman-detail-item">

                                <span>
                                    음주량
                                </span>

                                <strong>

                                    {
                                        checkman.alcoholAmount
                                        ??
                                        "-"
                                    }

                                </strong>

                            </div>


                        </div>

                    </div>


                </div>

            </div>

        </div>

    );

}


export default CheckmanHealthDetail;