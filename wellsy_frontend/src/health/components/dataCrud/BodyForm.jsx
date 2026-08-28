import { useState } from "react";
import "../../styles/CrudForm.css";

function BodyForm({ onClose }) {

    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");

    const handleSubmit = (e) => {

        if(height === "" || weight === "") {
            alert("키와 몸무게를 모두 입력해주세요.");
            return;
        }

        console.log("키:", Number(height));
        console.log("몸무게:", Number(weight));
        e.preventDefault();
        
        alert("신체 정보가 저장되었습니다.");
        onClose();
    };

    return (
        <div className="crud-card">

            <h2>신체 정보 기록</h2>

            <div className="crud-card-date">
                2026년 8월 26일
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