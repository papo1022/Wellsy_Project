import { useLocation, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

import { jwtDecode } from "jwt-decode";

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
    
useEffect(() => {


    const token
        = sessionStorage.getItem(
            "token"
        );


    if(!token) {

        alert(
            "로그인이 필요합니다."
        );

        navigate("/");

        return;
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


        if(
            role !== "ADMIN"
            &&
            role !== "ROLE_ADMIN"
        ) {


            alert(
                "관리자만 공지사항을 수정할 수 있습니다."
            );


            navigate(
                "/notice"
            );

        }


    } catch(error) {


        navigate(
            "/notice"
        );

    }


}, []);


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

    const {
        name,
        value
    } = e.target;


    // 제목
    if(name === "title") {

        setNotice({

            ...notice,

            title: limitByByte(
                value,
                TITLE_MAX_BYTE
            )

        });

        return;
    }


    // 내용
    if(name === "content") {

        setNotice({

            ...notice,

            content: limitByByte(
                value,
                CONTENT_MAX_BYTE
            )

        });

        return;
    }


    setNotice({

        ...notice,

        [name]: value

    });
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

// =========================================
// BYTE 제한
// =========================================

const TITLE_MAX_BYTE = 200;

const CONTENT_MAX_BYTE = 4000;


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
// 최대 BYTE 제한
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
            getByteLength(nextValue)
            >
            maxByte
        ) {

            break;
        }


        result = nextValue;
    }


    return result;
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

                            placeholder="제목을 입력해주세요."
                        />


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

                            placeholder="공지사항 내용을 입력해주세요."
                        />


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

                            <span className="notice-checkbox-text">

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