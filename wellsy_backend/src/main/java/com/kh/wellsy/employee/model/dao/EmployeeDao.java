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

	// 재직중인 사원 목록 조회
	List<Employee> findAllByOrderByEmployeeNoDesc();
	
	// 재직중인 사원 상세 조회
	Employee findByEmployeeNoAndStatus(int employeeNo, String status);
	
	// 아이디 찾기용
	Optional<Employee> findByEmailAndStatus(String email, String status);
	
	// 비밀번호 재설정용
	Optional<Employee> findByLoginIdAndEmailAndStatus(String loginId, String email, String status);
	
	// 로그인용 조회
	// 메소드 이름 규칙(findBy + 필드명 + And + 필드명)
	// Spring이 "WHERE LOGIN_ID = ? AND STATUS = ?" SQL을 자동으로 만들어서 실행
	Optional<Employee> findByLoginIdAndStatus(String loginId, String status);
	
	// 로그인 ID 중복 확인
	boolean existsByLoginId(String loginId);
	
	
	// 이메일 중복 확인
	boolean existsByEmail(String email);
	
	// 수정 시 본인을 제외한 로그인 ID 중복 확인
	boolean existsByLoginIdAndEmployeeNoNot(String loginId, int employeeNo);


	// 수정 시 본인을 제외한 이메일 중복 확인
	boolean existsByEmailAndEmployeeNoNot(String email, int employeeNo);
	
	// 사원 퇴사 처리
	// 실제 DELETE 하지 않고
	// STATUS = 'N', RESIGN_DATE = 현재 날짜로 변경
	@Modifying
	@Query("UPDATE Employee e "
		 + "SET e.status = 'N', "
		 + "e.resignDate = CURRENT_DATE "
		 + "WHERE e.employeeNo = :employeeNo "
		 + "AND e.status = 'Y'")
	int deleteEmployee(@Param("employeeNo") int employeeNo);

}

