package com.kh.wellsy.status.model.service;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kh.wellsy.status.model.dao.StatusDao;
import com.kh.wellsy.status.model.vo.Status;

@Service
public class StatusServiceImpl implements StatusService {

	@Autowired
	private StatusDao statusDao;


	// =========================================
	// 부서별 / 기간별 건강통계 조회
	// =========================================
	@Transactional(readOnly = true)
	@Override
	public List<Status> selectStatusList(
			Integer departmentId,
			LocalDate startDate,
			LocalDate endDate) {

		List<Object[]> result
			= statusDao.selectStatusList(
					departmentId,
					startDate,
					endDate
			  );


		List<Status> list
			= new ArrayList<>();


		for(Object[] row : result) {

			Status status = new Status();

			status.setDepartmentId(
					((Number)row[0]).intValue()
			);

			status.setDepartmentName(
					(String)row[1]
			);

			status.setEmployeeCount(
					((Number)row[2]).longValue()
			);

			status.setAverageExerciseTime(
					((Number)row[3]).doubleValue()
			);

			status.setAverageSleepTime(
					((Number)row[4]).doubleValue()
			);

			status.setAlertCount(
					((Number)row[5]).longValue()
			);

			status.setUnreadAlertCount(
					((Number)row[6]).longValue()
			);


			list.add(status);
		}


		return list;
	}


	// =========================================
	// 주의 직원 목록 조회
	// =========================================
	@Transactional(readOnly = true)
	@Override
	public List<Status> selectWarningEmployeeList(
			Integer departmentId,
			LocalDate startDate,
			LocalDate endDate) {

		List<Object[]> result
			= statusDao.selectWarningEmployeeList(
					departmentId,
					startDate,
					endDate
			  );


		List<Status> list
			= new ArrayList<>();


		for(Object[] row : result) {

			Status status
				= convertWarningStatus(row);

			list.add(status);
		}


		return list;
	}


	// =========================================
	// 이상징후 상세 조회
	// =========================================
	@Transactional(readOnly = true)
	@Override
	public Status selectWarningEmployee(int alertId) {

		Object[] row
			= statusDao.selectWarningEmployee(alertId);


		if(row == null) {
			return null;
		}


		return convertWarningStatus(row);
	}


	// =========================================
	// 확인완료 처리
	// =========================================
	@Transactional
	@Override
	public int updateAlertRead(int alertId) {

		return statusDao.updateAlertRead(alertId);
	}


	// =========================================
	// Object[] → Status 변환
	// =========================================
	private Status convertWarningStatus(Object[] row) {

		Status status = new Status();


		status.setAlertId(
				((Number)row[0]).intValue()
		);

		status.setEmployeeNo(
				((Number)row[1]).intValue()
		);

		status.setEmployeeName(
				(String)row[2]
		);


		if(row[3] != null) {

			status.setDepartmentId(
					((Number)row[3]).intValue()
			);
		}


		status.setDepartmentName(
				(String)row[4]
		);

		status.setAlertType(
				(String)row[5]
		);

		status.setSeverity(
				(String)row[6]
		);

		status.setMessage(
				(String)row[7]
		);

		status.setIsRead(
				(String)row[8]
		);


		if(row[9] instanceof Timestamp) {

			status.setCreatedAt(
					((Timestamp)row[9])
						.toLocalDateTime()
			);

		} else if(row[9] instanceof LocalDateTime) {

			status.setCreatedAt(
					(LocalDateTime)row[9]
			);
		}


		return status;
	}

}