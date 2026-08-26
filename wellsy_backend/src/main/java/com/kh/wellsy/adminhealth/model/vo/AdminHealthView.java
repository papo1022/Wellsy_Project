package com.kh.wellsy.adminhealth.model.vo;

import java.math.BigDecimal;
import java.time.LocalDate;

public interface AdminHealthView {

    Integer getEmployeeNo();

    String getName();

    String getDepartmentName();

    String getJobName();

    LocalDate getRecordDate();

    BigDecimal getHeight();

    BigDecimal getWeight();

    BigDecimal getBmi();

    Integer getSystolicBp();

    Integer getDiastolicBp();

    BigDecimal getBloodSugar();
}