import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../../../health/styles/Card.css";
import {
    saveMealApi,
    selectTodayMealApi,
    analyzeMealTextApi,
    analyzeMealImageApi
} from "../../api/mealApi";
import "../../styles/CrudForm.css";

function MealDetail() {
    const token = sessionStorage.getItem("token");

    const employeeNo = token
        ? jwtDecode(token).employeeNo
        : null;


    const [mealType, setMealType] = useState("아침");
    const [inputMode, setInputMode] = useState(null);

    const [foodName, setFoodName] = useState("");
    const [amountDescription, setAmountDescription] = useState("");

    // 현재 입력 중이며 아직 DB에 저장되지 않은 음식
    const [foodInfos, setFoodInfos] = useState([]);

    // DB에 저장된 오늘 전체 영양소 합계
    const [todayNutrition, setTodayNutrition] = useState({
        calories: 0,
        protein: 0,
        carbohydrate: 0,
        fat: 0
    });

    // DB에 저장된 오늘 식사 기록
    const [todayMeals, setTodayMeals] = useState([]);
    const [deletedMealItemIds, setDeletedMealItemIds] = useState([]);

    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const navigate = useNavigate();

    const todayText = new Date().toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    const fetchTodayMeals = async () => {

        if (!employeeNo) {
            console.error("employeeNo가 없습니다.");
            return;
        }

        try {
            const response = await selectTodayMealApi(employeeNo);

            setTodayMeals(response.data.meals || []);
            setTodayNutrition(
                response.data.totalNutrition || {
                    calories: 0,
                    protein: 0,
                    carbohydrate: 0,
                    fat: 0
                }
            );

        } catch (error) {
            console.error(
                "오늘 식사 조회 오류:",
                error
            );
        }
    };

    useEffect(() => {
        fetchTodayMeals();
    }, []);

    // 현재 선택한 식사 유형의 DB 기록만 추출
    const selectedMeals = todayMeals.filter(
        meal => meal.mealType === mealType
    );

    const handleAnalyzeFood = async () => {

        if (!foodName.trim()) {
            alert("음식명을 입력해주세요.");
            return;
        }

        if (!amountDescription.trim()) {
            alert("섭취량을 입력해주세요.");
            return;
        }

        try {

            const response = await analyzeMealTextApi(
                foodName,
                amountDescription
            );

            const result = response.data;

            setFoodInfos(prev => [
                ...prev,
                {
                    foodName: result.foodName ?? foodName,
                    amountDescription:
                        result.amountDescription ?? amountDescription,
                    calories: result.calories ?? 0,
                    protein: result.protein ?? 0,
                    carbohydrate: result.carbohydrate ?? 0,
                    fat: result.fat ?? 0
                }
            ]);

            setFoodName("");
            setAmountDescription("");

        } catch (error) {

            console.error("AI 음식 분석 실패:", error);

            alert("음식 분석에 실패했습니다.");
        }
    };

    // AI 이미지 분석
    const handleAnalyzeImage = async () => {

        if (!image) {
            alert("식사 사진을 선택해주세요.");
            return;
        }

        try {

            const response = await analyzeMealImageApi(image);

            const foods = response.data?.foods || [];

            if (foods.length === 0) {
                alert("사진에서 음식 정보를 찾지 못했습니다.");
                return;
            }

            setFoodInfos(prev => [
                ...prev,
                ...foods
            ]);

            setImage(null);
            setImagePreview(null);

        } catch (error) {

            console.error(
                "AI 식사 사진 분석 실패:",
                error
            );

            alert("식사 사진 분석에 실패했습니다.");
        }
    };

    // 새로 분석한 음식 정보 수정
    const handleFoodInfoChange = (index, field, value) => {
        setFoodInfos(prev =>
            prev.map((food, i) =>
                i === index
                    ? { ...food, [field]: value }
                    : food
            )
        );
    };

    // 새로 분석한 음식 삭제
    const handleDeleteFoodInfo = index => {
        setFoodInfos(prev =>
            prev.filter((_, i) => i !== index)
        );
    };

    // DB에 저장된 음식 정보 수정
    const handleSavedItemChange = (
        mealRecordId,
        mealItemId,
        field,
        value
    ) => {

        setTodayMeals(prevMeals =>
            prevMeals.map(meal => {

                if (meal.mealRecordId !== mealRecordId) {
                    return meal;
                }

                return {
                    ...meal,
                    items: meal.items.map(item =>
                        item.mealItemId === mealItemId
                            ? {
                                ...item,
                                [field]: value
                            }
                            : item
                    )
                };
            })
        );
    };

    // DB에 저장된 음식 삭제
    const handleSavedItemDelete = (
        mealRecordId,
        mealItemId
    ) => {

        setDeletedMealItemIds(prev => [
            ...prev,
            mealItemId
        ]);

        setTodayMeals(prevMeals =>
            prevMeals.map(meal => {

                if (meal.mealRecordId !== mealRecordId) {
                    return meal;
                }

                return {
                    ...meal,
                    items: meal.items.filter(
                        item =>
                            item.mealItemId !== mealItemId
                    )
                };
            })
        );
    };

    // 식사 저장
    const handleSubmitMeal = async () => {

        try {

            // 현재 선택된 끼니의 기존 DB 음식
            const savedItems = todayMeals
                .filter(
                    meal =>
                        meal.mealType === mealType
                )
                .flatMap(
                    meal => meal.items || []
                );

            // 기존 음식 + 새 음식
            const allMealItems = [
                ...savedItems,
                ...foodInfos
            ];

            const mealData = {
                employeeNo: employeeNo,
                mealType: mealType,
                mealItems: allMealItems,
                deletedMealItemIds:
                    deletedMealItemIds
            };

            await saveMealApi(mealData);

            alert("식사 기록이 저장되었습니다.");

            // 신규 입력 초기화
            setFoodInfos([]);

            // 삭제 목록 초기화
            setDeletedMealItemIds([]);

            setFoodName("");
            setAmountDescription("");

            // DB 다시 조회
            await fetchTodayMeals();

        } catch (error) {

            console.error(
                "식사 저장 실패:",
                error
            );

            alert("식사 기록 저장에 실패했습니다.");
        }
    };

    // 사진 업로드
    const handleImageChange = e => {
        const file = e.target.files[0];

        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    // 입력 모드 변경
    const changeInputMode = mode => {
        setInputMode(mode);

        setFoodName("");
        setAmountDescription("");

        setImage(null);
        setImagePreview(null);
    };

    // 아침 / 점심 / 저녁 / 간식 변경
    const changeMealType = type => {
        if (mealType === type) {
            return;
        }

        if (foodInfos.length > 0) {
            const confirmed = window.confirm(
                "식사 유형을 변경하면 현재 입력 중인 내용이 초기화됩니다. 계속하시겠습니까?"
            );

            if (!confirmed) {
                return;
            }
        }

        setMealType(type);
        setInputMode(null);
        setFoodName("");
        setAmountDescription("");
        setFoodInfos([]);
        setImage(null);
        setImagePreview(null);
    };

    return (
        <div className="crud-card meal-detail">
            <h2>식사 기록</h2>

            <div className="crud-card-date">
                {todayText}
            </div>

            {/* 오늘 전체 영양소 합계 */}
            <div className="meal-summary">
                <div className="meal-summary-card">
                    <span>칼로리</span>
                    <strong>{todayNutrition.calories ?? 0}</strong>
                    <small> kcal</small>
                </div>

                <div className="meal-summary-card">
                    <span>탄수화물</span>
                    <strong>{todayNutrition.carbohydrate ?? 0}</strong>
                    <small> g</small>
                </div>

                <div className="meal-summary-card">
                    <span>단백질</span>
                    <strong>{todayNutrition.protein ?? 0}</strong>
                    <small> g</small>
                </div>

                <div className="meal-summary-card">
                    <span>지방</span>
                    <strong>{todayNutrition.fat ?? 0}</strong>
                    <small> g</small>
                </div>
            </div>

            {/* 식사 유형 선택 */}
            <div className="meal-tabs">
                {[
                    "아침",
                    "점심",
                    "저녁",
                    "간식"
                ].map(type => (
                    <button
                        key={type}
                        type="button"
                        className={mealType === type ? "active" : ""}
                        onClick={() => changeMealType(type)}
                    >
                        {type}
                    </button>
                ))}
            </div>

            {/* 입력 방식 */}
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

            {/* 직접 입력 */}
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
                                onChange={e => setFoodName(e.target.value)}
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
                                onChange={e => setAmountDescription(e.target.value)}
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

            {/* AI 이미지 입력 */}
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

            {/* 새로 분석한 음식 */}
            {foodInfos.length > 0 && (
                <div>
                    <h3>분석 결과</h3>

                    {foodInfos.map((food, index) => (
                        <div
                            className="crud-card food-info-card"
                            key={index}
                        >
                            <div className="food-info-row">
                                <div className="crud-card-input">
                                    <label>음식명</label>
                                    <div className="crud-card-input-value">
                                        <input
                                            type="text"
                                            value={food.foodName}
                                            onChange={e =>
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
                                            onChange={e =>
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

                            <div className="food-info-row nutrition-row">
                                <div className="crud-card-input">
                                    <label>칼로리</label>
                                    <div className="crud-card-input-value">
                                        <input
                                            type="number"
                                            value={food.calories}
                                            onChange={e =>
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
                                            onChange={e =>
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
                                            onChange={e =>
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
                                            onChange={e =>
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

            {/* DB에 이미 저장된 현재 식사 유형 기록 */}
            <div className="saved-meal-list">
                <h3>{mealType} 식사 기록</h3>

                {selectedMeals.length === 0 ? (
                    <p className="saved-meal-empty">
                        저장된 {mealType} 식사 기록이 없습니다.
                    </p>
                ) : (
                    selectedMeals.map(meal => (
                        <div 
                            className="saved-meal-grid"
                            key={meal.mealRecordId}>
                            {meal.items?.map(food => (
                                <div
                                    className="crud-card food-info-card"
                                    key={food.mealItemId}
                                >
                                    <div className="food-info-row">
                                        <div className="crud-card-input">
                                            <label>음식명</label>
                                            <div className="crud-card-input-value">
                                                <input
                                                    type="text"
                                                    value={food.foodName ?? ""}
                                                    onChange={e =>
                                                        handleSavedItemChange(
                                                            meal.mealRecordId,
                                                            food.mealItemId,
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
                                                    value={food.amountDescription ?? ""}
                                                    onChange={e =>
                                                        handleSavedItemChange(
                                                            meal.mealRecordId,
                                                            food.mealItemId,
                                                            "amountDescription",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="food-info-row nutrition-row">
                                        <div className="crud-card-input">
                                            <label>칼로리</label>
                                            <div className="crud-card-input-value">
                                                <input
                                                    type="number"
                                                    value={food.calories ?? ""}
                                                    onChange={e =>
                                                        handleSavedItemChange(
                                                            meal.mealRecordId,
                                                            food.mealItemId,
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
                                                    value={food.protein ?? ""}
                                                    onChange={e =>
                                                        handleSavedItemChange(
                                                            meal.mealRecordId,
                                                            food.mealItemId,
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
                                                    value={food.carbohydrate ?? ""}
                                                    onChange={e =>
                                                        handleSavedItemChange(
                                                            meal.mealRecordId,
                                                            food.mealItemId,
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
                                                    value={food.fat ?? ""}
                                                    onChange={e =>
                                                        handleSavedItemChange(
                                                            meal.mealRecordId,
                                                            food.mealItemId,
                                                            "fat",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <span>g</span>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            className="btn-secondary"
                                            onClick={() =>
                                                handleSavedItemDelete(
                                                    meal.mealRecordId,
                                                    food.mealItemId
                                                )
                                            }
                                        >
                                            삭제
                                        </button>
                                    </div>
                                </div>
                            ))}


                        </div>


                    ))
                )}
            </div>

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
