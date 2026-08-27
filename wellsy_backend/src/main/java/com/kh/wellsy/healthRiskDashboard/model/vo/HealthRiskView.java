package com.kh.wellsy.healthRiskDashboard.model.vo;

import java.math.BigDecimal;
import java.time.LocalDate;

public interface HealthRiskView {

    Integer getEmployeeNo();

    String getName();

    Integer getDepartmentId();

    String getDepartmentName();

    Integer getJobId();

    String getJobName();

    LocalDate getRecordDate();

    BigDecimal getHeight();

    BigDecimal getWeight();

    BigDecimal getBmi();

    Integer getSystolicBp();

    Integer getDiastolicBp();

    BigDecimal getBloodSugar();

    Integer getCheckupReserved();
}