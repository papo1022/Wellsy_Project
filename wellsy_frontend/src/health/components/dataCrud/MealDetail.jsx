import "../../../health/styles/Card.css";
import "../../styles/CrudForm.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function MealDetail() {

    const [mealType, setMealType] = useState("BREAKFAST");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            mealType
        });
        alert("식사 정보가 저장되었습니다.");
    }

    return (
        <div className="crud-card meal-detail">
            <h2>식사 기록</h2>

            <div className="crud-card-date">
                2026년 8월 28일
            </div>

            <div className="meal-tabs">
                <button
                    type="button"
                    className={mealType === "BREAKFAST" ? "active" : ""}
                    onClick={() => setMealType("BREAKFAST")}
                >
                    아침
                </button>

                <button
                    type="button"
                    className={mealType === "LUNCH" ? "active" : ""}
                    onClick={() => setMealType("LUNCH")}
                >
                    점심
                </button>

                <button
                    type="button"
                    className={mealType === "DINNER" ? "active" : ""}
                    onClick={() => setMealType("DINNER")}
                >
                    저녁
                </button>

                <button
                    type="button"
                    className={mealType === "SNACK" ? "active" : ""}
                    onClick={() => setMealType("SNACK")}
                >
                    간식
                </button>
            </div>

            <div className="meal-input-method">
                <button type="button">AI 자동 입력</button>
                <button type="button">직접 입력</button>
            </div>

            <div className="crud-card-buttons">
                <button type="button" className="btn btn-secondary" onClick={() => navigate("/health")}>돌이가기</button>
            </div>
        </div>
    );
}

export default MealDetail;