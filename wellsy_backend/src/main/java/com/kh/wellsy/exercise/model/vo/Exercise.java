package com.kh.wellsy.exercise.model.vo;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "EXERCISE")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Exercise {

    @Id
    @Column(name = "EXERCISE_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer exerciseId;

    @Column(name = "EXERCISE_NAME", nullable = false, length = 100)
    private String exerciseName;

    @Column(name = "EXERCISE_TYPE", length = 50)
    private String exerciseType;

    @Column(name = "DESCRIPTION", length = 1000)
    private String description;

    @Column(name = "DIFFICULTY", length = 20)
    private String difficulty;

    @Column(name = "CALORIES_PER_MINUTE", precision = 6, scale = 2)
    private BigDecimal caloriesPerMinute;

    @Column(name = "THUMBNAIL_IMAGE_URL", length = 500)
    private String thumbnailImageUrl;

    @Column(name = "GUIDE_IMAGE_URL", length = 500)
    private String guideImageUrl;
}