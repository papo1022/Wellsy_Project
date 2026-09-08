import axios from "axios";

const BASE_URL =
    "http://localhost:8006/wellsy/exercise";

const analyzeExerciseApi = (
    exerciseName,
    amountDescription
) => {

    return axios.post(
        `${BASE_URL}/ai/analyze-text`,
        {
            exerciseName,
            amountDescription
        }
    );
};

const saveExerciseApi = (exerciseData) => {
    return axios.post(
        BASE_URL,
        exerciseData
    );
};

const getExercisesApi = (employeeNo, exerciseDate) => {
    return axios.get(
        `${BASE_URL}/${employeeNo}`,
        {
            params: {
                date: exerciseDate
            }
        }
    );
};

const deleteExerciseApi = (exerciseRecordId) => {
    return axios.delete(
        `${BASE_URL}/${exerciseRecordId}`
    );
};

export {
    analyzeExerciseApi, deleteExerciseApi, getExercisesApi, saveExerciseApi
};
