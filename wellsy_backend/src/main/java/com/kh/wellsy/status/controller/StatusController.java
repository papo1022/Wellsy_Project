package com.kh.wellsy.status.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kh.wellsy.status.model.service.StatusService;
import com.kh.wellsy.status.model.vo.Status;

@CrossOrigin
@RestController
public class StatusController {

	@Autowired
	private StatusService statusService;


	// =========================================
	// 부서별 / 기간별 건강통계 조회
	// =========================================
	@GetMapping("/status")
	public ResponseEntity<List<Status>> selectStatusList(

			@RequestParam(required = false)
			Integer departmentId,

			@RequestParam(required = false)
			@DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
			LocalDate startDate,

			@RequestParam(required = false)
			@DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
			LocalDate endDate) {


		// 날짜를 선택하지 않은 경우 최근 1개월
		if(endDate == null) {

			endDate = LocalDate.now();
		}


		if(startDate == null) {

			startDate = endDate.minusMonths(1);
		}


		List<Status> list
			= statusService.selectStatusList(
					departmentId,
					startDate,
					endDate
			  );


		return ResponseEntity
				.status(HttpStatus.OK)
				.body(list);
	}


	// =========================================
	// 주의 직원 목록 조회
	// =========================================
	@GetMapping("/status/warnings")
	public ResponseEntity<List<Status>> selectWarningEmployeeList(

			@RequestParam(required = false)
			Integer departmentId,

			@RequestParam(required = false)
			@DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
			LocalDate startDate,

			@RequestParam(required = false)
			@DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
			LocalDate endDate) {


		if(endDate == null) {

			endDate = LocalDate.now();
		}


		if(startDate == null) {

			startDate = endDate.minusMonths(1);
		}


		List<Status> list
			= statusService.selectWarningEmployeeList(
					departmentId,
					startDate,
					endDate
			  );


		return ResponseEntity
				.status(HttpStatus.OK)
				.body(list);
	}


	// =========================================
	// 건강 이상징후 상세 조회
	// =========================================
	@GetMapping("/status/warnings/{alertId}")
	public ResponseEntity<Status> selectWarningEmployee(
			@PathVariable int alertId) {

		Status status
			= statusService.selectWarningEmployee(alertId);


		return ResponseEntity
				.status(HttpStatus.OK)
				.body(status);
	}


	// =========================================
	// 건강 이상징후 확인완료
	// =========================================
	@PutMapping("/status/warnings/{alertId}/read")
	public ResponseEntity<String> updateAlertRead(
			@PathVariable int alertId) {

		int result
			= statusService.updateAlertRead(alertId);


		String message
			= result > 0
				? "success"
				: "fail";


		return ResponseEntity
				.status(HttpStatus.OK)
				.body(message);
	}

}