import { useEffect, useState } from "react";

import {
    analyzeExerciseApi,
    deleteExerciseApi,
    getExercisesApi,
    saveExerciseApi
} from "../../api/exerciseApi";

function ExerciseForm({
    employeeNo,
    exerciseDate,
    onClose,
    onUpdate
}) {

    // 새 운동 입력
    const [exerciseName, setExerciseName] = useState("");
    const [amountDescription, setAmountDescription] = useState("");

    // DB에 저장된 기존 운동
    const [savedExercises, setSavedExercises] = useState([]);

    // AI 분석 후 아직 저장하지 않은 새 운동
    const [exerciseInfos, setExerciseInfos] = useState([]);

    // 화면에서 삭제한 기존 운동 ID
    const [
        deletedExerciseRecordIds,
        setDeletedExerciseRecordIds
    ] = useState([]);

    const [isAnalyzing, setIsAnalyzing] = useState(false);


    // =========================================================
    // 기존 운동 조회
    // =========================================================

    const fetchExercises = async () => {

        if (!employeeNo || !exerciseDate) {
            return;
        }

        try {

            const response = await getExercisesApi(
                employeeNo,
                exerciseDate
            );

            setSavedExercises(response.data);

        } catch (error) {

            console.error(
                "운동 기록 조회 실패:",
                error
            );
        }
    };


    // =========================================================
    // AI 운동 분석
    // =========================================================

    const handleAnalyze = async () => {

        if (!exerciseName.trim()) {
            alert("운동명을 입력해주세요.");
            return;
        }

        if (!amountDescription.trim()) {
            alert("운동량을 입력해주세요.");
            return;
        }

        try {

            setIsAnalyzing(true);

            console.log("운동 AI 요청:", {
                exerciseName,
                amountDescription
            });

            const response = await analyzeExerciseApi(
                exerciseName,
                amountDescription
            );

            const result = response.data;
            setExerciseInfos(prev => [
                ...prev,
                {
                    exerciseName:
                        result.exerciseName ?? exerciseName,

                    amountDescription:
                        result.amountDescription ?? amountDescription,

                    exerciseType:
                        result.exerciseType ?? "",

                    difficulty:
                        result.difficulty ?? "",

                    durationMinutes:
                        result.durationMinutes ?? 0,

                    count:
                        result.count ?? 0,

                    caloriesPerMinute:
                        result.caloriesPerMinute ?? 0,

                    estimatedCalories:
                        result.estimatedCalories ?? 0
                }
            ]);

            setExerciseName("");
            setAmountDescription("");

        } catch (error) {

            console.error(
                "AI 운동 분석 실패:",
                error
            );

            alert("운동 분석에 실패했습니다.");

        } finally {

            setIsAnalyzing(false);
        }
    };


    // =========================================================
    // 새 운동 분석 결과 수정
    // =========================================================

    const handleChange = (
        index,
        field,
        value
    ) => {

        setExerciseInfos(prev =>
            prev.map((exercise, i) =>
                i === index
                    ? {
                        ...exercise,
                        [field]: value
                    }
                    : exercise
            )
        );
    };


    // =========================================================
    // 새 운동 분석 결과 삭제
    // DB에 저장된 적 없으므로 화면에서만 제거
    // =========================================================

    const handleDelete = index => {

        setExerciseInfos(prev =>
            prev.filter((_, i) => i !== index)
        );
    };


    // =========================================================
    // 기존 저장 운동 수정
    // DB에는 아직 반영하지 않음
    // =========================================================

    const handleSavedChange = (
        exerciseRecordId,
        field,
        value
    ) => {

        setSavedExercises(prev =>
            prev.map(exercise =>
                exercise.exerciseRecordId === exerciseRecordId
                    ? {
                        ...exercise,
                        [field]: value
                    }
                    : exercise
            )
        );
    };


    // =========================================================
    // 기존 저장 운동 삭제
    // DB에서는 바로 삭제하지 않고 화면에서만 제거
    // =========================================================

    const handleDeleteSaved = exerciseRecordId => {

        setDeletedExerciseRecordIds(prev => [
            ...prev,
            exerciseRecordId
        ]);

        setSavedExercises(prev =>
            prev.filter(
                exercise =>
                    exercise.exerciseRecordId !== exerciseRecordId
            )
        );
    };


    // =========================================================
    // 전체 저장
    //
    // 1. 삭제
    // 2. 기존 운동 수정
    // 3. 새 운동 추가
    // =========================================================

    const handleSave = async () => {

        if (
            savedExercises.length === 0 &&
            exerciseInfos.length === 0 &&
            deletedExerciseRecordIds.length === 0
        ) {
            alert("변경할 운동 기록이 없습니다.");
            return;
        }

        try {

            // -----------------------------------------
            // 1. 기존 운동 삭제
            // -----------------------------------------

            for (
                const exerciseRecordId
                of deletedExerciseRecordIds
            ) {

                await deleteExerciseApi(
                    exerciseRecordId
                );
            }


            // -----------------------------------------
            // 2. 기존 운동 수정
            // -----------------------------------------

            for (const exercise of savedExercises) {

                await saveExerciseApi({

                    exerciseRecordId:
                        exercise.exerciseRecordId,

                    employeeNo,

                    exerciseDate,

                    exerciseName:
                        exercise.exerciseName,

                    exerciseType:
                        exercise.exerciseType,

                    difficulty:
                        exercise.difficulty,

                    caloriesPerMinute:
                        Number(exercise.caloriesPerMinute) || 0,

                    duration:
                        Number(exercise.duration) || 0,

                    targetCount:
                        Number(exercise.targetCount) || 0,

                    status:
                        exercise.status || "Y",

                    memo:
                        exercise.memo || ""
                });
            }


            // -----------------------------------------
            // 3. 새 운동 추가
            // -----------------------------------------

            for (const exercise of exerciseInfos) {

                await saveExerciseApi({

                    employeeNo,

                    exerciseDate,

                    exerciseName:
                        exercise.exerciseName,

                    exerciseType:
                        exercise.exerciseType,

                    difficulty:
                        exercise.difficulty,

                    caloriesPerMinute:
                        Number(exercise.caloriesPerMinute) || 0,

                    duration:
                        Number(exercise.durationMinutes) || 0,

                    targetCount:
                        Number(exercise.count) || 0,

                    status: "Y",

                    memo: ""
                });
            }


            alert("운동 기록이 저장되었습니다.");

            // 신규 분석 결과 초기화
            setExerciseInfos([]);

            // 삭제 예약 ID 초기화
            setDeletedExerciseRecordIds([]);

            // DB 기준으로 다시 조회
            await fetchExercises();

            if (onUpdate) {
                onUpdate();
            }

        } catch (error) {

            console.error(
                "운동 기록 저장 실패:",
                error
            );

            alert("운동 기록 저장에 실패했습니다.");
        }
    };


    // =========================================================
    // 날짜 / 사용자 변경 시 운동 조회
    // =========================================================

    useEffect(() => {

        fetchExercises();

    }, [employeeNo, exerciseDate]);


    return (
        <div className="exercise-form">

            <h2>운동 기록</h2>

            <div className="crud-card-date">
                {exerciseDate}
            </div>


            {/* =================================================
                기존 저장 운동
            ================================================= */}

            {savedExercises.length > 0 && (

                <div className="saved-exercise-list">

                    <h3>저장된 운동</h3>

                    {savedExercises.map(exercise => (

                        <div
                            className="exercise-info-card"
                            key={exercise.exerciseRecordId}
                        >

                            {/* 운동명 */}
                            <div className="crud-card-input">

                                <label>운동명</label>

                                <div className="crud-card-input-value">

                                    <input
                                        type="text"
                                        value={
                                            exercise.exerciseName ?? ""
                                        }
                                        onChange={e =>
                                            handleSavedChange(
                                                exercise.exerciseRecordId,
                                                "exerciseName",
                                                e.target.value
                                            )
                                        }
                                    />

                                </div>

                            </div>


                            {/* 운동 종류 */}
                            <div className="crud-card-input">

                                <label>운동 종류</label>

                                <div className="crud-card-input-value">

                                    <input
                                        type="text"
                                        value={
                                            exercise.exerciseType ?? ""
                                        }
                                        onChange={e =>
                                            handleSavedChange(
                                                exercise.exerciseRecordId,
                                                "exerciseType",
                                                e.target.value
                                            )
                                        }
                                    />

                                </div>

                            </div>


                            {/* 강도 */}
                            <div className="crud-card-input">

                                <label>운동 강도</label>

                                <div className="crud-card-input-value">

                                    <input
                                        type="text"
                                        value={
                                            exercise.difficulty ?? ""
                                        }
                                        onChange={e =>
                                            handleSavedChange(
                                                exercise.exerciseRecordId,
                                                "difficulty",
                                                e.target.value
                                            )
                                        }
                                    />

                                </div>

                            </div>


                            <div className="exercise-result-grid">

                                <div className="exercise-result-item">
                                    <span>운동 시간</span>

                                    <div className="exercise-result-value">
                                        <input
                                            type="number"
                                            value={exercise.duration ?? 0}
                                            onChange={e =>
                                                handleSavedChange(
                                                    exercise.exerciseRecordId,
                                                    "duration",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <small>분</small>
                                    </div>
                                </div>

                                <div className="exercise-result-item">
                                    <span>횟수</span>

                                    <div className="exercise-result-value">
                                        <input
                                            type="number"
                                            value={exercise.targetCount ?? 0}
                                            onChange={e =>
                                                handleSavedChange(
                                                    exercise.exerciseRecordId,
                                                    "targetCount",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <small>회</small>
                                    </div>
                                </div>

                                <div className="exercise-result-item">
                                    <span>분당 소모</span>

                                    <div className="exercise-result-value">
                                        <input
                                            type="number"
                                            step="0.1"
                                            value={exercise.caloriesPerMinute ?? 0}
                                            onChange={e =>
                                                handleSavedChange(
                                                    exercise.exerciseRecordId,
                                                    "caloriesPerMinute",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <small>kcal</small>
                                    </div>
                                </div>

                                <div className="exercise-result-item">
                                    <span>예상 소모</span>

                                    <div className="exercise-result-value readonly">
                                        <strong>
                                            {(
                                                Number(exercise.caloriesPerMinute) *
                                                Number(exercise.duration)
                                            ).toFixed(1)}
                                        </strong>
                                        <small>kcal</small>
                                    </div>
                                </div>

                            </div>


                            <div className="crud-card-buttons">

                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() =>
                                        handleDeleteSaved(
                                            exercise.exerciseRecordId
                                        )
                                    }
                                >
                                    삭제
                                </button>

                            </div>

                        </div>

                    ))}

                </div>
            )}


            {/* =================================================
                새 운동 입력
            ================================================= */}

            <h3>운동 추가</h3>

            <div className="crud-card-input">

                <label>운동명</label>

                <div className="crud-card-input-value">

                    <input
                        type="text"
                        value={exerciseName}
                        onChange={e =>
                            setExerciseName(
                                e.target.value
                            )
                        }
                        placeholder="예: 러닝"
                    />

                </div>

            </div>


            <div className="crud-card-input">

                <label>운동량</label>

                <div className="crud-card-input-value">

                    <input
                        type="text"
                        value={amountDescription}
                        onChange={e =>
                            setAmountDescription(
                                e.target.value
                            )
                        }
                        placeholder="예: 30분, 50회"
                    />

                </div>

            </div>


            <div className="crud-card-buttons">

                <button
                    type="button"
                    className="btn btn-primary btn-analyze"
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                >
                    {
                        isAnalyzing
                            ? "분석 중..."
                            : "AI 분석하기"
                    }
                </button>

            </div>


            {/* =================================================
                AI 분석 결과
            ================================================= */}

            {exerciseInfos.length > 0 && (

                <div className="exercise-analysis">

                    <h3>분석 결과</h3>

                    {exerciseInfos.map(
                        (exercise, index) => (

                            <div
                                className="exercise-info-card"
                                key={index}
                            >

                                {/* 운동명 */}
                                <div className="crud-card-input">

                                    <label>운동명</label>

                                    <div className="crud-card-input-value">

                                        <input
                                            type="text"
                                            value={
                                                exercise.exerciseName
                                            }
                                            onChange={e =>
                                                handleChange(
                                                    index,
                                                    "exerciseName",
                                                    e.target.value
                                                )
                                            }
                                        />

                                    </div>

                                </div>


                                {/* 운동 종류 */}
                                <div className="crud-card-input">

                                    <label>운동 종류</label>

                                    <div className="crud-card-input-value">

                                        <input
                                            type="text"
                                            value={
                                                exercise.exerciseType
                                            }
                                            onChange={e =>
                                                handleChange(
                                                    index,
                                                    "exerciseType",
                                                    e.target.value
                                                )
                                            }
                                        />

                                    </div>

                                </div>


                                {/* 강도 */}
                                <div className="crud-card-input">

                                    <label>운동 강도</label>

                                    <div className="crud-card-input-value">

                                        <input
                                            type="text"
                                            value={
                                                exercise.difficulty
                                            }
                                            onChange={e =>
                                                handleChange(
                                                    index,
                                                    "difficulty",
                                                    e.target.value
                                                )
                                            }
                                        />

                                    </div>

                                </div>


                                <div className="exercise-result-grid">

                                    <div className="exercise-result-item">
                                        <span>운동 시간</span>

                                        <div className="exercise-result-value">
                                            <input
                                                type="number"
                                                value={exercise.durationMinutes ?? 0}
                                                onChange={e =>
                                                    handleChange(
                                                        index,
                                                        "durationMinutes",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <small>분</small>
                                        </div>
                                    </div>

                                    <div className="exercise-result-item">
                                        <span>횟수</span>

                                        <div className="exercise-result-value">
                                            <input
                                                type="number"
                                                value={exercise.count ?? 0}
                                                onChange={e =>
                                                    handleChange(
                                                        index,
                                                        "count",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <small>회</small>
                                        </div>
                                    </div>

                                    <div className="exercise-result-item">
                                        <span>분당 소모</span>

                                        <div className="exercise-result-value">
                                            <input
                                                type="number"
                                                step="0.1"
                                                value={exercise.caloriesPerMinute ?? 0}
                                                onChange={e =>
                                                    handleChange(
                                                        index,
                                                        "caloriesPerMinute",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <small>kcal</small>
                                        </div>
                                    </div>

                                    <div className="exercise-result-item">
                                        <span>예상 소모</span>

                                        <div className="exercise-result-value readonly">
                                            <strong>
                                                {(
                                                    Number(exercise.caloriesPerMinute) *
                                                    Number(exercise.durationMinutes)
                                                ).toFixed(1)}
                                            </strong>
                                            <small>kcal</small>
                                        </div>
                                    </div>

                                </div>


                                <div className="crud-card-buttons">

                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() =>
                                            handleDelete(index)
                                        }
                                    >
                                        삭제
                                    </button>

                                </div>

                            </div>
                        )
                    )}

                </div>
            )}


            {/* =================================================
                최종 저장 / 닫기
            ================================================= */}

            <div className="crud-card-buttons">

                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSave}
                >
                    저장하기
                </button>

                &nbsp;&nbsp;

                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onClose}
                >
                    닫기
                </button>

            </div>

        </div>
    );
}

export default ExerciseForm;