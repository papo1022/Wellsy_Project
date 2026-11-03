package com.kh.wellsy.employee.model.service;

import java.util.List;

import com.kh.wellsy.employee.model.vo.Department;
import com.kh.wellsy.employee.model.vo.Employee;
import com.kh.wellsy.employee.model.vo.Job;

public interface EmployeeService {
	
	List<Department> selectDepartmentList();

	List<Job> selectJobList();

	// 직원 목록 조회용 서비스
	List<Employee> selectEmployeeList();
	
	
	// 직원 상세 조회용 서비스
	Employee selectEmployee(int employeeNo);
	
	
	// 직원 등록용 서비스
	Employee insertEmployee(Employee employee);
	
	
	// 직원 수정용 서비스
	Employee updateEmployee(Employee employee);
	
	
	// 직원 퇴사 처리용 서비스
	int deleteEmployee(int employeeNo);
}
