package com.kh.wellsy.status.model.vo;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Setter
@Getter
@ToString
public class Status {

	// =========================================
	// 부서별 / 기간별 건강 통계
	// =========================================

	private Integer departmentId;			// 부서 ID
	private String departmentName;			// 부서명

	private long employeeCount;				// 재직 직원 수

	private double averageExerciseTime;		// 평균 운동시간 (분)
	private double averageSleepTime;		// 평균 수면시간 (시간)

	private long alertCount;				// 건강 이상 알림 수
	private long unreadAlertCount;			// 미확인 건강 알림 수


	// =========================================
	// 주의 직원 / 건강 이상징후
	// =========================================

	private Integer alertId;				// 알림 ID

	private Integer employeeNo;				// 사번
	private String employeeName;			// 직원 이름

	private String alertType;				// 이상징후 유형
	private String severity;				// 심각도
	private String message;					// 알림 내용

	private String isRead;					// N : 미확인 / Y : 확인완료

	private LocalDateTime createdAt;			// 이상징후 발생일

}