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


                        navigate(
                            `/checkman/employee/${employee.employeeNo}`
                        );

                    }}
                >
                    건강정보
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