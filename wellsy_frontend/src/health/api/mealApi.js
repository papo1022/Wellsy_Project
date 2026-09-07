import axios from "axios";
import { getAuthorization } from "../../common/api/commonApi";

const BASE_URL = "http://localhost:8006/wellsy/meal";

// 식사 기록 저장
const saveMealApi = mealData => {

    return axios.post(
        BASE_URL,
        mealData
    );

};

// 오늘 식사 조회
const selectTodayMealApi = employeeNo => {

    return axios.get(
        `${BASE_URL}/today/${employeeNo}`
    );

};

const analyzeMealTextApi = (foodName, amountDescription) => {
    return axios.post(
        `${BASE_URL}/ai/analyze-text`,
        {
            foodName,
            amountDescription
        }
    );
};

const analyzeMealImageApi = image => {

    const formData = new FormData();
    formData.append("image", image);

    return axios.post(
        `${BASE_URL}/ai/analyze-image`,
        formData
    );
};

export {
    saveMealApi,
    selectTodayMealApi,
    analyzeMealTextApi,
    analyzeMealImageApi
};