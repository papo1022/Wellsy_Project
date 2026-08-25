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
	
	
	@Transactional(readOnly = true)
	@Override
	public List<Employee> selectEmployeeList() {

		return employeeDao
				.findByStatusOrderByEmployeeNoDesc("Y");
	}


	// =========================================
	// 사원 상세 조회
	// =========================================
	@Transactional(readOnly = true)
	@Override
	public Employee selectEmployee(int employeeNo) {

		return employeeDao
				.findByEmployeeNoAndStatus(employeeNo, "Y");
	}


	// =========================================
	// 사원 등록
	// =========================================
	@Transactional
	@Override
	public Employee insertEmployee(Employee employee) {

		// 로그인 ID 중복 확인
		if(employeeDao.existsByLoginId(employee.getLoginId())) {
			return null;
		}

		// 이메일 중복 확인
		if(employeeDao.existsByEmail(employee.getEmail())) {
			return null;
		}


		// 권한이 없는 경우 일반 사원으로 설정
		if(employee.getRole() == null ||
		   employee.getRole().isBlank()) {

			employee.setRole("EMPLOYEE");
		}


		// 신규 사원은 재직 상태
		employee.setStatus("Y");

		// 신규 사원이므로 퇴사일 없음
		employee.setResignDate(null);


		return employeeDao.save(employee);
	}


	// =========================================
	// 사원 수정
	// =========================================
	@Transactional
	@Override
	public Employee updateEmployee(Employee employee) {

		// 기존 사원 조회
		Employee originEmployee
			= employeeDao.findByEmployeeNoAndStatus(
					employee.getEmployeeNo(),
					"Y"
			  );


		// 사원이 존재하지 않는 경우
		if(originEmployee == null) {
			return null;
		}


		// 로그인 ID 중복 확인
		if(employeeDao.existsByLoginIdAndEmployeeNoNot(
				employee.getLoginId(),
				employee.getEmployeeNo())) {

			return null;
		}


		// 이메일 중복 확인
		if(employeeDao.existsByEmailAndEmployeeNoNot(
				employee.getEmail(),
				employee.getEmployeeNo())) {

			return null;
		}


		// 수정 가능한 정보 변경
		originEmployee.setLoginId(employee.getLoginId());

		originEmployee.setEmail(employee.getEmail());

		originEmployee.setName(employee.getName());

		originEmployee.setPhone(employee.getPhone());

		originEmployee.setGender(employee.getGender());

		originEmployee.setBirthDate(employee.getBirthDate());

		originEmployee.setRole(employee.getRole());

		originEmployee.setDepartmentId(employee.getDepartmentId());

		originEmployee.setJobId(employee.getJobId());


		/*
		 * 비밀번호가 전달된 경우에만 수정
		 *
		 * 프론트에서 비밀번호를 보내지 않으면
		 * 기존 비밀번호 유지
		 */
		if(employee.getPassword() != null &&
		   !employee.getPassword().isBlank()) {

			originEmployee.setPassword(employee.getPassword());
		}


		return employeeDao.save(originEmployee);
	}


	// =========================================
	// 사원 퇴사 처리
	// =========================================
	@Transactional
	@Override
	public int deleteEmployee(int employeeNo) {

		return employeeDao.deleteEmployee(employeeNo);
	}
}
