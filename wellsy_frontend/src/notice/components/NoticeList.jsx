import { useState, useEffect } from "react";

import { selectNoticeListApi } from "../api/noticeApi";

import NoticeItem from "./NoticeItem";

import { useNavigate } from "react-router-dom";

import { jwtDecode } from "jwt-decode";

import "../styles/Notice.css";

function NoticeList() {

    // 화면 깜빡임 없이 URL 주소를 전환해줄 navigate 함수
    let navigate = useNavigate();

    // 조회된 데이터를 담을 배열 형태의 State 변수
    const [dataList, setDataList] = useState([]);

    // 현재 페이지
    const [currentPage, setCurrentPage]
        = useState(1);

    // 한 페이지에 보여줄 공지사항 개수
    const itemsPerPage = 5;

// 이 컴포넌트가 로딩된 후 최초 한 번 실행
useEffect(() => {

    const setNoticeList = async () => {

        try {

            const response = await selectNoticeListApi();

            // 응답데이터
            const items = response.data;

            const trArr = items.map((item) => {

                return (
                    <NoticeItem
                        key={ item.noticeId }
                        item={ item }
                    />
                );
            });

            setDataList(trArr);

        } catch(error) {

            console.log("공지사항 목록 조회용 ajax 통신 실패!");
            console.log(error);
        }
    };

    setNoticeList();

}, []);

    // =========================================
    // 관리자 권한 확인
    // =========================================

    const getIsAdmin = () => {

    const token
        = sessionStorage.getItem(
            "token"
        );


    if(!token) {

        return false;
    }


    try {

        const decoded
            = jwtDecode(token);


        const role
            = decoded.role
            ??
            decoded.authority
            ??
            decoded.auth;


        return (
            role === "ADMIN"
            ||
            role === "ROLE_ADMIN"
        );


    } catch(error) {

        console.log(
            "토큰 해석 실패",
            error
        );


        return false;
    }
};


const isAdmin
    = getIsAdmin();
    // =========================================
    // 전체 페이지 수
    // =========================================

    const totalPages
        = Math.ceil(
            dataList.length
            /
            itemsPerPage
        );


    // =========================================
    // 현재 페이지 시작 위치
    // =========================================

    const startIndex
        = (
            currentPage - 1
        )
        *
        itemsPerPage;


    // =========================================
    // 현재 페이지에 보여줄 공지사항
    // =========================================

    const currentDataList
        = dataList.slice(

            startIndex,

            startIndex
            +
            itemsPerPage
        );


    // =========================================
    // 페이지 변경
    // =========================================

    const changePage = page => {

        if(
            page < 1
            ||
            page > totalPages
        ) {

            return;
        }


        setCurrentPage(
            page
        );
    };


    // =========================================
    // 화면에 표시할 페이지 번호
    //
    // 최대 5개씩 표시
    // =========================================

    const getPageNumbers = () => {

        const pageGroupSize = 5;


        const startPage
            = Math.floor(
                (currentPage - 1)
                /
                pageGroupSize
            )
            *
            pageGroupSize
            +
            1;


        const endPage
            = Math.min(

                startPage
                +
                pageGroupSize
                -
                1,

                totalPages
            );


        const pages = [];


        for(
            let page = startPage;
            page <= endPage;
            page++
        ) {

            pages.push(
                page
            );
        }


        return pages;
    };


return (

        <div className="notice-dashboard">


            {/* 공지사항 전체 카드 */}
            <div className="notice-card">


                {/* 공지사항 상단 영역 */}
                <div className="notice-list-header">

                    <h3>
                        공지사항 목록
                    </h3>
        {
            isAdmin
                &&
                (
                    <button
                        type="button"
                        className="notice-btn notice-btn-primary"
                        onClick={ () => {

                            navigate("/notice/enrollForm");

                        }}
                    >
                        글작성
                    </button>
                )
        }

                </div>


                {/* 공지사항 목록 */}
                <div className="notice-card-content">

                    <table className="notice-table">

                        <thead>

                            <tr>

                                <th width="100">
                                    글번호
                                </th>

                                <th width="100">
                                    고정여부
                                </th>

                                <th width="500">
                                    제목
                                </th>

                                <th width="150">
                                    작성자
                                </th>

                                <th width="200">
                                    작성일
                                </th>

                                <th width="100">
                                    조회수
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {
                                dataList.length > 0
                                ?
                                currentDataList
                                :
                                (
                                    <tr>

                                        <td
                                            colSpan="6"
                                            className="notice-empty"
                                        >
                                            등록된 공지사항이 없습니다.
                                        </td>

                                    </tr>
                                )
                            }

                        </tbody>

                    </table>

                </div>

                {/* ================================= */}
                {/* 페이징 */}
                {/* ================================= */}

                {
                    totalPages > 0
                    &&
                    (
                        <div className="notice-pagination">


                            {/* 처음 페이지 */}

                            <button
                                type="button"

                                className="notice-page-btn"

                                disabled={
                                    currentPage === 1
                                }

                                onClick={
                                    () =>
                                        changePage(1)
                                }
                            >
                                «
                            </button>


                            {/* 이전 페이지 */}

                            <button
                                type="button"

                                className="notice-page-btn"

                                disabled={
                                    currentPage === 1
                                }

                                onClick={() => changePage(currentPage - 1)}>‹</button>


                            {/* 페이지 번호 */}

                            {
                                getPageNumbers()
                                    .map(
                                        page => (

                                            <button
                                                type="button"

                                                key={
                                                    page
                                                }

                                                className={
                                                    currentPage === page
                                                    ?
                                                    "notice-page-btn notice-page-active"
                                                    :
                                                    "notice-page-btn"
                                                }

                                                onClick={
                                                    () =>
                                                        changePage(
                                                            page
                                                        )
                                                }
                                            >

                                                {
                                                    page
                                                }

                                            </button>

                                        )
                                    )
                            }


                            {/* 다음 페이지 */}

                            <button
                                type="button"

                                className="notice-page-btn"

                                disabled={
                                    currentPage
                                    ===
                                    totalPages
                                }

                                onClick={
                                    () =>
                                        changePage(
                                            currentPage + 1
                                        )
                                }
                            >
                                ›
                            </button>


                            {/* 마지막 페이지 */}

                            <button
                                type="button"

                                className="notice-page-btn"

                                disabled={
                                    currentPage
                                    ===
                                    totalPages
                                }

                                onClick={
                                    () =>
                                        changePage(
                                            totalPages
                                        )
                                }
                            >
                                »
                            </button>


                        </div>
                    )
                }

            </div>

        </div>
    );
}


// 내보내기
export default NoticeList;