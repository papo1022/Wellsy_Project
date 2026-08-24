// import "./index.css";

// import { useState } from "react";

// // import { loginMemberApi } from "./auth/api/authApi";

// function Index(props) {

//     // 실행할 구문
//     // console.log(props); // {loginUser : "~~~", setLoginUser : () => {}}
//     const {loginUser, setLoginUser} = props; 

//     // 입력받은 아이디와 비밀번호를 저장할 State 형 변수 셋팅
//     const [member, setMember] = useState({userId : "",
//                                           userPwd : ""});

//     // 입력값이 변할 때마다 실행할 이벤트 핸들러 함수
//     const handleChange = e => {

//         const newMember = {...member};

//         newMember[e.target.name] = e.target.value;

//         setMember(newMember);
//     };

//     // 로그인 버튼 클릭 시 실행할 이벤트 핸들러 함수
//     const loginMember = async e => {

//         e.preventDefault();
//         // > 기본이벤트 제거

//         try {

//             const response = await loginMemberApi(member);
            
//             // console.log(response.data);

//             if(response.data == "") {
//                 // > 로그인 실패

//                 alert("로그인에 실패했습니다.");

//             } else {
//                 // 로그인 성공

//                 alert("로그인에 성공했습니다.");

//                 /*
//                     - 로그인 성공 시에는 기존의 방법처럼
//                       이 응답받은 jwt 토큰 (최대한 안전한 형태로 회원 정보를 담아둠) 을 어딘가에 담아둘것!!

//                     - 단, 기존의 방법처럼 HttpSession 은 사용할 수 없고,
//                       비슷한 역할, 비슷한 구조를 가진 자바스크립트의 브라우저 전용 저장소를 이용한다.
//                       (자바스크립트 구문 전역적으로 쓸 수 있는 특징, 키 + 밸류 형식으로 저장)

//                     * 자바스크립트 대표 저장소
//                     1. localStorage : 브라우저를 종료해도 데이터가 유지
//                     2. sessionStorage : 브라우저를 종료하면 데이터가 함께 삭제됨
//                 */

//                 // 자바스크립트의 sessionStorage 객체에
//                 // 키 + 밸류 세트로 jwt 응답데이터를 담아둘 것
//                 sessionStorage.setItem("loginUser", response.data);
//                 // > sessionStorage.setItem("키값", "밸류값") : 데이터를 담는 역할
                
//                 // 로그인 후의 화면이 보여지게끔 전환
//                 setLoginUser(response.data);
//             }

//         } catch(error) {

//             console.log("인증(로그인) 요청용 ajax 통신 실패!");
//         }
//     };

//     // 로그아웃 버튼 클릭 시 실행할 이벤트 핸들러 함수
//     const logoutMember = () => {

//         alert("성공적으로 로그아웃 되었습니다.");

//         // sessionStorage 에 담긴 로그인한 회원의 정보를 제거
//         sessionStorage.removeItem("loginUser");
//         // > sessionStorage.removeItem("키값") : 키 + 밸류 형태로 제거

//         // 로그인 전 화면으로 전환
//         setLoginUser(null);
//     };

//     if(loginUser != null) {

//         // return 구문 - 로그인 후에 리턴되야하는 화면 구조
//         return (
//             <div>

//                 <h2 align="center">관리자님 환영합니다.</h2>

//                 <br /><br />

//                 <div align="center">
//                     <button className="btn btn-outline-primary btn-sm"
//                             onClick={ logoutMember }>
//                         로그아웃
//                     </button>
//                 </div>

//             </div>
//         );

//     } else { // 로그인 전일 경우

//         // return 구문 - 로그인 전에 리턴되야하는 화면 구조
//         return (
//             <div>
//                 <h2 align="center">관리자 로그인</h2>

//                 <br /><br />

//                 <form id="login-form">
//                     <table>
//                         <tbody>
//                             <tr>
//                                 <th width="130">아이디</th>
//                                 <td>
//                                     <input type="text" name="userId" value={ member.userId }
//                                                     onChange={ handleChange } />
//                                 </td>
//                             </tr>
//                             <tr>
//                                 <th>비밀번호</th>
//                                 <td>
//                                     <input type="password" name="userPwd" value={ member.userPwd }
//                                                         onChange={ handleChange } />
//                                 </td>
//                             </tr>
//                         </tbody>
//                     </table>

//                     <br /><br />

//                     <div align="center">
//                         <button type="submit"
//                                 className="btn btn-outline-primary btn-sm"
//                                 onClick={ loginMember }>
//                             로그인
//                         </button>
//                     </div>

//                     <br /><br />
//                 </form>

//             </div>
//         );
//     }
// }

// // 내보내기
// export default Index;

// // 관리자 페이지는 메인페이지가 로그인페이지임!!