import {
    useEffect,
    useState
} from "react";

import {
    jwtDecode
} from "jwt-decode";

import {
    useNavigate
} from "react-router-dom";

import {
    selectMyApi,
    updateMyApi,
    updatePasswordApi
} from "../api/myApi";

import "../styles/My.css";
import "../styles/MyLayout.css";
import "../styles/MyProfile.css";
import "../styles/MyInfo.css";
import "../styles/MyForm.css";
import "../styles/MyResponsive.css";

function MyPage() {

    const navigate
        = useNavigate();

    // =========================================
    // 마이페이지 정보
    // =========================================

    const [my, setMy]
        = useState(null);


    // =========================================
    // 개인정보 수정
    // =========================================

    const [form, setForm]
        = useState({

            email : "",

            phone : ""

        });


    // =========================================
    // 비밀번호 변경
    // =========================================

    const [passwordForm, setPasswordForm]
        = useState({

            currentPassword : "",

            newPassword : "",

            newPasswordConfirm : ""

        });


    // =========================================
    // 로그인 ID 가져오기
    // =========================================

    const getLoginId = () => {


        const token
            = sessionStorage.getItem(
                "token"
            );


        if(!token) {

            return null;
        }


        try {


            const decoded
                = jwtDecode(token);


            console.log(
                "마이페이지 JWT :",
                decoded
            );


            /*
             * JWT에 loginId가 있으면 loginId 사용
             *
             * JWT subject(sub)에 로그인 아이디가
             * 들어있으면 sub 사용
             */
            return (
                decoded.loginId
                ??
                decoded.sub
            );


        } catch(error) {


            console.log(
                "JWT 분석 실패",
                error
            );


            return null;
        }

    };


    // =========================================
    // 마이페이지 조회
    // =========================================

    const selectMy = async () => {


        const loginId
            = getLoginId();


        if(!loginId) {


            console.log(
                "로그인 정보를 확인할 수 없습니다."
            );


            return;
        }


        try {


            const response
                = await selectMyApi(
                    loginId
                );


            console.log(
                "마이페이지 정보 :",
                response.data
            );


            setMy(
                response.data
            );


            // 수정폼에도 현재값 적용
            setForm({

                email :
                    response.data.email
                    ?? "",

                phone :
                    response.data.phone
                    ?? ""

            });


        } catch(error) {


            console.log(
                "마이페이지 조회 실패"
            );


            console.log(error);
        }

    };


    // =========================================
    // 최초 조회
    // =========================================

    useEffect(() => {

        selectMy();

    }, []);


    // =========================================
    // 개인정보 입력
    // =========================================

    const handleChange = e => {


        setForm({

            ...form,

            [e.target.name] :
                e.target.value

        });

    };


    // =========================================
    // 전화번호 숫자 / 하이픈만 허용
    // =========================================

    const handlePhoneChange = e => {


        const value
            = e.target.value;


        const phone
            = value.replace(
                /[^0-9-]/g,
                ""
            );


        setForm({

            ...form,

            phone : phone

        });

    };


    // =========================================
    // 개인정보 수정
    // =========================================

    const updateMy = async () => {


        if(
            form.email.trim() === ""
        ) {

            alert(
                "이메일을 입력해주세요."
            );

            return;
        }


        if(
            !form.email.includes("@")
        ) {

            alert(
                "올바른 이메일을 입력해주세요."
            );

            return;
        }


        try {


            const response
                = await updateMyApi(

                    my.employeeNo,

                    {
                        email :
                            form.email.trim(),

                        phone :
                            form.phone.trim()
                    }
                );


            setMy(
                response.data
            );


            setForm({

                email :
                    response.data.email
                    ?? "",

                phone :
                    response.data.phone
                    ?? ""

            });


            alert(
                "개인정보가 수정되었습니다."
            );


        } catch(error) {


            console.log(
                "개인정보 수정 실패"
            );


            console.log(error);


            alert(

                error.response
                    ?.data
                    ?.message

                ??

                "개인정보 수정에 실패했습니다."
            );

        }

    };


    // =========================================
    // 비밀번호 입력
    // =========================================

    const handlePasswordChange
        = e => {


            setPasswordForm({

                ...passwordForm,

                [e.target.name] :
                    e.target.value

            });

        };


    // =========================================
    // 비밀번호 변경
    // =========================================

    const updatePassword = async () => {


        // 현재 비밀번호
        if(
            passwordForm
                .currentPassword
                .trim()
            === ""
        ) {

            alert(
                "현재 비밀번호를 입력해주세요."
            );

            return;
        }


        // 새 비밀번호
        if(
            passwordForm
                .newPassword
                .trim()
            === ""
        ) {

            alert(
                "새 비밀번호를 입력해주세요."
            );

            return;
        }


        // 최소 길이
        if(
            passwordForm
                .newPassword
                .length
            < 4
        ) {

            alert(
                "새 비밀번호는 4자 이상 입력해주세요."
            );

            return;
        }


        // 새 비밀번호 확인
        if(
            passwordForm.newPassword
            !==
            passwordForm.newPasswordConfirm
        ) {

            alert(
                "새 비밀번호가 일치하지 않습니다."
            );

            return;
        }


        try {


            const response
                = await updatePasswordApi(

                    my.employeeNo,

                    {
                        currentPassword :
                            passwordForm
                                .currentPassword,

                        newPassword :
                            passwordForm
                                .newPassword
                    }
                );


            alert(
                response.data.message
            );


            // 입력창 초기화
            setPasswordForm({

                currentPassword : "",

                newPassword : "",

                newPasswordConfirm : ""

            });

            navigate("/");

        } catch(error) {


            console.log(
                "비밀번호 변경 실패"
            );


            console.log(error);


            alert(

                error.response
                    ?.data
                    ?.message

                ??

                "비밀번호 변경에 실패했습니다."
            );

        }

    };


    // =========================================
    // 성별 표시
    // =========================================

    const getGenderName = gender => {


        if(gender === "M") {

            return "남성";
        }


        if(gender === "F") {

            return "여성";
        }


        return "-";
    };


    // =========================================
    // 권한 표시
    // =========================================

    const getRoleName = role => {

    if(
        role === "ADMIN"
        ||
        role === "ROLE_ADMIN"
    ) {

        return "관리자";
    }


    if(
        role === "USER"
        ||
        role === "ROLE_USER"
        ||
        role === "EMPLOYEE"
    ) {

        return "사원";
    }

    return "-";
};


    // =========================================
    // 로딩
    // =========================================

    if(my == null) {


        return (

            <div className="my-page">


                <div className="my-card my-loading">

                    정보를 불러오는 중입니다.

                </div>


            </div>
        );
    }


    return (

        <div className="my-page">


            {/* ================================= */}
            {/* 제목 */}
            {/* ================================= */}

            <div className="my-title-area">


                <h1>
                    마이페이지
                </h1>


                <p>
                    개인정보를 확인하고 수정할 수 있습니다.
                </p>


            </div>


            {/* ================================= */}
            {/* 프로필 */}
            {/* ================================= */}

            <div className="my-profile-card">


                <div className="my-profile-circle">

                    {
                        my.name
                            ?.substring(
                                0,
                                1
                            )
                    }

                </div>


                <div className="my-profile-info">


                    <div className="my-profile-name">


                        <strong>
                            {my.name}
                        </strong>


                        <span>
                            {
                                getRoleName(
                                    my.role
                                )
                            }
                        </span>


                    </div>


                    <p>

                        {
                            my.departmentName
                            ??
                            "-"
                        }

                        {" / "}

                        {
                            my.jobName
                            ??
                            "-"
                        }

                    </p>


                </div>


            </div>


            {/* ================================= */}
            {/* 기본 정보 */}
            {/* ================================= */}

            <div className="my-card">


                <div className="my-card-header">


                    <div>


                        <h2>
                            기본 정보
                        </h2>


                        <p>
                            회사에서 관리하는 정보입니다.
                        </p>


                    </div>


                </div>


                <div className="my-info-grid">


                    {/* 사번 */}

                    <div className="my-info-item">

                        <span>
                            사번
                        </span>

                        <strong>
                            {my.employeeNo}
                        </strong>

                    </div>


                    {/* 로그인 아이디 */}

                    <div className="my-info-item">

                        <span>
                            아이디
                        </span>

                        <strong>
                            {my.loginId}
                        </strong>

                    </div>


                    {/* 이름 */}

                    <div className="my-info-item">

                        <span>
                            이름
                        </span>

                        <strong>
                            {my.name}
                        </strong>

                    </div>


                    {/* 성별 */}

                    <div className="my-info-item">

                        <span>
                            성별
                        </span>

                        <strong>

                            {
                                getGenderName(
                                    my.gender
                                )
                            }

                        </strong>

                    </div>


                    {/* 생년월일 */}

                    <div className="my-info-item">

                        <span>
                            생년월일
                        </span>

                        <strong>

                            {
                                my.birthDate
                                ??
                                "-"
                            }

                        </strong>

                    </div>


                    {/* 부서 */}

                    <div className="my-info-item">

                        <span>
                            부서
                        </span>

                        <strong>

                            {
                                my.departmentName
                                ??
                                "-"
                            }

                        </strong>

                    </div>


                    {/* 직급 */}

                    <div className="my-info-item">

                        <span>
                            직급
                        </span>

                        <strong>

                            {
                                my.jobName
                                ??
                                "-"
                            }

                        </strong>

                    </div>


                    {/* 권한 */}

                    <div className="my-info-item">

                        <span>
                            권한
                        </span>

                        <strong>

                            {
                                getRoleName(
                                    my.role
                                )
                            }

                        </strong>

                    </div>


                    {/* 입사일 */}

                    <div className="my-info-item">

                        <span>
                            입사일
                        </span>

                        <strong>

                            {
                                my.hireDate
                                ??
                                "-"
                            }

                        </strong>

                    </div>


                    {/* 재직상태 */}

                    <div className="my-info-item">

                        <span>
                            재직 상태
                        </span>

                        <strong>

                            {
                                my.status === "Y"
                                ?
                                "재직"
                                :
                                "퇴사"
                            }

                        </strong>

                    </div>


                </div>


            </div>


            {/* ================================= */}
            {/* 개인정보 수정 */}
            {/* ================================= */}

            <div className="my-card">


                <div className="my-card-header">


                    <div>


                        <h2>
                            개인정보 수정
                        </h2>


                        <p>
                            이메일과 전화번호를 수정할 수 있습니다.
                        </p>


                    </div>


                </div>


                <div className="my-form-grid">


                    {/* 이메일 */}

                    <div className="my-form-item">


                        <label>
                            이메일
                        </label>


                        <input
                            type="email"

                            name="email"

                            value={
                                form.email
                            }

                            onChange={
                                handleChange
                            }

                            placeholder="example@wellsy.com"
                        />


                    </div>


                    {/* 전화번호 */}

                    <div className="my-form-item">


                        <label>
                            전화번호
                        </label>


                        <input
                            type="text"

                            name="phone"

                            value={
                                form.phone
                            }

                            onChange={
                                handlePhoneChange
                            }

                            placeholder="010-0000-0000"

                            maxLength="20"
                        />


                    </div>


                </div>


                <div className="my-button-area">


                    <button
                        type="button"

                        className="my-main-btn"

                        onClick={
                            updateMy
                        }
                    >
                        개인정보 저장
                    </button>


                </div>


            </div>


            {/* ================================= */}
            {/* 비밀번호 변경 */}
            {/* ================================= */}

            <div className="my-card">


                <div className="my-card-header">


                    <div>


                        <h2>
                            비밀번호 변경
                        </h2>


                        <p>
                            본인 확인을 위해 현재 비밀번호를 입력해주세요.
                        </p>


                    </div>


                </div>


                <div className="my-password-area">


                    {/* 현재 비밀번호 */}

                    <div className="my-form-item">


                        <label>
                            현재 비밀번호
                        </label>


                        <input
                            type="password"

                            name="currentPassword"

                            value={
                                passwordForm
                                    .currentPassword
                            }

                            onChange={
                                handlePasswordChange
                            }

                            autoComplete="current-password"
                        />


                    </div>


                    {/* 새 비밀번호 */}

                    <div className="my-form-item">


                        <label>
                            새 비밀번호
                        </label>


                        <input
                            type="password"

                            name="newPassword"

                            value={
                                passwordForm
                                    .newPassword
                            }

                            onChange={
                                handlePasswordChange
                            }

                            autoComplete="new-password"
                        />


                    </div>


                    {/* 새 비밀번호 확인 */}

                    <div className="my-form-item">


                        <label>
                            새 비밀번호 확인
                        </label>


                        <input
                            type="password"

                            name="newPasswordConfirm"

                            value={
                                passwordForm
                                    .newPasswordConfirm
                            }

                            onChange={
                                handlePasswordChange
                            }

                            autoComplete="new-password"
                        />


                    </div>


                </div>


                <div className="my-password-guide">

                    비밀번호는 4자 이상 입력해주세요.

                </div>


                <div className="my-button-area">


                    <button
                        type="button"

                        className="my-main-btn"

                        onClick={
                            updatePassword
                        }
                    >
                        비밀번호 변경
                    </button>


                </div>


            </div>


        </div>

    );

}


export default MyPage;