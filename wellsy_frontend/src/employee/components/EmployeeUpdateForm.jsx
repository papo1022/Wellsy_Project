import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { selectEmployeeApi, updateEmployeeApi } from "../api/employeeApi";


function EmployeeUpdateForm() {

    const navigate = useNavigate();

    const location = useLocation();

    const employeeNo
        = location.state?.employeeNo;


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


    // 기존 사원정보 조회
    useEffect(() => {

        if(!employeeNo) {

            alert("잘못된 접근입니다.");

            navigate("/employee");

            return;
        }


        const selectEmployee = async () => {

            try {

                const response
                    = await selectEmployeeApi(employeeNo);


                if(response.data) {

                    setEmployee({

                        ...response.data,

                        // 비밀번호는 조회되지 않으므로 빈 값
                        password : "",

                        departmentId :
                            response.data.departmentId ?? "",

                        jobId :
                            response.data.jobId ?? ""

                    });

                } else {

                    alert("존재하지 않는 사원입니다.");

                    navigate("/employee");
                }

            } catch(error) {

                console.log("사원 상세 조회용 ajax 통신 실패!");
                console.log(error);
            }
        };


        selectEmployee();

    }, [employeeNo, navigate]);


    // 입력값 변경
    const handleChange = e => {

        const { name, value } = e.target;


        setEmployee({

            ...employee,

            [name] :
                name === "departmentId" ||
                name === "jobId"
                ?
                    value === ""
                    ? ""
                    : Number(value)
                :
                    value

        });
    };


    // 수정
    const updateEmployee = async e => {

        e.preventDefault();


        if(employee.loginId.trim() === "") {

            alert("아이디를 입력해주세요.");
            return;
        }


        if(employee.name.trim() === "") {

            alert("이름을 입력해주세요.");
            return;
        }


        if(employee.email.trim() === "") {

            alert("이메일을 입력해주세요.");
            return;
        }


        try {

            const response
                = await updateEmployeeApi(
                    employeeNo,
                    employee
                );


            if(response.data === "success") {

                alert("사원 정보 수정에 성공했습니다.");

                navigate(
                    `/employee/detail/${ employeeNo }`
                );

            } else {

                alert(
                    "사원 정보 수정에 실패했습니다.\n" +
                    "아이디 또는 이메일 중복 여부를 확인해주세요."
                );
            }

        } catch(error) {

            console.log("사원 수정용 ajax 통신 실패!");
            console.log(error);

            alert("사원 수정 중 오류가 발생했습니다.");
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
            사원 정보 수정
        </h2>

        <br /><br />


        <form onSubmit={ updateEmployee }>

            <table className="table">

                <tbody>

                    <tr>
                        <th width="150">
                            사번
                        </th>

                        <td>
                            { employee.employeeNo }
                        </td>
                    </tr>


                    <tr>
                        <th>로그인 ID</th>

                        <td>
                            <input
                                type="text"
                                name="loginId"
                                value={ employee.loginId }
                                onChange={ handleChange }
                            />
                        </td>
                    </tr>


                    <tr>
                        <th>새 비밀번호</th>

                        <td>

                            <input
                                type="password"
                                name="password"
                                value={ employee.password }
                                onChange={ handleChange }
                                placeholder="변경할 경우에만 입력"
                            />

                        </td>
                    </tr>


                    <tr>
                        <th>이름</th>

                        <td>
                            <input
                                type="text"
                                name="name"
                                value={ employee.name }
                                onChange={ handleChange }
                            />
                        </td>
                    </tr>


                    <tr>
                        <th>이메일</th>

                        <td>
                            <input
                                type="email"
                                name="email"
                                value={ employee.email }
                                onChange={ handleChange }
                            />
                        </td>
                    </tr>


                    <tr>
                        <th>전화번호</th>

                        <td>
                            <input
                                type="text"
                                name="phone"
                                value={ employee.phone || "" }
                                onChange={ handleChange }
                            />
                        </td>
                    </tr>


                    <tr>
                        <th>성별</th>

                        <td>

                            <select
                                name="gender"
                                value={ employee.gender || "" }
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

                        </td>
                    </tr>


                    <tr>
                        <th>생년월일</th>

                        <td>
                            <input
                                type="date"
                                name="birthDate"
                                value={ employee.birthDate || "" }
                                onChange={ handleChange }
                            />
                        </td>
                    </tr>


                    <tr>
                        <th>부서 ID</th>

                        <td>
                            <input
                                type="number"
                                name="departmentId"
                                value={ employee.departmentId }
                                onChange={ handleChange }
                            />
                        </td>
                    </tr>


                    <tr>
                        <th>직급 ID</th>

                        <td>
                            <input
                                type="number"
                                name="jobId"
                                value={ employee.jobId }
                                onChange={ handleChange }
                            />
                        </td>
                    </tr>


                    <tr>
                        <th>권한</th>

                        <td>

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

                        </td>
                    </tr>

                </tbody>

            </table>


            <br /><br />


            <div align="center">

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-sm"
                >
                    수정하기
                </button>


                &nbsp;&nbsp;


                <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                    onClick={ () => {

                        navigate(
                            `/employee/detail/${ employeeNo }`
                        );

                    }}
                >
                    뒤로가기
                </button>

            </div>

        </form>

        <br /><br />

    </div>
    );
}


export default EmployeeUpdateForm;