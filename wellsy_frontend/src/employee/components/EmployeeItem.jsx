import { useNavigate } from "react-router-dom";


function EmployeeItem(props) {

    let navigate = useNavigate();

    const employee = props.employee;


    return (

        <tr
            className="employee-table-row"

            onClick={ () => {

                navigate(
                    `/employee/detail/${ employee.employeeNo }`
                );

            }}
        >


            {/* 이름 */}
            <td className="employee-name-cell">

                { employee.name }


                {
                    employee.status === "N"
                    &&
                    (
                        <span className="employee-resigned-badge">
                            퇴사
                        </span>
                    )
                }

            </td>


            {/* 부서 */}
            <td>

                {
                    employee.departmentName
                    ??
                    "-"
                }

            </td>


            {/* 직급 */}
            <td>

                {
                    employee.jobName
                    ??
                    "-"
                }

            </td>


            {/* 건강정보 */}
            <td>

                <button
                    type="button"

                    className="employee-health-btn"

                    onClick={ e => {

                        e.stopPropagation();


                        // 추후 직원별 건강정보 페이지 연결
                        console.log("건강정보 사번 :", employee.employeeNo
                        );

                    }}
                >
                    상세정보
                </button>

            </td>


            {/* 입사일 */}
            <td>

                {
                    employee.hireDate
                    ??
                    "-"
                }

            </td>

        </tr>

    );
}


export default EmployeeItem;