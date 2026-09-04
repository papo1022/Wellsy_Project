package com.kh.wellsy.health.model.dao;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kh.wellsy.health.model.vo.SleepRecord;

@Repository
public interface SleepDao extends JpaRepository<SleepRecord, Integer> {

    SleepRecord findByEmployeeNoAndSleepDate(
        int employeeNo,
        LocalDate sleepDate
    ); 
}