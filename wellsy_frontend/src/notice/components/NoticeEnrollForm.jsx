import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { insertNoticeApi } from "../api/noticeApi";

import "../styles/Notice.css";


function NoticeEnrollForm() {


    // =========================================
    // BYTE 제한
    // =========================================

    const TITLE_MAX_BYTE = 200;

    const CONTENT_MAX_BYTE = 4000;


    // =========================================
    // navigate
    // =========================================

    let navigate
        = useNavigate();


    // =========================================
    // 입력값
    // =========================================

    const [notice, setNotice]
        = useState({

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


    // =========================================
    // UTF-8 BYTE 계산
    // =========================================

    const getByteLength = value => {


        return new TextEncoder()
            .encode(
                value ?? ""
            )
            .length;

    };


    // =========================================
    // BYTE 제한
    // =========================================

    const limitByByte = (
        value,
        maxByte
    ) => {


        let result = "";


        for(const char of value) {


            const nextValue
                = result + char;


            if(
                getByteLength(
                    nextValue
                )
                >
                maxByte
            ) {

                break;
            }


            result
                = nextValue;

        }


        return result;

    };


    // =========================================
    // 입력값 변경
    // =========================================

    const handleChange = e => {


        const {
            name,
            value
        } = e.target;


        // 처음 공백 제거
        const inputValue
            = value.trimStart();


        // 제목
        if(name === "title") {


            setNotice({

                ...notice,

                title :
                    limitByByte(
                        inputValue,
                        TITLE_MAX_BYTE
                    )

            });


            return;
        }


        // 내용
        if(name === "content") {


            setNotice({

                ...notice,

                content :
                    limitByByte(
                        inputValue,
                        CONTENT_MAX_BYTE
                    )

            });


            return;
        }


        setNotice({

            ...notice,

            [name] :
                inputValue

        });

    };


    // =========================================
    // 상단 고정 체크박스
    // =========================================

    const handlePinnedChange = e => {


        const newNotice
            = {
                ...notice
            };


        newNotice.isPinned
            = e.target.checked
            ?
            1
            :
            0;


        setNotice(
            newNotice
        );

    };


    // =========================================
    // 작성하기
    // =========================================

    const insertNotice = async e => {


        e.preventDefault();


        // 제목 검사
        if(
            notice.title.trim() === ""
        ) {

            alert(
                "제목을 입력해주세요"
            );

            return;
        }


        // 내용 검사
        if(
            notice.content.trim() === ""
        ) {

            alert(
                "내용을 입력해주세요"
            );

            return;
        }


        try {


            const response
                = await insertNoticeApi(
                    notice
                );


            if(
                response.data === "success"
            ) {


                alert(
                    "공지사항 작성에 성공했습니다."
                );


                navigate(
                    "/notice"
                );


            } else {


                alert(
                    "공지사항 작성에 실패했습니다."
                );

            }


        } catch(error) {


            console.log(
                "공지사항 등록용 ajax 통신 실패!"
            );


            console.log(error);

        }

    };


    return (

        <div className="notice-dashboard">


            {/* ================================= */}
            {/* 페이지 상단 */}
            {/* ================================= */}

            <div className="notice-title-area">


                <h2>
                    공지사항 작성
                </h2>


            </div>


            {/* ================================= */}
            {/* 작성 카드 */}
            {/* ================================= */}

            <div className="notice-card">


                <form
                    className="notice-form"

                    onSubmit={
                        insertNotice
                    }
                >


                    {/* ================================= */}
                    {/* 제목 */}
                    {/* ================================= */}

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

                            placeholder="제목을 입력해주세요."
                        />


                        {/* BYTE 표시 */}

                        <div className="notice-byte-count">


                            <span>

                                {
                                    getByteLength(
                                        notice.title
                                    )
                                }

                            </span>


                            <span>
                                / {TITLE_MAX_BYTE} BYTE
                            </span>


                        </div>


                    </div>


                    {/* ================================= */}
                    {/* 내용 */}
                    {/* ================================= */}

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

                            placeholder="공지사항 내용을 입력해주세요."
                        />


                        {/* BYTE 표시 */}

                        <div className="notice-byte-count">


                            <span>

                                {
                                    getByteLength(
                                        notice.content
                                    )
                                }

                            </span>


                            <span>
                                / {CONTENT_MAX_BYTE} BYTE
                            </span>


                        </div>


                    </div>


                    {/* ================================= */}
                    {/* 상단 고정 */}
                    {/* ================================= */}

                    <div className="notice-form-item">


                        <label className="notice-form-label">

                            상단 고정

                        </label>


                        <label className="notice-checkbox-area">


                            <input
                                type="checkbox"

                                checked={
                                    notice.isPinned === 1
                                }

                                onChange={
                                    handlePinnedChange
                                }
                            />


                            <span className="notice-checkbox-text">

                                중요 공지사항을 상단에 고정합니다

                            </span>


                        </label>


                    </div>


                    {/* ================================= */}
                    {/* 버튼 */}
                    {/* ================================= */}

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

                            onClick={
                                () => {

                                    navigate(
                                        "/notice"
                                    );

                                }
                            }
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