package com.kh.wellsy.login.model.service;

import java.util.Optional;
import com.kh.wellsy.employee.model.vo.Employee;

public interface LoginService {

	// 아이디로 재직중인 직원을 찾아서 반환
	// 없으면 Optional.empty()가 반환됨 (null 대신 안전하게 처리)
	Optional<Employee> loginEmploy(String loginId);
}
