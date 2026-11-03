package com.kh.wellsy.health.model.vo;

import java.math.BigDecimal;
import java.time.LocalDate;

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
@Table(name = "HEALTH_RECORD")
@DynamicInsert
@DynamicUpdate
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Health {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "HEALTH_RECORD_ID")
    private Integer healthRecordId;

    @Column(name = "EMPLOYEE_NO", nullable = false)
    private int employeeNo;

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

    @Column(name = "CAFFEINE_AMOUNT", precision = 6, scale = 2)
    private BigDecimal caffeineAmount;

    @Column(name = "SMOKING_COUNT")
    private Integer smokingCount;

    @Column(name = "ALCOHOL_AMOUNT", precision = 6, scale = 2)
    private BigDecimal alcoholAmount;
}