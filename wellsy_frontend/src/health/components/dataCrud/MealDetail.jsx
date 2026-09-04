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

    const [image, setImage] = useState(null); // 음식 이미지
    const [imagePreview, setImagePreview] = useState(null); // 음식 이미지 미리보기

    const navigate = useNavigate();

    // 수동 음식 분석 버튼 클릭 시 호출되는 함수
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


    // AI 이미지 분석 버튼 클릭 시 호출
    const handleAnalyzeImage = () => {

        if (!image) {
            alert("식사 사진을 선택해주세요.");
            return;
        }

        // 임시 AI 분석 결과
        const result = [
            {
                foodName: "현미밥",
                amountDescription: "1공기",
                calories: 300,
                protein: 6,
                carbohydrate: 65,
                fat: 2
            },
            {
                foodName: "계란후라이",
                amountDescription: "2개",
                calories: 180,
                protein: 12,
                carbohydrate: 1,
                fat: 14
            }
        ];

        setFoodInfos(prev => [
            ...prev,
            ...result
        ]);

        // 분석이 끝난 이미지 초기화
        setImage(null);
        setImagePreview(null);
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
  
    // 식사 데이터 제출 시 호출되는 함수
    const handleSubmitMeal = () => {
        const mealData = {
            employeeNo: 1,
            mealType,
            mealItems: foodInfos
        };

        fetch("http://localhost:8006/wellsy/meal", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(mealData)
        })
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error("식사 저장에 실패했습니다.");
            }
        })

        .then(data => {
            console.log("Meal saved successfully:", data);
            alert("식사가 성공적으로 저장되었습니다.");
        })

        .catch(error => {
            console.error("Error:", error);
            alert("식사 저장에 실패했습니다.");
        });

    };

    // 사진 업로드 시 호출되는 함수
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    // 입력 모드 변경 시 호출되는 함수
    const changeInputMode = (mode) => {
        setInputMode(mode);

        setFoodName("");
        setAmountDescription("");

        setImage(null);
        setImagePreview(null);

    };

    // 식사 모드 변경시 호출
    const changeMealType = (type) => {

        if (foodInfos.length > 0) {
            if(window.confirm("식사 유형을 변경하면 현재 입력 중인 내용이 초기화됩니다. 계속하시겠습니까?") === false) {
                return;
            }
        }

        setMealType(type);

        // 입력 방식 초기화
        setInputMode(null);

        // 직접 입력값 초기화
        setFoodName("");
        setAmountDescription("");

        // 분석 대기열 초기화
        setFoodInfos([]);

        // 이미지 초기화
        setImage(null);
        setImagePreview(null);
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
                    onClick={() => changeMealType("아침")}
                >
                    아침
                </button>

                <button
                    type="button"
                    className={mealType === "점심" ? "active" : ""}
                    onClick={() => changeMealType("점심")}
                >
                    점심
                </button>

                <button
                    type="button"
                    className={mealType === "저녁" ? "active" : ""}
                    onClick={() => changeMealType("저녁")}
                >
                    저녁
                </button>

                <button
                    type="button"
                    className={mealType === "간식" ? "active" : ""}
                    onClick={() => changeMealType("간식")}
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

            {inputMode === "auto" && (
                <div
                    className="crud-card"
                    style={{ width: "100%" }}
                >
                    <div className="crud-card-input">
                        <label>식사 사진</label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>

                    {imagePreview && (
                        <div className="meal-image-preview">
                            <img
                                src={imagePreview}
                                alt="식사 사진 미리보기"
                            />
                        </div>
                    )}

                    <div className="crud-card-buttons">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleAnalyzeImage}
                        >
                            AI 분석하기
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