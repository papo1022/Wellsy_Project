package com.kh.wellsy.schedule.model.dao;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kh.wellsy.schedule.model.vo.Schedule;

public interface ScheduleDao
        extends JpaRepository<Schedule, Integer> {

    List<Schedule>
    findByEmployeeNoOrderByStartDateAsc(
            Integer employeeNo
    );

    void deleteByEmployeeNoAndTitleAndStartDateBetween(
            Integer employeeNo,
            String title,
            LocalDateTime startDate,
            LocalDateTime endDate
    );
}
