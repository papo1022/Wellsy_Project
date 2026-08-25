package com.kh.wellsy.login.model.service;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.kh.wellsy.employee.model.vo.Employee;
import com.kh.wellsy.login.model.dao.EmployeeRepository;

@Service
public class LoginServiceImpl implements LoginService {

	// employee Repository 그대로 사용
	@Autowired
	private EmployeeRepository employeeRepository;
	
	public Optional<Employee> loginEmploy(String loginId) {
		
		return employeeRepository.findByLoginIdAndStatus(loginId, "Y"); // "Y"
		// STATUS가 EMPLOYED(재직중)인 사람 중에 이 loginId를 가진 사람을 조회
	}
}