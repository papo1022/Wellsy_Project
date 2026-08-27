import { useState } from "react";
import { loginEmployeeApi } from "../api/LoginApi";
import { jwtDecode } from "jwt-decode";
import "../styles/Login.css";

// App.jsx로부터 setToken 함수를 전달받음
function LoginForm({ setToken }) {

    // 사용자가 입력하는 아이디/비밀번호
    const [loginId, setLoginId] = useState("");
    const [password, setPassword] = useState("");
    // 로그인 결과 메시지 (화면에 보여주기용)
    const [result, setResult] = useState("");

    const handleLogin = async () => {

        try {

            const response = await loginEmployeeApi({ loginId, password });

            if(response.data) {
                // 서버가 JWT 문자열을 응답으로 줌 -> 로그인 성공

                const token = response.data;

                // 1) 토큰을 브라우저에 저장 (새로고침해도 로그인 유지)
                sessionStorage.setItem("token", token);

                // 2) role에 따라 다른 화면으로 이동
                //    로그인 후 화면으로 전환
                setToken(token);

                // setResult("로그인 성공! 토큰: " + response.data);

            } else {
                // 서버가 null을 응답으로 줌 -> 아이디/비번 불일치

                setResult("아이디 또는 비밀번호가 틀렸습니다.");
            }

        } catch (error) {

            setResult("에러 발생: " + error.message);
        }
    };

    // 화면
    return (

        <div className="login-page">

            <div className="login-card">

                <h2 className="login-title">로그인하세요</h2>
                <p className="login-subtitle">웰시와 함께 내 건강을 관리해 보세요</p>

                <div className="login-input-group">
                    <input
                        className="login-input"
                        placeholder="아이디"
                        value={loginId}
                        onChange={(e) => setLoginId(e.target.value)}
                    />
                    <input
                        className="login-input"
                        placeholder="비밀번호"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button className="login-button" onClick={handleLogin}>로그인</button>

                {result && <p className="login-error">{result}</p>}

            </div>

        </div>
    );
}

// 내보내기
export default LoginForm;