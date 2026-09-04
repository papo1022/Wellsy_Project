package com.kh.wellsy.schedule.model.dao;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kh.wellsy.schedule.model.vo.Schedule;

public interface ScheduleDao
        extends JpaRepository<Schedule, Integer> {

    // 직원 일정 조회
    List<Schedule>
    findByEmployeeNoOrderByStartDateAsc(
            Integer employeeNo
    );


    // 건강검진 예약 취소 시
    // 해당 직원의 해당 날짜 건강검진 일정 삭제
    void deleteByEmployeeNoAndTitleAndStartDateBetween(
            Integer employeeNo,
            String title,
            LocalDateTime startDate,
            LocalDateTime endDate
    );

}