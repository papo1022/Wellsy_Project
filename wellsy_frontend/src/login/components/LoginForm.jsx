import { useState } from "react";
import { loginEmployeeApi } from "../api/LoginApi";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

function LoginForm() {

    // 사용자가 입력하는 아이디/비밀번호
    const [loginId, setLoginId] = useState("");
    const [password, setPassword] = useState("");
    // 로그인 결과 메시지 (화면에 보여주기용)
    const [result, setResult] = useState("");

    // 로그인 성공 후 다른 페이지로 이동시키기 위한 함수
    const navigate = useNavigate();

    const handleLogin = async () => {

        try {

            const response = await loginEmployeeApi({ loginId, password });

            if(response.data) {
                // 서버가 JWT 문자열을 응답으로 줌 -> 로그인 성공

                const token = response.data;

                // 1) 토큰을 브라우저에 저장 (새로고침해도 로그인 유지)
                sessionStorage.setItem("token", token);

                // 2) 토큰 안에 들어 있는 정보(role 등)를 꺼내기
                const decoded = jwtDecode(token);

                // 3) role에 따라 다른 화면으로 이동
                //    (관리자/사원 화면 구분은 Header, MainDashboard 쪽에서 role 보고 알아서 처리함)
                navigate("/");

                // setResult("로그인 성공! 토큰: " + response.data);

            } else {
                // 서버가 null을 응답으로 줌 -> 아이디/비번 불일치

                setResult("로그인 실패: 아이디 또는 비밀번호가 틀렸습니다.");
            }

        } catch (error) {

            setResult("에러 발생: " + error.message);
        }
    };

    // 화면
    return (

        <div>

            <h2>로그인</h2>

            <div>
                <input
                    placeholder="아이디"
                    value={loginId}
                    onChange={(e) => setLoginId(e.target.value)}
                />
                <input
                    placeholder="비밀번호"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <button onClick={handleLogin}>로그인</button>

            <p>{result}</p>

        </div>
    );
}

// 내보내기
export default LoginForm;