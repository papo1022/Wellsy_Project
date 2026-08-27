import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
    insertEmployeeApi,
    selectDepartmentListApi,
    selectJobListApi
} from "../api/employeeApi";

import "../styles/Employee.css";


function EmployeeEnrollForm() {

    let navigate = useNavigate();


    // =========================================
    // 부서 목록
    // =========================================
    const [departmentList, setDepartmentList]
        = useState([]);


    // =========================================
    // 직급 목록
    // =========================================
    const [jobList, setJobList]
        = useState([]);


    // =========================================
    // 등록할 사원
    // =========================================
    const [employee, setEmployee] = useState({

        loginId : "",
        email : "",
        password : "",
        name : "",
        phone : "",
        gender : "",
        birthDate : "",
        role : "EMPLOYEE",
        departmentId : "",
        jobId : ""

    });


    // =========================================
    // 부서 / 직급 목록 조회
    // =========================================
    useEffect(() => {

        const selectOptionList = async () => {

            try {

                const departmentResponse
                    = await selectDepartmentListApi();

                    console.log(
                "부서 목록 :",
                departmentResponse.data
            );

                const jobResponse
                    = await selectJobListApi();

                    console.log(
                "직급 목록 :",
                jobResponse.data
            );


                setDepartmentList(
                    departmentResponse.data
                );

                setJobList(
                    jobResponse.data
                );


            } catch(error) {

                console.log(
                    "부서 / 직급 목록 조회 실패!"
                );

                console.log(error);
            }
        };


        selectOptionList();

    }, []);


    // =========================================
    // 입력값 변경
    // =========================================
    const handleChange = e => {

        const {
            name,
            value
        } = e.target;


        setEmployee({

            ...employee,

            [name] :

                name === "departmentId"
                ||
                name === "jobId"

                ?

                (
                    value === ""
                    ?
                    ""
                    :
                    Number(value)
                )

                :

                value

        });
    };


    // =========================================
    // 사원 등록
    // =========================================
    const insertEmployee = async e => {

        e.preventDefault();


        if(employee.loginId.trim() === "") {

            alert("아이디를 입력해주세요.");

            return;
        }


        if(employee.password.trim() === "") {

            alert("비밀번호를 입력해주세요.");

            return;
        }


        if(employee.name.trim() === "") {

            alert("이름을 입력해주세요.");

            return;
        }


        if(employee.departmentId === "") {

            alert("부서를 선택해주세요.");

            return;
        }


        if(employee.jobId === "") {

            alert("직급을 선택해주세요.");

            return;
        }

        if(employee.gender === "") {

            alert("성별을 선택해주세요.");

            return;
        }

        try {

            const response
                = await insertEmployeeApi(employee);


            if(response.data === "success") {

                alert(
                    "사원 등록이 완료되었습니다."
                );

                navigate("/employee");

            } else {

                alert(
                    "사원 등록에 실패했습니다."
                );
            }


        } catch(error) {

            console.log(
                "사원 등록용 ajax 통신 실패!"
            );

            console.log(error);
        }
    };


    return (

        <div className="employee-dashboard">

            <div className="employee-card-area">

                <div className="employee-card employee-form-card">


                    {/* ================================= */}
                    {/* 제목 */}
                    {/* ================================= */}

                    <div className="employee-form-header">

                        <h2>
                            사원 등록
                        </h2>

                        <p>
                            신규 사원의 정보를 입력해주세요.
                        </p>

                    </div>


                    <form onSubmit={ insertEmployee }>


                        {/* ================================= */}
                        {/* 계정 정보 */}
                        {/* ================================= */}

                        <div className="employee-form-section">

                            <h3>
                                계정 정보
                            </h3>


                            <div className="employee-form-grid">


                                <div className="employee-form-item">

                                    <label>
                                        로그인 ID
                                    </label>

                                    <input
                                        type="text"
                                        name="loginId"
                                        value={ employee.loginId }
                                        onChange={ handleChange }
                                        placeholder="로그인 ID를 입력해주세요."
                                    />

                                </div>


                                <div className="employee-form-item">

                                    <label>
                                        비밀번호
                                    </label>

                                    <input
                                        type="password"
                                        name="password"
                                        value={ employee.password }
                                        onChange={ handleChange }
                                        placeholder="비밀번호를 입력해주세요."
                                    />

                                </div>


                                <div className="employee-form-item">

                                    <label>
                                        이메일
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        value={ employee.email }
                                        onChange={ handleChange }
                                        placeholder="이메일을 입력해주세요."
                                    />

                                </div>

                            </div>

                        </div>


                        {/* ================================= */}
                        {/* 개인 정보 */}
                        {/* ================================= */}

                        <div className="employee-form-section">

                            <h3>
                                개인 정보
                            </h3>


                            <div className="employee-form-grid">


                                <div className="employee-form-item">

                                    <label>
                                        이름
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        value={ employee.name }
                                        onChange={ handleChange }
                                        placeholder="이름을 입력해주세요."
                                    />

                                </div>


                                <div className="employee-form-item">

                                    <label>
                                        전화번호
                                    </label>

                                    <input
                                        type="text"
                                        name="phone"
                                        value={ employee.phone }
                                        onChange={ handleChange }
                                        placeholder="010-1234-5678"
                                    />

                                </div>


                                <div className="employee-form-item">

                                    <label>
                                        성별
                                    </label>

                                    <select
                                        name="gender"
                                        value={ employee.gender }
                                        onChange={ handleChange }
                                    >

                                        <option value="">
                                            선택
                                        </option>

                                        <option value="M">
                                            남성
                                        </option>

                                        <option value="F">
                                            여성
                                        </option>

                                    </select>

                                </div>


                                <div className="employee-form-item">

                                    <label>
                                        생년월일
                                    </label>

                                    <input
                                        type="date"
                                        name="birthDate"
                                        value={ employee.birthDate }
                                        onChange={ handleChange }
                                    />

                                </div>

                            </div>

                        </div>


                        {/* ================================= */}
                        {/* 회사 정보 */}
                        {/* ================================= */}

                        <div className="employee-form-section">

                            <h3>
                                회사 정보
                            </h3>


                            <div className="employee-form-grid">


                                {/* 부서 */}
                                <div className="employee-form-item">

                                    <label>
                                        부서
                                    </label>

                                    <select
                                        name="departmentId"
                                        value={ employee.departmentId }
                                        onChange={ handleChange }
                                    >

                                        <option value="">
                                            부서를 선택해주세요.
                                        </option>


                                        {
                                            departmentList.map(
                                                department => {

                                                    return (

                                                        <option
                                                            key={
                                                                department.departmentId
                                                            }

                                                            value={
                                                                department.departmentId
                                                            }
                                                        >
                                                            {
                                                                department.departmentName
                                                            }
                                                        </option>

                                                    );

                                                }
                                            )
                                        }

                                    </select>

                                </div>


                                {/* 직급 */}
                                <div className="employee-form-item">

                                    <label>
                                        직급
                                    </label>

                                    <select
                                        name="jobId"
                                        value={ employee.jobId }
                                        onChange={ handleChange }
                                    >

                                        <option value="">
                                            직급을 선택해주세요.
                                        </option>


                                        {
                                            jobList.map(job => {

                                                return (

                                                    <option
                                                        key={
                                                            job.jobId
                                                        }

                                                        value={
                                                            job.jobId
                                                        }
                                                    >
                                                        {
                                                            job.jobName
                                                        }
                                                    </option>

                                                );

                                            })
                                        }

                                    </select>

                                </div>


                                {/* 권한 */}
                                <div className="employee-form-item">

                                    <label>
                                        권한
                                    </label>

                                    <select
                                        name="role"
                                        value={ employee.role }
                                        onChange={ handleChange }
                                    >

                                        <option value="EMPLOYEE">
                                            사원
                                        </option>

                                        <option value="ADMIN">
                                            관리자
                                        </option>

                                    </select>

                                </div>

                            </div>

                        </div>


                        {/* ================================= */}
                        {/* 버튼 */}
                        {/* ================================= */}

                        <div className="employee-btn-area">


                            <button
                                type="submit"
                                className="employee-btn employee-btn-primary"
                            >
                                등록하기
                            </button>


                            <button
                                type="button"
                                className="employee-btn employee-btn-secondary"

                                onClick={ () => {

                                    navigate("/employee");

                                }}
                            >
                                목록으로
                            </button>


                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
}


export default EmployeeEnrollForm;