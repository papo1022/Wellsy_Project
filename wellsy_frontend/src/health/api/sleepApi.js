import axios from "axios";

import {
    getAuthorization
} from "../../common/api/commonApi";

const BASE_URL =
    "http://localhost:8006/wellsy/sleep";

// 오늘 수면 기록 조회
const selectTodaySleepApi = employeeNo => {
    return axios.get(
        `${BASE_URL}/${employeeNo}`,
        {
            headers: {
                Authorization:
                    getAuthorization()
            }
        }
    );
};

// 수면 기록 저장 / 수정
const saveSleepApi = sleepData => {
    return axios.post(
        BASE_URL,
        sleepData,
        {
            headers: {
                Authorization:
                    getAuthorization()
            }
        }
    );
};

// 특정 날짜 수면 기록 조회
const getSleepByDateApi = (
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

export {
    selectTodaySleepApi,
    saveSleepApi,
    getSleepByDateApi
};