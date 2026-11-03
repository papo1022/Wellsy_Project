import { useEffect, useState } from "react";

import {
    useLocation,
    useNavigate
} from "react-router-dom";

import {
    selectEmployeeApi,
    updateEmployeeApi,
    selectDepartmentListApi,
    selectJobListApi
} from "../api/employeeApi";

import "../styles/Employee.css";


function EmployeeUpdateForm() {

    let navigate = useNavigate();

    // 상세페이지에서 전달받은 사번
    const location = useLocation();

    const employeeNo
        = location.state?.employeeNo;


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
    // 수정할 사원 정보
    // =========================================
    const [employee, setEmployee] = useState({

        employeeNo : "",

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
    // 기존 사원정보 + 부서 + 직급 조회
    // =========================================
    useEffect(() => {

        // 사번 없이 수정페이지 접근 방지
        if(!employeeNo) {

            alert("잘못된 접근입니다.");

            navigate("/employee");

            return;
        }


        const selectUpdateEmployee = async () => {

            try {

                // 사원 상세조회
                const employeeResponse
                    = await selectEmployeeApi(employeeNo);


                console.log(
                    "수정할 사원 정보 :",
                    employeeResponse.data
                );


                // 부서 목록 조회
                const departmentResponse
                    = await selectDepartmentListApi();


                console.log(
                    "부서 목록 :",
                    departmentResponse.data
                );


                // 직급 목록 조회
                const jobResponse
                    = await selectJobListApi();


                console.log(
                    "직급 목록 :",
                    jobResponse.data
                );


                // 사원정보 세팅
                setEmployee({

                    employeeNo :
                        employeeResponse.data.employeeNo,

                    loginId :
                        employeeResponse.data.loginId ?? "",

                    email :
                        employeeResponse.data.email ?? "",

                    // 비밀번호는 서버에서 조회하지 않음
                    password : "",

                    name :
                        employeeResponse.data.name ?? "",

                    phone :
                        employeeResponse.data.phone ?? "",

                    gender :
                        employeeResponse.data.gender ?? "",

                    birthDate :
                        employeeResponse.data.birthDate ?? "",

                    role :
                        employeeResponse.data.role ?? "EMPLOYEE",

                    departmentId :
                        employeeResponse.data.departmentId ?? "",

                    jobId :
                        employeeResponse.data.jobId ?? ""

                });


                setDepartmentList(
                    departmentResponse.data
                );


                setJobList(
                    jobResponse.data
                );


            } catch(error) {

                console.log(
                    "사원 수정정보 조회용 ajax 통신 실패!"
                );

                console.log(error);

                alert("사원 정보를 불러오지 못했습니다.");

            }

        };


        selectUpdateEmployee();

    }, [employeeNo, navigate]);


    // =========================================
    // 입력값 변경
    // =========================================
    const handleChange = e => {

        const {
            name,
            value
        } = e.target;


        // 부서 / 직급은 숫자로 변환
        if(
            name === "departmentId"
            ||
            name === "jobId"
        ) {

            setEmployee({

                ...employee,

                [name] :
                    value === ""
                    ?
                    ""
                    :
                    Number(value)

            });

            return;
        }


        setEmployee({

            ...employee,

            [name] : value

        });

    };


    // =========================================
    // 사원 수정
    // =========================================
    const updateEmployee = async e => {

        e.preventDefault();


        // 아이디
        if(employee.loginId.trim() === "") {

            alert("아이디를 입력해주세요.");

            return;
        }


        // 이름
        if(employee.name.trim() === "") {

            alert("이름을 입력해주세요.");

            return;
        }


        // 이메일
        if(employee.email.trim() === "") {

            alert("이메일을 입력해주세요.");

            return;
        }


        // 성별
        if(employee.gender === "") {

            alert("성별을 선택해주세요.");

            return;
        }


        // 부서
        if(employee.departmentId === "") {

            alert("부서를 선택해주세요.");

            return;
        }


        // 직급
        if(employee.jobId === "") {

            alert("직급을 선택해주세요.");

            return;
        }


        try {

            console.log(
                "수정할 사원 정보 :",
                employee
            );


            const response
                = await updateEmployeeApi(
                    employeeNo,
                    employee
                );


            console.log(
                "사원 수정 결과 :",
                response.data
            );


            if(response.data === "success") {

                alert(
                    "사원 정보가 수정되었습니다."
                );


                // 수정한 사원 상세페이지로 이동
                navigate(
                    `/employee/detail/${employeeNo}`
                );

            } else {

                alert(
                    "사원 정보 수정에 실패했습니다."
                );
            }


        } catch(error) {

            console.log(
                "사원 수정용 ajax 통신 실패!"
            );

            console.log(error);

            console.log(
                "서버 응답 :",
                error.response?.data
            );


            alert(
                "사원 정보 수정 중 오류가 발생했습니다."
            );

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
                            사원 정보 수정
                        </h2>

                        <p>
                            등록된 사원의 정보를 수정합니다.
                        </p>

                    </div>


                    <form onSubmit={ updateEmployee }>


                        {/* ================================= */}
                        {/* 계정 정보 */}
                        {/* ================================= */}

                        <div className="employee-form-section">

                            <h3>
                                계정 정보
                            </h3>


                            <div className="employee-form-grid">


                                {/* 사번 */}
                                <div className="employee-form-item">

                                    <label>
                                        사번
                                    </label>

                                    <input
                                        type="text"

                                        value={
                                            employee.employeeNo
                                        }

                                        disabled
                                    />

                                </div>


                                {/* 로그인 ID */}
                                <div className="employee-form-item">

                                    <label>
                                        로그인 ID
                                    </label>

                                    <input
                                        type="text"

                                        name="loginId"

                                        value={
                                            employee.loginId
                                        }

                                        onChange={
                                            handleChange
                                        }
                                    />

                                </div>


                                {/* 이메일 */}
                                <div className="employee-form-item">

                                    <label>
                                        이메일
                                    </label>

                                    <input
                                        type="email"

                                        name="email"

                                        value={
                                            employee.email
                                        }

                                        onChange={
                                            handleChange
                                        }
                                    />

                                </div>


                                {/* 비밀번호 */}
                                <div className="employee-form-item">

                                    <label>
                                        새 비밀번호
                                    </label>

                                    <input
                                        type="password"

                                        name="password"

                                        value={
                                            employee.password
                                        }

                                        onChange={
                                            handleChange
                                        }

                                        placeholder="변경할 경우에만 입력해주세요."
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


                                {/* 이름 */}
                                <div className="employee-form-item">

                                    <label>
                                        이름
                                    </label>

                                    <input
                                        type="text"

                                        name="name"

                                        value={
                                            employee.name
                                        }

                                        onChange={
                                            handleChange
                                        }
                                    />

                                </div>


                                {/* 전화번호 */}
                                <div className="employee-form-item">

                                    <label>
                                        전화번호
                                    </label>

                                    <input
                                        type="text"

                                        name="phone"

                                        value={
                                            employee.phone
                                        }

                                        onChange={
                                            handleChange
                                        }

                                        placeholder="010-1234-5678"
                                    />

                                </div>


                                {/* 성별 */}
                                <div className="employee-form-item">

                                    <label>
                                        성별
                                    </label>

                                    <select
                                        name="gender"

                                        value={
                                            employee.gender
                                        }

                                        onChange={
                                            handleChange
                                        }
                                    >

                                        <option value="">
                                            성별을 선택해주세요.
                                        </option>

                                        <option value="M">
                                            남성
                                        </option>

                                        <option value="F">
                                            여성
                                        </option>

                                    </select>

                                </div>


                                {/* 생년월일 */}
                                <div className="employee-form-item">

                                    <label>
                                        생년월일
                                    </label>

                                    <input
                                        type="date"

                                        name="birthDate"

                                        value={
                                            employee.birthDate
                                        }

                                        onChange={
                                            handleChange
                                        }
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

                                        value={
                                            employee.departmentId
                                        }

                                        onChange={
                                            handleChange
                                        }
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

                                        value={
                                            employee.jobId
                                        }

                                        onChange={
                                            handleChange
                                        }
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

                                        value={
                                            employee.role
                                        }

                                        onChange={
                                            handleChange
                                        }
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
                                수정하기
                            </button>


                            <button
                                type="button"

                                className="employee-btn employee-btn-secondary"

                                onClick={ () => {

                                    navigate(
                                        `/employee/detail/${employeeNo}`
                                    );

                                }}
                            >
                                취소
                            </button>


                        </div>


                    </form>

                </div>

            </div>

        </div>

    );

}


export default EmployeeUpdateForm;