import { useState } from "react";
import "../../styles/CrudForm.css";

function BodyForm({ onClose, onHealthUpdate, employeeNo }) {

    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");

    const todayText = new Date().toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (height === "" || weight === "") {
            alert("키와 몸무게를 모두 입력해주세요.");
            return;
        }

        const today = new Date().toISOString().split("T")[0];

        const healthData = {
            employeeNo: employeeNo,
            recordDate: today,
            height: Number(height),
            weight: Number(weight)
        };

        fetch("http://localhost:8006/wellsy/health", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(healthData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("신체 정보 저장 실패");
                }

                return response.json();
            })
            .then(data => {
                console.log("저장 결과:", data);

                onHealthUpdate();

                alert("신체 정보가 저장되었습니다.");
                onClose();
            })
            .catch(error => {
                console.error(error);
                alert("신체 정보 저장 중 오류가 발생했습니다.");
            });
    };

    return (
        <div className="crud-card">

            <h2>신체 정보 기록</h2>

            <div className="crud-card-date">
                {todayText}
            </div>

            <div className="crud-card-input">
                <label>키</label>

                <div className="crud-card-input-value">
                    <input
                        type="number"
                        value={height}
                        min={50}
                        max={300}
                        step={0.01}
                        onChange={(e) => setHeight(e.target.value)}
                    />
                    <span>cm</span>
                </div>
            </div>

            <div className="crud-card-input">
                <label>몸무게</label>

                <div className="crud-card-input-value">
                    <input
                        type="number"
                        value={weight}
                        min={10}
                        max={300}
                        step={0.01}
                        onChange={(e) => setWeight(e.target.value)}
                    />
                    <span>kg</span>
                </div>
            </div>

            <div className="crud-card-buttons">
                <button type="button" className="btn btn-secondary" onClick={onClose}>취소</button>&nbsp;&nbsp;
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>저장</button>
            </div>

        </div>
    );
}

export default BodyForm;