import axios from "axios";

import { getAuthorization } from "../../common/api/commonApi";

// 공통 URL
const BASE_URL
    = "http://localhost:8006/wellsy/employee";


// 목록
const selectEmployeeListApi = () => {

    return axios.get(
        BASE_URL,
        {
            headers : {
                Authorization : getAuthorization()
            }
        }
    );
};


// 상세
const selectEmployeeApi = employeeNo => {

    return axios.get(
        `${BASE_URL}/${employeeNo}`,
        {
            headers : {
                Authorization : getAuthorization()
            }
        }
    );
};


// 등록
const insertEmployeeApi = employee => {

    return axios.post(
        BASE_URL,
        employee,
        {
            headers : {
                Authorization : getAuthorization()
            }
        }
    );
};


// 수정
const updateEmployeeApi = (employeeNo, employee) => {

    return axios.put(
        `${BASE_URL}/${employeeNo}`,
        employee,
        {
            headers : {
                Authorization : getAuthorization()
            }
        }
    );
};


// 삭제
const deleteEmployeeApi = employeeNo => {

    return axios.delete(
        `${BASE_URL}/${employeeNo}`,
        {
            headers : {
                Authorization : getAuthorization()
            }
        }
    );
};


// 부서
const selectDepartmentListApi = () => {

    return axios.get(
        `${BASE_URL}/department`,
        {
            headers : {
                Authorization : getAuthorization()
            }
        }
    );
};


// 직급
const selectJobListApi = () => {

    return axios.get(
        `${BASE_URL}/job`,
        {
            headers : {
                Authorization : getAuthorization()
            }
        }
    );
};


export {
    selectEmployeeListApi,
    selectEmployeeApi,
    insertEmployeeApi,
    updateEmployeeApi,
    deleteEmployeeApi,
    selectJobListApi,
    selectDepartmentListApi
};