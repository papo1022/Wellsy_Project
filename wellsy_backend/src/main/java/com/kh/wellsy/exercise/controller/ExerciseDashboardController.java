package com.kh.wellsy.exercise.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kh.wellsy.exercise.model.service.ExerciseDashboardService;
import com.kh.wellsy.exercise.model.vo.ExerciseRecord;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/exercise")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ExerciseDashboardController {

    private final ExerciseDashboardService exerciseDashboardService;

    @GetMapping("/weekly")
    public List<ExerciseRecord> selectWeeklyExerciseList(
            @RequestParam Integer employeeNo) {

        return exerciseDashboardService
                .selectWeeklyExerciseList(employeeNo);
    }
}