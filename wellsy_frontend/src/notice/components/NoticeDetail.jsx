import { useNavigate, useParams } from "react-router-dom";

import { useState, useEffect } from "react";

import { selectNoticeApi, deleteNoticeApi } from "../api/noticeApi";

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
    <div>

        <h2 align="center">공지사항 상세 조회</h2>

        <br /><br />

        <table className="table">

            <tbody>

                <tr>
                    <th width="130">제목</th>

                    <td colSpan="3">
                        { notice.isPinned === 1 && "[고정] " }
                        { notice.title }
                    </td>
                </tr>


                <tr>
                    <th>작성자</th>

                    <td>
                        { notice.employeeNo }
                    </td>

                    <th width="130">작성일</th>

                    <td>
                        {
                            notice.createdAt
                                ? notice.createdAt.substring(0, 10)
                                : ""
                        }
                    </td>
                </tr>


                <tr>
                    <th>조회수</th>

                    <td colSpan="3">
                        { notice.viewCount }
                    </td>
                </tr>


                <tr>
                    <th>내용</th>

                    <td colSpan="3">

                        <p style={{ height : "300px" }}>
                            { notice.content }
                        </p>

                    </td>
                </tr>

            </tbody>

        </table>


        <br /><br />


        <div align="center">

            <button
                className="btn btn-outline-secondary btn-sm"
                onClick={ () => {
                    navigate("/notice");
                }}
            >
                목록으로
            </button>

            &nbsp;&nbsp;

            <button
                className="btn btn-outline-warning btn-sm"
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

            &nbsp;&nbsp;

            <button
                className="btn btn-outline-danger btn-sm"
                onClick={ deleteNotice }
            >
                삭제하기
            </button>

        </div>


        <br /><br />

    </div>
    );
}

export default NoticeDetail;