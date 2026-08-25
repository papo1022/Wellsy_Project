package com.kh.wellsy.login.model.service;

import java.util.Optional;
import com.kh.wellsy.employee.model.vo.Employee;

public interface LoginService {

	Optional<Employee> loginEmploy(String loginId);
}
