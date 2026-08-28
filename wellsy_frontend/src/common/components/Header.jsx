import { Link, useLocation } from "react-router-dom";
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

    // 현재 메뉴 상태 hover
    // 현재 브라우저 주소를 가져옴
    const location = useLocation();

    // 메뉴 경로랑 지금 주소가 같은지 비교해서 클래스 이름을 골라주는 함수
    const getNavClass = (path) => {

        return location.pathname === path ? "nav-icon active" : "nav-icon";
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
        <div className="header-sidebar">
            <div className="header-logo">Wellsy</div>

            <br/><br/>

            {/* 만약 사원 roll이라면 (= 관리자가 아닐 때, 로그인 안 한 상태) */}
            {/* 사원 메뉴 */}
            {role !== "ADMIN" && (

                <div className="navi">
                    <div>
                        <Link to="/" className={getNavClass("/home")} title="Home">
                            <i className="fi fi-sr-home"></i>
                            <br/>
                            홈
                        </Link>
                    </div>
                    <div>
                        <Link to="/health" className={getNavClass("/health")} title="건강 관리">
                            <i className="fi fi-ss-chart-simple"></i>
                            <br/>
                            건강 관리
                        </Link>
                    </div>
                    <div>
                        <Link to="/check" className={getNavClass("/check")} title="건강검진">
                            <i className="fi fi-sr-calendar"></i>
                            <br/>
                            건강검진
                        </Link>
                    </div>
                    <div>
                        <Link to="/chat" className={getNavClass("/chat")} title="AI 챗봇">
                            <i className="fi-sr-comment-dots"></i>
                            <br/>
                            AI 챗봇
                        </Link>
                    </div>
                    <div>
                        <Link to="/notice" className={getNavClass("/notice")} title="공지사항">
                            <i className="fi-sr-megaphone"></i>
                            <br/>
                            공지사항
                        </Link>
                    </div>
                    <div>
                        <Link to="/my" className={getNavClass("/my")} title="마이페이지">
                            <i className="fi-sr-user"></i>
                            <br/>
                            마이페이지
                        </Link>
                    </div>
                </div>

            )}

            {/* 관리자 메뉴: role이 ADMIN일 때만 */}
            {role === "ADMIN" && (
                <div className="navi">
                    <div>
                        <Link to="/" className={getNavClass("/home")} title="Home">
                            <i className="fi fi-sr-home"></i>
                            <br/>
                            홈
                        </Link>
                    </div>
                    <div>
                        <Link to="/employee">
                            <i className="fi-sr-users"></i>
                            <br/>
                            사원 관리
                        </Link>
                    </div>
                    <div>
                        <Link to="/checkman">
                            <i className="fi-sr-doctor"></i>
                            <br/>
                            건강검진
                        </Link>
                    </div>
                    <div>
                        <Link to="/status">
                            <i className="fi-sr-document"></i>
                            <br/>
                            건강 리포트
                        </Link>
                    </div>
                    <div>
                        <Link to="/notice" className={getNavClass("/notice")} title="공지사항">
                            <i className="fi-sr-megaphone"></i>
                            <br/>
                            공지사항
                        </Link>
                    </div>
                    <div>
                        <Link to="/my" className={getNavClass("/my")} title="마이페이지">
                            <i className="fi-sr-user"></i>
                            <br/>
                            마이페이지
                        </Link>
                    </div>
                </div>
            )}

        </div>
    );
}

// 내보내기
export default Header;