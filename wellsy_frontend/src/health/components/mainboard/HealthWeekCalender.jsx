import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";

import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getHealthCalendarDatesApi
} from "../../api/healthApi";

function HealthWeekCalendar() {

    const navigate = useNavigate();

    const token = sessionStorage.getItem("token");

    const employeeNo = token
        ? jwtDecode(token).employeeNo
        : null;

    const [calendarEvents, setCalendarEvents] = useState([]);

    useEffect(() => {

        if (!employeeNo) {
            return;
        }

        fetchCalendarEvents();

    }, [employeeNo]);

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


    const fetchCalendarEvents = async () => {

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
                "주간 건강 기록 조회 실패:",
                error
            );

            setCalendarEvents([]);
        }
    };


    return (
        <div className="health-main-card health-calendar-card">

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >
                <h3>건강 / 운동 캘린더</h3>

                <button
                    type="button"
                    className="detail-button"
                    onClick={() =>
                        navigate("/health/calendar")
                    }
                >
                    상세보기
                </button>
            </div>

            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridWeek"
                locale="ko"
                height="auto"

                events={calendarEvents}

                eventContent={(eventInfo) => {

                    const grade =
                        eventInfo.event.extendedProps.grade;

                    return (
                        <span
                            style={{
                                color: getGradeColor(grade),
                                fontSize: "20px",
                                fontWeight: "700",
                                lineHeight: "1"
                            }}
                        >
                            ●
                        </span>
                    );
                }}

                headerToolbar={{
                    left: "",
                    center: "title",
                    right: ""
                }}
            />

        </div>
    );
}

export default HealthWeekCalendar;