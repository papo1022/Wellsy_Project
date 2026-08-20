package com.kh.wellsy.schedule.model.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kh.wellsy.schedule.model.vo.Schedule;

public interface ScheduleDao
        extends JpaRepository<Schedule, Integer> {

    List<Schedule>
    findByMemberIdOrderByStartDateAsc(Integer memberId);
}