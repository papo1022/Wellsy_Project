package com.kh.wellsy.exercise.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ExerciseAiRequest {

    private String exerciseName;
    private String amountDescription;
    private Double weight;
    
    public ExerciseAiRequest() {}
}