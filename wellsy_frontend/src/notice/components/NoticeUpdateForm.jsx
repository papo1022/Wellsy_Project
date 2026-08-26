import { useLocation, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

import { selectNoticeApi, updateNoticeApi } from "../api/noticeApi";

function NoticeUpdateForm() {

    // 수정 성공/실패 여부
    const [result, setResult] = useState("success");

    // 이전 페이지에서 state로 전달한 공지사항 ID
    const noticeId = useLocation().state.noticeId;

    let navigate = useNavigate();

    // 기존 공지사항 정보 + 수정할 입력값을 담는 State
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


// 기존 공지사항 상세 조회
useEffect(() => {

    if(!noticeId) {

            alert("잘못된 접근입니다.");

            navigate("/notice");

            return;
        }

    const selectNotice = async () => {

        try {

            const response = await selectNoticeApi(noticeId);

            setNotice(response.data);

        } catch(error) {

            console.log("공지사항 상세 조회용 ajax 통신 실패!");
            console.log(error);
        }
    };

    selectNotice();

}, [result, noticeId]);


// 입력값 변경 시 실행
const handleChange = e => {

    const newNotice = {...notice};

    newNotice[e.target.name] = e.target.value;

    setNotice(newNotice);
};


// 상단 고정 여부 변경
const handlePinnedChange = e => {

    const newNotice = {...notice};

    newNotice.isPinned = e.target.checked ? 1 : 0;

    setNotice(newNotice);
};


// 수정하기 버튼 클릭
const updateNotice = async e => {

    e.preventDefault();

    try {

        const response = await updateNoticeApi(noticeId, notice);

        // console.log(response.data);

        if(response.data === "success") {

            alert("공지사항 수정에 성공했습니다.");

            // 해당 게시글 상세조회 페이지로 이동
            navigate(`/notice`);

        } else {

            alert("공지사항 수정에 실패했습니다.");

            // 기존 공지사항 내용을 다시 조회
            setResult(response.data);
        }

    } catch(error) {

        console.log("공지사항 수정용 ajax 통신 실패!");
        console.log(error);
    }
};


return (

        <div className="notice-dashboard">


            {/* 페이지 제목 */}
            <div className="notice-title-area">

                <h2>
                    공지사항 수정
                </h2>

            </div>


            {/* 수정 카드 */}
            <div className="notice-card">


                <form
                    className="notice-form"
                    onSubmit={ updateNotice }
                >


                    {/* 제목 */}
                    <div className="notice-form-item">

                        <label className="notice-form-label">
                            제목
                        </label>


                        <input
                            type="text"

                            className="notice-input"

                            name="title"

                            value={
                                notice.title
                            }

                            onChange={
                                handleChange
                            }

                            maxLength="200"
                        />

                    </div>


                    {/* 내용 */}
                    <div className="notice-form-item">

                        <label className="notice-form-label">
                            내용
                        </label>


                        <textarea
                            className="notice-textarea"

                            name="content"

                            value={
                                notice.content
                            }

                            onChange={
                                handleChange
                            }

                            maxLength="4000"
                        />

                    </div>


                    {/* 상단고정 */}
                    <div className="notice-form-item">

                        <label className="notice-form-label">
                            상단 고정
                        </label>


                        <div className="notice-checkbox-area">

                            <input
                                type="checkbox"

                                checked={
                                    notice.isPinned === 1
                                }

                                onChange={
                                    handlePinnedChange
                                }
                            />

                            <span>
                                중요 공지사항을 상단에 고정합니다
                            </span>

                        </div>

                    </div>


                    {/* 버튼 */}
                    <div className="notice-btn-area">

                        <button
                            type="submit"
                            className="notice-btn notice-btn-primary"
                        >
                            수정하기
                        </button>


                        <button
                            type="button"
                            className="notice-btn notice-btn-secondary"

                            onClick={ () => {

                                navigate(
                                    `/notice/detail/${ noticeId }`
                                );

                            }}
                        >
                            뒤로가기
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );
}

export default NoticeUpdateForm;