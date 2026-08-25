import axios from "axios";

import { getAuthorization } from "../../common/api/commonApi";

// 공통 URL
const BASE_URL = "http://localhost:8006/wellsy/employee";


// 사원 목록 조회
const selectEmployeeListApi = () => {

    const response = axios({
        url : BASE_URL,
        method : "get",
        headers : {
            Authorization : getAuthorization()
        }
    });

    return response;
};


// 사원 상세 조회
const selectEmployeeApi = employeeNo => {

    const response = axios({
        url : `${ BASE_URL }/${ employeeNo }`,
        method : "get",
        headers : {
            Authorization : getAuthorization()
        }
    });

    return response;
};


// 사원 등록
const insertEmployeeApi = employee => {

    const response = axios({
        url : BASE_URL,
        method : "post",
        data : employee,
        headers : {
            Authorization : getAuthorization()
        }
    });

    return response;
};


// 사원 수정
const updateEmployeeApi = (employeeNo, employee) => {

    const response = axios({
        url : `${ BASE_URL }/${ employeeNo }`,
        method : "put",
        data : employee,
        headers : {
            Authorization : getAuthorization()
        }
    });

    return response;
};


// 사원 퇴사 처리
const deleteEmployeeApi = employeeNo => {

    const response = axios({
        url : `${ BASE_URL }/${ employeeNo }`,
        method : "delete",
        headers : {
            Authorization : getAuthorization()
        }
    });

    return response;
};


export {
    selectEmployeeListApi,
    selectEmployeeApi,
    insertEmployeeApi,
    updateEmployeeApi,
    deleteEmployeeApi
};