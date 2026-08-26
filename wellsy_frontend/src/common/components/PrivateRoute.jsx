import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

// children: React에서 제공하는, 보호하려는 실제 화면 컴포넌트
// requiredRole: 이 경로에 들어가려면 실제로 필요한 role (없으면 로그인만 되어 있으면 통과)
function PrivateRoute({ children, requiredRole }) {

    const token = sessionStorage.getItem("token");

    // 토큰이 없으면 = 로그인 안 한 상태 -> 로그인 화면으로 강제 이동
    if(!token) {

        return <Navigate to="/login" replace />;
    }

    // 토큰은 있는데 role이 안 맞으면 (예: 사원이 관리자 페이지 접근 시도)
    if(requiredRole) {

        const decoded = jwtDecode(token);

        if(decoded.role !== requiredRole) {

            return <Navigate to="/login" replace />;
        }
    }

    return children;
}

// 내보내기
export default PrivateRoute;