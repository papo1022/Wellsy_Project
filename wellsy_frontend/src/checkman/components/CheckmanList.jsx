import {
    useEffect,
    useState
} from "react";

import {
    useNavigate,
    useSearchParams
} from "react-router-dom";

import {
    selectCheckmanListApi,
    selectCheckmanAlertListApi,
    selectCheckupReservationListApi,
    approveCheckupReservationApi
} from "../api/CheckmanApi";

import "../styles/Checkman.css";


function CheckmanList() {

    const navigate = useNavigate();

    const [searchParams] =
        useSearchParams();


    // =========================================
    // URL에서 탭 확인
    //
    // /checkman
    // → 직원 건강정보
    //
    // /checkman?tab=reservation
    // → 건강검진 예약 승인
    // =========================================

    const tab =
        searchParams.get("tab");


    // =========================================
    // 현재 메뉴
    //
    // health
    // alert
    // reservation
    // =========================================

    const [menu, setMenu] =
        useState(
            tab === "reservation"
                ? "reservation"
                : tab === "alert"
                    ? "alert"
                    : "health"
        );


    // =========================================
    // URL 변경 시 탭도 변경
    // =========================================

    useEffect(() => {

        if (
            tab === "reservation"
        ) {

            setMenu("reservation");

        } else if (
            tab === "alert"
        ) {

            setMenu("alert");

        } else {

            setMenu("health");

        }

    }, [tab]);


    // =========================================
    // 직원 건강정보
    // =========================================

    const [checkmanList, setCheckmanList]
        = useState([]);


    // =========================================
    // 건강 이상 알림
    // =========================================

    const [alertList, setAlertList]
        = useState([]);


    // =========================================
    // 건강검진 예약
    // =========================================

    const [reservationList, setReservationList]
        = useState([]);


    // =========================================
    // 건강정보 검색조건
    // =========================================

    const [healthFilter, setHealthFilter]
        = useState({

            keyword: "",

            startDate: "",

            endDate: ""

        });
    // =========================================
    // 이상 알림 검색조건
    // =========================================

    const [alertFilter, setAlertFilter]
        = useState({

            keyword: "",

            severity: "",

            isRead: "",

            startDate: "",

            endDate: ""

        });


    // =========================================
    // 예약 검색조건
    // =========================================

    const [reservationFilter, setReservationFilter]
        = useState({

            name: "",

            status: "N"

        });


    // =========================================
    // 건강정보 검색값 변경
    // =========================================

    const handleHealthChange = e => {

        setHealthFilter({

            ...healthFilter,

            [e.target.name]:
                e.target.value

        });

    };


    // =========================================
    // 알림 검색값 변경
    // =========================================

    const handleAlertChange = e => {

        setAlertFilter({

            ...alertFilter,

            [e.target.name]:
                e.target.value

        });

    };


    // =========================================
    // 예약 검색값 변경
    // =========================================

    const handleReservationChange = e => {

        setReservationFilter({

            ...reservationFilter,

            [e.target.name]:
                e.target.value

        });

    };


    // =========================================
    // 직원 건강정보 조회
    // =========================================

    const selectCheckmanList = async () => {

        try {

            const response
                = await selectCheckmanListApi(
                    healthFilter
                );


            setCheckmanList(
                response.data
            );


        } catch (error) {

            console.log(
                "직원 건강정보 조회 실패!"
            );

            console.log(error);

        }

    };


    // =========================================
    // 건강 이상 알림 조회
    // =========================================

    const selectAlertList = async () => {

        try {

            const response
                = await selectCheckmanAlertListApi(
                    alertFilter
                );


            setAlertList(
                response.data
            );


        } catch (error) {

            console.log(
                "건강 이상 알림 조회 실패!"
            );

            console.log(error);

        }

    };


    // =========================================
    // 건강검진 예약 조회
    // =========================================

    const selectReservationList = async () => {

        try {

            const params = {};


            // 직원 이름
            if (
                reservationFilter.name !== ""
            ) {

                params.name =
                    reservationFilter.name;

            }


            // 상태
            if (
                reservationFilter.status !== ""
            ) {

                params.status =
                    reservationFilter.status;

            }


            const response
                = await selectCheckupReservationListApi(
                    params
                );


            setReservationList(
                response.data
            );


        } catch (error) {

            console.log(
                "건강검진 예약 조회 실패!"
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

        selectReservationList();

    }, []);


    // =========================================
    // 건강정보 검색
    // =========================================

    const searchHealth = () => {

        if (
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
    // 건강 이상 알림 검색
    // =========================================

    const searchAlert = () => {

        if (
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
    // 건강검진 예약 검색
    // =========================================

    const searchReservation = () => {

        selectReservationList();

    };


    // =========================================
    // 건강검진 승인
    // =========================================

    const approveReservation
        = async reservationId => {

            if (
                !window.confirm(
                    "해당 건강검진 예약을 승인하시겠습니까?"
                )
            ) {

                return;

            }


            try {

                const response
                    = await approveCheckupReservationApi(
                        reservationId
                    );


                alert(
                    response.data
                    ?? "건강검진 예약이 승인되었습니다."
                );


                // 승인 후 다시 조회
                // 기본 N 상태라면 승인된 예약은
                // 승인 대기 목록에서 바로 사라짐
                await selectReservationList();


            } catch (error) {

                console.log(
                    "건강검진 예약 승인 실패!"
                );

                console.log(error);


                if (
                    error.response?.data
                ) {

                    alert(
                        error.response.data
                    );

                } else {

                    alert(
                        "건강검진 예약 승인 중 오류가 발생했습니다."
                    );

                }

            }

        };


    // =========================================
    // 알림 심각도 한글변환
    // =========================================

    const getSeverityName = severity => {

        switch (severity) {

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


    // =========================================
    // 예약 상태 한글
    // =========================================

    const getReservationStatusName
        = status => {

            switch (status) {

                case "N":
                    return "승인대기";

                case "Y":
                    return "승인완료";

                case "C":
                    return "취소";

                default:
                    return "-";

            }

        };


    // =========================================
    // 승인 대기 예약 수
    // =========================================

    const waitingReservationCount
        = reservationList.filter(
            reservation =>
                reservation.status === "N"
        ).length;


    // =========================================
    // 미확인 알림 수
    // =========================================

    const unreadAlertCount
        = alertList.filter(
            alert =>
                alert.isRead === "N"
        ).length;


    return (

        <div className="checkman-dashboard">


            {/* ================================= */}
            {/* 상단 메뉴 */}
            {/* ================================= */}

            <div className="checkman-menu-area">


                {/* 직원 건강정보 */}

                <button
                    type="button"

                    className={
                        menu === "health"
                            ?
                            "checkman-menu-btn checkman-menu-active"
                            :
                            "checkman-menu-btn"
                    }

                    onClick={() => {

                        setMenu("health");

                    }}
                >
                    직원 건강정보
                </button>



                {/* 건강 이상 알림 */}

                <button
                    type="button"

                    className={
                        menu === "alert"
                            ?
                            "checkman-menu-btn checkman-menu-active"
                            :
                            "checkman-menu-btn"
                    }

                    onClick={() => {

                        setMenu("alert");

                    }}
                >

                    건강 이상 알림


                    {
                        unreadAlertCount > 0
                        &&
                        (
                            <span className="checkman-alert-count">

                                {unreadAlertCount}

                            </span>
                        )
                    }

                </button>



                {/* 건강검진 예약 승인 */}

                <button
                    type="button"

                    className={
                        menu === "reservation"
                            ?
                            "checkman-menu-btn checkman-menu-active"
                            :
                            "checkman-menu-btn"
                    }

                    onClick={() => {

                        setMenu("reservation");

                        selectReservationList();

                    }}
                >

                    예약 승인


                    {
                        waitingReservationCount > 0
                        &&
                        (
                            <span className="checkman-reservation-count">

                                {
                                    waitingReservationCount
                                }

                            </span>
                        )
                    }

                </button>


            </div>



            {/* ================================= */}
            {/* 직원 건강정보 탭 */}
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
                                                    checkman => (

                                                        <tr
                                                            key={
                                                                checkman.healthRecordId
                                                            }

                                                            className="checkman-table-row"

                                                            onClick={() => {

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

                                                    )
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
            {/* 건강 이상 알림 탭 */}
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



                            {/* 검색 */}

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



                            {/* 알림 목록 */}

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
                                                    alertData => (

                                                        <tr
                                                            key={
                                                                alertData.alertId
                                                            }

                                                            className={
                                                                alertData.isRead === "N"
                                                                    ?
                                                                    "checkman-table-row checkman-unread-row"
                                                                    :
                                                                    "checkman-table-row"
                                                            }

                                                            onClick={() => {

                                                                navigate(
                                                                    `/checkman/alerts/${alertData.alertId}`
                                                                );

                                                            }}
                                                        >

                                                            <td className="checkman-name-cell">

                                                                {
                                                                    alertData.employeeName
                                                                }

                                                            </td>


                                                            <td>

                                                                {
                                                                    alertData.departmentName
                                                                    ??
                                                                    "-"
                                                                }

                                                            </td>


                                                            <td>

                                                                {
                                                                    alertData.alertType
                                                                    ??
                                                                    "-"
                                                                }

                                                            </td>


                                                            <td>

                                                                <span
                                                                    className={
                                                                        `checkman-severity checkman-severity-${alertData.severity?.toLowerCase()}`
                                                                    }
                                                                >

                                                                    {
                                                                        getSeverityName(
                                                                            alertData.severity
                                                                        )
                                                                    }

                                                                </span>

                                                            </td>


                                                            <td className="checkman-message-cell">

                                                                {
                                                                    alertData.message
                                                                    ??
                                                                    "-"
                                                                }

                                                            </td>


                                                            <td>

                                                                {
                                                                    alertData.alertCreatedAt
                                                                        ?
                                                                        alertData.alertCreatedAt
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
                                                                        alertData.isRead === "Y"
                                                                            ?
                                                                            "checkman-read"
                                                                            :
                                                                            "checkman-unread"
                                                                    }
                                                                >

                                                                    {
                                                                        alertData.isRead === "Y"
                                                                            ?
                                                                            "확인완료"
                                                                            :
                                                                            "미확인"
                                                                    }

                                                                </span>

                                                            </td>

                                                        </tr>

                                                    )
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



            {/* ================================= */}
            {/* 건강검진 예약 승인 탭 */}
            {/* ================================= */}

            {
                menu === "reservation"
                &&
                (

                    <div className="checkman-card-area">

                        <div className="checkman-card">


                            <div className="checkman-header">

                                <h2>
                                    건강검진 예약 승인
                                </h2>

                                <p>
                                    직원이 신청한 건강검진 예약을 확인하고 승인합니다.
                                </p>

                            </div>



                            {/* 예약 검색 */}

                            <div className="checkman-search-area">


                                <input
                                    type="text"

                                    name="name"

                                    value={
                                        reservationFilter.name
                                    }

                                    onChange={
                                        handleReservationChange
                                    }

                                    placeholder="직원 이름"
                                />


                                <select
                                    name="status"

                                    value={
                                        reservationFilter.status
                                    }

                                    onChange={
                                        handleReservationChange
                                    }
                                >

                                    <option value="N">
                                        승인대기
                                    </option>

                                    <option value="Y">
                                        승인완료
                                    </option>

                                    <option value="C">
                                        취소
                                    </option>

                                    <option value="">
                                        전체
                                    </option>

                                </select>


                                <button
                                    type="button"

                                    className="checkman-search-btn"

                                    onClick={
                                        searchReservation
                                    }
                                >
                                    조회
                                </button>


                            </div>



                            {/* 예약 목록 */}

                            <div className="checkman-table-area">

                                <table className="checkman-table">

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
                                                직급
                                            </th>

                                            <th>
                                                검진 희망일
                                            </th>

                                            <th>
                                                최근 검진일
                                            </th>

                                            <th>
                                                병원
                                            </th>

                                            <th>
                                                메모
                                            </th>

                                            <th>
                                                상태
                                            </th>

                                            <th>
                                                관리
                                            </th>

                                        </tr>

                                    </thead>


                                    <tbody>

                                        {
                                            reservationList.length > 0
                                                ?
                                                reservationList.map(
                                                    reservation => (

                                                        <tr
                                                            key={
                                                                reservation.reservationId
                                                            }
                                                        >

                                                            <td>

                                                                {
                                                                    reservation.employeeNo
                                                                }

                                                            </td>


                                                            <td className="checkman-name-cell">

                                                                {
                                                                    reservation.name
                                                                }

                                                            </td>


                                                            <td>

                                                                {
                                                                    reservation.departmentName
                                                                    ??
                                                                    "-"
                                                                }

                                                            </td>


                                                            <td>

                                                                {
                                                                    reservation.jobName
                                                                    ??
                                                                    "-"
                                                                }

                                                            </td>


                                                            <td>

                                                                {
                                                                    reservation.reservationDate
                                                                    ??
                                                                    "-"
                                                                }

                                                            </td>


                                                            <td>

                                                                {
                                                                    reservation.recentCheckupDate
                                                                    ??
                                                                    "-"
                                                                }

                                                            </td>


                                                            <td>

                                                                {
                                                                    reservation.hospitalName
                                                                    ??
                                                                    "-"
                                                                }

                                                            </td>


                                                            <td className="checkman-message-cell">

                                                                {
                                                                    reservation.memo
                                                                    ??
                                                                    "-"
                                                                }

                                                            </td>


                                                            <td>

                                                                <span
                                                                    className={
                                                                        `checkman-reservation-status checkman-reservation-${reservation.status?.toLowerCase()}`
                                                                    }
                                                                >

                                                                    {
                                                                        getReservationStatusName(
                                                                            reservation.status
                                                                        )
                                                                    }

                                                                </span>

                                                            </td>


                                                            <td>

                                                                {
                                                                    reservation.status === "N"
                                                                        ?
                                                                        (

                                                                            <button
                                                                                type="button"

                                                                                className="checkman-approve-btn"

                                                                                onClick={() => {

                                                                                    approveReservation(
                                                                                        reservation.reservationId
                                                                                    );

                                                                                }}
                                                                            >
                                                                                승인
                                                                            </button>

                                                                        )
                                                                        :
                                                                        (

                                                                            <span className="checkman-complete-text">

                                                                                {
                                                                                    reservation.status === "Y"
                                                                                        ?
                                                                                        "처리완료"
                                                                                        :
                                                                                        "-"
                                                                                }

                                                                            </span>

                                                                        )
                                                                }

                                                            </td>

                                                        </tr>

                                                    )
                                                )
                                                :
                                                (

                                                    <tr>

                                                        <td
                                                            colSpan="10"
                                                            className="checkman-empty"
                                                        >
                                                            조회된 건강검진 예약이 없습니다.
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