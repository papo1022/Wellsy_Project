import { useNavigate } from "react-router-dom";

function EmployeeItem(props) {

    const navigate = useNavigate();

    const employee = props.employee;


    return (

        <tr
            style={{ cursor : "pointer" }}
            onClick={ () => {
                navigate(`/employee/detail/${ employee.employeeNo }`);
            }}
        >

            <td>
                { employee.employeeNo }
            </td>

            <td>
                { employee.name }
            </td>

            <td>
                { employee.loginId }
            </td>

            <td>
                { employee.email }
            </td>

            <td>
                { employee.departmentId ?? "-" }
            </td>

            <td>
                { employee.jobId ?? "-" }
            </td>

            <td>
                {
                    employee.role === "ADMIN"
                    ? "관리자"
                    : "사원"
                }
            </td>

            <td>
                { employee.hireDate ?? "-" }
            </td>

        </tr>
    );
}


export default EmployeeItem;