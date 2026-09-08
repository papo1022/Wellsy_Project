import axios from 'axios';
// 백엔드 API를 호출하고 데이터를 받아옴

const BASE_URL = "/wellsy"

// AI 챗봇에게 메시지를 보내는 함수
// TODO: 실제 정확한 엔드 포인트(/ai/chat 등)가 필요함, 추후 정해지면 수정할 것
const sendChatMessage = (roomId, employeeNo, message) => {

    return axios.post(`${BASE_URL}/ai/chat`, { roomId, employeeNo, message });
};

const getRoomList = (employeeNo) => {
    
    return axios.get(`${BASE_URL}/ai/rooms`, { params: { employeeNo } });
};

const getRoomMessages = roomId => {

    return axios.get(`${BASE_URL}/ai/rooms/${roomId}/messages`);
};

// 채팅방 삭제
const deleteRoom = roomId => {

    return axios.delete(`${BASE_URL}/ai/rooms/${roomId}`);
}

// 내보내기
export { sendChatMessage, getRoomList, getRoomMessages, deleteRoom };