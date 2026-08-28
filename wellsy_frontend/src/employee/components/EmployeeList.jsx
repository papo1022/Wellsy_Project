import { useEffect, useMemo, useState } from "react";

import { useNavigate } from "react-router-dom";

import { selectEmployeeListApi } from "../api/employeeApi";

import EmployeeItem from "./EmployeeItem";

import "../styles/Employee.css";


function EmployeeList() {

    let navigate = useNavigate();


    // =========================================
    // 사원 목록
    // =========================================

    const [employeeList, setEmployeeList]
        = useState([]);


    // =========================================
    // 검색창에 입력 중인 값
    // =========================================

    const [inputKeyword, setInputKeyword]
        = useState("");


    // =========================================
    // 실제 검색에 적용할 값
    // Enter / 검색 버튼 클릭 시 변경
    // =========================================

    const [searchKeyword, setSearchKeyword]
        = useState("");


    // =========================================
    // 정렬
    // =========================================

    const [sortType, setSortType]
        = useState("");


    const [sortDirection, setSortDirection]
        = useState("asc");


    // =========================================
    // 퇴사자만 보기
    // =========================================

    const [deletedOnly, setDeletedOnly]
        = useState(false);


    // =========================================
    // 사원 목록 조회
    // =========================================

    useEffect(() => {

        const selectEmployeeList = async () => {

            try {

                const response
                    = await selectEmployeeListApi();


                console.log(
                    "사원 목록 :",
                    response.data
                );


                setEmployeeList(
                    response.data
                );


            } catch(error) {

                console.log(
                    "사원 목록 조회용 ajax 통신 실패!"
                );

                console.log(error);
            }

        };


        selectEmployeeList();

    }, []);


    // =========================================
    // 검색
    // Enter 또는 검색 버튼
    // =========================================

    const searchEmployee = e => {

        e.preventDefault();


        setSearchKeyword(
            inputKeyword.trim()
        );

    };


    // =========================================
    // 정렬
    // =========================================

    const handleSort = type => {


        // 같은 정렬 버튼 다시 클릭
        if(sortType === type) {

            setSortDirection(
                sortDirection === "asc"
                ?
                "desc"
                :
                "asc"
            );

        } else {

            setSortType(type);

            setSortDirection("asc");
        }

    };


    // =========================================
    // 정렬 화살표
    // =========================================

    const getSortArrow = type => {

        if(sortType !== type) {

            return "";
        }


        return sortDirection === "asc"
            ?
            " ▲"
            :
            " ▼";
    };


    // =========================================
    // 검색 + 퇴사자 필터 + 정렬
    // =========================================

    const filteredEmployeeList = useMemo(() => {


        let result = [...employeeList];


        // -----------------------------------------
        // 이름 검색
        // -----------------------------------------

        if(searchKeyword !== "") {

            result = result.filter(
                employee => {

                    const employeeName
                        = employee.name ?? "";


                    return employeeName
                        .toLowerCase()
                        .includes(
                            searchKeyword.toLowerCase()
                        );

                }
            );

        }


        // -----------------------------------------
        // 퇴사자만
        // -----------------------------------------

        if(deletedOnly) {

            result = result.filter(
                employee =>
                    employee.status === "N"
            );

        }


        // -----------------------------------------
        // 정렬
        // -----------------------------------------

        if(sortType !== "") {

            result.sort((a, b) => {


                let valueA = "";

                let valueB = "";


                // 이름
                if(sortType === "name") {

                    valueA
                        = a.name ?? "";

                    valueB
                        = b.name ?? "";
                }


                // 부서
                if(sortType === "department") {

                    valueA
                        = a.departmentName ?? "";

                    valueB
                        = b.departmentName ?? "";
                }


                // 직급
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
        searchKeyword,
        sortType,
        sortDirection,
        deletedOnly
    ]);


    return (

        <div className="employee-dashboard">


            <div className="employee-card-area">


                <div className="employee-card employee-list-card">


                    {/* ================================= */}
                    {/* 검색 */}
                    {/* ================================= */}

                    <form
                        className="employee-search-area"

                        onSubmit={
                        searchEmployee
                        }
                        >

                        <div className="employee-search-box">

                        <input
                            type="text"

                            value={
                                inputKeyword
                            }

                            onChange={ e => {

                                setInputKeyword(
                                    e.target.value
                                );

                            }}

                            placeholder="직원 이름을 입력해 주세요"
                        />

                        </div>

                    </form>


                    {/* ================================= */}
                    {/* 제목 / 정렬 */}
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
                                    searchKeyword !== ""
                                    ?
                                    `검색 결과 ${filteredEmployeeList.length}명`
                                    :
                                    `총 ${employeeList.length}명의 사원`
                                }

                            </p>

                        </div>


                        {/* 정렬 */}
                        <div className="employee-sort-area">


                            {/* 부서 */}
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


                            {/* 직급 */}
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


                            <span>
                                |
                            </span>


                            {/* 이름 */}
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


                            <span>
                                |
                            </span>


                            {/* 퇴사자 */}
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
                                퇴사자만
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
                                        건강정보
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
                                                    searchKeyword !== ""
                                                    ?
                                                    "검색된 사원이 없습니다."
                                                    :
                                                    deletedOnly
                                                    ?
                                                    "퇴사한 사원이 없습니다."
                                                    :
                                                    "등록된 사원이 없습니다."
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