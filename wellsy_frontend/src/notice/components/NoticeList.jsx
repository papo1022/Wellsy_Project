import { useState, useEffect } from "react";

import { selectNoticeListApi } from "../api/noticeApi";

import NoticeItem from "./NoticeItem";

import { useNavigate } from "react-router-dom";

import "../styles/Notice.css";

function NoticeList() {

    // 화면 깜빡임 없이 URL 주소를 전환해줄 navigate 함수
    let navigate = useNavigate();

    // 조회된 데이터를 담을 배열 형태의 State 변수
    const [dataList, setDataList] = useState([]);


// 이 컴포넌트가 로딩된 후 최초 한 번 실행
useEffect(() => {

    const setNoticeList = async () => {

        try {

            const response = await selectNoticeListApi();

            // console.log(response.data);

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


return (

        <div className="notice-dashboard">


            {/* 공지사항 전체 카드 */}
            <div className="notice-card">


                {/* 공지사항 상단 영역 */}
                <div className="notice-list-header">

                    <h3>
                        공지사항 목록
                    </h3>


                    <button
                        type="button"
                        className="notice-btn notice-btn-primary"
                        onClick={ () => {

                            navigate("/notice/enrollForm");

                        }}
                    >
                        글작성
                    </button>

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
                                dataList
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

            </div>

        </div>
    );
}


// 내보내기
export default NoticeList;