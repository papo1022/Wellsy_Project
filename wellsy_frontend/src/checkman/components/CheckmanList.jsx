import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
    selectCheckmanListApi,
    selectCheckmanAlertListApi
} from "../api/CheckmanApi";

import "../styles/Checkman.css";


function CheckmanList() {

    let navigate = useNavigate();


    // =========================================
    // 현재 메뉴
    // health / alert
    // =========================================

    const [menu, setMenu]
        = useState("health");


    // =========================================
    // 건강정보 목록
    // =========================================

    const [checkmanList, setCheckmanList]
        = useState([]);


    // =========================================
    // 알림 목록
    // =========================================

    const [alertList, setAlertList]
        = useState([]);


    // =========================================
    // 건강정보 검색 조건
    // =========================================

    const [healthFilter, setHealthFilter]
        = useState({

            keyword : "",

            startDate : "",

            endDate : ""

        });


    // =========================================
    // 알림 검색 조건
    // =========================================

    const [alertFilter, setAlertFilter]
        = useState({

            keyword : "",

            severity : "",

            isRead : "",

            startDate : "",

            endDate : ""

        });


    // =========================================
    // 건강정보 입력 변경
    // =========================================

    const handleHealthChange = e => {

        setHealthFilter({

            ...healthFilter,

            [e.target.name] :
                e.target.value

        });

    };


    // =========================================
    // 알림 입력 변경
    // =========================================

    const handleAlertChange = e => {

        setAlertFilter({

            ...alertFilter,

            [e.target.name] :
                e.target.value

        });

    };


    // =========================================
    // 건강정보 조회
    // =========================================

    const selectCheckmanList = async () => {

        try {

            const response
                = await selectCheckmanListApi(
                    healthFilter
                );


            console.log(
                "직원 건강정보 :",
                response.data
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


    // =========================================
    // 알림 조회
    // =========================================

    const selectAlertList = async () => {

        try {

            const response
                = await selectCheckmanAlertListApi(
                    alertFilter
                );


            console.log(
                "건강 이상 알림 :",
                response.data
            );


            setAlertList(
                response.data
            );


        } catch(error) {

            console.log(
                "건강 이상 알림 조회 실패!"
            );

            console.log(error);
        }

    };


    // =========================================
    // 최초 조회
    // =========================================

    useEffect(() => {

        selectCheckmanList();

        selectAlertList();

    }, []);


    // =========================================
    // 건강정보 검색
    // =========================================

    const searchHealth = () => {

        if(
            healthFilter.startDate !== ""
            &&
            healthFilter.endDate !== ""
            &&
            healthFilter.startDate
                > healthFilter.endDate
        ) {

            alert(
                "시작일은 종료일보다 늦을 수 없습니다."
            );

            return;
        }


        selectCheckmanList();

    };


    // =========================================
    // 알림 검색
    // =========================================

    const searchAlert = () => {

        if(
            alertFilter.startDate !== ""
            &&
            alertFilter.endDate !== ""
            &&
            alertFilter.startDate
                > alertFilter.endDate
        ) {

            alert(
                "시작일은 종료일보다 늦을 수 없습니다."
            );

            return;
        }


        selectAlertList();

    };


    // =========================================
    // 알림 심각도 한글
    // =========================================

    const getSeverityName = severity => {

        switch(severity) {

            case "DANGER":
                return "위험";

            case "RISK":
                return "경고";

            case "CAUTION":
                return "주의";

            default:
                return severity ?? "-";
        }

    };


    return (

        <div className="checkman-dashboard">


            {/* ================================= */}
            {/* 메뉴 */}
            {/* ================================= */}

            <div className="checkman-menu-area">


                <button
                    type="button"

                    className={
                        menu === "health"
                        ?
                        "checkman-menu-btn checkman-menu-active"
                        :
                        "checkman-menu-btn"
                    }

                    onClick={ () => {

                        setMenu("health");

                    }}
                >
                    직원 건강정보
                </button>


                <button
                    type="button"

                    className={
                        menu === "alert"
                        ?
                        "checkman-menu-btn checkman-menu-active"
                        :
                        "checkman-menu-btn"
                    }

                    onClick={ () => {

                        setMenu("alert");

                    }}
                >
                    건강 이상 알림

                    {
                        alertList.filter(
                            alert =>
                                alert.isRead === "N"
                        ).length > 0
                        &&
                        (
                            <span className="checkman-alert-count">

                                {
                                    alertList.filter(
                                        alert =>
                                            alert.isRead === "N"
                                    ).length
                                }

                            </span>
                        )
                    }

                </button>


            </div>


            {/* ================================= */}
            {/* 직원 건강정보 */}
            {/* ================================= */}

            {
                menu === "health"
                &&
                (

                    <div className="checkman-card-area">

                        <div className="checkman-card">


                            <div className="checkman-header">

                                <h2>
                                    직원 건강정보
                                </h2>

                                <p>
                                    직원별 건강기록을 조회하고 건강 상태를 확인합니다.
                                </p>

                            </div>


                            {/* 검색 */}
                            <div className="checkman-search-area">


                                <input
                                    type="text"

                                    name="keyword"

                                    value={
                                        healthFilter.keyword
                                    }

                                    onChange={
                                        handleHealthChange
                                    }

                                    placeholder="직원 이름을 입력해주세요."
                                />


                                <input
                                    type="date"

                                    name="startDate"

                                    value={
                                        healthFilter.startDate
                                    }

                                    onChange={
                                        handleHealthChange
                                    }
                                />


                                <span>
                                    ~
                                </span>


                                <input
                                    type="date"

                                    name="endDate"

                                    value={
                                        healthFilter.endDate
                                    }

                                    onChange={
                                        handleHealthChange
                                    }
                                />


                                <button
                                    type="button"

                                    className="checkman-search-btn"

                                    onClick={
                                        searchHealth
                                    }
                                >
                                    조회
                                </button>


                            </div>


                            {/* 건강정보 목록 */}
                            <div className="checkman-table-area">

                                <table className="checkman-table">

                                    <thead>

                                        <tr>

                                            <th>
                                                이름
                                            </th>

                                            <th>
                                                부서
                                            </th>

                                            <th>
                                                직급
                                            </th>

                                            <th>
                                                기록일
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

                                                            className="checkman-table-row"

                                                            onClick={ () => {

                                                                navigate(
                                                                    `/checkman/health/${checkman.healthRecordId}`
                                                                );

                                                            }}
                                                        >

                                                            <td className="checkman-name-cell">

                                                                {
                                                                    checkman.employeeName
                                                                }

                                                            </td>


                                                            <td>

                                                                {
                                                                    checkman.departmentName
                                                                    ??
                                                                    "-"
                                                                }

                                                            </td>


                                                            <td>

                                                                {
                                                                    checkman.jobName
                                                                    ??
                                                                    "-"
                                                                }

                                                            </td>


                                                            <td>

                                                                {
                                                                    checkman.recordDate
                                                                    ??
                                                                    "-"
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
                                                        조회된 건강정보가 없습니다.
                                                    </td>

                                                </tr>

                                            )
                                        }

                                    </tbody>

                                </table>

                            </div>

                        </div>

                    </div>

                )
            }


            {/* ================================= */}
            {/* 건강 이상 알림 */}
            {/* ================================= */}

            {
                menu === "alert"
                &&
                (

                    <div className="checkman-card-area">

                        <div className="checkman-card">


                            <div className="checkman-header">

                                <h2>
                                    건강 이상 알림
                                </h2>

                                <p>
                                    건강검진에서 발생한 이상 알림을 확인합니다.
                                </p>

                            </div>


                            <div className="checkman-search-area">


                                <input
                                    type="text"

                                    name="keyword"

                                    value={
                                        alertFilter.keyword
                                    }

                                    onChange={
                                        handleAlertChange
                                    }

                                    placeholder="직원 이름"
                                />


                                <select
                                    name="severity"

                                    value={
                                        alertFilter.severity
                                    }

                                    onChange={
                                        handleAlertChange
                                    }
                                >

                                    <option value="">
                                        전체 심각도
                                    </option>

                                    <option value="CAUTION">
                                        주의
                                    </option>

                                    <option value="RISK">
                                        경고
                                    </option>

                                    <option value="DANGER">
                                        위험
                                    </option>

                                </select>


                                <select
                                    name="isRead"

                                    value={
                                        alertFilter.isRead
                                    }

                                    onChange={
                                        handleAlertChange
                                    }
                                >

                                    <option value="">
                                        전체 상태
                                    </option>

                                    <option value="N">
                                        미확인
                                    </option>

                                    <option value="Y">
                                        확인완료
                                    </option>

                                </select>


                                <input
                                    type="date"

                                    name="startDate"

                                    value={
                                        alertFilter.startDate
                                    }

                                    onChange={
                                        handleAlertChange
                                    }
                                />


                                <span>
                                    ~
                                </span>


                                <input
                                    type="date"

                                    name="endDate"

                                    value={
                                        alertFilter.endDate
                                    }

                                    onChange={
                                        handleAlertChange
                                    }
                                />


                                <button
                                    type="button"

                                    className="checkman-search-btn"

                                    onClick={
                                        searchAlert
                                    }
                                >
                                    조회
                                </button>

                            </div>


                            <div className="checkman-table-area">

                                <table className="checkman-table">

                                    <thead>

                                        <tr>

                                            <th>
                                                직원
                                            </th>

                                            <th>
                                                부서
                                            </th>

                                            <th>
                                                알림 유형
                                            </th>

                                            <th>
                                                심각도
                                            </th>

                                            <th>
                                                내용
                                            </th>

                                            <th>
                                                발생일
                                            </th>

                                            <th>
                                                상태
                                            </th>

                                        </tr>

                                    </thead>


                                    <tbody>

                                        {
                                            alertList.length > 0
                                            ?
                                            alertList.map(
                                                alert => {

                                                    return (

                                                        <tr
                                                            key={
                                                                alert.alertId
                                                            }

                                                            className={
                                                                alert.isRead === "N"
                                                                ?
                                                                "checkman-table-row checkman-unread-row"
                                                                :
                                                                "checkman-table-row"
                                                            }

                                                            onClick={ () => {

                                                                navigate(
                                                                    `/checkman/alerts/${alert.alertId}`
                                                                );

                                                            }}
                                                        >

                                                            <td className="checkman-name-cell">

                                                                {
                                                                    alert.employeeName
                                                                }

                                                            </td>


                                                            <td>

                                                                {
                                                                    alert.departmentName
                                                                    ??
                                                                    "-"
                                                                }

                                                            </td>


                                                            <td>

                                                                {
                                                                    alert.alertType
                                                                    ??
                                                                    "-"
                                                                }

                                                            </td>


                                                            <td>

                                                                <span
                                                                    className={
                                                                        `checkman-severity checkman-severity-${alert.severity?.toLowerCase()}`
                                                                    }
                                                                >

                                                                    {
                                                                        getSeverityName(
                                                                            alert.severity
                                                                        )
                                                                    }

                                                                </span>

                                                            </td>


                                                            <td className="checkman-message-cell">

                                                                {
                                                                    alert.message
                                                                    ??
                                                                    "-"
                                                                }

                                                            </td>


                                                            <td>

                                                                {
                                                                    alert.alertCreatedAt
                                                                    ?
                                                                    alert.alertCreatedAt
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


                                                            <td>

                                                                <span
                                                                    className={
                                                                        alert.isRead === "Y"
                                                                        ?
                                                                        "checkman-read"
                                                                        :
                                                                        "checkman-unread"
                                                                    }
                                                                >

                                                                    {
                                                                        alert.isRead === "Y"
                                                                        ?
                                                                        "확인완료"
                                                                        :
                                                                        "미확인"
                                                                    }

                                                                </span>

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
                                                        건강 이상 알림이 없습니다.
                                                    </td>

                                                </tr>

                                            )
                                        }

                                    </tbody>

                                </table>

                            </div>

                        </div>

                    </div>

                )
            }


        </div>

    );

}


export default CheckmanList;