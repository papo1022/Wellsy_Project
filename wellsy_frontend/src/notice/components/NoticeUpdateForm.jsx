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

    const selectNotice = async () => {

        try {

            const response = await selectNoticeApi(noticeId);

            // console.log(response.data);

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
            navigate(`/notice/detail/${ noticeId }`);

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
    <div>

        <h2 align="center">공지사항 수정</h2>

        <br /><br />

        <form id="update-form" onSubmit={ updateNotice }>

            <table className="table form">

                <tbody>

                    <tr>
                        <th width="130">제목</th>

                        <td>
                            <input
                                type="text"
                                name="title"
                                value={ notice.title }
                                onChange={ handleChange }
                            />
                        </td>
                    </tr>


                    <tr>
                        <th>내용</th>

                        <td>
                            <textarea
                                name="content"
                                value={ notice.content }
                                onChange={ handleChange }
                            />
                        </td>
                    </tr>


                    <tr>
                        <th>상단 고정</th>

                        <td>
                            <input
                                type="checkbox"
                                checked={ notice.isPinned === 1 }
                                onChange={ handlePinnedChange }
                            />

                            &nbsp;상단 고정
                        </td>
                    </tr>

                </tbody>

            </table>


            <br /><br />


            <div align="center">

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-sm"
                >
                    수정하기
                </button>

                &nbsp;&nbsp;

                <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                    onClick={ () => {
                        navigate(`/notice/detail/${ noticeId }`);
                    }}
                >
                    뒤로가기
                </button>

            </div>


            <br /><br />

        </form>

    </div>
    );
}

export default NoticeUpdateForm;