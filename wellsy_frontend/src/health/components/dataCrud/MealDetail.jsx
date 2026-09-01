import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../health/styles/Card.css";
import "../../styles/CrudForm.css";

function MealDetail() {

    const [mealType, setMealType] = useState("아침"); // 아침 ~ 간식
    const [inputMode, setInputMode] = useState(null); // null, "auto", "manual"

    const [foodName, setFoodName] = useState(""); // 음식명
    const [amountDescription, setAmountDescription] = useState(""); // 섭취량 (예: 100g, 1공기, 2개)

    const [foodInfos, setFoodInfos] = useState([]); // 음식 정보 배열
    const navigate = useNavigate();

    // 음식 분석 버튼 클릭 시 호출되는 함수
    const handleAnalyzeFood = () => {
        if (!foodName.trim()) {
            alert("음식명을 입력해주세요.");
            return;
        }

        const result = [
            {
                foodName,
                amountDescription,
                calories: 165,
                protein: 31,
                carbohydrate: 0,
                fat: 3.6
            }
        ];

        setFoodInfos(prev => [...prev, ...result]);

        // 입력 필드 초기화
        setFoodName("");
        setAmountDescription("");
    };

    // 음식 정보 변경 시 호출되는 함수
    const handleFoodInfoChange = (index, field, value) => {

        setFoodInfos(prev =>
            prev.map((food, i) =>
                i === index
                    ? { ...food, [field]: value }
                    : food
            )
        );
    };

    // 음식 정보 삭제 시 호출되는 함수
    const handleDeleteFoodInfo = (index) => {
        setFoodInfos(prev =>
            prev.filter((_, i) => i !== index));
    };

    const handleSubmitMeal = () => {
        if (foodInfos.length === 0) {
            alert("추가된 음식이 없습니다.");
            return;
        }

        const mealData = {
            mealType,
            mealItems: foodInfos
        };

        console.log("저장할 식사 데이터:", mealData);

    }

    // 입력 모드 변경 시 호출되는 함수
    const changeInputMode = (mode) => {
        setInputMode(mode);

        setFoodName("");
        setAmountDescription("");
        setFoodInfos([]);
    };

    return (
        <div className="crud-card meal-detail">
            <h2>식사 기록</h2>

            <div className="crud-card-date">
                2026년 8월 28일
            </div>

            <div className="meal-tabs">
                <button
                    type="button"
                    className={mealType === "아침" ? "active" : ""}
                    onClick={() => setMealType("아침")}
                >
                    아침
                </button>

                <button
                    type="button"
                    className={mealType === "점심" ? "active" : ""}
                    onClick={() => setMealType("점심")}
                >
                    점심
                </button>

                <button
                    type="button"
                    className={mealType === "저녁" ? "active" : ""}
                    onClick={() => setMealType("저녁")}
                >
                    저녁
                </button>

                <button
                    type="button"
                    className={mealType === "간식" ? "active" : ""}
                    onClick={() => setMealType("간식")}
                >
                    간식
                </button>
            </div>

            <div className="meal-input-method">
                <button
                    type="button"
                    className={inputMode === "auto" ? "active" : ""}
                    onClick={() => changeInputMode("auto")}
                >
                    AI 자동 입력
                </button>

                <button
                    type="button"
                    className={inputMode === "manual" ? "active" : ""}
                    onClick={() => changeInputMode("manual")}
                >
                    직접 입력
                </button>
            </div>

            {inputMode === "manual" && (
                <div
                    className="meal-manual-input"
                    style={{ width: "100%" }}
                >
                    <div className="crud-card-input">
                        <label>음식명</label>

                        <div className="crud-card-input-value">
                            <input
                                type="text"
                                value={foodName}
                                onChange={(e) => setFoodName(e.target.value)}
                                placeholder="예: 닭가슴살"
                            />
                        </div>
                    </div>

                    <div className="crud-card-input">
                        <label>섭취량</label>

                        <div className="crud-card-input-value">
                            <input
                                type="text"
                                value={amountDescription}
                                onChange={(e) => setAmountDescription(e.target.value)}
                                placeholder="예: 100g, 1공기, 2개"
                            />
                        </div>
                    </div>

                    <div className="crud-card-buttons">
                        <button
                            type="button"
                            className="btn btn-primary btn-analyze"
                            onClick={handleAnalyzeFood}
                        >
                            분석하기
                        </button>
                    </div>
                </div>
            )}

            {foodInfos.length > 0 && (
                <div>
                    <h3>AI 분석 결과</h3>

                    {foodInfos.map((food, index) => (
                        <div
                            className="crud-card food-info-card"
                            key={index}
                        >
                            {/* 음식 기본 정보 */}
                            <div className="food-info-row">
                                <div className="crud-card-input">
                                    <label>음식명</label>
                                    <div className="crud-card-input-value">
                                        <input
                                            type="text"
                                            value={food.foodName}
                                            onChange={(e) =>
                                                handleFoodInfoChange(
                                                    index,
                                                    "foodName",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="crud-card-input">
                                    <label>섭취량</label>
                                    <div className="crud-card-input-value">
                                        <input
                                            type="text"
                                            value={food.amountDescription}
                                            onChange={(e) =>
                                                handleFoodInfoChange(
                                                    index,
                                                    "amountDescription",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* 영양 정보 */}
                            <div className="food-info-row nutrition-row">
                                <div className="crud-card-input">
                                    <label>칼로리</label>
                                    <div className="crud-card-input-value">
                                        <input
                                            type="number"
                                            value={food.calories}
                                            onChange={(e) =>
                                                handleFoodInfoChange(
                                                    index,
                                                    "calories",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <span>kcal</span>
                                    </div>
                                </div>

                                <div className="crud-card-input">
                                    <label>단백질</label>
                                    <div className="crud-card-input-value">
                                        <input
                                            type="number"
                                            value={food.protein}
                                            onChange={(e) =>
                                                handleFoodInfoChange(
                                                    index,
                                                    "protein",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <span>g</span>
                                    </div>
                                </div>

                                <div className="crud-card-input">
                                    <label>탄수화물</label>
                                    <div className="crud-card-input-value">
                                        <input
                                            type="number"
                                            value={food.carbohydrate}
                                            onChange={(e) =>
                                                handleFoodInfoChange(
                                                    index,
                                                    "carbohydrate",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <span>g</span>
                                    </div>
                                </div>

                                <div className="crud-card-input">
                                    <label>지방</label>
                                    <div className="crud-card-input-value">
                                        <input
                                            type="number"
                                            value={food.fat}
                                            onChange={(e) =>
                                                handleFoodInfoChange(
                                                    index,
                                                    "fat",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <span>g</span>
                                    </div>
                                </div>
                            </div>

                            <div className="crud-card-buttons">
                                <button
                                    type="button"
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDeleteFoodInfo(index)}
                                >
                                    삭제
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="crud-card-buttons">
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSubmitMeal}
                >
                    저장하기
                </button>
                &nbsp;&nbsp;
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate("/health")}
                >
                    돌아가기
                </button>
            </div>
        </div>
    );
}
export default MealDetail;