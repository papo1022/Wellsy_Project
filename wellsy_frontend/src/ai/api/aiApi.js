import axios from 'axios';
// 백엔드 API를 호출하고 데이터를 받아옴

const BASE_URL = "http://localhost:8006/wellsy"

// AI 챗봇에게 메시지를 보내는 함수
// TODO: 실제 정확한 엔드 포인트(/ai/chat 등)가 필요함, 추후 정해지면 수정할 것
const sendChatMessage = (message) => {

    return axios({
        url: '${BASE_URL}/ai/chat',
        method: "post",
        data: { message }, // 위에서 받아온 매개변수 message를 백엔드로 보낼 JSON에 담음
    });
};

// 내보내기
export { sendChatMessage };