import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { insertNoticeApi } from "../api/noticeApi";

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

    const newNotice = {...notice};

    newNotice[e.target.name] = e.target.value;

    setNotice(newNotice);
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

    try {

        const response = await insertNoticeApi(notice);

        // console.log(response.data);

        if(response.data === "success") {

            alert("공지사항 작성에 성공했습니다.");

            // 작성 성공 시 목록으로 이동
            navigate("/notice/list");

        } else {

            alert("공지사항 작성에 실패했습니다.");
        }

    } catch(error) {

        console.log("공지사항 등록용 ajax 통신 실패!");
        console.log(error);
    }
};


return (
    <div>

        <h2 align="center">공지사항 작성</h2>

        <br /><br />

        <form id="enroll-form" onSubmit={ insertNotice }>

            <table className="form table">

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
                            ></textarea>
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
                    작성하기
                </button>

                &nbsp;&nbsp;

                <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                    onClick={ () => {
                        setNotice({
                            title : "",
                            content : "",
                            isPinned : 0,
                            employeeNo : 1
                        });
                    }}
                >
                    초기화
                </button>

            </div>


            <br /><br />

        </form>

    </div>
    );
}

export default NoticeEnrollForm;