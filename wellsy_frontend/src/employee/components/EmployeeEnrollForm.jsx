import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { insertEmployeeApi } from "../api/employeeApi";


function EmployeeEnrollForm() {

    const navigate = useNavigate();


    const initialEmployee = {

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

    };


    const [employee, setEmployee]
        = useState(initialEmployee);


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


    // 사원 등록
    const insertEmployee = async e => {

        e.preventDefault();


        if(employee.loginId.trim() === "") {

            alert("아이디를 입력해주세요.");
            return;
        }


        if(employee.email.trim() === "") {

            alert("이메일을 입력해주세요.");
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


        try {

            const response
                = await insertEmployeeApi(employee);


            if(response.data === "success") {

                alert("사원 등록에 성공했습니다.");

                navigate("/employee");

            } else {

                alert(
                    "사원 등록에 실패했습니다.\n" +
                    "아이디 또는 이메일 중복 여부를 확인해주세요."
                );
            }

        } catch(error) {

            console.log("사원 등록용 ajax 통신 실패!");
            console.log(error);

            alert("사원 등록 중 오류가 발생했습니다.");
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
            사원 등록
        </h2>

        <br /><br />


        <form onSubmit={ insertEmployee }>

            <table className="table">

                <tbody>

                    <tr>
                        <th width="150">
                            로그인 ID
                        </th>

                        <td>
                            <input
                                type="text"
                                name="loginId"
                                value={ employee.loginId }
                                onChange={ handleChange }
                                required
                            />
                        </td>
                    </tr>


                    <tr>
                        <th>비밀번호</th>

                        <td>
                            <input
                                type="password"
                                name="password"
                                value={ employee.password }
                                onChange={ handleChange }
                                required
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
                                required
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
                                required
                            />
                        </td>
                    </tr>


                    <tr>
                        <th>전화번호</th>

                        <td>
                            <input
                                type="text"
                                name="phone"
                                value={ employee.phone }
                                onChange={ handleChange }
                                placeholder="010-1234-5678"
                            />
                        </td>
                    </tr>


                    <tr>
                        <th>성별</th>

                        <td>

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

                        </td>
                    </tr>


                    <tr>
                        <th>생년월일</th>

                        <td>
                            <input
                                type="date"
                                name="birthDate"
                                value={ employee.birthDate }
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
                                min="1"
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
                                min="1"
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
                    등록하기
                </button>


                &nbsp;&nbsp;


                <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                    onClick={ () => {
                        setEmployee(initialEmployee);
                    }}
                >
                    초기화
                </button>


                &nbsp;&nbsp;


                <button
                    type="button"
                    className="btn btn-outline-dark btn-sm"
                    onClick={ () => {
                        navigate("/employee");
                    }}
                >
                    목록으로
                </button>

            </div>

        </form>


        <br /><br />

    </div>
    );
}


export default EmployeeEnrollForm;