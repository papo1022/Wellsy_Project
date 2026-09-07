import { useState } from "react";
import "../../../health/styles/Card.css";
import SleepForm from "../dataCrud/SleepForm";

function SleepTime({ sleepData, onHealthUpdate, employeeNo }) {
    const [isOpen, setIsOpen] = useState(false);

    let duration = "-";
    let sleepStartText = "-";
    let sleepEndText = "-";
    let sleepStartAngle = 0;
    let sleepDurationAngle = 0;

    if (sleepData?.sleepStart && sleepData?.sleepEnd) {

        const start = new Date(sleepData.sleepStart);
        const end = new Date(sleepData.sleepEnd);

        const diffMs = end - start;
        const diffHours = diffMs / (1000 * 60 * 60);

        duration = diffHours.toFixed(1);

        sleepStartText =
            `${String(start.getHours()).padStart(2, "0")}:` +
            `${String(start.getMinutes()).padStart(2, "0")}`;

        sleepEndText =
            `${String(end.getHours()).padStart(2, "0")}:` +
            `${String(end.getMinutes()).padStart(2, "0")}`;

        // 하루 24시간 = 360도
        sleepStartAngle =
            (
                start.getHours() +
                start.getMinutes() / 60
            ) / 24 * 360;

        sleepDurationAngle =
            diffHours / 24 * 360;
    }


    if (sleepData?.sleepStart && sleepData?.sleepEnd) {
        const start = new Date(sleepData.sleepStart);
        const end = new Date(sleepData.sleepEnd);

        const diffMs = end - start;
        duration = (diffMs / (1000 * 60 * 60)).toFixed(1);
    }

    return (
        <>
            <div className="health-main-card sleep-card"
                onClick={() => setIsOpen(true)}>
                <h3>수면 기록</h3>

                <div className="sleep-content">

                    {/* 왼쪽: 기존 수면 정보 */}
                    <div className="sleep-info">
                        <div className="health-card-item">
                            <span>수면 품질</span>
                            <strong>{sleepData?.sleepQuality ?? "-"}</strong>
                            <small>/ 5</small>
                        </div>
                    </div>

                    {/* 오른쪽: 추후 그래프 영역 */}
                    <div className="sleep-clock-wrapper">

                        <div
                            className="sleep-clock"
                            style={{
                                background: sleepData
                                    ? `conic-gradient(
                    from ${sleepStartAngle}deg,
                    var(--color-primary) 0deg,
                    var(--color-primary) ${sleepDurationAngle}deg,
                    #eeeeee ${sleepDurationAngle}deg,
                    #eeeeee 360deg
                )`
                                    : "#eeeeee"
                            }}
                        >
                            <div className="sleep-clock-inner">
                                <strong>
                                    {duration !== "-"
                                        ? `${duration}시간`
                                        : "-"}
                                </strong>

                                <span>수면</span>
                            </div>
                        </div>

                        <div className="sleep-clock-info">
                            <span>
                                취침 <strong>{sleepStartText}</strong>
                            </span>

                            <span>
                                기상 <strong>{sleepEndText}</strong>
                            </span>
                        </div>

                    </div>

                </div>
            </div>

            {
                isOpen && (
                    <div className="health-modal-background">
                        <div className="health-modal-content">
                            <SleepForm onClose={() => setIsOpen(false)} onHealthUpdate={onHealthUpdate} employeeNo={employeeNo} />
                        </div>
                    </div>
                )
            }
        </>
    );
}

export default SleepTime;