import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { selectEmployeeApi, deleteEmployeeApi } from "../api/employeeApi";


function EmployeeDetail() {

    const employeeNo = useParams().employeeNo;

    const navigate = useNavigate();


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
        jobId : ""

    });


// 사원 상세 조회
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

            console.log("사원 상세조회용 ajax 통신 실패!");
            console.log(error);
        }
    };

    selectEmployee();

}, [employeeNo, navigate]);


// 사원 퇴사 처리
const deleteEmployee = async () => {

    if(!window.confirm("정말 퇴사 처리하시겠습니까?")) {
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

        alert("사원 퇴사 처리 중 오류가 발생했습니다.");
    }
};


return (

    <div
        style={{
            width : "950px",
            margin : "0 auto"
        }}
    >

        <h2 align="center">
            사원 상세 조회
        </h2>

        <br /><br />


        <table className="table">

            <tbody>

                <tr>
                    <th width="150">사번</th>
                    <td>{ employee.employeeNo }</td>

                    <th width="150">이름</th>
                    <td>{ employee.name }</td>
                </tr>


                <tr>
                    <th>로그인 ID</th>
                    <td>{ employee.loginId }</td>

                    <th>이메일</th>
                    <td>{ employee.email }</td>
                </tr>


                <tr>
                    <th>전화번호</th>
                    <td>{ employee.phone || "-" }</td>

                    <th>성별</th>
                    <td>
                        {
                            employee.gender === "M"
                            ? "남성"
                            : employee.gender === "F"
                            ? "여성"
                            : "-"
                        }
                    </td>
                </tr>


                <tr>
                    <th>생년월일</th>
                    <td>{ employee.birthDate || "-" }</td>

                    <th>입사일</th>
                    <td>{ employee.hireDate || "-" }</td>
                </tr>


                <tr>
                    <th>부서 ID</th>
                    <td>{ employee.departmentId ?? "-" }</td>

                    <th>직급 ID</th>
                    <td>{ employee.jobId ?? "-" }</td>
                </tr>


                <tr>
                    <th>권한</th>

                    <td>
                        {
                            employee.role === "ADMIN"
                            ? "관리자"
                            : "사원"
                        }
                    </td>

                    <th>재직 상태</th>

                    <td>
                        {
                            employee.status === "Y"
                            ? "재직"
                            : "퇴사"
                        }
                    </td>
                </tr>

            </tbody>

        </table>


        <br /><br />


        <div align="center">

            <button
                type="button"
                className="btn btn-outline-secondary btn-sm"
                onClick={ () => {
                    navigate("/employee");
                }}
            >
                목록으로
            </button>


            &nbsp;&nbsp;


            <button
                type="button"
                className="btn btn-outline-warning btn-sm"
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


            &nbsp;&nbsp;


            <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={ deleteEmployee }
            >
                퇴사처리
            </button>

        </div>


        <br /><br />

    </div>
    );
}


export default EmployeeDetail;