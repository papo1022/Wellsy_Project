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

    private final CheckupReservationDashboardDao checkupReservationDashboardDao;
    private final ScheduleDao scheduleDao;

    public List<CheckupReservationDashboard> selectReservationList(
            Integer year, Integer month, Integer departmentId,
            Integer jobId, String name, String status) {

        return checkupReservationDashboardDao.selectReservationList(
                year, month, departmentId, jobId, name, status
        );
    }

    @Transactional
    public void approveReservation(Integer reservationId) {

        CheckupReservation reservation =
                checkupReservationDashboardDao.findById(reservationId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "건강검진 예약 정보를 찾을 수 없습니다."
                                )
                        );

        if (!"N".equals(reservation.getStatus())) {
            throw new RuntimeException(
                    "승인 대기 상태의 예약만 승인할 수 있습니다."
            );
        }

        reservation.setStatus("Y");
        checkupReservationDashboardDao.save(reservation);

        LocalDateTime startDate =
                reservation.getReservationDate().atStartOfDay();

        LocalDateTime endDate =
                reservation.getReservationDate().atTime(23, 59, 59);

        Schedule schedule = new Schedule();

        schedule.setEmployeeNo(
                reservation.getEmployeeNo()
        );

        schedule.setTitle(
                "건강검진"
        );

        if (
            reservation.getHospitalName() != null
            &&
            !reservation.getHospitalName().isBlank()
        ) {
            schedule.setContent(
                    "건강검진 - " + reservation.getHospitalName()
            );
        } else {
            schedule.setContent(
                    "건강검진"
            );
        }

        schedule.setStartDate(startDate);
        schedule.setEndDate(endDate);

        scheduleDao.save(schedule);
    }

    @Transactional
    public void cancelReservation(Integer reservationId) {

        CheckupReservation reservation =
                checkupReservationDashboardDao.findById(reservationId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "건강검진 예약 정보를 찾을 수 없습니다."
                                )
                        );

        if ("C".equals(reservation.getStatus())) {
            throw new RuntimeException(
                    "이미 취소된 예약입니다."
            );
        }

        reservation.setStatus("C");
        checkupReservationDashboardDao.save(reservation);

        LocalDateTime startDate =
                reservation.getReservationDate().atStartOfDay();

        LocalDateTime endDate =
                reservation.getReservationDate().atTime(23, 59, 59);

        scheduleDao.deleteByEmployeeNoAndTitleAndStartDateBetween(
                reservation.getEmployeeNo(),
                "건강검진",
                startDate,
                endDate
        );
    }
}
