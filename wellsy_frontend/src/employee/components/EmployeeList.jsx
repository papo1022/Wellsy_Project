import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { selectEmployeeListApi } from "../api/employeeApi";

import EmployeeItem from "./EmployeeItem";

import "../styles/Employee.css";


function EmployeeList() {

    // 페이지 이동
    let navigate = useNavigate();

    // 조회된 사원 목록
    const [employeeList, setEmployeeList] = useState([]);


    // =========================================
    // 사원 목록 조회
    // =========================================
    useEffect(() => {

        const selectEmployeeList = async () => {

            try {

                const response = await selectEmployeeListApi();

                console.log("사원 목록 :", response.data);

                setEmployeeList(response.data);

            } catch(error) {

                console.log("사원 목록 조회용 ajax 통신 실패!");
                console.log(error);
            }
        };


        selectEmployeeList();

    }, []);


    return (

        <div className="employee-dashboard">


            {/* ================================= */}
            {/* 메인 카드 */}
            {/* ================================= */}

            <div className="employee-card">


                {/* ================================= */}
                {/* 사원 목록 제목 */}
                {/* ================================= */}

                <div className="employee-list-header">

                    <div>

                        <h2>
                            사원 목록
                        </h2>


                        <p>
                            총 { employeeList.length }명의 사원
                        </p>

                    </div>


                    <button
                        type="button"

                        className="employee-btn employee-btn-primary"

                        onClick={ () => {

                            navigate("/employee/enrollForm");

                        }}
                    >
                        + 사원 등록
                    </button>

                </div>


                {/* ================================= */}
                {/* 사원 목록 테이블 */}
                {/* ================================= */}

                <div className="employee-table-wrap">

                    <table className="employee-table">

                        <thead>

                            <tr>

                                <th width="80">
                                    사번
                                </th>

                                <th width="120">
                                    이름
                                </th>

                                <th width="140">
                                    아이디
                                </th>

                                <th width="220">
                                    이메일
                                </th>

                                <th width="100">
                                    부서
                                </th>

                                <th width="100">
                                    직급
                                </th>

                                <th width="100">
                                    권한
                                </th>

                                <th width="130">
                                    입사일
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {
                                employeeList.length > 0
                                ?
                                employeeList.map(employee => {

                                    return (

                                        <EmployeeItem
                                            key={ employee.employeeNo }
                                            employee={ employee }
                                        />

                                    );

                                })
                                :
                                (

                                    <tr>

                                        <td
                                            colSpan="8"
                                            className="employee-empty"
                                        >
                                            등록된 사원이 없습니다.
                                        </td>

                                    </tr>

                                )
                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}


export default EmployeeList;