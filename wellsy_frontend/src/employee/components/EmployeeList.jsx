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

    const [keyword, setKeyword] = useState("");

    const [sortType, setSortType] = useState("");

    const [sortDirection, setSortDirection] = useState("asc");

    const [deletedOnly, setDeletedOnly] = useState(false);


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

     // =========================================
    // 정렬 버튼 클릭
    // =========================================

    const handleSort = type => {


        // 같은 정렬 버튼을 다시 누르면
        // 오름차순 ↔ 내림차순 변경
        if(sortType === type) {

            setSortDirection(
                sortDirection === "asc"
                    ? "desc"
                    : "asc"
            );

        } else {

            // 다른 정렬 버튼 클릭
            setSortType(type);

            setSortDirection("asc");
        }

    };


    // =========================================
    // 검색 + 정렬
    // =========================================

    const filteredEmployeeList = useMemo(() => {


    // =========================================
    // 1. 이름 검색
    // =========================================

    let result = employeeList.filter(
        employee => {

            const employeeName
                = employee.name ?? "";


            return employeeName
                .toLowerCase()
                .includes(
                    keyword
                        .trim()
                        .toLowerCase()
                );

        }
    );


        // =========================================
        // 2. 퇴사자만 보기
        // =========================================

        if(deletedOnly) {

            result = result.filter(
                employee =>
                    employee.status === "N"
            );
        }


        // =========================================
        // 3. 정렬
        // =========================================

        if(sortType !== "") {

            result = [...result];


            result.sort((a, b) => {


                let valueA = "";

                let valueB = "";


                // 이름별
                if(sortType === "name") {

                    valueA
                        = a.name ?? "";

                    valueB
                        = b.name ?? "";
                }


                // 부서별
                if(sortType === "department") {

                    valueA
                        = a.departmentName ?? "";

                    valueB
                        = b.departmentName ?? "";
                }


                // 직급별
                if(sortType === "job") {

                    valueA
                        = a.jobName ?? "";

                    valueB
                        = b.jobName ?? "";
                }


                const compareResult
                    = valueA.localeCompare(
                        valueB,
                        "ko-KR"
                    );


                return sortDirection === "asc"
                    ?
                    compareResult
                    :
                    compareResult * -1;

            });

        }


        return result;


    }, [
        employeeList,
        keyword,
        sortType,
        sortDirection,
        deletedOnly
    ]);


    // =========================================
    // 정렬 화살표
    // =========================================

    const getSortArrow = type => {

        if(sortType !== type) {

            return "";
        }


        return sortDirection === "asc"
            ? " ▲"
            : " ▼";
    };


    return (

        <div className="employee-dashboard">


            <div className="employee-card-area">


                <div className="employee-card employee-list-card">


                    {/* ================================= */}
                    {/* 이름 검색 */}
                    {/* ================================= */}

                    <div className="employee-search-area">

                        <div className="employee-search-box">

                            <input
                                type="text"

                                value={
                                    keyword
                                }

                                onChange={ e => {

                                    setKeyword(
                                        e.target.value
                                    );

                                }}

                                placeholder="직원 이름을 입력해 주세요"
                            />


                            <span className="employee-search-icon">
                                ⌕
                            </span>

                        </div>

                    </div>


                    {/* ================================= */}
                    {/* 목록 제목 + 정렬 */}
                    {/* ================================= */}

                    <div className="employee-list-header">


                        <div>

                            <h2>
                                사원 목록
                            </h2>


                            <p>

                                {
                                    deletedOnly
                                    ?
                                    `퇴사자 ${filteredEmployeeList.length}명`
                                    :
                                    keyword.trim() !== ""
                                    ?
                                    `검색 결과 ${filteredEmployeeList.length}명`
                                    :
                                    `총 ${employeeList.length}명의 사원`
                                }

                            </p>

                        </div>


                        {/* 정렬 */}
                        <div className="employee-sort-area">


                            <button
                                type="button"

                                className={
                                    sortType === "department"
                                    ?
                                    "employee-sort-btn employee-sort-active"
                                    :
                                    "employee-sort-btn"
                                }

                                onClick={ () => {

                                    handleSort(
                                        "department"
                                    );

                                }}
                            >
                                부서별
                                {
                                    getSortArrow(
                                        "department"
                                    )
                                }
                            </button>


                            <span>
                                |
                            </span>


                            <button
                                type="button"

                                className={
                                    sortType === "job"
                                    ?
                                    "employee-sort-btn employee-sort-active"
                                    :
                                    "employee-sort-btn"
                                }

                                onClick={ () => {

                                    handleSort(
                                        "job"
                                    );

                                }}
                            >
                                직급별
                                {
                                    getSortArrow(
                                        "job"
                                    )
                                }
                            </button>


                            <span>|</span>


                            <button
                                type="button"

                                className={
                                    sortType === "name"
                                    ?
                                    "employee-sort-btn employee-sort-active"
                                    :
                                    "employee-sort-btn"
                                }

                                onClick={ () => {

                                    handleSort(
                                        "name"
                                    );

                                }}
                            >
                                이름별
                                {
                                    getSortArrow(
                                        "name"
                                    )
                                }
                            </button>

                            <span>|</span>


                            {/* 퇴사자만 */}
                            <button
                                type="button"

                                className={
                                    deletedOnly
                                    ?
                                    "employee-sort-btn employee-sort-active"
                                    :
                                    "employee-sort-btn"
                                }

                                onClick={ () => {

                                    setDeletedOnly(
                                        !deletedOnly
                                    );

                                }}
                            >
                                퇴사자
                            </button>


                        </div>

                    </div>


                    {/* ================================= */}
                    {/* 사원 목록 */}
                    {/* ================================= */}

                    <div className="employee-card-content">


                        <table className="employee-table">


                            <thead>

                                <tr>

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
                                        정보
                                    </th>

                                    <th>
                                        입사일
                                    </th>

                                </tr>

                            </thead>


                            <tbody>


                                {
                                    filteredEmployeeList.length > 0
                                    ?
                                    filteredEmployeeList.map(
                                        employee => {

                                            return (

                                                <EmployeeItem

                                                    key={
                                                        employee.employeeNo
                                                    }

                                                    employee={
                                                        employee
                                                    }
                                                />

                                            );

                                        }
                                    )
                                    :
                                    (

                                        <tr>

                                            <td
                                                colSpan="5"

                                                className="employee-empty"
                                            >

                                                {
                                                    keyword.trim() === ""
                                                    ?
                                                    "등록된 사원이 없습니다."
                                                    :
                                                    "검색된 사원이 없습니다."
                                                }

                                            </td>

                                        </tr>

                                    )
                                }


                            </tbody>


                        </table>


                    </div>


                    {/* ================================= */}
                    {/* 사원 등록 */}
                    {/* ================================= */}

                    <div className="employee-list-btn-area">

                        <button
                            type="button"

                            className="employee-register-btn"

                            onClick={ () => {

                                navigate(
                                    "/employee/enrollForm"
                                );

                            }}
                        >
                            + 사원 등록
                        </button>

                    </div>


                </div>

            </div>

        </div>

    );
}


export default EmployeeList;