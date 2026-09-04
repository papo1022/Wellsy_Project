package com.kh.wellsy.health.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.kh.wellsy.health.model.service.HealthService;
import com.kh.wellsy.health.model.vo.Health;

@RestController
public class HealthController {

    @Autowired
    private HealthService healthService;

    // 오늘의 건강 기록 가져오기
    @GetMapping("/health/{employeeNo}")
    public Health getTodayHealth(@PathVariable int employeeNo) {
        return healthService.getTodayHealth(employeeNo);
    }
}
