package com.kh.wellsy.health.model.dao;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kh.wellsy.health.model.vo.Health;

@Repository
public interface HealthDao extends JpaRepository<Health, Integer> {

    Health findByEmployeeNoAndRecordDate(
        int employeeNo,
        LocalDate recordDate
    );
}