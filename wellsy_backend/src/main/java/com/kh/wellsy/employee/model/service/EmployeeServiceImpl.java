package com.kh.wellsy.employee.model.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import com.kh.wellsy.employee.model.dao.EmployeeDao;
import com.kh.wellsy.employee.model.vo.Employee;

@Service
public class EmployeeServiceImpl implements EmployeeService{

	@Autowired
	private EmployeeDao employeeDao;
	
	
	@Transactional(readOnly=true)
	// 직원 목록 조회
	@Override
	public List<Employee> selectEmployeeList() {
		
		return employeeDao
				.findByStatusOrderByEmployeeNoDesc("EMPLOYED");
	}
	
	
	@Transactional(readOnly=true)
	// 직원 상세 조회
	@Override
	public Employee selectEmployee(int employeeNo) {
		
		return employeeDao
				.findByEmployeeNoAndStatus(employeeNo, "EMPLOYED")
				.orElse(null);
	}
	
	
	@Transactional
	// 직원 등록
	@Override
	public Employee insertEmployee(Employee employee) {
		
		// 권한 값이 없으면 일반 직원으로 등록
		if(employee.getRole() == null || employee.getRole().isBlank()) {
			employee.setRole("EMPLOYEE");
		}
		
		// 등록 시 기본적으로 재직 상태
		employee.setStatus("EMPLOYED");
		employee.setResignDate(null);
		
		return employeeDao.save(employee);
	}
	
	
	@Transactional
	// 직원 수정
	@Override
	public Employee updateEmployee(Employee employee) {
		
		return employeeDao.save(employee);
	}
	
	
	@Transactional
	// 직원 퇴사 처리
	@Override
	public int deleteEmployee(int employeeNo) {
		
		return employeeDao.deleteEmployee(employeeNo);
	}
}
