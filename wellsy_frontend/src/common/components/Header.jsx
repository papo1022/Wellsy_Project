import { Link } from "react-router-dom";

import "../styles/Header.css";

function Header() {

    // 실행할 구문

    // return 구문
    return (
        <div>
            <h1 align="center">Wellsy</h1>

            <br/><br/>

            {/* 만약 사원 roll이라면  */}

            <div className="navi">
                <div>
                    <Link to="/">HOME</Link>
                </div>
                <div>
                    <Link to="/health">건강 관리</Link>
                </div>
                <div>
                    <Link to="/check">건강검진</Link>
                </div>
                <div>
                    <Link to="/chat">AI 챗봇</Link>
                </div>
                <div>
                    <Link to="/notice">공지사항</Link>
                </div>
                <div>
                    <Link to="/my">마이페이지</Link>
                </div>
            </div>

            {/* 만약 관리자 roll이라면 */}
            <div className="navi">
                <div>
                    <Link to="/">HOME</Link>
                </div>
                <div>
                    <Link to="/employ">사원 관리</Link>
                </div>
                <div>
                    <Link to="/checkman">건강검진</Link>
                </div>
                <div>
                    <Link to="/status">통계 / 건강 리포트</Link>
                </div>
                <div>
                    <Link to="/notice">공지사항</Link>
                </div>
                <div>
                    <Link to="/my">마이페이지</Link>
                </div>
            </div>

        </div>
    );
}

// 내보내기
export default Header;