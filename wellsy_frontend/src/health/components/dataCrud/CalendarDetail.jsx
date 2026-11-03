import "../../../health/styles/Card.css";
import ExerciseForm from "./ExerciseForm";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import {
    getHealthByDateApi,
    getHealthCalendarDatesApi
} from "../../api/healthApi";

import {
    getSleepByDateApi
} from "../../api/sleepApi";

import {
    getExercisesApi
} from "../../api/exerciseApi";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import "../../styles/CrudForm.css";

function CalendarDetail() {

    const navigate = useNavigate();

    const token = sessionStorage.getItem("token");

    const employeeNo = token
        ? jwtDecode(token).employeeNo
        : null;

    const [selectedDate, setSelectedDate] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [isExerciseOpen, setIsExerciseOpen] = useState(false);
    const [calendarEvents, setCalendarEvents] = useState([]);

    // 건강 기록
    const [healthData, setHealthData] = useState(null);

    // 수면 기록
    const [sleepData, setSleepData] = useState(null);

    // 운동 기록
    const [exerciseData, setExerciseData] = useState([]);

    const handleExerciseUpdate = () => {
        fetchExerciseData();
        fetchCalendarEvents();
    };

    // 날짜 클릭
    const handleDateClick = (info) => {

        setSelectedDate(info.dateStr);

        setIsDetailOpen(true);

        // 다른 날짜를 눌렀을 때
        // 기존 운동 입력 패널은 닫기
        setIsExerciseOpen(false);
    };

    // 건강 기록 조회
    const fetchHealthData = async () => {

        if (!employeeNo || !selectedDate) {
            return;
        }

        try {

            const response =
                await getHealthByDateApi(
                    employeeNo,
                    selectedDate
                );

            setHealthData(
                response.data || null
            );

        } catch (error) {

            console.error(
                "건강 기록 조회 실패:",
                error
            );

            setHealthData(null);
        }
    };


    // 수면 기록 조회
    const fetchSleepData = async () => {

        if (!employeeNo || !selectedDate) {
            return;
        }

        try {

            const response =
                await getSleepByDateApi(
                    employeeNo,
                    selectedDate
                );

            setSleepData(
                response.data || null
            );

        } catch (error) {

            console.error(
                "수면 기록 조회 실패:",
                error
            );

            setSleepData(null);
        }
    };


    // 운동 기록 조회
    const fetchExerciseData = async () => {

        if (!employeeNo || !selectedDate) {
            return;
        }

        try {

            const response = await getExercisesApi(
                employeeNo,
                selectedDate
            );

            setExerciseData(response.data || []);

        } catch (error) {

            console.error(
                "운동 기록 조회 실패:",
                error
            );

            setExerciseData([]);
        }
    };


    // 수면 시간 계산
    const getSleepDuration = () => {

        if (
            !sleepData?.sleepStart ||
            !sleepData?.sleepEnd
        ) {
            return null;
        }

        const start = new Date(sleepData.sleepStart);
        const end = new Date(sleepData.sleepEnd);

        const diffMs = end - start;

        if (diffMs <= 0) {
            return null;
        }

        const totalMinutes = Math.floor(
            diffMs / (1000 * 60)
        );

        const hours = Math.floor(
            totalMinutes / 60
        );

        const minutes = totalMinutes % 60;

        if (minutes === 0) {
            return `${hours}시간`;
        }

        return `${hours}시간 ${minutes}분`;
    };

    // 캘린더 이벤트 조회
    const fetchCalendarEvents = async () => {

        if (!employeeNo) return;

        try {

            const response =
                await getHealthCalendarDatesApi(
                    employeeNo
                );

            const events = response.data.map(item => ({
                start: item.date,
                allDay: true,
                extendedProps: {
                    grade: item.grade
                }
            }));

            setCalendarEvents(events);

        } catch (error) {

            console.error(
                "캘린더 기록 조회 실패:",
                error
            );

            setCalendarEvents([]);
        }
    };

    // 캘린더 진입 시 기록 날짜 조회
    useEffect(() => {

        if (!employeeNo) {
            return;
        }

        fetchCalendarEvents();

    }, [employeeNo]);


    // 날짜 선택 시 상세 기록 조회
    useEffect(() => {

        if (!employeeNo || !selectedDate) {
            return;
        }

        fetchHealthData();
        fetchSleepData();
        fetchExerciseData();

    }, [selectedDate, employeeNo]);

    const getGradeColor = (grade) => {

        switch (grade) {
            case "normal":
                return "#4f8f5b";
            case "interest":
                return "#8ca34a";
            case "caution":
                return "#d49a2a";
            case "warning":
                return "#d56b32";
            case "danger":
                return "#c94b4b";
            default:
                return "#888888";
        }
    };


    return (
        <div className="crud-card calendar-detail">

            <h2>건강 기록 캘린더</h2>

            <FullCalendar
                plugins={[
                    dayGridPlugin,
                    interactionPlugin
                ]}
                initialView="dayGridMonth"
                locale="ko"

                events={calendarEvents}

                eventContent={(eventInfo) => {

                    const grade =
                        eventInfo.event.extendedProps.grade;

                    return (
                        <span
                            style={{
                                color: getGradeColor(grade),
                                fontSize: "18px",
                                fontWeight: "700",
                                lineHeight: "1"
                            }}
                        >
                            ●
                        </span>
                    );
                }}

                dateClick={handleDateClick}

                headerToolbar={{
                    left: "prev",
                    center: "title",
                    right: "next"
                }}
            />

            {isDetailOpen && (
                <div className="health-modal-background">

                    <div className="calendar-modal-layout">

                        {/* 왼쪽: 건강 기록 */}
                        <div className="crud-card calendar-health-panel">

                            <h2>건강 기록</h2>

                            <div className="crud-card-date">
                                {selectedDate}
                            </div>

                            <div className="calendar-detail-grid">

                                {/* 신체 정보 */}
                                <div className="health-main-card">

                                    <h4>신체 정보</h4>

                                    {healthData ? (
                                        <>
                                            <p>
                                                키: {
                                                    healthData.height ?? "-"
                                                } cm
                                            </p>

                                            <p>
                                                몸무게: {
                                                    healthData.weight ?? "-"
                                                } kg
                                            </p>

                                            <p>
                                                BMI: {
                                                    healthData.bmi ?? "-"
                                                }
                                            </p>
                                        </>
                                    ) : (
                                        <p>
                                            저장된 신체 정보가 없습니다.
                                        </p>
                                    )}

                                </div>


                                {/* 운동 */}
                                <div className="health-main-card">

                                    <h4>운동</h4>

                                    {exerciseData.length === 0 ? (
                                        <p>
                                            저장된 운동 기록이 없습니다.
                                        </p>
                                    ) : (
                                        exerciseData.map(
                                            exercise => (

                                                <p
                                                    key={
                                                        exercise.exerciseRecordId
                                                    }
                                                >
                                                    {
                                                        exercise.exerciseName
                                                    }

                                                    {
                                                        exercise.duration > 0 &&
                                                        ` · ${exercise.duration}분`
                                                    }

                                                    {
                                                        exercise.targetCount > 0 &&
                                                        ` · ${exercise.targetCount}회`
                                                    }
                                                </p>

                                            )
                                        )
                                    )}

                                </div>


                                {/* 수면 */}
                                <div className="health-main-card">

                                    <h4>수면</h4>

                                    {sleepData ? (
                                        <>
                                            <p>
                                                수면 시간: {
                                                    getSleepDuration() ?? "-"
                                                }
                                            </p>

                                            {
                                                sleepData.sleepQuality && (
                                                    <p>
                                                        수면 품질: {
                                                            sleepData.sleepQuality
                                                        }
                                                    </p>
                                                )
                                            }
                                        </>
                                    ) : (
                                        <p>
                                            저장된 수면 기록이 없습니다.
                                        </p>
                                    )}

                                </div>


                                {/* 생활 기록 */}
                                <div className="health-main-card">

                                    <h4>생활 기록</h4>

                                    {healthData ? (
                                        <>
                                            <p>
                                                카페인: {
                                                    healthData.caffeineAmount ?? 0
                                                } mg
                                            </p>

                                            <p>
                                                음주: {
                                                    healthData.alcoholAmount ?? 0
                                                } ml
                                            </p>

                                            <p>
                                                흡연: {
                                                    healthData.smokingCount ?? 0
                                                } 개비
                                            </p>
                                        </>
                                    ) : (
                                        <p>
                                            저장된 생활 기록이 없습니다.
                                        </p>
                                    )}

                                </div>

                            </div>

                            <br />

                            <div className="crud-card-buttons">

                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() =>
                                        setIsExerciseOpen(true)
                                    }
                                >
                                    운동 추가 / 수정
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => {
                                        setIsDetailOpen(false);
                                        setIsExerciseOpen(false);
                                    }}
                                >
                                    닫기
                                </button>

                            </div>

                        </div>


                        {/* 오른쪽: 운동 입력 패널 */}
                        {isExerciseOpen && (
                            <div className="crud-card exercise-side-panel">

                                <ExerciseForm
                                    exerciseDate={selectedDate}
                                    employeeNo={employeeNo}
                                    onUpdate={handleExerciseUpdate}
                                    onClose={() =>
                                        setIsExerciseOpen(false)
                                    }
                                />

                            </div>
                        )}

                    </div>

                </div>
            )}

            <br />

            <div className="crud-card-buttons">

                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() =>
                        navigate("/health")
                    }
                >
                    돌아가기
                </button>

            </div>

        </div>
    );
}

export default CalendarDetail;