package com.kh.wellsy.health.model.vo;

import java.math.BigDecimal;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "HEALTH_STANDARD")
@DynamicInsert
@DynamicUpdate
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class HealthStandard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "STANDARD_ID")
    private Integer standardId;

    @Column(name = "METRIC_TYPE", nullable = false)
    private String metricType;

    @Column(name = "GENDER")
    private String gender;

    @Column(name = "MIN_AGE")
    private Integer minAge;

    @Column(name = "MAX_AGE")
    private Integer maxAge;

    @Column(name = "MIN_VALUE", precision = 8, scale = 2)
    private BigDecimal minValue;

    @Column(name = "MAX_VALUE", precision = 8, scale = 2)
    private BigDecimal maxValue;

    @Column(name = "UNIT")
    private String unit;

    @Column(name = "GRADE", nullable = false)
    private String grade;

    @Column(name = "DESCRIPTION")
    private String description;
}