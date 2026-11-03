import "../../../health/styles/Card.css";
import { useState } from "react";
import { saveSleepApi } from "../../api/sleepApi";

function SleepForm({ onClose, onHealthUpdate, employeeNo }) {

    const [sleepStart, setSleepStart] = useState("");
    const [sleepEnd, setSleepEnd] = useState("");

    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

    const todayText = new Date().toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    const handleSubmit = async () => {

        if (!sleepStart || !sleepEnd) {
            alert("수면 시작 시간과 종료 시간을 입력해주세요.");
            return;
        }

        if (rating === 0) {
            alert("수면 품질을 선택해주세요.");
            return;
        }

        try {

            const now = new Date();

            const year = now.getFullYear();
            const month = String(
                now.getMonth() + 1
            ).padStart(2, "0");

            const day = String(
                now.getDate()
            ).padStart(2, "0");

            const today = `${year}-${month}-${day}`;

            let sleepStartDateTime =
                `${today}T${sleepStart}:00`;

            let sleepEndDateTime =
                `${today}T${sleepEnd}:00`;

            /*
                종료 시간이 시작 시간보다 빠르면
                자정을 넘겨 잔 것으로 판단

                예)
                시작 23:30
                종료 07:00
            */
            if (sleepEnd <= sleepStart) {

                const tomorrow = new Date(now);

                tomorrow.setDate(
                    tomorrow.getDate() + 1
                );

                const tomorrowYear =
                    tomorrow.getFullYear();

                const tomorrowMonth =
                    String(
                        tomorrow.getMonth() + 1
                    ).padStart(2, "0");

                const tomorrowDay =
                    String(
                        tomorrow.getDate()
                    ).padStart(2, "0");

                const tomorrowText =
                    `${tomorrowYear}-${tomorrowMonth}-${tomorrowDay}`;

                sleepEndDateTime =
                    `${tomorrowText}T${sleepEnd}:00`;
            }

            const sleepData = {
                employeeNo: employeeNo,
                sleepStart: sleepStartDateTime,
                sleepEnd: sleepEndDateTime,
                sleepQuality: rating,
                memo: null
            };

            await saveSleepApi(sleepData);

            alert("수면 기록이 저장되었습니다.");

            if (onHealthUpdate) {
                onHealthUpdate();
            }

            if (onClose) {
                onClose();
            }

        } catch (error) {

            console.error(
                "수면 기록 저장 실패:",
                error
            );

            alert(
                "수면 기록 저장에 실패했습니다."
            );
        }
    };

    return (
        <div className="crud-card">

            <h2>수면 정보 기록</h2>

            <div className="crud-card-date">
                {todayText}
            </div>

            <div className="crud-card-input">

                <label>수면 시작 시간</label>

                <div className="crud-card-input-value">

                    <input
                        type="time"
                        value={sleepStart}
                        onChange={
                            e =>
                                setSleepStart(
                                    e.target.value
                                )
                        }
                    />

                </div>
            </div>

            <div className="crud-card-input">

                <label>수면 종료 시간</label>

                <div className="crud-card-input-value">

                    <input
                        type="time"
                        value={sleepEnd}
                        onChange={
                            e =>
                                setSleepEnd(
                                    e.target.value
                                )
                        }
                    />

                </div>
            </div>

            <div className="crud-card-input">

                <label>수면 품질</label>

                <div
                    className="crud-card-input-value"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px"
                    }}
                >

                    {[...Array(5)].map(
                        (_, index) => {

                            const starValue =
                                index + 1;

                            const isFilled =
                                starValue <=
                                (
                                    hoverRating ||
                                    rating
                                );

                            return (
                                <button
                                    key={index}
                                    type="button"

                                    onClick={() =>
                                        setRating(
                                            starValue
                                        )
                                    }

                                    onMouseEnter={() =>
                                        setHoverRating(
                                            starValue
                                        )
                                    }

                                    onMouseLeave={() =>
                                        setHoverRating(0)
                                    }

                                    style={{
                                        background:
                                            "none",
                                        border:
                                            "none",
                                        cursor:
                                            "pointer",
                                        padding: 0,
                                        display:
                                            "inline-flex"
                                    }}
                                >

                                    <svg
                                        width="28"
                                        height="28"
                                        viewBox="0 0 24 24"

                                        fill={
                                            isFilled
                                                ? "#FFD700"
                                                : "none"
                                        }

                                        stroke={
                                            isFilled
                                                ? "#FFD700"
                                                : "#CCCCCC"
                                        }

                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >

                                        <polygon
                                            points="
                                            12 2
                                            15.09 8.26
                                            22 9.27
                                            17 14.14
                                            18.18 21.02
                                            12 17.77
                                            5.82 21.02
                                            7 14.14
                                            2 9.27
                                            8.91 8.26
                                            12 2
                                            "
                                        />

                                    </svg>

                                </button>
                            );
                        }
                    )}

                </div>
            </div>

            <div className="crud-card-buttons">

                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onClose}
                >
                    취소
                </button>

                &nbsp;&nbsp;

                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSubmit}
                >
                    저장
                </button>

            </div>

        </div>
    );
}

export default SleepForm;