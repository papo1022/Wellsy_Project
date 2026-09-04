package com.kh.wellsy.check.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kh.wellsy.check.model.service.CheckupReservationService;
import com.kh.wellsy.check.model.vo.CheckupReservation;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/checkup-reservations")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class CheckupReservationController {

    private final CheckupReservationService
            checkupReservationService;


    // =========================================
    // 사원 예약 신청
    // =========================================

    @PostMapping
    public CheckupReservation insertReservation(
            @RequestBody CheckupReservation reservation) {

        return checkupReservationService
                .insertReservation(
                        reservation
                );
    }


    // =========================================
    // 사원 본인 예약 목록
    // =========================================

    @GetMapping("/my")
    public List<CheckupReservation>
            selectMyReservationList(
                    @RequestParam Integer employeeNo) {

        return checkupReservationService
                .selectMyReservationList(
                        employeeNo
                );
    }


    // =========================================
    // 관리자 예약 목록
    // status 생략 = 전체
    // =========================================

    @GetMapping
    public List<CheckupReservation>
            selectReservationList(
                    @RequestParam(required = false)
                    String status) {

        return checkupReservationService
                .selectReservationList(
                        status
                );
    }


    // =========================================
    // 관리자 승인
    // =========================================

    @PutMapping("/{reservationId}/approve")
    public CheckupReservation approveReservation(
            @PathVariable Integer reservationId) {

        return checkupReservationService
                .approveReservation(
                        reservationId
                );
    }


    // =========================================
    // 예약 취소
    // =========================================

    @PutMapping("/{reservationId}/cancel")
    public CheckupReservation cancelReservation(
            @PathVariable Integer reservationId) {

        return checkupReservationService
                .cancelReservation(
                        reservationId
                );
    }
}