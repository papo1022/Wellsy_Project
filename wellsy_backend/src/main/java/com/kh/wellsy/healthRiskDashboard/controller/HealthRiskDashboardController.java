package com.kh.wellsy.healthRiskDashboard.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kh.wellsy.healthRiskDashboard.model.service.HealthRiskDashboardService;
import com.kh.wellsy.healthRiskDashboard.model.vo.HealthRiskResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/health-risk")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class HealthRiskDashboardController {

    private final HealthRiskDashboardService
            healthRiskDashboardService;


    @GetMapping
    public List<HealthRiskResponse>
            selectHealthRiskList(

                    @RequestParam(required = false)
                    Integer departmentId,

                    @RequestParam(required = false)
                    Integer jobId,

                    @RequestParam(required = false)
                    String name,

                    @RequestParam(required = false)
                    String riskLevel) {

        return healthRiskDashboardService
                .selectHealthRiskList(
                        departmentId,
                        jobId,
                        name,
                        riskLevel
                );
    }
}