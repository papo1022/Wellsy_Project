package com.kh.wellsy.checkupReservationDashboard.model.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kh.wellsy.checkupReservationDashboard.model.dao.CheckupReservationDashboardDao;
import com.kh.wellsy.checkupReservationDashboard.model.vo.CheckupReservationDashboard;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CheckupReservationDashboardService {

    private final CheckupReservationDashboardDao
            checkupReservationDashboardDao;


    // 건강검진 예약 현황 조회
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
}