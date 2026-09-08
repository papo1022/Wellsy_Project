package com.kh.wellsy.health.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kh.wellsy.health.model.service.HealthService;
import com.kh.wellsy.health.model.vo.Health;

@RestController
public class HealthController {

    @Autowired
    private HealthService healthService;

    // 건강 기록 가져오기
    @GetMapping("/health/{employeeNo}")
    public Health getHealth(
            @PathVariable int employeeNo,
            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate date) {

        if (date == null) {
            return healthService.getTodayHealth(employeeNo);
        }

        return healthService.getHealthByDate(
                employeeNo,
                date
        );
    }

    // 오늘 건강 등급 가져오기
    @GetMapping("/health/grade/{employeeNo}")
    public String getHealthGrade(
            @PathVariable int employeeNo) {

        return healthService.getHealthGrade(
                employeeNo
        );
    }

    // 건강 기록 수정 또는 추가
    @PostMapping("/health")
    public Health saveOrUpdateHealth(
            @RequestBody Health health) {

        return healthService.saveOrUpdateHealth(
                health
        );
    }

    // 캘린더용 날짜 + 건강 등급 가져오기
    @GetMapping("/health/calendar/{employeeNo}")
    public List<Map<String, Object>> getHealthCalendar(
            @PathVariable int employeeNo) {

        return healthService.getHealthCalendar(
                employeeNo
        );
    }
}