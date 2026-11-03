import { useNavigate } from "react-router-dom";

function StatusItem(props) {

    const navigate = useNavigate();

    const item = props.item;


    return (

        <tr
            style={{ cursor : "pointer" }}

            onClick={ () => {

                navigate(
                    `/status/warnings/${ item.alertId }`
                );

            }}
        >

            {/* 사번 */}
            <td>
                { item.employeeNo }
            </td>


            {/* 이름 */}
            <td>
                { item.employeeName }
            </td>


            {/* 부서 */}
            <td>
                {
                    item.departmentName
                    ?
                    item.departmentName
                    :
                    "-"
                }
            </td>


            {/* 이상 항목 */}
            <td>
                { item.alertType }
            </td>


            {/* 위험도 */}
            <td>

                {
                    item.severity === "DANGER"
                    ?
                    "위험"
                    :
                    item.severity === "RISK"
                    ?
                    "경고"
                    :
                    item.severity === "CAUTION"
                    ?
                    "주의"
                    :
                    item.severity
                }

            </td>


            {/* 발생일 */}
            <td>

                {
                    item.createdAt
                    ?
                    item.createdAt
                        .replace("T", " ")
                        .substring(0, 16)
                    :
                    "-"
                }

            </td>


            {/* 확인 상태 */}
            <td>

                {
                    item.isRead === "Y"
                    ?
                    "확인완료"
                    :
                    "미확인"
                }

            </td>

        </tr>

    );
}


export default StatusItem;