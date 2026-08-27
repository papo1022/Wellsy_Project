import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import "../styles/Header.css";

// App.jsx로부터 setLoinUser 함수를 전달받음 (로그아웃 시 로그인 화면으로 되돌아감)
function Header({ setToken }) {

    // 실행할 구문
    // 저장된 토큰에서 로그인한 사람의 role 꺼내기
    const token = sessionStorage.getItem("token");
    let role = null;
    let name = null;

    if(token) {

        try {

            const decoded = jwtDecode(token);

            role = decoded.role;
            name = decoded.name;

        } catch(error) {
            // 토큰이 만료된 경우

            role = null;
            name = null;
        }
    }

    // 로그아웃 버튼 클릭 시 실행할 함수
    const handleLogout = () => {

        // 1) sessionStorage에서 토큰 제거
        sessionStorage.removeItem("token");

        // 2) App.jsx의 state를 null로 바꿔줌
        setToken(null);
    };

    // return 구문
    return (
        <div>
            <h1 align="center">Wellsy</h1>

            {/* 간략 프로필 + 로그아웃 (로그인한 상태에서만 보임) */}
            {token && (
                <div>
                    <span>{name}님 ({role === "ADMIN" ? "관리자" : "사원"})</span>
                    <button onClick={handleLogout}>로그아웃</button>
                </div>
            )}

            <br/><br/>

            {/* 만약 사원 roll이라면 (= 관리자가 아닐 때, 로그인 안 한 상태) */}
            {/* 사원 메뉴 */}
            {role !== "ADMIN" && (

                <div className="navi">
                    <div><Link to="/">HOME</Link></div>
                    <div><Link to="/health">건강 관리</Link></div>
                    <div><Link to="/check">건강검진</Link></div>
                    <div><Link to="/chat">AI 챗봇</Link></div>
                    <div><Link to="/notice">공지사항</Link></div>
                    <div><Link to="/my">마이페이지</Link></div>
                </div>

            )}

            {/* 관리자 메뉴: role이 ADMIN일 때만 */}
            {role === "ADMIN" && (
                <div className="navi">
                    <div><Link to="/">HOME</Link></div>
                    <div><Link to="/employee">사원 관리</Link></div>
                    <div><Link to="/checkman">건강검진</Link></div>
                    <div><Link to="/status">통계 / 건강 리포트</Link></div>
                    <div><Link to="/notice">공지사항</Link></div>
                    <div><Link to="/my">마이페이지</Link></div>
                </div>
            )}

        </div>
    );
}

// 내보내기
export default Header;