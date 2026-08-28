package com.kh.wellsy.checkman.model.vo;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@NoArgsConstructor
@Setter
@Getter
@ToString
public class Checkman {


    // =========================================
    // 직원 정보
    // =========================================

    private Integer employeeNo;

    private String employeeName;

    private String departmentName;

    private String jobName;


    // =========================================
    // HEALTH_RECORD
    // =========================================

    private Integer healthRecordId;

    private LocalDate recordDate;

    private BigDecimal height;

    private BigDecimal weight;

    private BigDecimal bmi;

    private Integer systolicBp;

    private Integer diastolicBp;

    private BigDecimal bloodSugar;

    private BigDecimal caffeineAmount;

    private Integer smokingCount;

    private BigDecimal alcoholAmount;


    // =========================================
    // HEALTH_ALERT
    // =========================================

    private Integer alertId;

    private Integer checkupId;

    private String alertType;

    private String severity;

    private String message;

    private String isRead;

    private LocalDateTime alertCreatedAt;


    // =========================================
    // HEALTH_CHECKUP
    // =========================================

    private String resultGrade;

    private Integer checkupSystolicBp;

    private Integer checkupDiastolicBp;

    private BigDecimal checkupBloodSugar;

    private BigDecimal totalCholesterol;

    private BigDecimal checkupWeight;

    private BigDecimal checkupHeight;

    private String resultDetail;

    private LocalDateTime checkupCreatedAt;


    // =========================================
    // CHECKUP_RESERVATION
    // =========================================

    private LocalDate reservationDate;

    private String hospitalName;

}