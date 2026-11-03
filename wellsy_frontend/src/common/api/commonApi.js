// 토큰을 꺼내오는 공통 함수처리

const getAuthorization = () => {

    return `Bearer ${ sessionStorage.getItem("loginUser") }`;
};

export { getAuthorization };