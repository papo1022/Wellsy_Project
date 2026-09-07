package com.kh.wellsy.exercise.model.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kh.wellsy.exercise.model.dao.ExerciseDao;
import com.kh.wellsy.exercise.model.dao.ExerciseRecordDao;
import com.kh.wellsy.exercise.model.dto.ExerciseRecordRequest;
import com.kh.wellsy.exercise.model.vo.Exercise;
import com.kh.wellsy.exercise.model.vo.ExerciseRecord;

@Service
public class ExerciseRecordService {

    private final ExerciseDao exerciseDao;
    private final ExerciseRecordDao exerciseRecordDao;

    public ExerciseRecordService(
            ExerciseDao exerciseDao,
            ExerciseRecordDao exerciseRecordDao) {
        this.exerciseDao = exerciseDao;
        this.exerciseRecordDao = exerciseRecordDao;
    }

    // 운동 기록 저장 / 수정
    @Transactional
    public void saveExercise(
            ExerciseRecordRequest request) {

        /*
         * 1. 운동 마스터 조회
         * 같은 운동명이 있으면 기존 EXERCISE 사용
         * 없으면 새로 등록
         */
        Exercise exercise = exerciseDao
                .findByExerciseName(request.getExerciseName())
                .orElseGet(() -> {

                    Exercise newExercise = Exercise.builder()
                            .exerciseName(request.getExerciseName())
                            .exerciseType(request.getExerciseType())
                            .difficulty(request.getDifficulty())
                            .caloriesPerMinute(
                                    request.getCaloriesPerMinute())
                            .build();

                    return exerciseDao.save(newExercise);
                });

        /*
         * 2. 운동 기록
         * exerciseRecordId가 있으면 수정
         * 없으면 신규
         */
        ExerciseRecord record;

        if (request.getExerciseRecordId() != null) {

            record = exerciseRecordDao
                    .findById(request.getExerciseRecordId())
                    .orElseThrow(() -> new RuntimeException(
                            "운동 기록을 찾을 수 없습니다."));

        } else {

            record = new ExerciseRecord();

            record.setEmployeeNo(
                    request.getEmployeeNo());

            record.setExerciseDate(
                    request.getExerciseDate() != null
                            ? request.getExerciseDate()
                            : LocalDate.now());
        }

        record.setExerciseId(
                exercise.getExerciseId());

        record.setDuration(
                request.getDuration());

        record.setTargetCount(
                request.getTargetCount());

        record.setStatus(
                request.getStatus() != null
                        ? request.getStatus()
                        : "COMPLETED");

        record.setMemo(
                request.getMemo());

        exerciseRecordDao.save(record);
    }

    // 날짜별 운동 조회
    public List<Map<String, Object>> getExercisesByDate(
            Integer employeeNo,
            LocalDate date) {

        List<ExerciseRecord> records = exerciseRecordDao
                .findByEmployeeNoAndExerciseDate(
                        employeeNo,
                        date);

        List<Map<String, Object>> result = new ArrayList<>();

        for (ExerciseRecord record : records) {

            Exercise exercise = exerciseDao
                    .findById(record.getExerciseId())
                    .orElse(null);

            if (exercise == null) {
                continue;
            }

            Map<String, Object> item = new HashMap<>();

            item.put(
                    "exerciseRecordId",
                    record.getExerciseRecordId());

            item.put(
                    "exerciseId",
                    exercise.getExerciseId());

            item.put(
                    "exerciseName",
                    exercise.getExerciseName());

            item.put(
                    "exerciseType",
                    exercise.getExerciseType());

            item.put(
                    "difficulty",
                    exercise.getDifficulty());

            item.put(
                    "caloriesPerMinute",
                    exercise.getCaloriesPerMinute());

            item.put(
                    "duration",
                    record.getDuration());

            item.put(
                    "targetCount",
                    record.getTargetCount());

            item.put(
                    "status",
                    record.getStatus());

            item.put(
                    "memo",
                    record.getMemo());

            item.put(
                    "exerciseDate",
                    record.getExerciseDate());

            // 예상 소모 칼로리
            if (exercise.getCaloriesPerMinute() != null
                    && record.getDuration() != null) {

                item.put(
                        "estimatedCalories",
                        exercise
                                .getCaloriesPerMinute()
                                .multiply(
                                        java.math.BigDecimal.valueOf(
                                                record.getDuration())));

            } else {

                item.put(
                        "estimatedCalories",
                        0);
            }

            result.add(item);
        }

        return result;
    }

    // 운동 기록 삭제
    @Transactional
    public void deleteExercise(
            Integer exerciseRecordId) {

        exerciseRecordDao.deleteById(
                exerciseRecordId);
    }
}