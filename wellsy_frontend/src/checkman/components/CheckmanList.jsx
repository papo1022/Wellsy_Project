import { useEffect, useMemo, useState } from "react";

import {
    selectCheckmanListApi
} from "../api/checkmanApi";

import "../styles/Checkman.css";


function CheckmanList() {


    // =========================================
    // 전체 건강기록
    // =========================================

    const [checkmanList, setCheckmanList]
        = useState([]);


    // =========================================
    // 선택 직원
    // =========================================

    const [employeeNo, setEmployeeNo]
        = useState("");


    // =========================================
    // 선택 날짜
    // =========================================

    const [selectedDate, setSelectedDate]
        = useState("");


    // =========================================
    // 건강정보 전체 조회
    // =========================================

    useEffect(() => {


        const selectCheckmanList = async () => {


            try {


                const response
                    = await selectCheckmanListApi({});


                console.log(
                    "CHECKMAN 건강정보 :",
                    response.data
                );


                const list
                    = response.data ?? [];


                setCheckmanList(
                    list
                );


                // 첫 번째 직원 자동 선택
                if(list.length > 0) {


                    setEmployeeNo(
                        String(
                            list[0].employeeNo
                        )
                    );


                    setSelectedDate(
                        list[0].recordDate
                    );

                }


            } catch(error) {


                console.log(
                    "CHECKMAN 건강정보 조회 실패!"
                );


                console.log(error);

            }

        };


        selectCheckmanList();


    }, []);


    // =========================================
    // 직원 목록
    // 중복 직원 제거
    // =========================================

    const employeeList
        = useMemo(() => {


            const map
                = new Map();


            checkmanList.forEach(
                item => {


                    if(
                        !map.has(
                            item.employeeNo
                        )
                    ) {


                        map.set(
                            item.employeeNo,
                            {
                                employeeNo :
                                    item.employeeNo,

                                employeeName :
                                    item.employeeName,

                                departmentName :
                                    item.departmentName,

                                jobName :
                                    item.jobName
                            }
                        );

                    }

                }
            );


            return Array.from(
                map.values()
            );


        }, [checkmanList]);


    // =========================================
    // 선택 직원 기록
    // =========================================

    const employeeHealthList
        = useMemo(() => {


            return checkmanList.filter(
                item =>
                    String(item.employeeNo)
                    === String(employeeNo)
            );


        }, [
            checkmanList,
            employeeNo
        ]);


    // =========================================
    // 선택 직원 기본정보
    // =========================================

    const employee
        = employeeHealthList.length > 0
        ?
        employeeHealthList[0]
        :
        null;


    // =========================================
    // 선택 날짜 건강정보
    // =========================================

    const currentHealth
        = useMemo(() => {


            if(
                employeeHealthList.length
                === 0
            ) {

                return null;
            }


            const health
                = employeeHealthList.find(
                    item =>
                        item.recordDate
                        === selectedDate
                );


            return health
                ??
                employeeHealthList[0];


        }, [
            employeeHealthList,
            selectedDate
        ]);


    // =========================================
    // 직원 변경
    // =========================================

    const changeEmployee = e => {


        const value
            = e.target.value;


        setEmployeeNo(
            value
        );


        const list
            = checkmanList.filter(
                item =>
                    String(item.employeeNo)
                    === String(value)
            );


        if(list.length > 0) {

            setSelectedDate(
                list[0].recordDate
            );
        }

    };


    // =========================================
    // 선택 날짜 표시
    // =========================================

    const formatDate = dateString => {


        if(!dateString) {

            return "-";
        }


        const date
            = new Date(
                dateString
                + "T00:00:00"
            );


        return (
            `${date.getFullYear()}년 `
            +
            `${date.getMonth() + 1}월 `
            +
            `${date.getDate()}일`
        );

    };


    return (

        <div className="checkman-dashboard">


            {/* ================================= */}
            {/* 상단 */}
            {/* ================================= */}

            <div className="checkman-main-header">


                {/* 직원 */}

                <div className="checkman-profile">


                    <div className="checkman-profile-circle">

                        {
                            employee?.employeeName
                            ?.substring(0, 1)
                            ??
                            "?"
                        }

                    </div>


                    <div className="checkman-profile-info">


                        <strong>

                            {
                                employee?.employeeName
                                ??
                                "직원을 선택해주세요"
                            }

                        </strong>


                        <span>

                            {
                                employee?.jobName
                                ??
                                "사원"
                            }

                        </span>


                    </div>


                </div>


                {/* 직원 선택 */}

                <select
                    className="checkman-employee-select"

                    value={
                        employeeNo
                    }

                    onChange={
                        changeEmployee
                    }
                >


                    {
                        employeeList.map(
                            item => (

                                <option
                                    key={
                                        item.employeeNo
                                    }

                                    value={
                                        item.employeeNo
                                    }
                                >

                                    {
                                        item.employeeName
                                    }

                                    {" / "}

                                    {
                                        item.departmentName
                                        ??
                                        "-"
                                    }

                                </option>

                            )
                        )
                    }


                </select>


            </div>


            {/* ================================= */}
            {/* 대시보드 본체 */}
            {/* ================================= */}

            <div className="checkman-card-area">


                {/* ================================= */}
                {/* 왼쪽 */}
                {/* ================================= */}

                <div className="checkman-left-area">


                    <h2 className="checkman-section-title">

                        건강 캘린더

                    </h2>


                    {/* 달력 */}

                    <div className="checkman-card checkman-calendar-card">


                        <div className="checkman-calendar-title">

                            <strong>
                                건강기록
                            </strong>


                            <span>

                                {
                                    employeeHealthList.length
                                }

                                개의 기록

                            </span>

                        </div>


                        <div className="checkman-calendar-date-list">


                            {
                                employeeHealthList
                                .slice(0, 7)
                                .map(
                                    item => (

                                        <button
                                            type="button"

                                            key={
                                                item.healthRecordId
                                            }

                                            className={
                                                selectedDate
                                                === item.recordDate

                                                ?

                                                "checkman-date-button checkman-date-active"

                                                :

                                                "checkman-date-button"
                                            }

                                            onClick={ () => {

                                                setSelectedDate(
                                                    item.recordDate
                                                );

                                            }}
                                        >

                                            {
                                                item.recordDate
                                            }

                                        </button>

                                    )
                                )
                            }


                        </div>


                        {/* AI 추천 */}

                        <div className="checkman-ai-card">


                            <strong>
                                AI 헬스코치의 추천
                            </strong>


                            <div>
                                가벼운 스트레칭과 유산소 운동을 권장합니다.
                            </div>


                            <div>
                                충분한 수분을 섭취해주세요.
                            </div>


                            <div>
                                규칙적인 수면 시간을 유지해주세요.
                            </div>


                        </div>


                    </div>


                    {/* ================================= */}
                    {/* 혈당 / 혈압 */}
                    {/* ================================= */}

                    <div className="checkman-top-area">


                        {/* 혈당 */}

                        <div className="checkman-card checkman-blood-sugar-card">


                            <div className="checkman-health-header">


                                <div>

                                    <h2>
                                        혈당
                                    </h2>


                                    <span>
                                        mg/dL
                                    </span>

                                </div>


                                <div className="checkman-sugar-icon">

                                    ◆

                                </div>


                            </div>


                            <div className="checkman-card-content">


                                <div className="checkman-card-item">


                                    <span>
                                        혈당
                                    </span>


                                    <strong>

                                        {
                                            currentHealth
                                            ?.bloodSugar
                                            ??
                                            "-"
                                        }

                                    </strong>


                                </div>


                                <div className="checkman-card-item">


                                    <span>
                                        BMI
                                    </span>


                                    <strong>

                                        {
                                            currentHealth
                                            ?.bmi
                                            ??
                                            "-"
                                        }

                                    </strong>


                                </div>


                            </div>


                        </div>


                        {/* 혈압 */}

                        <div className="checkman-card checkman-blood-pressure-card">


                            <div className="checkman-health-header">


                                <div>

                                    <h2>
                                        혈압
                                    </h2>


                                    <span>
                                        mmHg
                                    </span>

                                </div>


                                <div className="checkman-pressure-icon">

                                    ●

                                </div>


                            </div>


                            <div className="checkman-card-content">


                                <div className="checkman-card-item">


                                    <span>
                                        최저
                                    </span>


                                    <strong>

                                        {
                                            currentHealth
                                            ?.diastolicBp
                                            ??
                                            "-"
                                        }

                                    </strong>


                                </div>


                                <div className="checkman-card-item">


                                    <span>
                                        최고
                                    </span>


                                    <strong>

                                        {
                                            currentHealth
                                            ?.systolicBp
                                            ??
                                            "-"
                                        }

                                    </strong>


                                </div>


                            </div>


                        </div>


                    </div>


                </div>


                {/* ================================= */}
                {/* 가운데 */}
                {/* ================================= */}

                <div className="checkman-middle-area">


                    <h2 className="checkman-section-title">

                        수면 기록

                    </h2>


                    <div className="checkman-card checkman-sleep-card">


                        {/* 수면 그래프 */}

                        <div className="checkman-sleep-chart">


                            <div className="checkman-sleep-line">

                                <span className="checkman-awake"></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span className="checkman-awake"></span>

                            </div>


                            <div className="checkman-sleep-line">

                                <span></span>
                                <span className="checkman-rem"></span>
                                <span></span>
                                <span className="checkman-rem"></span>
                                <span></span>

                            </div>


                            <div className="checkman-sleep-line">

                                <span></span>
                                <span></span>
                                <span className="checkman-light"></span>
                                <span></span>
                                <span></span>

                            </div>


                            <div className="checkman-sleep-line">

                                <span></span>
                                <span></span>
                                <span className="checkman-deep"></span>
                                <span></span>
                                <span className="checkman-deep"></span>

                            </div>


                        </div>


                        {/* 범례 */}

                        <div className="checkman-sleep-legend">


                            <span>
                                ● 기상
                            </span>


                            <span>
                                ● 렘 수면
                            </span>


                            <span>
                                ● 얕은 수면
                            </span>


                            <span>
                                ● 깊은 수면
                            </span>


                        </div>


                        {/* 총 수면 */}

                        <div className="checkman-sleep-summary">


                            <div>


                                <span>
                                    총 수면 시간
                                </span>


                                <strong>
                                    -
                                </strong>


                            </div>


                            <div className="checkman-donut">


                                <div>
                                    수면
                                </div>


                            </div>


                        </div>


                        {/* 수면 단계 */}

                        <div className="checkman-sleep-bars">


                            <div>

                                <span>
                                    기상
                                </span>

                                <div>
                                    <b className="checkman-awake-bar"></b>
                                </div>

                            </div>


                            <div>

                                <span>
                                    렘 수면
                                </span>

                                <div>
                                    <b className="checkman-rem-bar"></b>
                                </div>

                            </div>


                            <div>

                                <span>
                                    얕은 수면
                                </span>

                                <div>
                                    <b className="checkman-light-bar"></b>
                                </div>

                            </div>


                            <div>

                                <span>
                                    깊은 수면
                                </span>

                                <div>
                                    <b className="checkman-deep-bar"></b>
                                </div>

                            </div>


                        </div>


                    </div>


                </div>


                {/* ================================= */}
                {/* 오른쪽 */}
                {/* ================================= */}

                <div className="checkman-right-area">


                    <h1 className="checkman-today-title">

                        오늘의 건강 기록

                    </h1>


                    {/* 날짜 */}

                    <div className="checkman-selected-date">


                        <span>
                            ▣
                        </span>


                        <strong>

                            {
                                formatDate(
                                    selectedDate
                                )
                            }

                        </strong>


                        <span>
                           ⌄
                        </span>


                    </div>


                    {/* ================================= */}
                    {/* 식사 */}
                    {/* ================================= */}

                    <div className="checkman-today-card">


                        <div>

                            <h2>
                                식사
                            </h2>


                            <span>
                                총 칼로리 kcal
                            </span>

                        </div>


                        <div className="checkman-today-value">


                            <div className="checkman-circle-area">

                                <i></i>
                                <i></i>
                                <i></i>

                                <b>
                                    +
                                </b>

                            </div>


                            <strong>
                                -
                            </strong>


                        </div>


                    </div>


                    {/* ================================= */}
                    {/* 운동 */}
                    {/* ================================= */}

                    <div className="checkman-today-card">


                        <div>

                            <h2>
                                운동량
                            </h2>


                            <span>
                                총 시간 시/분
                            </span>

                        </div>


                        <div className="checkman-today-value">


                            <div className="checkman-circle-area">

                                <i></i>
                                <i></i>

                                <b>
                                    +
                                </b>

                            </div>


                            <strong>
                                -
                            </strong>


                        </div>


                    </div>


                    {/* ================================= */}
                    {/* 카페인 */}
                    {/* ================================= */}

                    <div className="checkman-today-card">


                        <div>

                            <h2>
                                카페인
                            </h2>


                            <span>
                                총 섭취량 mg
                            </span>

                        </div>


                        <div className="checkman-today-value">


                            <div className="checkman-circle-area">

                                <i></i>
                                <i></i>
                                <i></i>

                                <b>
                                    +
                                </b>

                            </div>


                            <strong>

                                {
                                    currentHealth
                                    ?.caffeineAmount
                                    ??
                                    "-"
                                }

                            </strong>


                        </div>


                    </div>


                    {/* ================================= */}
                    {/* 알코올 */}
                    {/* ================================= */}

                    <div className="checkman-today-card">


                        <div>

                            <h2>
                                알코올
                            </h2>


                            <span>
                                총 섭취량
                            </span>

                        </div>


                        <div className="checkman-today-value">


                            <div className="checkman-circle-area">

                                <i></i>

                                <b>
                                    +
                                </b>

                            </div>


                            <strong>

                                {
                                    currentHealth
                                    ?.alcoholAmount
                                    ??
                                    "-"
                                }

                            </strong>


                        </div>


                    </div>


                </div>


            </div>


        </div>

    );

}


export default CheckmanList;