package com.kh.wellsy.status.model.service;

import java.time.LocalDate;
import java.util.List;

import com.kh.wellsy.status.model.vo.Status;

public interface StatusService {

	// 부서별 / 기간별 건강통계 조회
	List<Status> selectStatusList(
			Integer departmentId,
			LocalDate startDate,
			LocalDate endDate
	);


	// 주의 직원 목록 조회
	List<Status> selectWarningEmployeeList(
			Integer departmentId,
			LocalDate startDate,
			LocalDate endDate
	);


	// 건강 이상징후 상세조회
	Status selectWarningEmployee(int alertId);


	// 건강 이상징후 확인 완료
	int updateAlertRead(int alertId);

}