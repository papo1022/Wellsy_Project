import axios from "axios";

const BASE_URL = "/wellsy";

// 로그인 함수 요청
// employee 객체 { loginId, password }를 받아서 백엔드에 POST 요청
const loginEmployeeApi = (employee) => {
    
    return axios({
        url : `${BASE_URL}/login`,
        method : "post",
        data : employee
    });
};

// 내보내기
export { loginEmployeeApi };