import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import {
    selectEmployeeApi,
    deleteEmployeeApi
} from "../api/employeeApi";

import "../styles/Employee.css";


function EmployeeDetail() {

    // Path Variable 사번
    const employeeNo = useParams().employeeNo;

    let navigate = useNavigate();


    // 사원 상세정보
    const [employee, setEmployee] = useState({

        employeeNo : "",
        loginId : "",
        email : "",
        name : "",
        phone : "",
        gender : "",
        birthDate : "",
        role : "",
        hireDate : "",
        status : "",
        resignDate : "",

        departmentId : "",
        departmentName : "",

        jobId : "",
        jobName : ""

    });


    // =========================================
    // 사원 상세 조회
    // =========================================
    useEffect(() => {

        const selectEmployee = async () => {

            try {

                const response
                    = await selectEmployeeApi(employeeNo);


                if(response.data) {

                    setEmployee(response.data);

                } else {

                    alert("존재하지 않거나 퇴사한 사원입니다.");

                    navigate("/employee");
                }

            } catch(error) {

                console.log("사원 상세 조회용 ajax 통신 실패!");
                console.log(error);
            }
        };


        selectEmployee();

    }, [employeeNo, navigate]);


    // =========================================
    // 퇴사 처리
    // =========================================
    const deleteEmployee = async () => {

        if(
            !window.confirm(
                "정말 해당 사원을 퇴사 처리하시겠습니까?"
            )
        ) {

            return;
        }


        try {

            const response
                = await deleteEmployeeApi(employeeNo);


            if(response.data === "success") {

                alert("사원 퇴사 처리가 완료되었습니다.");

                navigate("/employee");

            } else {

                alert("사원 퇴사 처리에 실패했습니다.");
            }

        } catch(error) {

            console.log("사원 퇴사 처리용 ajax 통신 실패!");
            console.log(error);
        }
    };


    return (

        <div className="employee-dashboard">


            {/* 상세정보 카드 */}
            <div className="employee-card-area">

                <div className="employee-card employee-detail-card">


                    {/* 상단 */}
                    <div className="employee-detail-header">

                        <div>

                            <h2>
                                사원 상세정보
                            </h2>

                            <p>
                                등록된 사원의 상세 정보를 확인합니다.
                            </p>

                        </div>


                        <span
                            className={
                            employee.status === "Y"
                            ?
                            "employee-status employee-status-active"
                            :
                            "employee-status employee-status-resigned"
                            }
                            >

                            {
                            employee.status === "Y"
                            ?
                            "재직중"
                            :
                            "퇴사"
                            }

                        </span>

                    </div>


                    {/* ================================= */}
                    {/* 기본 정보 */}
                    {/* ================================= */}

                    <div className="employee-detail-section">

                        <h3>
                            기본 정보
                        </h3>


                        <div className="employee-detail-grid">


                            <div className="employee-detail-item">

                                <span>
                                    사번
                                </span>

                                <strong>
                                    { employee.employeeNo }
                                </strong>

                            </div>


                            <div className="employee-detail-item">

                                <span>
                                    이름
                                </span>

                                <strong>
                                    { employee.name }
                                </strong>

                            </div>


                            <div className="employee-detail-item">

                                <span>
                                    로그인 ID
                                </span>

                                <strong>
                                    { employee.loginId }
                                </strong>

                            </div>


                            <div className="employee-detail-item">

                                <span>
                                    이메일
                                </span>

                                <strong>
                                    { employee.email }
                                </strong>

                            </div>


                            <div className="employee-detail-item">

                                <span>
                                    전화번호
                                </span>

                                <strong>
                                    { employee.phone || "-" }
                                </strong>

                            </div>


                            <div className="employee-detail-item">

                                <span>
                                    성별
                                </span>

                                <strong>

                                    {
                                        employee.gender === "M"
                                        ?
                                        "남성"
                                        :
                                        employee.gender === "F"
                                        ?
                                        "여성"
                                        :
                                        "-"
                                    }

                                </strong>

                            </div>


                            <div className="employee-detail-item">

                                <span>
                                    생년월일
                                </span>

                                <strong>
                                    { employee.birthDate || "-" }
                                </strong>

                            </div>


                            <div className="employee-detail-item">

                                <span>
                                    입사일
                                </span>

                                <strong>
                                    { employee.hireDate || "-" }
                                </strong>

                            </div>

                        </div>

                    </div>


                    {/* ================================= */}
                    {/* 회사 정보 */}
                    {/* ================================= */}

                    <div className="employee-detail-section">

                        <h3>
                            회사 정보
                        </h3>


                        <div className="employee-detail-grid">


                            <div className="employee-detail-item">

                                <span>
                                    부서
                                </span>

                                <strong>
                                    { employee.departmentName ?? "-" }
                                </strong>

                            </div>


                            <div className="employee-detail-item">

                                <span>
                                    직급
                                </span>

                                <strong>
                                    { employee.jobName ?? "-" }
                                </strong>

                            </div>


                            <div className="employee-detail-item">

                                <span>
                                    권한
                                </span>

                                <strong>

                                    {
                                        employee.role === "ADMIN"
                                        ?
                                        "관리자"
                                        :
                                        "사원"
                                    }

                                </strong>

                            </div>


                            <div className="employee-detail-item">

                                <span>
                                    재직 상태
                                </span>

                                <strong>

                                    {
                                        employee.status === "Y"
                                        ?
                                        "재직"
                                        :
                                        "퇴사"
                                    }

                                </strong>

                            </div>

                        </div>

                    </div>


                    {/* ================================= */}
                    {/* 버튼 */}
                    {/* ================================= */}

                    <div className="employee-btn-area">


                        <button
                            type="button"
                            className="employee-btn employee-btn-secondary"

                            onClick={ () => {

                                navigate("/employee");

                            }}
                        >
                            목록으로
                        </button>


                        <button
                            type="button"
                            className="employee-btn employee-btn-primary"

                            onClick={ () => {

                                navigate(
                                    "/employee/updateForm",
                                    {
                                        state : {
                                            employeeNo : employee.employeeNo
                                        }
                                    }
                                );

                            }}
                        >
                            수정하기
                        </button>


                        <button
                            type="button"
                            className="employee-btn employee-btn-danger"

                            onClick={
                                deleteEmployee
                            }
                        >
                            퇴사처리
                        </button>


                    </div>

                </div>

            </div>

        </div>
    );
}


export default EmployeeDetail;