import axios from "axios";

// 공통 URL 변수처리
const BASE_URL = "http://localhost:8006/notice";

// 공지사항 목록 조회용
const selectNoticeListApi = () => {

    const response = axios({
        url : `${ BASE_URL }`,
        method : "get"
    });

    return response;
};

// 공지사항 작성용
const insertNoticeApi = notice => {

    const response = axios({
        url : `${ BASE_URL }`,
        method : "post",
        data : notice
    });

    return response;
};

// 공지사항 상세 조회용
const selectNoticeApi = noticeId => {

    const response = axios({
        url : `${ BASE_URL }/${ noticeId }`,
        method : "get"
    });

    return response;
};

// 공지사항 수정용
const updateNoticeApi = (noticeId, notice) => {

    const response = axios({
        url : `${ BASE_URL }/${ noticeId }`,
        method : "put",
        data : notice
    });

    return response;
};

// 공지사항 삭제용
const deleteNoticeApi = noticeId => {

    const response = axios({
        url : `${ BASE_URL }/${ noticeId }`,
        method : "delete"
    });

    return response;
};

export {
    selectNoticeListApi,
    insertNoticeApi,
    selectNoticeApi,
    updateNoticeApi,
    deleteNoticeApi
};