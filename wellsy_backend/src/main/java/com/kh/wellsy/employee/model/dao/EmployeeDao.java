package com.kh.wellsy.employee.model.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.kh.wellsy.employee.model.vo.Employee;

@Repository
public interface EmployeeDao extends JpaRepository<Employee, Integer>{

	// 재직중인 직원 목록 조회
	List<Employee> findByStatusOrderByEmployeeNoDesc(String status);
	
	
	// 재직중인 직원 상세 조회
	Optional<Employee> findByEmployeeNoAndStatus(int employeeNo, String status);
	
	
	// 직원 퇴사 처리
	// 실제 DELETE 하지 않고
	// STATUS = RESIGNED, RESIGN_DATE = 오늘 날짜로 변경
	@Modifying
	@Query("UPDATE Employee e "
		 + "SET e.status = 'RESIGNED', "
		 + "e.resignDate = CURRENT_DATE "
		 + "WHERE e.employeeNo = :employeeNo "
		 + "AND e.status = 'EMPLOYED'")
	int deleteEmployee(@Param("employeeNo") int employeeNo);
}
