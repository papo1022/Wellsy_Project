import "../../../health/styles/Card.css";
import { useNavigate } from "react-router-dom";
function SleepTime() {
    const sleep = {
        duration: 8.2,
        quality: 4,
    };

    const navigate = useNavigate();

    return (
        <div className="health-card sleep-card"
            onClick={() => navigate("/health/sleep")}>
            <h3>수면 기록</h3>

            <div className="sleep-content">

                {/* 왼쪽: 기존 수면 정보 */}
                <div className="sleep-info">
                    <div className="health-card-item">
                        <span>수면 시간</span>
                        <strong>{sleep.duration}</strong>
                        <small>시간</small>
                    </div>

                    <div className="health-card-item">
                        <span>수면 품질</span>
                        <strong>{sleep.quality}</strong>
                        <small>/ 5</small>
                    </div>
                </div>

                {/* 오른쪽: 추후 그래프 영역 */}
                <div className="sleep-graph">
                </div>

            </div>
        </div>
    );
}

export default SleepTime;