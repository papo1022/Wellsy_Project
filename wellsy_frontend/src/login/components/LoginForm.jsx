import { useState } from "react";
import { loginEmployeeApi } from "../api/LoginApi";

function LoginForm() {

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

                setResult("로그인 성공! 토큰: " + response.data);

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