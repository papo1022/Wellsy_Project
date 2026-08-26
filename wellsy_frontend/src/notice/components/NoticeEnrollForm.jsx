import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { insertNoticeApi } from "../api/noticeApi";

import "../styles/Notice.css";

function NoticeEnrollForm() {

    // navigate 함수 셋팅
    let navigate = useNavigate();

    // 입력값을 담아둘 State 변수
    const [notice, setNotice] = useState({
        title : "",
        content : "",
        isPinned : 0,
        employeeNo : 1
    });

    /*
        employeeNo는 추후 JWT 로그인 기능이 완성되면
        현재 로그인한 직원의 사번을 넣어줘야 함.

        현재는 테스트를 위해 임시로 1번 사번을 사용.
    */


// 입력값 변경 시 실행
const handleChange = e => {

    const { name, value } = e.target;

    setNotice({
        ...notice,
        [name] : value.trimStart()
    });
};


// 상단 고정 체크박스 변경
const handlePinnedChange = e => {

    const newNotice = {...notice};

    newNotice.isPinned = e.target.checked ? 1 : 0;

    setNotice(newNotice);
};


// 작성하기 버튼 클릭 시 실행
const insertNotice = async e => {

        e.preventDefault();


        if(notice.title.trim() === "") {

            alert("제목을 입력해주세요");

            return;
        }


        if(notice.content.trim() === "") {

            alert("내용을 입력해주세요");

            return;
        }

    try {

        const response = await insertNoticeApi(notice);

        // console.log(response.data);

        if(response.data === "success") {

            alert("공지사항 작성에 성공했습니다.");

            // 작성 성공 시 목록으로 이동
            navigate("/notice");

        } else {

            alert("공지사항 작성에 실패했습니다.");
        }

    } catch(error) {

        console.log("공지사항 등록용 ajax 통신 실패!");
        console.log(error);
    }
};


return (

        <div className="notice-dashboard">


            {/* 페이지 상단 */}
            <div className="notice-title-area">

                <h2>
                    공지사항 작성
                </h2>

            </div>


            {/* 작성 카드 */}
            <div className="notice-card">


                <form
                    className="notice-form"
                    onSubmit={ insertNotice }
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

                            placeholder="제목을 입력해주세요."
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

                            placeholder="공지사항 내용을 입력해주세요."
                        />

                    </div>


                    {/* 상단 고정 */}
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
                            작성하기
                        </button>

                        <button
                            type="button"
                            className="notice-btn notice-btn-secondary"
                            onClick={ () => {
                                navigate("/notice");
                            }}
                        >
                            목록으로
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );
}

export default NoticeEnrollForm;