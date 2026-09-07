import axios from "axios";

const BASE_URL = "http://localhost:8006/wellsy/account";

const findIdApi = (email) =>
    axios.post(`${BASE_URL}/find-id`, { email });

const sendResetCodeApi = (loginId, email) =>
    axios.post(`${BASE_URL}/send-sert`, { loginId, email });

const validateResetCodeApi = (email, certNo) =>
    axios.post(`${BASE_URL}/validate-cert`, { email, certNo });

const resetPasswordApi = (loginId, email, certNo, newPassword) =>
    axios.post(`${BASE_URL}/validate-cert`, { loginId, email, certNo, newPassword });

// 내보내기
export { findIdApi, sendResetCodeApi, validateResetCodeApi, resetPasswordApi };