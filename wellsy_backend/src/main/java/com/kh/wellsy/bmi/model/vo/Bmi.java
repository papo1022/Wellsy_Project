package com.kh.wellsy.bmi.model.vo;

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
@Table(name = "HEALTH_RECORD")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Bmi {

    @Id
    @Column(name = "HEALTH_RECORD_ID")
    private Integer healthRecordId;

    @Column(name = "RECORD_DATE", nullable = false)
    private LocalDate recordDate;

    @Column(name = "HEIGHT", precision = 5, scale = 2)
    private BigDecimal height;

    @Column(name = "WEIGHT", precision = 5, scale = 2)
    private BigDecimal weight;

    @Column(name = "BMI", precision = 5, scale = 2)
    private BigDecimal bmi;

    @Column(name = "SYSTOLIC_BP")
    private Integer systolicBp;

    @Column(name = "DIASTOLIC_BP")
    private Integer diastolicBp;

    @Column(name = "BLOOD_SUGAR", precision = 6, scale = 2)
    private BigDecimal bloodSugar;

    @Column(name = "CAFFEINE_AMOUNT", precision = 4, scale = 1)
    private BigDecimal caffeineAmount;

    @Column(name = "ALCOHOL_AMOUNT", precision = 3, scale = 1)
    private BigDecimal alcoholAmount;

    @Column(name = "SMOKING_COUNT")
    private Integer smokingCount;

    @Column(name = "EMPLOYEE_NO", nullable = false)
    private Integer employeeNo;
}