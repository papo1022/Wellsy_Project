import { useNavigate } from "react-router-dom";


function EmployeeItem(props) {

    let navigate = useNavigate();

    const employee = props.employee;

    const getRoleName = role => {

    if(
        role === "ADMIN"
        ||
        role === "ROLE_ADMIN"
    ) {

        return "관리자";
    }

    return "사원";
};


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
                <span
                    className={
                        employee.role === "ADMIN"
                        ||
                        employee.role === "ROLE_ADMIN"

                        ?

                        "employee-role employee-role-admin"

                        :

                        "employee-role employee-role-user"
                    }
                >
                    {
                        getRoleName(
                            employee.role
                        )
                    }
                </span>
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