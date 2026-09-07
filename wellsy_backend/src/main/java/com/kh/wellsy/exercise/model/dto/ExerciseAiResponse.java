package com.kh.wellsy.exercise.model.dto;

import java.math.BigDecimal;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter 
public class ExerciseAiResponse {

    private String exerciseName;
    private String amountDescription;
    private String exerciseType;
    private String difficulty;
    private Integer durationMinutes;
    private Integer count;
    private BigDecimal caloriesPerMinute;
    private BigDecimal estimatedCalories;

    public ExerciseAiResponse() {}
}