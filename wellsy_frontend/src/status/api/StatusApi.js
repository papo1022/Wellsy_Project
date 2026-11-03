import axios from "axios";

import { getAuthorization } from "../../common/api/commonApi";

// 공통 URL
const BASE_URL = "/wellsy/status";


// ===========================================
// 부서별 / 기간별 건강통계 조회
// ===========================================
const selectStatusListApi = params => {

    const response = axios({

        url : BASE_URL,

        method : "get",

        params : params,

        headers : {
            Authorization : getAuthorization()
        }

    });

    return response;
};


// ===========================================
// 주의 직원 목록 조회
// ===========================================
const selectWarningEmployeeListApi = params => {

    const response = axios({

        url : `${ BASE_URL }/warnings`,

        method : "get",

        params : params,

        headers : {
            Authorization : getAuthorization()
        }

    });

    return response;
};


// ===========================================
// 건강 이상징후 상세조회
// ===========================================
const selectWarningEmployeeApi = alertId => {

    const response = axios({

        url : `${ BASE_URL }/warnings/${ alertId }`,

        method : "get",

        headers : {
            Authorization : getAuthorization()
        }

    });

    return response;
};


// ===========================================
// 건강 이상징후 확인완료
// ===========================================
const updateAlertReadApi = alertId => {

    const response = axios({

        url : `${ BASE_URL }/warnings/${ alertId }/read`,

        method : "put",

        headers : {
            Authorization : getAuthorization()
        }

    });

    return response;
};


export {

    selectStatusListApi,

    selectWarningEmployeeListApi,

    selectWarningEmployeeApi,

    updateAlertReadApi

};