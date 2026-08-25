package com.kh.wellsy.login.model.dao;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.kh.wellsy.employee.model.vo.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

	Optional<Employee> findByLoginIdAndStatus(String loginId, String Status);
}
