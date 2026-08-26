import { useNavigate, useParams } from "react-router-dom";

import { useState, useEffect } from "react";

import { selectNoticeApi, deleteNoticeApi } from "../api/noticeApi";

import "../styles/Notice.css";

function NoticeDetail() {

    // Path Variable 방식으로 얻어온 공지사항 ID
    const noticeId = useParams().noticeId;

    // 조회해온 공지사항 데이터를 담아둘 State 변수
    const [notice, setNotice] = useState({
        noticeId : "",
        title : "",
        content : "",
        isPinned : 0,
        viewCount : 0,
        isDeleted : 0,
        createdAt : "",
        employeeNo : ""
    });

let navigate = useNavigate();


// 이 컴포넌트가 로딩된 후 공지사항 상세 조회
useEffect(() => {

    const selectNotice = async () => {

        try {

            const response = await selectNoticeApi(noticeId);

            // console.log(response.data);

            if(response.data != "") {

                // 상세 조회 성공
                setNotice(response.data);

            } else {

                alert("이미 삭제되거나 없는 공지사항입니다.");

                // 공지사항 목록 페이지로 이동
                navigate("/notice");
            }

        } catch(error) {

            console.log("공지사항 상세 조회용 ajax 통신 실패!");
            console.log(error);
        }
    };

    selectNotice();

}, [noticeId, navigate]);


// 삭제하기 버튼 클릭 시 실행
const deleteNotice = async () => {

    const result = window.confirm("정말 삭제하시겠습니까?");

    // 취소를 누른 경우
    if(!result) {
        return;
    }

    try {

        const response = await deleteNoticeApi(noticeId);

        // console.log(response.data);

        if(response.data === "success") {

            alert("공지사항 삭제에 성공했습니다.");

            // 공지사항 목록 페이지로 이동
            navigate("/notice");

        } else {

            alert("공지사항 삭제에 실패했습니다.");
        }

    } catch(error) {

        console.log("공지사항 삭제용 ajax 통신 실패!");
        console.log(error);
    }
};


return (

        <div className="notice-dashboard">


            {/* 페이지 제목 */}
            <div className="notice-title-area">

                <h2>
                    공지사항 상세
                </h2>

            </div>


            {/* 상세 카드 */}
            <div className="notice-card">


                {/* 제목 영역 */}
                <div className="notice-detail-header">

                    <div className="notice-detail-title">

                        {
                            notice.isPinned === 1
                            &&
                            <span className="notice-pin">
                                고정
                            </span>
                        }


                        <h3>
                            { notice.title }
                        </h3>

                    </div>


                    {/* 기본 정보 */}
                    <div className="notice-detail-info">

                        <span>
                            작성자&nbsp;
                            <strong>
                                { notice.employeeNo }
                            </strong>
                        </span>


                        <span>
                            작성일&nbsp;
                            <strong>

                                {
                                    notice.createdAt
                                    ?
                                    notice.createdAt.substring(
                                        0,
                                        10
                                    )
                                    :
                                    "-"
                                }

                            </strong>
                        </span>


                        <span>
                            조회수&nbsp;
                            <strong>
                                { notice.viewCount }
                            </strong>
                        </span>

                    </div>

                </div>


                {/* 내용 */}
                <div className="notice-detail-content">

                    { notice.content }

                </div>


                {/* 버튼 */}
                <div className="notice-btn-area">


                    <button
                        type="button"
                        className="notice-btn notice-btn-secondary"

                        onClick={ () => {

                            navigate(
                                "/notice"
                            );

                        }}
                    >
                        목록으로
                    </button>


                    <button
                        type="button"
                        className="notice-btn notice-btn-warning"

                        onClick={ () => {

                            navigate(

                                "/notice/updateForm",

                                {
                                    state : {
                                        noticeId : noticeId
                                    }
                                }

                            );

                        }}
                    >
                        수정하기
                    </button>


                    <button
                        type="button"
                        className="notice-btn notice-btn-danger"

                        onClick={
                            deleteNotice
                        }
                    >
                        삭제하기
                    </button>


                </div>

            </div>

        </div>

    );
}

export default NoticeDetail;