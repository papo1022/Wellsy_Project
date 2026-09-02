import "../../../health/styles/Card.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import "../../styles/CrudForm.css";

function CalendarDetail() {

    const healthData = {
        height: 175,
        weight: 70,
        bmi: 22.9,
        systolicBp: 120,
        diastolicBp: 80,
        bloodSugar: 95,
        sleepTime: "7시간 30분",
        caffeine: 200,
        alcohol: 0,
        smoking: 0
    };

    const navigate = useNavigate();

    const [selectedDate, setSelectedDate] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    // 날짜 클릭
    const handleDateClick = (info) => {
        setSelectedDate(info.dateStr);
        setIsDetailOpen(true);
    };

    return (
        <div className="crud-card calendar-detail">

            <h2>건강 기록 캘린더</h2>

            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                locale="ko"
                dateClick={handleDateClick}
                height="auto"
            />

            {isDetailOpen && (
                <div className="health-modal-background">
                    <div className="health-modal-content">

                        <div className="crud-card"
                            style={{ width: "100%", maxHeight: "80vh", overflowY: "auto" }}>
                            <h2>건강 기록</h2>

                            <div className="crud-card-date">
                                {selectedDate}
                            </div>

                            <div className="calendar-detail">

                                <div className="calendar-detail-grid">

                                    <div className="health-main-card">
                                        <h4>신체 정보</h4>

                                        <p>키: {healthData.height} cm</p>
                                        <p>몸무게: {healthData.weight} kg</p>
                                        <p>BMI: {healthData.bmi}</p>
                                    </div>

                                    <div className="health-main-card">
                                        <h4>건강 수치</h4>

                                        <p>
                                            혈압: {healthData.systolicBp} /
                                            {healthData.diastolicBp} mmHg
                                        </p>

                                        <p>
                                            혈당: {healthData.bloodSugar} mg/dL
                                        </p>
                                    </div>

                                    <div className="health-main-card">
                                        <h4>수면</h4>

                                        <p>{healthData.sleepTime}</p>
                                    </div>

                                    <div className="health-main-card">
                                        <h4>생활 기록</h4>

                                        <p>카페인: {healthData.caffeine} mg</p>
                                        <p>음주: {healthData.alcohol} ml</p>
                                        <p>흡연: {healthData.smoking} 개비</p>
                                    </div>

                                    <br />

                                </div>

                            </div>

                            <div className="crud-card-buttons">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setIsDetailOpen(false)}
                                >
                                    닫기
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            )}

            <div className="crud-card-buttons">
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setIsDetailOpen(false)}
                >
                    돌아가기
                </button>
            </div>

        </div>
    );
}

export default CalendarDetail;