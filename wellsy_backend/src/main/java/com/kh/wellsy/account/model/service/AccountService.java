package com.kh.wellsy.account.model.service;

public interface AccountService {

	// 아이디 찾기: 이메일로 가입된 아이디를 찾아서 메일 전송
	//			 성공/실패 여부를 반환
	boolean findId(String email);
	
	// 인증번호 발송: 아이디 + 이메일이 일치하는 계정이 있으면 인증번호 메일 전송
	boolean sendResetCode(String loginId, String email);
	
	// 인증번호 검증
	boolean validateResetCode(String email, String certNo);
	
	// 새 비밀번호로 변경 (인증번호를 한 번 더 확인 후 진행)
	boolean resetPassword(String loginId, String email, String certNo, String newPassword);
}
