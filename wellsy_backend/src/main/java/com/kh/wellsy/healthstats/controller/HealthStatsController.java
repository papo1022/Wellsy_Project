package com.kh.wellsy.healthstats.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kh.wellsy.bmi.model.vo.Bmi;
import com.kh.wellsy.healthstats.model.service.HealthStatsService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/health-stats")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class HealthStatsController {

    private final HealthStatsService healthStatsService;


    // 건강 통계 조회
    @GetMapping
    public List<Bmi> selectHealthStats(
            @RequestParam Integer employeeNo) {

        return healthStatsService
                .selectHealthStats(
                        employeeNo
                );
    }
}