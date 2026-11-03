import {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import {
    jwtDecode
} from "jwt-decode";

import {
    selectNoticeListApi
} from "../api/noticeApi";

import NoticeItem from "./NoticeItem";

import "../styles/Notice.css";


function NoticeList() {


    // =========================================
    // 페이지 이동
    // =========================================

    const navigate
        = useNavigate();


    // =========================================
    // 공지사항 목록
    // =========================================

    const [dataList, setDataList]
        = useState([]);


    // =========================================
    // 현재 페이지
    // =========================================

    const [currentPage, setCurrentPage]
        = useState(1);


    // =========================================
    // 검색창 입력값
    // =========================================

    const [inputKeyword, setInputKeyword]
        = useState("");


    // =========================================
    // 실제 검색에 적용되는 값
    // =========================================

    const [searchKeyword, setSearchKeyword]
        = useState("");


    // =========================================
    // 한 페이지에 보여줄 공지사항 개수
    // =========================================

    const itemsPerPage = 5;


    // =========================================
    // 공지사항 목록 조회
    // =========================================

    useEffect(() => {


        const setNoticeList = async () => {


            try {


                const response
                    = await selectNoticeListApi();


                // =====================================
                // JSX가 아니라
                // 실제 공지사항 데이터를 저장
                // =====================================

                setDataList(
                    response.data
                    ??
                    []
                );


            } catch(error) {


                console.log(
                    "공지사항 목록 조회용 ajax 통신 실패!"
                );


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
    // 공지사항 검색
    // =========================================

    const searchNotice = e => {


        e.preventDefault();


        setSearchKeyword(
            inputKeyword.trim()
        );


        // 검색 시 1페이지로 이동
        setCurrentPage(1);

    };


    // =========================================
    // 검색된 공지사항
    // =========================================

    const filteredNoticeList
        = useMemo(() => {


            // 검색어 없음
            if(searchKeyword === "") {

                return dataList;
            }


            // 제목 검색
            return dataList.filter(
                notice => {


                    const title
                        = notice.title
                        ??
                        "";


                    return title
                        .toLowerCase()
                        .includes(
                            searchKeyword
                                .toLowerCase()
                        );

                }
            );


        }, [
            dataList,
            searchKeyword
        ]);


    // =========================================
    // 전체 페이지 수
    //
    // 검색 결과 기준
    // =========================================

    const totalPages
        = Math.ceil(

            filteredNoticeList.length
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
    //
    // 검색 결과에서 5개씩 자름
    // =========================================

    const currentDataList
        = filteredNoticeList.slice(

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
    // 페이지 번호
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


            {/* ================================= */}
            {/* 공지사항 검색 */}
            {/* ================================= */}

            <form
                className="notice-search-area"

                onSubmit={
                    searchNotice
                }
            >


                <div className="notice-search-box">


                    <input
                        type="text"

                        value={
                            inputKeyword
                        }

                        onChange={
                            e => {

                                setInputKeyword(
                                    e.target.value
                                );

                            }
                        }

                        placeholder="공지사항 제목을 검색해 주세요"
                    />


                </div>


                <button
                    type="submit"

                    className="notice-search-btn"
                >
                    검색
                </button>


            </form>


            {/* ================================= */}
            {/* 공지사항 전체 카드 */}
            {/* ================================= */}

            <div className="notice-card">


                {/* ================================= */}
                {/* 공지사항 상단 영역 */}
                {/* ================================= */}

                <div className="notice-list-header">


                    <div>


                        <h3>
                            공지사항 목록
                        </h3>


                        <p className="notice-total-count">

                            {
                                searchKeyword !== ""
                                ?
                                `검색 결과 ${filteredNoticeList.length}건`
                                :
                                `전체 ${dataList.length}건`
                            }

                        </p>


                    </div>


                    {/* 관리자만 글작성 */}

                    {
                        isAdmin
                        &&
                        (

                            <button
                                type="button"

                                className="notice-btn notice-btn-primary"

                                onClick={
                                    () => {

                                        navigate(
                                            "/notice/enrollForm"
                                        );

                                    }
                                }
                            >
                                글작성
                            </button>

                        )
                    }


                </div>


                {/* ================================= */}
                {/* 공지사항 목록 */}
                {/* ================================= */}

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
                                currentDataList.length > 0
                                ?
                                currentDataList.map(
                                    item => (

                                        <NoticeItem

                                            key={
                                                item.noticeId
                                            }

                                            item={
                                                item
                                            }

                                        />

                                    )
                                )
                                :
                                (

                                    <tr>


                                        <td
                                            colSpan="6"

                                            className="notice-empty"
                                        >

                                            {
                                                searchKeyword !== ""
                                                ?
                                                "검색된 공지사항이 없습니다."
                                                :
                                                "등록된 공지사항이 없습니다."
                                            }

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


                            {/* 처음 */}

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


                            {/* 이전 */}

                            <button
                                type="button"

                                className="notice-page-btn"

                                disabled={
                                    currentPage === 1
                                }

                                onClick={
                                    () =>
                                        changePage(
                                            currentPage - 1
                                        )
                                }
                            >
                                ‹
                            </button>


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
                                                    currentPage
                                                    ===
                                                    page
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


                            {/* 다음 */}

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


                            {/* 마지막 */}

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


// =========================================
// 내보내기
// =========================================

export default NoticeList;