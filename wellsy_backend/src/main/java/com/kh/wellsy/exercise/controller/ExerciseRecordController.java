package com.kh.wellsy.exercise.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kh.wellsy.exercise.model.dto.ExerciseRecordRequest;
import com.kh.wellsy.exercise.model.service.ExerciseRecordService;

@RestController
@RequestMapping("/exercise")
public class ExerciseRecordController {

    private final ExerciseRecordService exerciseRecordService;

    public ExerciseRecordController(
            ExerciseRecordService exerciseRecordService) {
        this.exerciseRecordService = exerciseRecordService;
    }

    // 저장 / 수정
    @PostMapping
    public void saveExercise(
            @RequestBody ExerciseRecordRequest request) {

        exerciseRecordService.saveExercise(request);
    }

    // 날짜별 조회
    @GetMapping("/{employeeNo}")
    public List<Map<String, Object>> getExercises(
            @PathVariable Integer employeeNo,

            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {

        return exerciseRecordService
                .getExercisesByDate(
                        employeeNo,
                        date);
    }

    // 삭제
    @DeleteMapping("/{exerciseRecordId}")
    public void deleteExercise(
            @PathVariable Integer exerciseRecordId) {

        exerciseRecordService
                .deleteExercise(
                        exerciseRecordId);
    }
}