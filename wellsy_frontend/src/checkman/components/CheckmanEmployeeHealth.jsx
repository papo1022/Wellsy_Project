import { useEffect, useState } from "react";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import {
    selectEmployeeCheckmanListApi
} from "../api/CheckmanApi";

import "../styles/Checkman.css";


function CheckmanEmployeeHealth() {

    let navigate = useNavigate();

    const employeeNo
        = useParams().employeeNo;


    const [checkmanList, setCheckmanList]
        = useState([]);


    // =========================================
    // 특정 직원 건강정보
    // =========================================

    useEffect(() => {

        const selectEmployeeCheckmanList
            = async () => {

                try {

                    const response
                        = await selectEmployeeCheckmanListApi(
                            employeeNo
                        );


                    setCheckmanList(
                        response.data
                    );


                } catch(error) {

                    console.log(
                        "직원 건강정보 조회 실패!"
                    );

                    console.log(error);
                }

            };


        selectEmployeeCheckmanList();

    }, [employeeNo]);


    const employee
        = checkmanList.length > 0
        ?
        checkmanList[0]
        :
        null;


    return (

        <div className="checkman-dashboard">


            <div className="checkman-card-area">

                <div className="checkman-card">


                    <div className="checkman-detail-header">


                        <div>

                            <h2>
                                직원 건강정보
                            </h2>

                            {
                                employee
                                &&
                                (
                                    <p>

                                        { employee.employeeName }

                                        {" · "}

                                        {
                                            employee.departmentName
                                            ??
                                            "-"
                                        }

                                        {" · "}

                                        {
                                            employee.jobName
                                            ??
                                            "-"
                                        }

                                    </p>
                                )
                            }

                        </div>


                        <button
                            type="button"

                            className="checkman-btn checkman-btn-secondary"

                            onClick={ () => {

                                navigate("/employee");

                            }}
                        >
                            사원 목록
                        </button>


                    </div>


                    <div className="checkman-table-area">

                        <table className="checkman-table">

                            <thead>

                                <tr>

                                    <th>
                                        기록일
                                    </th>

                                    <th>
                                        키
                                    </th>

                                    <th>
                                        체중
                                    </th>

                                    <th>
                                        BMI
                                    </th>

                                    <th>
                                        혈압
                                    </th>

                                    <th>
                                        혈당
                                    </th>

                                    <th>
                                        상세
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {
                                    checkmanList.length > 0
                                    ?
                                    checkmanList.map(
                                        checkman => {

                                            return (

                                                <tr
                                                    key={
                                                        checkman.healthRecordId
                                                    }
                                                >

                                                    <td>
                                                        {
                                                            checkman.recordDate
                                                        }
                                                    </td>


                                                    <td>

                                                        {
                                                            checkman.height
                                                            ??
                                                            "-"
                                                        }

                                                        {
                                                            checkman.height != null
                                                            &&
                                                            " cm"
                                                        }

                                                    </td>


                                                    <td>

                                                        {
                                                            checkman.weight
                                                            ??
                                                            "-"
                                                        }

                                                        {
                                                            checkman.weight != null
                                                            &&
                                                            " kg"
                                                        }

                                                    </td>


                                                    <td>
                                                        {
                                                            checkman.bmi
                                                            ??
                                                            "-"
                                                        }
                                                    </td>


                                                    <td>

                                                        {
                                                            checkman.systolicBp != null
                                                            &&
                                                            checkman.diastolicBp != null
                                                            ?
                                                            `${checkman.systolicBp}/${checkman.diastolicBp}`
                                                            :
                                                            "-"
                                                        }

                                                    </td>


                                                    <td>

                                                        {
                                                            checkman.bloodSugar
                                                            ??
                                                            "-"
                                                        }

                                                    </td>


                                                    <td>

                                                        <button
                                                            type="button"

                                                            className="checkman-detail-btn"

                                                            onClick={ () => {

                                                                navigate(
                                                                    `/checkman/health/${checkman.healthRecordId}`
                                                                );

                                                            }}
                                                        >
                                                            상세보기
                                                        </button>

                                                    </td>

                                                </tr>

                                            );

                                        }
                                    )
                                    :
                                    (

                                        <tr>

                                            <td
                                                colSpan="7"
                                                className="checkman-empty"
                                            >
                                                등록된 건강정보가 없습니다.
                                            </td>

                                        </tr>

                                    )
                                }

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>

    );

}


export default CheckmanEmployeeHealth;