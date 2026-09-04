package com.kh.wellsy.my.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kh.wellsy.employee.model.vo.Employee;
import com.kh.wellsy.my.model.dao.MyDao;
import com.kh.wellsy.my.model.vo.My;


@Service
public class MyServiceImpl implements MyService {

	@Autowired
	private MyDao myDao;

	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	// 마이페이지 조회
	@Override
	@Transactional(readOnly = true)
	public My selectMy(
			String loginId) {


		Employee employee
			= myDao
				.findByLoginId(loginId)
				.orElse(null);


		if(employee == null) {

			return null;
		}


		return employeeToMy(
			employee
		);
	}

	// 개인정보 수정
	@Override
	@Transactional
	public My updateMy(
			int employeeNo,
			My my) {


		Employee employee
			= myDao
				.findById(employeeNo)
				.orElse(null);


		if(employee == null) {

			return null;
		}

		// 이메일 입력 확인
		if(
			my.getEmail() == null
			||
			my.getEmail().trim().isEmpty()
		) {

			throw new IllegalArgumentException(
				"이메일을 입력해주세요."
			);
		}

		// 마이페이지 수정 가능 항목
		employee.setEmail(
			my.getEmail().trim()
		);


		employee.setPhone(

			my.getPhone() == null
			?
			null
			:
			my.getPhone().trim()
		);


		Employee result
			= myDao.save(
				employee
			);


		return employeeToMy(
			result
		);
	}

	// 비밀번호 변경
	@Override
	@Transactional
	public int updatePassword(
			int employeeNo,
			String currentPassword,
			String newPassword) {


		Employee employee
			= myDao
				.findById(employeeNo)
				.orElse(null);


		// 직원 없음
		if(employee == null) {

			return 0;
		}


		if(
			currentPassword == null
			||
			newPassword == null
		) {

			return -1;
		}

		// 현재 비밀번호 확인
		boolean passwordMatch
			= bCryptPasswordEncoder
				.matches(
					currentPassword,
					employee.getPassword()
				);


		if(!passwordMatch) {

			return -1;
		}


		// 기존 비밀번호와 동일한지 확인
		boolean samePassword
			= bCryptPasswordEncoder
				.matches(
					newPassword,
					employee.getPassword()
				);


		if(samePassword) {

			return -2;
		}

		// 새 비밀번호 암호화
		String encodedPassword
			= bCryptPasswordEncoder
				.encode(
					newPassword
				);


		employee.setPassword(
			encodedPassword
		);


		myDao.save(
			employee
		);


		return 1;
	}

	// Employee -> My
	private My employeeToMy(
			Employee employee) {


		My my
			= new My();


		my.setEmployeeNo(
			employee.getEmployeeNo()
		);


		my.setLoginId(
			employee.getLoginId()
		);


		my.setEmail(
			employee.getEmail()
		);


		my.setName(
			employee.getName()
		);


		my.setPhone(
			employee.getPhone()
		);


		my.setGender(
			employee.getGender()
		);


		my.setBirthDate(
			employee.getBirthDate()
		);


		my.setRole(
			employee.getRole()
		);


		my.setHireDate(
			employee.getHireDate()
		);


		my.setStatus(
			employee.getStatus()
		);


		my.setDepartmentId(
			employee.getDepartmentId()
		);


		my.setDepartmentName(
			employee.getDepartmentName()
		);


		my.setJobId(
			employee.getJobId()
		);


		my.setJobName(
			employee.getJobName()
		);


		return my;
	}

}