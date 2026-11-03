package com.kh.wellsy.health.model.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import com.kh.wellsy.health.model.vo.MealRecord;

@Repository
public interface MealRecordDao extends JpaRepository<MealRecord, Integer> {

    // 오늘 전체 식사 조회
    List<MealRecord> findByEmployeeNoAndMealDate(
            Integer employeeNo,
            LocalDate mealDate);

    // 특정 날짜 + 끼니 조회
    Optional<MealRecord> findByEmployeeNoAndMealDateAndMealType(
            Integer employeeNo,
            LocalDate mealDate,
            String mealType);
}
