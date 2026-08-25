package com.kh.wellsy.employee.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.kh.wellsy.employee.model.service.EmployeeService;
import com.kh.wellsy.employee.model.vo.Employee;

@CrossOrigin
@RestController
public class EmployeeController {
	
	@Autowired
	private EmployeeService employeeService;
	
	
	// 직원 목록 조회용 컨트롤러
	@GetMapping("/employee")
	public ResponseEntity<List<Employee>> selectEmployeeList() {
		
		// 서비스 호출
		List<Employee> list = employeeService.selectEmployeeList();
		
		return ResponseEntity.status(HttpStatus.OK).body(list);
	}
	
	
	// 직원 상세 조회용 컨트롤러
	@GetMapping("/employee/{employeeNo}")
	public ResponseEntity<Employee> selectEmployee(
			@PathVariable int employeeNo) {
		
		Employee employee = employeeService.selectEmployee(employeeNo);
		
		return ResponseEntity.status(HttpStatus.OK).body(employee);
	}
	
	
	// 직원 등록용 컨트롤러
	@PostMapping("/employee")
	public ResponseEntity<String> insertEmployee(
			@RequestBody Employee employee) {
		
		Employee result = employeeService.insertEmployee(employee);
		
		String message = (result != null) ? "success" : "fail";
		
		return ResponseEntity.status(HttpStatus.OK).body(message);
	}
	
	
	// 직원 수정용 컨트롤러
	@PutMapping("/employee/{employeeNo}")
	public ResponseEntity<String> updateEmployee(
			@PathVariable int employeeNo,
			@RequestBody Employee employee) {
		
		// URL로 전달받은 사번을 객체에 저장
		employee.setEmployeeNo(employeeNo);
		
		Employee result = employeeService.updateEmployee(employee);
		
		String message = (result != null) ? "success" : "fail";
		
		return ResponseEntity.status(HttpStatus.OK).body(message);
	}
	
	
	// 직원 퇴사 처리용 컨트롤러
	@DeleteMapping("/employee/{employeeNo}")
	public ResponseEntity<String> deleteEmployee(
			@PathVariable int employeeNo) {
		
		int result = employeeService.deleteEmployee(employeeNo);
		
		String message = (result > 0) ? "success" : "fail";
		
		return ResponseEntity.status(HttpStatus.OK).body(message);
	}
}
