package com.kh.wellsy.exercise.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.wellsy.exercise.model.dto.ExerciseAiRequest;
import com.kh.wellsy.exercise.model.dto.ExerciseAiResponse;
import com.kh.wellsy.exercise.model.service.ExerciseAiService;

@RestController
@RequestMapping("/exercise/ai")
public class ExerciseAiController {

    private final ExerciseAiService exerciseAiService;

    public ExerciseAiController(
            ExerciseAiService exerciseAiService
    ) {
        this.exerciseAiService = exerciseAiService;
    }

    @PostMapping("/analyze-text")
    public ExerciseAiResponse analyzeText(
            @RequestBody ExerciseAiRequest request
    ) {
        return exerciseAiService.analyzeExercise(request);
    }
}