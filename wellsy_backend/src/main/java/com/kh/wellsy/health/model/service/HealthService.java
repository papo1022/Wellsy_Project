package com.kh.wellsy.health.model.service;
import com.kh.wellsy.health.model.vo.Health;
public interface HealthService {

    // 오늘의 건강 기록 가져오기
    Health getTodayHealth(int employeeNo);

    // 건강 등급 가져오기
    String getHealthGrade(int employeeNo);
}
