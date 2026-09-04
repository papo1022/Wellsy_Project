package com.kh.wellsy.checkupReservationDashboard.model.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kh.wellsy.check.model.vo.CheckupReservation;
import com.kh.wellsy.checkupReservationDashboard.model.dao.CheckupReservationDashboardDao;
import com.kh.wellsy.checkupReservationDashboard.model.vo.CheckupReservationDashboard;
import com.kh.wellsy.schedule.model.dao.ScheduleDao;
import com.kh.wellsy.schedule.model.vo.Schedule;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CheckupReservationDashboardService {

    private final CheckupReservationDashboardDao
            checkupReservationDashboardDao;

    private final ScheduleDao
            scheduleDao;


    // =========================================
    // 관리자 건강검진 예약 목록 조회
    // =========================================
    public List<CheckupReservationDashboard> selectReservationList(
            Integer year,
            Integer month,
            Integer departmentId,
            Integer jobId,
            String name,
            String status) {

        return checkupReservationDashboardDao
                .selectReservationList(
                        year,
                        month,
                        departmentId,
                        jobId,
                        name,
                        status
                );
    }


    // =========================================
    // 관리자 건강검진 예약 승인
    //
    // STATUS
    // N -> Y
    //
    // 승인과 동시에
    // 해당 사원의 SCHEDULE 자동 생성
    // =========================================
    @Transactional
    public void approveReservation(
            Integer reservationId) {


        // 1. 건강검진 예약 조회
        CheckupReservation reservation =
                checkupReservationDashboardDao
                        .findById(reservationId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "건강검진 예약 정보를 찾을 수 없습니다."
                                )
                        );


        // 2. 승인 대기 상태인지 확인
        if (!"N".equals(reservation.getStatus())) {

            throw new RuntimeException(
                    "승인 대기 상태의 예약만 승인할 수 있습니다."
            );
        }


        // 3. 예약 상태 승인 처리
        reservation.setStatus("Y");

        checkupReservationDashboardDao.save(
                reservation
        );


        // 4. 건강검진 시작 날짜/시간
        // 검진 당일 00:00:00
        LocalDateTime startDate =
                reservation
                        .getReservationDate()
                        .atStartOfDay();


        // 5. 건강검진 종료 날짜/시간
        // 검진 당일 23:59:59
        LocalDateTime endDate =
                reservation
                        .getReservationDate()
                        .atTime(
                                23,
                                59,
                                59
                        );


        // 6. 스케줄 생성
        Schedule schedule =
                new Schedule();


        // 건강검진 신청한 사원 번호
        schedule.setEmployeeNo(
                reservation.getEmployeeNo()
        );


        // 스케줄 제목
        schedule.setTitle(
                "건강검진"
        );


        // 병원명이 있으면 표시
        if (
                reservation.getHospitalName() != null
                &&
                !reservation.getHospitalName().isBlank()
        ) {

            schedule.setContent(
                    "건강검진 - "
                    + reservation.getHospitalName()
            );

        } else {

            schedule.setContent(
                    "건강검진"
            );
        }


        // 시작 : 00:00:00
        schedule.setStartDate(
                startDate
        );


        // 종료 : 23:59:59
        schedule.setEndDate(
                endDate
        );


        // 7. 스케줄 저장
        scheduleDao.save(
                schedule
        );
    }
}