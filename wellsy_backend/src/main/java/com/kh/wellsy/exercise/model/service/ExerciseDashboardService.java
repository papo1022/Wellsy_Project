package com.kh.wellsy.exercise.model.service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.kh.wellsy.exercise.model.dao.ExerciseRecordDao;
import com.kh.wellsy.exercise.model.vo.ExerciseRecord;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ExerciseDashboardService {

    private final ExerciseRecordDao exerciseRecordDao;

    public List<ExerciseRecord> selectWeeklyExerciseList(
            Integer employeeNo) {

        LocalDate today = LocalDate.now();

        LocalDate monday =
                today.with(DayOfWeek.MONDAY);

        LocalDate sunday =
                today.with(DayOfWeek.SUNDAY);

        return exerciseRecordDao
                .findByEmployeeNoAndExerciseDateBetweenOrderByExerciseDateAsc(
                        employeeNo,
                        monday,
                        sunday
                );
    }
}