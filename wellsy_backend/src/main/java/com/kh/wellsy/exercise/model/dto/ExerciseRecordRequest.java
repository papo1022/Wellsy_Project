package com.kh.wellsy.exercise.model.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ExerciseRecordRequest {

    // 수정할 때만 존재
    private Integer exerciseRecordId;

    private Integer employeeNo;
    private LocalDate exerciseDate;

    // EXERCISE 정보
    private String exerciseName;
    private String exerciseType;
    private String difficulty;
    private BigDecimal caloriesPerMinute;

    // EXERCISE_RECORD 정보
    private Integer duration;
    private Integer targetCount;
    private String status;
    private String memo;
}