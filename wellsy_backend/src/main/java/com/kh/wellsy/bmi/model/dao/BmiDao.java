package com.kh.wellsy.bmi.model.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kh.wellsy.bmi.model.vo.Bmi;

public interface BmiDao extends JpaRepository<Bmi, Integer> {

    List<Bmi> findByEmployeeNoAndBmiIsNotNullOrderByRecordDateAsc(
            Integer employeeNo
    );
}