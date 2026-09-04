package com.kh.wellsy.check.model.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kh.wellsy.check.model.dao.CheckupReservationDao;
import com.kh.wellsy.check.model.vo.CheckupReservation;
import com.kh.wellsy.schedule.model.dao.ScheduleDao;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CheckupReservationService {

    private final CheckupReservationDao checkupReservationDao;
    private final ScheduleDao scheduleDao;


    // =========================================
    // 사원 예약 신청
    // =========================================

    public CheckupReservation insertReservation(
            CheckupReservation reservation) {

        reservation.setReservationId(null);

        // 신청하면 무조건 승인 대기
        reservation.setStatus("N");

        return checkupReservationDao.save(
                reservation
        );
    }


    // =========================================
    // 사원 본인 예약 조회
    // =========================================

    public List<CheckupReservation> selectMyReservationList(
            Integer employeeNo) {

        return checkupReservationDao
                .findByEmployeeNoAndStatusNotOrderByReservationDateDesc(
                        employeeNo,
                        "C"
                );
    }


    // =========================================
    // 관리자 전체 예약 조회
    // =========================================

    public List<CheckupReservation> selectReservationList(
            String status) {

        if (
            status == null ||
            status.isBlank()
        ) {

            return checkupReservationDao
                    .findAllByOrderByReservationDateAsc();
        }

        return checkupReservationDao
                .findByStatusOrderByReservationDateAsc(
                        status
                );
    }


    // =========================================
    // 관리자 승인
    // N -> Y
    // =========================================

    public CheckupReservation approveReservation(
            Integer reservationId) {

        CheckupReservation reservation =
                checkupReservationDao
                        .findById(reservationId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "예약을 찾을 수 없습니다."
                                )
                        );

        if (!"N".equals(reservation.getStatus())) {

            throw new RuntimeException(
                    "승인 대기 상태의 예약만 승인할 수 있습니다."
            );
        }

        reservation.setStatus("Y");

        return checkupReservationDao.save(
                reservation
        );
    }


    // =========================================
    // 예약 취소
    // N/Y -> C
    //
    // 승인 후 생성된 건강검진 일정도 같이 삭제
    // =========================================

    @Transactional
    public CheckupReservation cancelReservation(
            Integer reservationId) {

        CheckupReservation reservation =
                checkupReservationDao
                        .findById(reservationId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "예약을 찾을 수 없습니다."
                                )
                        );


        // 이미 취소된 예약
        if ("C".equals(reservation.getStatus())) {

            throw new RuntimeException(
                    "이미 취소된 예약입니다."
            );
        }


        // =========================================
        // 예약 상태 C로 변경
        // =========================================

        reservation.setStatus("C");

        CheckupReservation result =
                checkupReservationDao.save(
                        reservation
                );


        // =========================================
        // 해당 날짜 건강검진 스케줄 삭제
        // =========================================

        LocalDateTime startDate =
                reservation
                        .getReservationDate()
                        .atStartOfDay();


        LocalDateTime endDate =
                reservation
                        .getReservationDate()
                        .atTime(
                                23,
                                59,
                                59
                        );


        scheduleDao
                .deleteByEmployeeNoAndTitleAndStartDateBetween(
                        reservation.getEmployeeNo(),
                        "건강검진",
                        startDate,
                        endDate
                );


        return result;
    }

}