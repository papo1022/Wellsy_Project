import axios from "axios";

const BASE_URL = "http://localhost:8006/wellsy/health";

// 특정 날짜 건강 기록 조회
const getHealthByDateApi = (
    employeeNo,
    date
) => {

    return axios.get(
        `${BASE_URL}/${employeeNo}`,
        {
            params: {
                date
            }
        }
    );
};

// 캘린더 기록 날짜 조회
const getHealthCalendarDatesApi = (
    employeeNo
) => {

    return axios.get(
        `${BASE_URL}/calendar/${employeeNo}`
    );
};

export {
    getHealthByDateApi,
    getHealthCalendarDatesApi
};