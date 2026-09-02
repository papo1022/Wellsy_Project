import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import { useNavigate } from "react-router-dom";

function HealthWeekCalendar() {
    const navigate = useNavigate();

    return (
        <div className="health-main-card health-calendar-card">
        
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3>건강 캘린더</h3>

                <button type="button" className="btn btn-primary" onClick={() => navigate("/health/calendar")}>
                    상세보기
                </button>
            </div>

            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridWeek"
                locale="ko"
                height="auto"
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