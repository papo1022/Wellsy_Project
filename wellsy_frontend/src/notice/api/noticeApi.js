import axios from "axios";

import { getAuthorization } from "../../common/api/commonApi";

// 공통 URL 변수처리
const BASE_URL = "/wellsy/notice";

// 공지사항 목록 조회용
const selectNoticeListApi = () => {

    const response = axios({
        url : `${ BASE_URL }`,
        method : "get",
        headers : {
            Authorization : getAuthorization()
        }
    });

    return response;
};

// 공지사항 작성용
const insertNoticeApi = notice => {

    const response = axios({
        url : `${ BASE_URL }`,
        method : "post",
        data : notice,
        headers : {
            Authorization : getAuthorization()
        }
    });

    return response;
};

// 공지사항 상세 조회용
const selectNoticeApi = noticeId => {

    const response = axios({
        url : `${ BASE_URL }/${ noticeId }`,
        method : "get",
        headers : {
            Authorization : getAuthorization()
        }
    });

    return response;
};

// 공지사항 수정용
const updateNoticeApi = (noticeId, notice) => {

    const response = axios({
        url : `${ BASE_URL }/${ noticeId }`,
        method : "put",
        data : notice,
        headers : {
            Authorization : getAuthorization()
        }
    });

    return response;
};

// 공지사항 삭제용
const deleteNoticeApi = noticeId => {

    const response = axios({
        url : `${ BASE_URL }/${ noticeId }`,
        method : "delete",
        headers : {
            Authorization : getAuthorization()
        }
    });

    return response;
};

const selectNoticePageApi = (
    page,
    size
) => {


    return axios.get(

        `${BASE_URL}/page`,

        {

            params : {

                page : page,

                size : size

            },

            headers : {

                Authorization :
                    getAuthorization()

            }

        }

    );
};

export {
    selectNoticeListApi,
    insertNoticeApi,
    selectNoticeApi,
    updateNoticeApi,
    deleteNoticeApi,
    selectNoticePageApi
};