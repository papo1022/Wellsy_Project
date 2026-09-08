import { useState, useEffect } from "react";
import { getRoomList } from "../api/aiApi";
import "../styles/ChatSidebar.css";

// selectedRoomId: 지금 보고 있는 방 (강조 표시용)
// onSelectRoom: 방 클릭 시 부모(ChatWindow)에게 알려주는 함수
// onNewChat: "새 채팅" 클릭 시 실행
function ChatSidebar({ employeeNo, selectedRoomId, onSelectRoom, onNewChat }) {

    const [rooms, setRooms] = useState([]);
    const [isOpen, setIsOpen] = useState(true); // 접었다 펼 수 있는 상태

    useEffect(() => {

        if(!employeeNo) return; // 사원번호가 없을 때 요청 방지

        getRoomList(employeeNo).then((response) => {
            setRooms(response.data);
        });
    }, [employeeNo, selectedRoomId]); // 새 방이 생기면(selectedRoomId 변경) 목록도 갱신

    // 화면
    return (

     <div className={isOpen ? "chat-sidebar open" : "chat-sidebar closed"}>
        <button className="chat-sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? "◀" : "▶"}
        </button>

        {isOpen && (
            <>
                <button className="chat-sidebar-new" onClick={onNewChat}>
                    + 새 채팅
                </button>

                <div className="chat-sidebar-list">
                    {rooms.map((room) => (
                        <div
                            key={room.chatRoomId}
                            className={
                                room.chatRoomId === selectedRoomId
                                ? "chat-sidebar-item active"
                                : "chat-sidebar-item"
                            }
                            onClick={() => onSelectRoom(room.chatRoomId)}
                        >
                            {room.title}
                        </div>
                    ))}
                </div>
            </>
        )}
     </div>   
    );
}

// 내보내기
export default ChatSidebar;