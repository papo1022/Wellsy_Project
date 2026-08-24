package com.kh.wellsy.exercise.model.vo;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "EXERCISE_RECORD")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExerciseRecord {

    @Id
    @Column(name = "EXERCISE_RECORD_ID")
    private Integer exerciseRecordId;

    @Column(name = "EMPLOYEE_NO", nullable = false)
    private Integer employeeNo;

    @Column(name = "EXERCISE_ID", nullable = false)
    private Integer exerciseId;

    @Column(name = "EXERCISE_DATE", nullable = false)
    private LocalDate exerciseDate;

    @Column(name = "DURATION")
    private Integer duration;

    @Column(name = "TARGET_DURATION")
    private Integer targetDuration;

    @Column(name = "TARGET_COUNT")
    private Integer targetCount;

    @Column(name = "ACHIEVEMENT_RATE", precision = 5, scale = 2)
    private BigDecimal achievementRate;

    @Column(name = "STATUS", nullable = false, length = 20)
    private String status;

    @Column(name = "FAILURE_REASON", length = 500)
    private String failureReason;

    @Column(name = "MEMO", length = 1000)
    private String memo;
}