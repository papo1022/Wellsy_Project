package com.kh.wellsy.login.model.service;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.kh.wellsy.employee.model.vo.Employee;
import com.kh.wellsy.login.model.dao.EmployeeRepository;

@Service
public class LoginServiceImpl implements LoginService {

	@Autowired
	private EmployeeRepository employeeRepository;
	
	public Optional<Employee> loginEmploy(String loginId) {
		
		return employeeRepository.findByLoginIdAndStatus(loginId, "EMPLOYED"); // "Y"
	}
}