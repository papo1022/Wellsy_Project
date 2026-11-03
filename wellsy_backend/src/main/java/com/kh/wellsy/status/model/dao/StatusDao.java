package com.kh.wellsy.status.model.dao;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.kh.wellsy.employee.model.vo.Employee;

@Repository
public interface StatusDao extends JpaRepository<Employee, Integer> {


	// =========================================
	// 부서별 / 기간별 건강통계
	// =========================================
	@Query(value = """
			
			SELECT
				d.DEPARTMENT_ID,
				d.DEPARTMENT_NAME,
				
				(
					SELECT COUNT(*)
					FROM EMPLOYEE e
					WHERE e.DEPARTMENT_ID = d.DEPARTMENT_ID
					AND e.STATUS = 'Y'
				) AS EMPLOYEE_COUNT,
				
				(
					SELECT COALESCE(ROUND(AVG(er.DURATION), 1), 0)
					FROM EXERCISE_RECORD er
					JOIN EMPLOYEE e
					  ON er.EMPLOYEE_NO = e.EMPLOYEE_NO
					WHERE e.DEPARTMENT_ID = d.DEPARTMENT_ID
					AND e.STATUS = 'Y'
					AND er.STATUS = 'Y'
					AND er.EXERCISE_DATE BETWEEN :startDate AND :endDate
				) AS AVERAGE_EXERCISE_TIME,
				
				(
					SELECT COALESCE(
						ROUND(
							AVG(
								TIMESTAMPDIFF(
									MINUTE,
									sr.SLEEP_START,
									sr.SLEEP_END
								)
							) / 60.0,
							1
						),
						0
					)
					FROM SLEEP_RECORD sr
					JOIN EMPLOYEE e
					  ON sr.EMPLOYEE_NO = e.EMPLOYEE_NO
					WHERE e.DEPARTMENT_ID = d.DEPARTMENT_ID
					AND e.STATUS = 'Y'
					AND sr.SLEEP_DATE BETWEEN :startDate AND :endDate
					AND sr.SLEEP_START IS NOT NULL
					AND sr.SLEEP_END IS NOT NULL
				) AS AVERAGE_SLEEP_TIME,
				
				(
					SELECT COUNT(*)
					FROM HEALTH_ALERT ha
					JOIN HEALTH_CHECKUP hc
					  ON ha.CHECKUP_ID = hc.CHECKUP_ID
					JOIN CHECKUP_RESERVATION cr
					  ON hc.RESERVATION_ID = cr.RESERVATION_ID
					JOIN EMPLOYEE e
					  ON cr.EMPLOYEE_NO = e.EMPLOYEE_NO
					WHERE e.DEPARTMENT_ID = d.DEPARTMENT_ID
					AND e.STATUS = 'Y'
					AND DATE(ha.CREATED_AT)
						BETWEEN :startDate AND :endDate
				) AS ALERT_COUNT,
				
				(
					SELECT COUNT(*)
					FROM HEALTH_ALERT ha
					JOIN HEALTH_CHECKUP hc
					  ON ha.CHECKUP_ID = hc.CHECKUP_ID
					JOIN CHECKUP_RESERVATION cr
					  ON hc.RESERVATION_ID = cr.RESERVATION_ID
					JOIN EMPLOYEE e
					  ON cr.EMPLOYEE_NO = e.EMPLOYEE_NO
					WHERE e.DEPARTMENT_ID = d.DEPARTMENT_ID
					AND e.STATUS = 'Y'
					AND ha.IS_READ = 'N'
					AND DATE(ha.CREATED_AT)
						BETWEEN :startDate AND :endDate
				) AS UNREAD_ALERT_COUNT
				
			FROM DEPARTMENT d
			
			WHERE (
				:departmentId IS NULL
				OR d.DEPARTMENT_ID = :departmentId
			)
			
			ORDER BY d.DEPARTMENT_ID
			
			""",
			nativeQuery = true)
	List<Object[]> selectStatusList(
			@Param("departmentId") Integer departmentId,
			@Param("startDate") LocalDate startDate,
			@Param("endDate") LocalDate endDate
	);


	// =========================================
	// 주의 직원 목록 조회
	// =========================================
	@Query(value = """
			
			SELECT
				ha.ALERT_ID,
				e.EMPLOYEE_NO,
				e.NAME,
				d.DEPARTMENT_ID,
				d.DEPARTMENT_NAME,
				ha.ALERT_TYPE,
				ha.SEVERITY,
				ha.MESSAGE,
				ha.IS_READ,
				ha.CREATED_AT
			
			FROM HEALTH_ALERT ha
			
			JOIN HEALTH_CHECKUP hc
			  ON ha.CHECKUP_ID = hc.CHECKUP_ID
			
			JOIN CHECKUP_RESERVATION cr
			  ON hc.RESERVATION_ID = cr.RESERVATION_ID
			
			JOIN EMPLOYEE e
			  ON cr.EMPLOYEE_NO = e.EMPLOYEE_NO
			
			LEFT JOIN DEPARTMENT d
			  ON e.DEPARTMENT_ID = d.DEPARTMENT_ID
			
			WHERE e.STATUS = 'Y'
			
			AND (
				:departmentId IS NULL
				OR e.DEPARTMENT_ID = :departmentId
			)
			
			AND DATE(ha.CREATED_AT)
				BETWEEN :startDate AND :endDate
			
			ORDER BY
				ha.IS_READ ASC,
				ha.CREATED_AT DESC
			
			""",
			nativeQuery = true)
	List<Object[]> selectWarningEmployeeList(
			@Param("departmentId") Integer departmentId,
			@Param("startDate") LocalDate startDate,
			@Param("endDate") LocalDate endDate
	);


	// =========================================
	// 건강 이상징후 상세조회
	// =========================================
	@Query(value = """
			
			SELECT
				ha.ALERT_ID,
				e.EMPLOYEE_NO,
				e.NAME,
				d.DEPARTMENT_ID,
				d.DEPARTMENT_NAME,
				ha.ALERT_TYPE,
				ha.SEVERITY,
				ha.MESSAGE,
				ha.IS_READ,
				ha.CREATED_AT
			
			FROM HEALTH_ALERT ha
			
			JOIN HEALTH_CHECKUP hc
			  ON ha.CHECKUP_ID = hc.CHECKUP_ID
			
			JOIN CHECKUP_RESERVATION cr
			  ON hc.RESERVATION_ID = cr.RESERVATION_ID
			
			JOIN EMPLOYEE e
			  ON cr.EMPLOYEE_NO = e.EMPLOYEE_NO
			
			LEFT JOIN DEPARTMENT d
			  ON e.DEPARTMENT_ID = d.DEPARTMENT_ID
			
			WHERE ha.ALERT_ID = :alertId
			
			""",
			nativeQuery = true)
	Object[] selectWarningEmployee(
			@Param("alertId") int alertId
	);


	// =========================================
	// 알림 확인 완료 처리
	// =========================================
	@Modifying
	@Query(value = """
			
			UPDATE HEALTH_ALERT
			   SET IS_READ = 'Y'
			 WHERE ALERT_ID = :alertId
			
			""",
			nativeQuery = true)
	int updateAlertRead(
			@Param("alertId") int alertId
	);

}