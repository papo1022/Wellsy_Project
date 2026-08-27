package com.kh.wellsy.healthRiskDashboard.model.vo;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HealthRiskResponse {

    private Integer employeeNo;

    private String name;

    private Integer departmentId;

    private String departmentName;

    private Integer jobId;

    private String jobName;

    private LocalDate recordDate;

    private BigDecimal height;

    private BigDecimal weight;

    private BigDecimal bmi;

    private Integer systolicBp;

    private Integer diastolicBp;

    private BigDecimal bloodSugar;

    private Integer riskCount;

    private String riskLevel;

    private List<String> riskReasons;

    private Boolean checkupReserved;
}