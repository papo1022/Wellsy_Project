package com.kh.wellsy.health.model.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import com.kh.wellsy.health.model.vo.Health;

public interface HealthService {

    // 오늘의 건강 기록
    Health getTodayHealth(int employeeNo);

    // 특정 날짜 건강 기록
    Health getHealthByDate(
            int employeeNo,
            LocalDate date);

    String getHealthGrade(int employeeNo, LocalDate date);

    // 건강 등급
    String getHealthGrade(int employeeNo);

    // 건강기록 수정 또는 추가
    Health saveOrUpdateHealth(Health health);

    // 건강 기록 날짜 가져오기
    List<LocalDate> getHealthRecordDates(int employeeNo);

    List<Map<String, Object>> getHealthCalendar(
            int employeeNo);
}