package com.kh.wellsy.account.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.wellsy.account.model.service.AccountService;

@CrossOrigin
@RestController
@RequestMapping("/account")
public class AccountController {

	@Autowired
	private AccountService accountService;
	
	@PostMapping("/find-id")
	public ResponseEntity<String> findId(@RequestBody Map<String, String> body) {
		
		boolean success = accountService.findId(body.get("email"));
		return ResponseEntity.ok(success
				? "가입한 이메일로 아이디를 전송했습니다."
				: "일치하는 계정을 찾을 수 없습니다.");
	}
	
	@PostMapping("/send-cert")
	public ResponseEntity<String> sendResetCode(@RequestBody Map<String, String> body) {
		
		boolean success = accountService.sendResetCode(body.get("loginId"), body.get("email"));
		
		return ResponseEntity.ok(success
				? "인증번호가 발송되었습니다."
				: "일치하는 계정을 찾을 수 없습니다.");
	}
	
	@PostMapping("/validate-cert")
	public ResponseEntity<Boolean> validateResetCode(@RequestBody Map<String, String> body) {
		
		boolean success = accountService.validateResetCode(body.get("email"), body.get("certNo"));
		
		return ResponseEntity.ok(success);
	}
	
	@PostMapping("/reset-password")
	public ResponseEntity<String> resetPassword(@RequestBody Map<String, String> body) {
		
		boolean success = accountService.resetPassword(
				body.get("loginId"), body.get("email"), body.get("certNo"), body.get("newPassword"));
		
		return ResponseEntity.ok(success
				? "비밀번호가 변경되었습니다. 새 비밀번호로 로그인해주세요."
				: "인증 번호가 유효하지 않습니다.");
	}
}
