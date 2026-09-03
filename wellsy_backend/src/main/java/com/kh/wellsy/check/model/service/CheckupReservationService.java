package com.kh.wellsy.check.model.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kh.wellsy.check.model.dao.CheckupReservationDao;
import com.kh.wellsy.check.model.vo.CheckupReservation;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CheckupReservationService {

    private final CheckupReservationDao checkupReservationDao;


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

    public List<CheckupReservation>
            selectReservationList(
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
    // =========================================

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


        if ("C".equals(reservation.getStatus())) {

            throw new RuntimeException(
                    "이미 취소된 예약입니다."
            );
        }


        reservation.setStatus("C");


        return checkupReservationDao.save(
                reservation
        );
    }
}