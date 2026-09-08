import axios from "axios";

import {
    getAuthorization
} from "../../common/api/commonApi";


const BASE_URL =
    "/wellsy/checkman";

const CHECKUP_RESERVATION_URL =
    "/wellsy/api/checkup-reservation-dashboard";


// =========================================
// 전체 직원 건강정보 조회
// 이름 / 기간 검색
// =========================================

const selectCheckmanListApi = params => {

    return axios.get(
        `${BASE_URL}/health`,
        {
            params : params,

            headers : {
                Authorization :
                    getAuthorization()
            }
        }
    );

};


// =========================================
// 특정 직원 건강정보 전체조회
// =========================================

const selectEmployeeCheckmanListApi
    = employeeNo => {

        return axios.get(
            `${BASE_URL}/health/employee/${employeeNo}`,
            {
                headers : {
                    Authorization :
                        getAuthorization()
                }
            }
        );

    };


// =========================================
// 건강정보 상세조회
// =========================================

const selectCheckmanApi
    = healthRecordId => {

        return axios.get(
            `${BASE_URL}/health/${healthRecordId}`,
            {
                headers : {
                    Authorization :
                        getAuthorization()
                }
            }
        );

    };


// =========================================
// 건강 이상 알림 목록
// =========================================

const selectCheckmanAlertListApi
    = params => {

        return axios.get(
            `${BASE_URL}/alerts`,
            {
                params : params,

                headers : {
                    Authorization :
                        getAuthorization()
                }
            }
        );

    };


// =========================================
// 건강 이상 알림 상세
// =========================================

const selectCheckmanAlertApi
    = alertId => {

        return axios.get(
            `${BASE_URL}/alerts/${alertId}`,
            {
                headers : {
                    Authorization :
                        getAuthorization()
                }
            }
        );

    };


// =========================================
// 건강 이상 알림 확인
// N -> Y
// =========================================

const updateCheckmanAlertApi
    = alertId => {

        return axios.put(
            `${BASE_URL}/alerts/${alertId}/read`,
            {},
            {
                headers : {
                    Authorization :
                        getAuthorization()
                }
            }
        );

    };


// =========================================
// 건강검진 예약 목록 조회
// =========================================

const selectCheckupReservationListApi
    = params => {

        return axios.get(
            CHECKUP_RESERVATION_URL,
            {
                params : params,

                headers : {
                    Authorization :
                        getAuthorization()
                }
            }
        );

    };


// =========================================
// 건강검진 예약 승인
//
// N -> Y
//
// 백엔드에서 승인과 동시에
// Schedule 자동 등록
// =========================================

const approveCheckupReservationApi
    = reservationId => {

        return axios.put(
            `${CHECKUP_RESERVATION_URL}/${reservationId}/approve`,
            {},
            {
                headers : {
                    Authorization :
                        getAuthorization()
                }
            }
        );

    };



// =========================================
// 건강검진 예약 취소
// N -> C / Y -> C
// =========================================

const cancelCheckupReservationApi
    = reservationId => {

        return axios.put(
            `${CHECKUP_RESERVATION_URL}/${reservationId}/cancel`,
            {},
            {
                headers : {
                    Authorization :
                        getAuthorization()
                }
            }
        );

    };


export {

    selectCheckmanListApi,

    selectEmployeeCheckmanListApi,

    selectCheckmanApi,

    selectCheckmanAlertListApi,

    selectCheckmanAlertApi,

    updateCheckmanAlertApi,

    selectCheckupReservationListApi,

    approveCheckupReservationApi,

    cancelCheckupReservationApi

};