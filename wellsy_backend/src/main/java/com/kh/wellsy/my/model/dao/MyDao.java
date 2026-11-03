package com.kh.wellsy.my.model.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kh.wellsy.employee.model.vo.Employee;


@Repository
public interface MyDao extends JpaRepository<Employee, Integer> {

	// 로그인 아이디로 본인정보 조회
	Optional<Employee> findByLoginId(
		String loginId
	);
}