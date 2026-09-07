package com.kh.wellsy.account.model.service;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.kh.wellsy.employee.model.dao.EmployeeDao;
import com.kh.wellsy.employee.model.vo.Employee;

@Service
public class AccountServiceImpl {

	@Autowired
	private EmployeeDao employeeDao;
	
	@Autowired
	private JavaMailSender mailSender;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	// 인증번호를 임시로 저장하는 맵 (key: 이메일, value: 인증번호)
	// 여러 사람이 동시에 요청해도 안전하게 저장, 조회되도록 synchronizedMap 사용
	private Map<String, String> certNoList = Collections.synchronizedMap(new HashMap<>());
	
	@Override
	public boolean findId(String email) {
		
		Optional<Employee> result = employeeDao.findByEmailAndStauts(email, "EMPLOYED");
		
		if(result.isEmpty()) {
			
			return false;
		}
		
		Employee employee = result.get();
		
		SimpleMailMessage message = new SimpleMailMessage();
		message.setSubject("[Wellsy] 아이디 찾기 결과 안내"); // 제목
		message.setText("회원님의 아이디는 [" + employee.getLoginId() + "] 입니다."); // 내용
		message.setTo(email); // 보내는 이메일
		
		mailSender.send(message);
		
		return true;
	}
	
	@Override
	public boolean sendResetCode(String loginId, String email) {
		
		Optional<Employee> result = employeeDao.findByLoginIdAndEmailAndStatus(loginId, email, "EMPLOYED");
		
		if(result.isEmpty()) {
			
			return false; // 아이디 + 이메일 조합이 일치하는 계정 없음
		}
		
		// 6자리 랜덤 인증번호 발급
		int random = (int) (Math.random() * 900000 + 100000);
		certNoList.put(email, String.valueOf(random));
		
		SimpleMailMessage message = new SimpleMailMessage();
		message.setSubject("[Wellsy] 비밀번호 재설정 인증번호입니다.");
		message.setText("인증번호: " + random + "\n3분 이내에 입력해주세요.");
		message.setTo(email);
		
		mailSender.send(message);
		
		return true;
	}
	
	@Override
	public boolean validateResetCode(String email, String certNo) {
		
		// 인증 성공 여부만 확인
		// 최종 비밀번호 변경 시 한 번 더 검증하므로 여기서는 목록에서 지우지 않고 그대로 둠
		return certNoList.get(email) != null && certNoList.get(email).equals(certNo);
	}
	
	@Override
	public boolean resetPassword(String loginId, String email, String certNo, String newPassword) {
		
		// 최종 처리 직전에 인증번호를 한 번 더 확인 (보안 강화)
		if(certNoList.get(email) == null || !certNoList.get(email).equals(certNo)) {
			
			return false;
		}
		
		Optional<Employee> result = employeeDao.findByLoginIdAndEmailAndStatus(loginId, "EMPLOYED");
		
		if(result.isEmpty()) {
			
			return false;
		}
		
		Employee employee = result.get();
		employee.setPassword(bCryptPasswordEncoder.encode(newPassword));
		employeeDao.save(employee);
		
		// 1회성이므로 사용 후 반드시 삭제
		certNoList.remove(email);
		
		return true;
	}
}
