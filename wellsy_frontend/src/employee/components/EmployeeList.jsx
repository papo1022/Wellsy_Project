import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { selectEmployeeListApi } from "../api/employeeApi";

import EmployeeItem from "./EmployeeItem";


function EmployeeList() {

    const navigate = useNavigate();

    const [employeeList, setEmployeeList] = useState([]);

// 사원 목록 조회
useEffect(() => {

    const selectEmployeeList = async () => {

        try {

            const response = await selectEmployeeListApi();

            console.log(response.data);

            setEmployeeList(response.data);

        } catch(error) {

            console.log("사원 목록 조회용 ajax 통신 실패!");
            console.log(error);
        }
    };

    selectEmployeeList();

}, []);


return (
    <div
        style={{
            width : "1200px",
            margin : "0 auto"
        }}
    >

        <h2 align="center">
            사원 관리
        </h2>

        <br /><br />


        <div
            style={{
                textAlign : "right",
                marginBottom : "20px"
            }}
        >

            <button
                type="button"
                className="btn btn-outline-primary btn-sm"
                onClick={ () => {
                    navigate("/employee/enrollForm");
                }}
            >
                사원 등록
            </button>

        </div>


        <table className="table table-hover">

            <thead>

                <tr>
                    <th>사번</th>
                    <th>이름</th>
                    <th>아이디</th>
                    <th>이메일</th>
                    <th>부서</th>
                    <th>직급</th>
                    <th>권한</th>
                    <th>입사일</th>
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
                                align="center"
                            >
                                등록된 사원이 없습니다.
                            </td>
                        </tr>
                    )
                }

            </tbody>

        </table>

        <br /><br />

    </div>
    );
}


export default EmployeeList;