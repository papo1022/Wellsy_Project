package com.kh.wellsy.checkupReservationDashboard.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kh.wellsy.checkupReservationDashboard.model.service.CheckupReservationDashboardService;
import com.kh.wellsy.checkupReservationDashboard.model.vo.CheckupReservationDashboard;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/checkup-reservations")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class CheckupReservationDashboardController {

    private final CheckupReservationDashboardService
            checkupReservationDashboardService;


    @GetMapping
    public List<CheckupReservationDashboard>
            selectReservationList(

                    @RequestParam Integer year,
                    @RequestParam Integer month,

                    @RequestParam(required = false)
                    Integer departmentId,

                    @RequestParam(required = false)
                    Integer jobId,

                    @RequestParam(required = false)
                    String name,

                    @RequestParam(required = false)
                    String status) {

        return checkupReservationDashboardService
                .selectReservationList(
                        year,
                        month,
                        departmentId,
                        jobId,
                        name,
                        status
                );
    }
}