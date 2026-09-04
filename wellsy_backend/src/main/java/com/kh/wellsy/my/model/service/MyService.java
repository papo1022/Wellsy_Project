package com.kh.wellsy.my.model.service;

import com.kh.wellsy.my.model.vo.My;

public interface MyService {
	
	// 마이페이지 조회
	My selectMy(String loginId);

	// 개인정보 수정
	// 이메일 / 전화번호
	My updateMy(int employeeNo,My my);

	// 비밀번호 변경
	int updatePassword(int employeeNo, String currentPassword, String newPassword);
}