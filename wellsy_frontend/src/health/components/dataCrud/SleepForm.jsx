import "../../../health/styles/Card.css";
import { useState } from "react";

function SleepForm({ onClose }) {
    const [sleepStart, setSleepStart] = useState("");
    const [sleepEnd, setSleepEnd] = useState("");

    // 별점을 위한 상태 추가 (클릭한 값, 호버 중인 값)
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault(); // 이벤트 전파 막기를 상단으로 이동

        if (sleepStart === "" || sleepEnd === "") {
            alert("수면 시작 시간과 종료 시간을 모두 입력해주세요.");
            return;
        }

        if (rating === 0) {
            alert("수면 품질(별점)을 선택해주세요.");
            return;
        }

        console.log("수면 시작 시간:", sleepStart);
        console.log("수면 종료 시간:", sleepEnd);
        console.log("수면 품질(별점):", rating);

        alert("수면 정보가 저장되었습니다.");
        onClose();
    };

    return (
        <div className="crud-card">
            <h2>수면 정보 기록</h2>

            <div className="crud-card-date">
                2026년 8월 26일
            </div>

            <div className="crud-card-input">
                <label>수면 시작 시간</label>
                <div className="crud-card-input-value">
                    <input
                        type="time"
                        value={sleepStart}
                        onChange={(e) => setSleepStart(e.target.value)}
                    />
                </div>
            </div>

            <div className="crud-card-input">
                <label>수면 종료 시간</label>
                <div className="crud-card-input-value">
                    <input
                        type="time"
                        value={sleepEnd}
                        onChange={(e) => setSleepEnd(e.target.value)}
                    />
                </div>
            </div>

            {/* 수면 품질 별점 컴포넌트 통합 */}
            <div className="crud-card-input">
                <label>수면 품질</label>
                <div className="crud-card-input-value" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {[...Array(5)].map((_, index) => {
                        const starValue = index + 1;
                        const isFilled = starValue <= (hoverRating || rating);

                        return (
                            <button
                                key={index}
                                type="button"
                                onClick={() => setRating(starValue)}
                                onMouseEnter={() => setHoverRating(starValue)}
                                onMouseLeave={() => setHoverRating(0)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: 0,
                                    display: 'inline-flex'
                                }}
                            >
                                <svg
                                    width="28"
                                    height="28"
                                    viewBox="0 0 24 24"
                                    fill={isFilled ? "#FFD700" : "none"}
                                    stroke={isFilled ? "#FFD700" : "#CCCCCC"}
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    style={{ transition: 'color 0.1s, fill 0.1s' }}
                                >
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                </svg>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="crud-card-buttons">
                <button type="button" className="btn btn-secondary" onClick={onClose}>취소</button>&nbsp;&nbsp;
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>저장</button>
            </div>
        </div>
    );
}

export default SleepForm;
