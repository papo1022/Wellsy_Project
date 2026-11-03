import axios from "axios";

const BASE_URL = "/wellsy/account";

const findIdApi = (email) =>
    axios.post(`${BASE_URL}/find-id`, { email });

const sendResetCodeApi = (loginId, email) =>
    axios.post(`${BASE_URL}/send-cert`, { loginId, email });

const validateResetCodeApi = (email, certNo) =>
    axios.post(`${BASE_URL}/validate-cert`, { email, certNo });

const resetPasswordApi = (loginId, email, certNo, newPassword) =>
    axios.post(`${BASE_URL}/reset-password`, { loginId, email, certNo, newPassword });

// 내보내기
export { findIdApi, sendResetCodeApi, validateResetCodeApi, resetPasswordApi };