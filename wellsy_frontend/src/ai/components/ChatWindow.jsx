import { useState, useEffect, useRef } from 'react';
// 기본 React Hooks (데이터 상태 저장, 화면 처음 켜질 시 API 가져오기 등)
import { sendChatMessage } from "../api/aiApi";
// API 폴더에서 만들어 둔 'AI 챗봇에게 메시지를 보내는 함수' 가져오기
import "../styles/ChatWindow.css";
// 스타일 (CSS)

function ChatWindow() {

    // 대화 내역을 저장하는 배열
    // 각 원소는 { sender: "user" | "ai", text: "메시지 내용" } 형태
    const [messages, setMessages] = useState ([
        // useState에 message 내용 저장
        
        { sender: "ai", text: "안녕하세요! 저는 Wellsy의 AI 헬스코치예요. 평소 운동량이나 목표를 알려주시면 맞춤 플랜을 짜 드릴게요. 😊" }
    ]);

    // 사용자가 지금 입력창에 타이핑 중인 내용
    const [input, setInput] = useState("");

    // 응답을 기다리는 중인지 (로딩 표시용)
    const [isLoading, setIsLoading] = useState(false);

    // 세 메시지가 생길 때마다 스크롤을 맨 아래로 내리기 위한 참조
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }, [message]);

    const handleSend = async () => { // 비동기 요청
        
        // 빈 메시지는 전송 안 함
        if (input.trim() === "") return;

        // 1) 사용자 메시지를 화면에 바로 추가 (응답을 기다리는 동안에도 보이도록)
        const userMessage = { sender: "user", text: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            // 2) 백엔드에 메시지 전송
            const response = await sendChatMessage(input);

            // 3) AI 응답을 대화 내역에 추가
            // TODO: 실제 백엔드 응답 구조에 맞춰 response.data 부분 수정 필요
            //       (예: response.data가 문자열인지, { reply: "..."} 객체인지에 따라 다름)
            const aiMessage = { sender: "ai", text: response.data };
            
            setMessages((prev) => [...prev, aiMessage]);

        } catch(error) {
            // 백엔드 API가 아직 준비가 안 됐거나 에러가 났을 때 - 임시 안내 메시지
            const errorMessage = {
                sender: "ai",
                text: "연동 준비 중입니다. 잠시 후 다시 시도해 주세요."
            };

            setMessages((prev) => [...prev, errorMessage]);

            console.error("AI 챗봇 에러: ", error);

        } finally {

            setIsLoading(false);
        }
    };

    // Enter 키로도 전송이 가능하게
    const handleKeyDown = (e) => {

        if (e.key === "Enter") {
            handleSend();
        }
    };

    // 화면 꾸리기
    return (
        <div className="chat-container">

            <h2 className="chat-title">AI 헬스코치</h2>

            <div className="chat-message">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={msg.sender === "user" ? "chat-bubble user" : "chat-bubble ai"}
                    >
                        {msg.text}

                        {/* 세부 기능(예: 운동 일정 자동 추가) 이어서 구현 */}
                        {msg.sender === "ai" && (
                            
                            <button
                                className="chat-apply-button"
                                onClick={() => {
                                    // TODO: 여기서 AI가 짜준 운동 일정을
                                    //       일일 운동 일정 페이지(/health/calendar 등)에 자동 등록하는 로직 구현

                                    console.log("일정에 적용하기 버튼 클릭됨")
                                }}>
                                일정에 적용하기
                            </button>
                        )}
                    </div>
                ))}

                {isLoading && <div className="chat-bubble ai">입력 중...</div>}

                {/* 스크롤을 맨 아래로 이동시키기 위한 빈 div */}
                <div ref={bottomRef}></div>
            </div>

            <div className="chat-input-area">
                <input 
                    className="chat-input"
                    placeholder="메시지를 입력하세요"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button className="chat-send-button" onClick={handleSend}>
                    전송
                </button>
            </div>       
        </div>
    );
}

// 내보내기
export default ChatWindow;