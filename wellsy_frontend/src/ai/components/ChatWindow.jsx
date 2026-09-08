import { useState, useEffect, useRef } from 'react';
import { jwtDecode } from "jwt-decode";
import ReactMarkdown from "react-markdown";
import { sendChatMessage, getRoomList, getRoomMessages, deleteRoom } from "../api/aiApi";
import ChatSidebar from "./ChatSidebar";
import "../styles/ChatWindow.css";

function ChatWindow() {

    // 로그인한 사원 번호 꺼내기
    const token = sessionStorage.getItem("token");
    const employeeNo = token ? jwtDecode(token).employeeNo : null;

    const [roomId, setRoomId] = useState(null); // 지금 보고 있는 채팅방 (null이면 새 대화)
    const [messages, setMessages] = useState([
        { sender: "ai", text: "안녕하세요! 저는 Wellsy의 AI 헬스코치예요. 무엇을 도와드릴까요? 😊"}
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesContainerRef = useRef(null);

    // 메시지가 생길 때마다 아래로 자동 스크롤 (useRef 사용)
    useEffect(() => {

        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    }, [messages]);

    // 사이드바에서 방을 클릭했을 때 - 그 방의 이력을 불러와서 화면에 표시
    const handleSelectRoom = async (selectedRoomId) => {

        setRoomId(selectedRoomId);
        const response = await getRoomMessages(selectedRoomId);

        // DB에 저장된 형태({ senderType, messageContent })를
        // 화면에서 쓰는 형태({ sender, text })로 변환
        const loaded = response.data.map((m) => ({
            sender: m.senderType === "USER" ? "user" : "ai",
            text: m.messageContent,
        }));

        setMessages(loaded);
    };

    // "새 채팅" 클릭 시 - 초기 화면으로
    const handleNewChat = () => {
        
        setRoomId(null);
        setMessages([
            { sender: "ai", text: "안녕하세요! 새로운 상담을 시작할게요. 무엇이 궁금하신가요? 😊" }
        ]);
    };

    const handleSend = async () => {

        if(input.trim() === "") return;

        const userMessage = { sender: "user", text: input };
        setMessages((prev) => [...prev, userMessage]);

        const currentInput = input;
        setInput("");
        setIsLoading(true);

        try {
            const response = await sendChatMessage(roomId, employeeNo, currentInput);

            // 첫 메시지였다면 서버가 새로 만든 roomId를 알려줌 -> 저장
            if(roomId == null) {

                setRoomId(response.data.chatRoomId);
            }

            const aiMessage = { sender: "ai", text: response.data.messageContent };
            setMessages((prev) => [...prev, aiMessage]);

        } catch(error) {

            setMessages((prev) => [...prev, {
                sender: "ai",
                text: "연동 준비 중입니다. 잠시 후 다시 시도해 주세요."
            }]);

            console.error("AI 챗봇 에러: ", error);

        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e) => {

        if(e.key === "Enter") handleSend();
    };

    // 화면
    return (

        <div className="chat-page">
            <ChatSidebar 
                employeeNo={employeeNo}
                selectedRoomId={roomId}
                onSelectRoom={handleSelectRoom}
                onNewChat={handleNewChat}
            />

            <div className="chat-container">
                <h2 className="chat-title">AI 헬스코치</h2>

                <div className="chat-message" ref={messagesContainerRef}>
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={msg.sender === "user" ? "chat-bubble user" : "chat-bubble ai"}
                        >
                            {msg.sender === "ai" ? (
                                <ReactMarkdown>{msg.text}</ReactMarkdown>
                            ) : (
                                msg.text
                            )}
                        </div>
                    ))}
                    {isLoading && <div className="chat-bubble ai">입력 중...</div>}
                </div>

                <div className="chat-input-area">
                    <input
                        className="chat-input"
                        placeholder="메시지를 입력하세요"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button className="chat-send-button" onClick={handleSend}>전송</button>
                </div>

            </div>
        </div>
    );
}

// 내보내기
export default ChatWindow;