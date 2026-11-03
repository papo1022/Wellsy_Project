package com.kh.wellsy.healthstats.model.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kh.wellsy.bmi.model.vo.Bmi;

public interface HealthStatsDao
        extends JpaRepository<Bmi, Integer> {

    List<Bmi>
    findByEmployeeNoOrderByRecordDateAsc(
            Integer employeeNo
    );
}