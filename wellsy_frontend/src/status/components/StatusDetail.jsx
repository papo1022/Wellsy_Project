import {

    useEffect,

    useState

} from "react";


import {

    useNavigate,

    useParams

} from "react-router-dom";


import {

    selectWarningEmployeeApi,

    updateAlertReadApi

} from "../api/StatusApi";


function StatusDetail() {


    // URL PathVariable의 alertId
    const alertId
        = useParams().alertId;


    const navigate
        = useNavigate();


    // 상세정보
    const [status, setStatus]
        = useState({

            alertId : "",

            employeeNo : "",

            employeeName : "",

            departmentId : "",

            departmentName : "",

            alertType : "",

            severity : "",

            message : "",

            isRead : "",

            createdAt : ""

        });


    // ===========================================
    // 상세조회
    // ===========================================
    const selectStatus = async () => {

        try {

            const response
                = await selectWarningEmployeeApi(
                    alertId
                );


            if(response.data) {

                setStatus(
                    response.data
                );

            } else {

                alert(
                    "조회할 건강 이상징후가 없습니다."
                );

                navigate("/status");
            }


        } catch(error) {

            console.log(
                "건강 이상징후 상세조회 ajax 통신 실패!"
            );

            console.log(error);
        }
    };


    // 최초 실행
    useEffect(() => {

        selectStatus();

    }, [alertId]);


    // ===========================================
    // 확인 완료
    // ===========================================
    const updateAlertRead = async () => {

        if(
            !window.confirm(
                "해당 건강 이상징후를 확인완료 처리하시겠습니까?"
            )
        ) {

            return;
        }


        try {

            const response
                = await updateAlertReadApi(
                    alertId
                );


            if(
                response.data === "success"
            ) {

                alert(
                    "확인완료 처리되었습니다."
                );


                // 상세정보 다시 조회
                selectStatus();

            } else {

                alert(
                    "확인 처리에 실패했습니다."
                );
            }


        } catch(error) {

            console.log(
                "건강 이상징후 확인처리 ajax 통신 실패!"
            );

            console.log(error);
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

                건강 이상징후 상세조회

            </h2>


            <br /><br />


            <table
                className="table"
            >

                <tbody>


                    <tr>

                        <th width="150">
                            사번
                        </th>

                        <td>
                            {
                                status.employeeNo
                            }
                        </td>


                        <th width="150">
                            이름
                        </th>

                        <td>
                            {
                                status.employeeName
                            }
                        </td>

                    </tr>


                    <tr>

                        <th>
                            부서
                        </th>

                        <td>
                            {
                                status.departmentName
                                ||
                                "-"
                            }
                        </td>


                        <th>
                            확인 상태
                        </th>

                        <td>

                            {
                                status.isRead === "Y"
                                ?
                                "확인완료"
                                :
                                "미확인"
                            }

                        </td>

                    </tr>


                    <tr>

                        <th>
                            이상 항목
                        </th>

                        <td>
                            {
                                status.alertType
                            }
                        </td>


                        <th>
                            위험도
                        </th>

                        <td>

                            {
                                status.severity === "DANGER"
                                ?
                                "위험"
                                :
                                status.severity === "RISK"
                                ?
                                "경고"
                                :
                                status.severity === "CAUTION"
                                ?
                                "주의"
                                :
                                status.severity
                            }

                        </td>

                    </tr>


                    <tr>

                        <th>
                            발생일
                        </th>

                        <td colSpan="3">

                            {
                                status.createdAt
                                ?
                                status.createdAt
                                    .replace(
                                        "T",
                                        " "
                                    )
                                    .substring(
                                        0,
                                        16
                                    )
                                :
                                "-"
                            }

                        </td>

                    </tr>


                    <tr>

                        <th>
                            상세 내용
                        </th>

                        <td
                            colSpan="3"
                        >

                            <div
                                style={{
                                    minHeight : "150px",
                                    whiteSpace : "pre-wrap"
                                }}
                            >

                                {
                                    status.message
                                    ||
                                    "-"
                                }

                            </div>

                        </td>

                    </tr>


                </tbody>

            </table>


            <br /><br />


            <div align="center">


                <button

                    type="button"

                    className="btn btn-outline-secondary btn-sm"

                    onClick={
                        () => {
                            navigate("/status");
                        }
                    }

                >

                    목록으로

                </button>


                &nbsp;&nbsp;


                {
                    status.isRead === "N"
                    &&
                    (

                        <button

                            type="button"

                            className="btn btn-outline-primary btn-sm"

                            onClick={
                                updateAlertRead
                            }

                        >

                            확인완료

                        </button>

                    )
                }


            </div>


            <br /><br />

        </div>

    );
}


export default StatusDetail;