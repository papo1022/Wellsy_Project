import { useState, useEffect, useRef } from "react";
import { getRoomList, deleteRoom } from "../api/aiApi";
import "../styles/ChatSidebar.css";

// selectedRoomId: 지금 보고 있는 방 (강조 표시용)
// onSelectRoom: 방 클릭 시 부모(ChatWindow)에게 알려주는 함수
// onNewChat: "새 채팅" 클릭 시 실행
function ChatSidebar({ employeeNo, selectedRoomId, onSelectRoom, onNewChat }) {

    const [rooms, setRooms] = useState([]);
    const [isOpen, setIsOpen] = useState(false); // 접었다 펼 수 있는 상태
    const fetchRooms = () => {
        if(!employeeNo) return;
        getRoomList(employeeNo).then((response) => {
            setRooms(response.data);
        });
    };

    useEffect(() => {
        fetchRooms();
    }, [employeeNo, selectedRoomId]);

    // 사이드바 전체 영역을 가리키는 참조
    const sidebarRef = useRef(null);

    useEffect(() => {

        if(!employeeNo) return; // 사원번호가 없을 때 요청 방지

        getRoomList(employeeNo).then((response) => {
            setRooms(response.data);
        });
    }, [employeeNo, selectedRoomId]); // 새 방이 생기면(selectedRoomId 변경) 목록도 갱신

    // 사이드바 바깥 부분 클릭 감지
    useEffect(() => {
        // 문서 전체에서 마우스를 누를 때마다 실행되는 함수
        const handleClickOutside = (event) => {

            // sidebarRef가 가리키는 요소(사이드바) "안"에서 클릭한 게 아니라면 -> 사이드바 닫기
            if(sidebarRef.current && !sidebarRef.current.contains(event.target)) {

                setIsOpen(false);
            }
        };

        // 열려 있을 때만 이벤트를 등록 (닫혀 있을 때는 감지할 필요 없음)
        if(isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        // 컴포넌트가 사라지거나, isOpen이 바뀌어서 useEffect가 다시 실행되기 직전에
        // 이전에 등록해둔 이벤트를 반드시 clean up(정리)해야 함
        // (안 하면 클릭할 때마다 이벤트 리스너가 계속 쌓여서 나중에 느려짐)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    // 채팅방 삭제 핸들러
    const handleDeleteRoom = async (e, roomId) => {

        e.stopPropagation(); // 방 선택(클릭) 이벤트 전달 방지

        if(window.confirm("이 채팅방을 삭제하시겠습니까?")) {

            try {
                await deleteRoom(roomId);

                // 지금 삭제한 방을 보고 있었다면 새 대화 화면으로 전환
                if(roomId === selectedRoomId) {
                    onNewChat();
                }

                // 목록 새로고침
                fetchRooms();

            } catch(error) {

                console.error("채팅방 삭제 실패: ", error);
            }
        }
    };

    // 화면
    return (

     <div
        ref={sidebarRef}
        className={isOpen ? "chat-sidebar open" : "chat-sidebar closed"}
     >
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
                            <span className="chat-room-title">{room.title}</span>
                            <button
                                className="chat-room-delete-btn"
                                onClick={(e) => handleDeleteRoom(e, room.chatRoomId)}
                                title="삭제"
                            >
                                ✕
                            </button>
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