import axios from "axios";

import {
    getAuthorization
} from "../../common/api/commonApi";


const BASE_URL
    = "http://localhost:8006/wellsy/my";


// =========================================
// 마이페이지 조회
// =========================================

const selectMyApi
    = loginId => {

        return axios.get(

            `${BASE_URL}/${loginId}`,

            {
                headers : {

                    Authorization :
                        getAuthorization()
                }
            }
        );
    };


// =========================================
// 개인정보 수정
// 이메일 / 전화번호
// =========================================

const updateMyApi
    = (employeeNo, my) => {

        return axios.put(

            `${BASE_URL}/${employeeNo}`,

            my,

            {
                headers : {

                    Authorization :
                        getAuthorization()
                }
            }
        );
    };


// =========================================
// 비밀번호 변경
// =========================================

const updatePasswordApi
    = (
        employeeNo,
        passwordData
    ) => {

        return axios.put(

            `${BASE_URL}/${employeeNo}/password`,

            passwordData,

            {
                headers : {

                    Authorization :
                        getAuthorization()
                }
            }
        );
    };


export {

    selectMyApi,

    updateMyApi,

    updatePasswordApi

};