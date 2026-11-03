package com.kh.wellsy.exercise.model.dao;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kh.wellsy.exercise.model.vo.ExerciseRecord;

public interface ExerciseRecordDao
        extends JpaRepository<ExerciseRecord, Integer> {

    List<ExerciseRecord>
    findByEmployeeNoAndExerciseDateBetweenOrderByExerciseDateAsc(
            Integer employeeNo,
            LocalDate startDate,
            LocalDate endDate
    );

    List<ExerciseRecord>
    findByEmployeeNoAndExerciseDate(
            Integer employeeNo,
            LocalDate exerciseDate
    );
}