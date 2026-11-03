import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { findIdApi, sendResetCodeApi, validateResetCodeApi, resetPasswordApi } from "../api/accountApi";
import "../styles/FindAccount.css";

function FindAccount() {

    const navigate = useNavigate();

    // "id": 아이디 찾기 탭
    // "password": 비밀번호 재설정 탭
    const [tab, setTab] = useState("id");

    // 아이디 찾기 상태(useState)
    const [findEmail, setFindEmail] = useState("");
    const [findResult, setFindResult] = useState("");

    // 비밀번호 재설정 상태
    const [step, setStep] = useState(1); // step 숫자 설정
    const [loginId, setLoginId] = useState("");
    const [pwEmail, setPwEmail] = useState("");
    const [certNo, setCertNo] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [pwResult, setPwResult] = useState("");

    // 탭 전환 핸들러 (상태 초기화)
    const handleTabChange = (selectedTab) => {
        setTab(selectedTab);
        setStep(1);
        setFindResult("");
        setPwResult("");
    }

    // 아이디 찾기
    const handleFindId = async () => {

        try {
            const response = await findIdApi(findEmail);

            setFindResult(response.data);
        } catch(error) {

            setFindResult("아이디 찾기 중 오류가 발생했습니다.");
        }
    };

    // step 1: 아이디/이메일 입력
    const handleSendCode = async () => {

        try{
            const response = await sendResetCodeApi(loginId, pwEmail);

            setPwResult(response.data);

            if(response.data.includes("발송")) {

                setStep(2);
            }
        } catch(error) {

            setPwResult("인증번호 발송 실패")
        }
    };

    // step 2: 인증번호 입력
    const handleValidateCode = async () => {

        try {
            const response = await validateResetCodeApi(pwEmail, certNo);

            if(response.data === true) {

                setPwResult("인증 확인되었습니다. 새 비밀번호를 입력해주세요.");
                setStep(3);

            } else {

                setPwResult("인증번호가 일치하지 않습니다.");
            }
        } catch(error) {
            
            setPwResult("인증 검증 실패");
        }
    };

    // step 3: 새 비밀번호 입력
    const handleResetPassword = async () => {

        try {
            const response = await resetPasswordApi(loginId, pwEmail, certNo, newPassword);

            setPwResult(response.data);

            if(response.data.includes("변경")) {

                setStep(4);
            }
        } catch(error) {

            setPwResult("비밀번호 변경 실패");
        }
    };

    // 화면
    return (

        <div className="find-account-container">

            <div className="find-account-tabs">
                <button
                    className={tab === "id" ? "active" : ""}
                    onClick={() => handleTabChange("id")}
                >
                    아이디 찾기
                </button>

                <button
                    className={tab === "password" ? "active" : ""}
                    onClick={() => handleTabChange("password")}
                >
                    비밀번호 재설정
                </button>
        </div>

        {tab === "id" && (
            <div className="find-account-form">
                <input
                    placeholder="가입한 이메일을 입력하세요"
                    value={findEmail}
                    onChange={(e) => setFindEmail(e.target.value)}
                />

                <button onClick={handleFindId}>아이디 찾기</button>
                {findResult && <p>{findResult}</p>}
            </div>
        )}
        
        {/* Step 1 */}
        {tab === "password" && (
            <div className="find-account-form">
                {step === 1 && (
                    <>
                        <input 
                            placeholder="아이디"
                            value={loginId}
                            onChange={(e) => setLoginId(e.target.value)}
                        />
                        <input
                            placeholder="가입한 이메일"
                            value={pwEmail}
                            onChange={(e) => setPwEmail(e.target.value)}
                        />
                        <button onClick={handleSendCode}>인증번호 발송</button>
                    </>
                )}

                {/* Step 2 */}
                {step === 2 && (
                    <>
                        <input
                            placeholder="인증번호 6자리"
                            value={certNo}
                            onChange={(e) => setCertNo(e.target.value)}
                        />
                        <button onClick={handleValidateCode}>인증 확인</button>
                    </>
                )}

                {/* Step 3 */}
                {step === 3 && (
                    <>
                        <input
                            placeholder="새 비밀번호"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <button onClick={handleResetPassword}>비밀번호 변경</button>
                    </>
                )}

                {/* Step 4: 완료 안내 */}
                {step === 4 && (
                    <div className="success-step">
                        <p>비밀번호가 성공적으로 변경되었습니다.</p>

                        <button onClick={() => handleTabChange("id")}>아이디 찾기로 이동</button>
                        <button onClick={() => navigate("/login")}>로그인으로 이동</button>
                    </div>
                )}
                
                {step !== 4 && pwResult && (
                    <p className="result-message">{pwResult}</p>
                )}
            </div>
        )}
        </div>
    );
}

// 내보내기
export default FindAccount;