package com.kh.wellsy.checkupReservationDashboard.model.vo;

import java.time.LocalDate;

public interface CheckupReservationDashboard {

    Integer getReservationId();

    Integer getEmployeeNo();

    String getName();

    String getDepartmentName();

    String getJobName();

    LocalDate getReservationDate();

    LocalDate getRecentCheckupDate();

    String getHospitalName();

    String getStatus();

    String getMemo();
}