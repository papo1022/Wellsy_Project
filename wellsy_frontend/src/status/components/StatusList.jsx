import { useEffect, useState } from "react";

import {

    selectStatusListApi,

    selectWarningEmployeeListApi

} from "../api/statusApi";


import StatusItem from "./StatusItem";


function StatusList() {


    // ===========================================
    // 오늘 날짜 YYYY-MM-DD
    // ===========================================
    const getToday = () => {

        const today = new Date();

        today.setMinutes(
            today.getMinutes() - today.getTimezoneOffset()
        );

        return today.toISOString().substring(0, 10);
    };


    // ===========================================
    // 한달 전 날짜
    // ===========================================
    const getOneMonthAgo = () => {

        const date = new Date();

        date.setMonth(
            date.getMonth() - 1
        );

        date.setMinutes(
            date.getMinutes() - date.getTimezoneOffset()
        );

        return date.toISOString().substring(0, 10);
    };


    // ===========================================
    // 조회 조건
    // ===========================================
    const [filter, setFilter] = useState({

        departmentId : "",

        startDate : getOneMonthAgo(),

        endDate : getToday()

    });


    // 부서별 통계
    const [statusList, setStatusList]
        = useState([]);


    // 주의 직원 목록
    const [warningList, setWarningList]
        = useState([]);


    // ===========================================
    // 입력값 변경
    // ===========================================
    const handleChange = e => {

        setFilter({

            ...filter,

            [e.target.name] : e.target.value

        });
    };


    // ===========================================
    // API로 전달할 조회 조건 생성
    // ===========================================
    const makeParams = () => {

        const params = {

            startDate : filter.startDate,

            endDate : filter.endDate

        };


        // 부서를 선택했을 경우에만 전달
        if(filter.departmentId !== "") {

            params.departmentId
                = Number(filter.departmentId);
        }


        return params;
    };


    // ===========================================
    // 건강 통계 조회
    // ===========================================
    const selectStatusList = async () => {

        try {

            const response
                = await selectStatusListApi(
                    makeParams()
                );


            setStatusList(
                response.data
            );


        } catch(error) {

            console.log(
                "건강 통계 조회용 ajax 통신 실패!"
            );

            console.log(error);
        }
    };


    // ===========================================
    // 주의 직원 조회
    // ===========================================
    const selectWarningEmployeeList = async () => {

        try {

            const response
                = await selectWarningEmployeeListApi(
                    makeParams()
                );


            setWarningList(
                response.data
            );


        } catch(error) {

            console.log(
                "주의 직원 목록 조회용 ajax 통신 실패!"
            );

            console.log(error);
        }
    };


    // ===========================================
    // 조회 버튼
    // ===========================================
    const searchStatus = () => {


        if(filter.startDate > filter.endDate) {

            alert(
                "시작일은 종료일보다 늦을 수 없습니다."
            );

            return;
        }


        selectStatusList();

        selectWarningEmployeeList();
    };


    // ===========================================
    // 최초 화면 로딩
    // ===========================================
    useEffect(() => {

        selectStatusList();

        selectWarningEmployeeList();

    }, []);


    return (

        <div
            style={{
                width : "1200px",
                margin : "0 auto"
            }}
        >


            <h2 align="center">

                관리자 건강 통계

            </h2>


            <br /><br />


            {/* ================================= */}
            {/* 조회 조건 */}
            {/* ================================= */}

            <div
                style={{
                    textAlign : "center",
                    marginBottom : "40px"
                }}
            >


                {/* 부서 */}

                <span>
                    부서&nbsp;
                </span>


                <input

                    type="number"

                    name="departmentId"

                    value={
                        filter.departmentId
                    }

                    onChange={
                        handleChange
                    }

                    placeholder="전체"

                    min="1"

                    style={{
                        width : "100px"
                    }}

                />


                &nbsp;&nbsp;&nbsp;


                {/* 시작일 */}

                <span>
                    시작일&nbsp;
                </span>


                <input

                    type="date"

                    name="startDate"

                    value={
                        filter.startDate
                    }

                    onChange={
                        handleChange
                    }

                />


                &nbsp;&nbsp;&nbsp;


                {/* 종료일 */}

                <span>
                    종료일&nbsp;
                </span>


                <input

                    type="date"

                    name="endDate"

                    value={
                        filter.endDate
                    }

                    onChange={
                        handleChange
                    }

                />


                &nbsp;&nbsp;


                <button

                    type="button"

                    className="btn btn-outline-primary btn-sm"

                    onClick={
                        searchStatus
                    }

                >

                    조회

                </button>


            </div>


            {/* ================================= */}
            {/* 부서별 건강통계 */}
            {/* ================================= */}

            <h3>
                부서별 / 기간별 건강 통계
            </h3>


            <br />


            <table
                className="table table-bordered"
            >

                <thead>

                    <tr>

                        <th>
                            부서
                        </th>

                        <th>
                            재직 직원
                        </th>

                        <th>
                            평균 운동시간
                        </th>

                        <th>
                            평균 수면시간
                        </th>

                        <th>
                            이상 알림
                        </th>

                        <th>
                            미확인
                        </th>

                    </tr>

                </thead>


                <tbody>

                    {
                        statusList.length > 0
                        ?
                        statusList.map(
                            (status, index) => {

                                return (

                                    <tr
                                        key={
                                            status.departmentId
                                            ??
                                            index
                                        }
                                    >

                                        <td>

                                            {
                                                status.departmentName
                                            }

                                        </td>


                                        <td>

                                            {
                                                status.employeeCount
                                            }명

                                        </td>


                                        <td>

                                            {
                                                status.averageExerciseTime
                                            }분

                                        </td>


                                        <td>

                                            {
                                                status.averageSleepTime
                                            }시간

                                        </td>


                                        <td>

                                            {
                                                status.alertCount
                                            }건

                                        </td>


                                        <td>

                                            {
                                                status.unreadAlertCount
                                            }건

                                        </td>

                                    </tr>

                                );

                            }
                        )
                        :
                        (

                            <tr>

                                <td
                                    colSpan="6"
                                    align="center"
                                >

                                    조회된 통계가 없습니다.

                                </td>

                            </tr>

                        )
                    }

                </tbody>

            </table>


            <br /><br />


            {/* ================================= */}
            {/* 주의 직원 목록 */}
            {/* ================================= */}

            <h3>
                주의 직원 목록
            </h3>


            <br />


            <table
                className="table table-hover"
            >

                <thead>

                    <tr>

                        <th>
                            사번
                        </th>

                        <th>
                            이름
                        </th>

                        <th>
                            부서
                        </th>

                        <th>
                            이상 항목
                        </th>

                        <th>
                            위험도
                        </th>

                        <th>
                            발생일
                        </th>

                        <th>
                            확인 상태
                        </th>

                    </tr>

                </thead>


                <tbody>

                    {
                        warningList.length > 0
                        ?
                        warningList.map(
                            item => {

                                return (

                                    <StatusItem

                                        key={
                                            item.alertId
                                        }

                                        item={
                                            item
                                        }

                                    />

                                );

                            }
                        )
                        :
                        (

                            <tr>

                                <td
                                    colSpan="7"
                                    align="center"
                                >

                                    조회된 건강 이상징후가 없습니다.

                                </td>

                            </tr>

                        )
                    }

                </tbody>

            </table>


            <br /><br />

        </div>

    );
}


export default StatusList;