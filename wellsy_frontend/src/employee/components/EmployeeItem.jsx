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

            <td>
                { employee.employeeNo }
            </td>


            <td className="employee-name-cell">
                { employee.name }
            </td>


            <td>
                { employee.loginId }
            </td>


            <td>
                { employee.email }
            </td>


            <td>
                {
                    employee.departmentId
                    ??
                    "-"
                }
            </td>


            <td>
                {
                    employee.jobId
                    ??
                    "-"
                }
            </td>


            <td>

                <span
                    className={
                        employee.role === "ADMIN"
                        ?
                        "employee-role employee-role-admin"
                        :
                        "employee-role"
                    }
                >

                    {
                        employee.role === "ADMIN"
                        ?
                        "관리자"
                        :
                        "사원"
                    }

                </span>

            </td>


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