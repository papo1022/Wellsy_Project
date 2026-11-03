package com.kh.wellsy.checkupReservationDashboard.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kh.wellsy.checkupReservationDashboard.model.service.CheckupReservationDashboardService;
import com.kh.wellsy.checkupReservationDashboard.model.vo.CheckupReservationDashboard;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/checkup-reservation-dashboard")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class CheckupReservationDashboardController {

    private final CheckupReservationDashboardService checkupReservationDashboardService;

    @GetMapping
    public Page<CheckupReservationDashboard> selectReservationList(
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) Integer month,
            @RequestParam(required = false) Integer departmentId,
            @RequestParam(required = false) Integer jobId,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        return checkupReservationDashboardService.selectReservationList(
                year, month, departmentId, jobId, name, status, page, size
        );
    }

    @GetMapping("/summary")
    public List<CheckupReservationDashboard> selectReservationSummaryList(
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) Integer month,
            @RequestParam(required = false) Integer departmentId,
            @RequestParam(required = false) Integer jobId,
            @RequestParam(required = false) String name) {

        return checkupReservationDashboardService.selectReservationSummaryList(
                year, month, departmentId, jobId, name
        );
    }

    @PutMapping("/{reservationId}/approve")
    public ResponseEntity<String> approveReservation(
            @PathVariable Integer reservationId) {

        checkupReservationDashboardService.approveReservation(reservationId);

        return ResponseEntity.ok(
                "건강검진 예약이 승인되었습니다."
        );
    }

    @PutMapping("/{reservationId}/cancel")
    public ResponseEntity<String> cancelReservation(
            @PathVariable Integer reservationId) {

        checkupReservationDashboardService.cancelReservation(reservationId);

        return ResponseEntity.ok(
                "건강검진 예약이 취소되었습니다."
        );
    }
}
