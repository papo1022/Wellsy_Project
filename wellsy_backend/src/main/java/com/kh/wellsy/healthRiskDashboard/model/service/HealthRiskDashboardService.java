package com.kh.wellsy.healthRiskDashboard.model.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.kh.wellsy.healthRiskDashboard.model.dao.HealthRiskDashboardDao;
import com.kh.wellsy.healthRiskDashboard.model.vo.HealthRiskResponse;
import com.kh.wellsy.healthRiskDashboard.model.vo.HealthRiskView;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class HealthRiskDashboardService {

    private final HealthRiskDashboardDao healthRiskDashboardDao;


    public List<HealthRiskResponse> selectHealthRiskList(
            Integer departmentId,
            Integer jobId,
            String name,
            String riskLevel) {

        List<HealthRiskView> list =
                healthRiskDashboardDao
                        .selectHealthRiskList(
                                departmentId,
                                jobId,
                                name
                        );


        List<HealthRiskResponse> result =
                new ArrayList<>();


        for (HealthRiskView item : list) {

            List<String> reasons =
                    new ArrayList<>();

            int riskCount = 0;


            // BMI
            if (
                item.getBmi() != null &&
                item.getBmi().compareTo(
                        new BigDecimal("25")
                ) >= 0
            ) {

                riskCount++;

                reasons.add(
                        "BMI 기준 초과"
                );
            }


            // 혈압
            boolean bloodPressureRisk =
                    (
                        item.getSystolicBp() != null &&
                        item.getSystolicBp() >= 140
                    )
                    ||
                    (
                        item.getDiastolicBp() != null &&
                        item.getDiastolicBp() >= 90
                    );


            if (bloodPressureRisk) {

                riskCount++;

                reasons.add(
                        "혈압 기준 초과"
                );
            }


            // 혈당
            if (
                item.getBloodSugar() != null &&
                item.getBloodSugar().compareTo(
                        new BigDecimal("126")
                ) >= 0
            ) {

                riskCount++;

                reasons.add(
                        "혈당 기준 초과"
                );
            }


            String calculatedRiskLevel;


            if (riskCount >= 2) {

                calculatedRiskLevel =
                        "RISK";

            } else if (riskCount == 1) {

                calculatedRiskLevel =
                        "CAUTION";

            } else {

                calculatedRiskLevel =
                        "NORMAL";
            }


            // 위험도 검색
            if (
                riskLevel != null &&
                !riskLevel.isBlank() &&
                !riskLevel.equals(
                        calculatedRiskLevel
                )
            ) {

                continue;
            }


            HealthRiskResponse response =
                    HealthRiskResponse.builder()

                            .employeeNo(
                                    item.getEmployeeNo()
                            )

                            .name(
                                    item.getName()
                            )

                            .departmentId(
                                    item.getDepartmentId()
                            )

                            .departmentName(
                                    item.getDepartmentName()
                            )

                            .jobId(
                                    item.getJobId()
                            )

                            .jobName(
                                    item.getJobName()
                            )

                            .recordDate(
                                    item.getRecordDate()
                            )

                            .height(
                                    item.getHeight()
                            )

                            .weight(
                                    item.getWeight()
                            )

                            .bmi(
                                    item.getBmi()
                            )

                            .systolicBp(
                                    item.getSystolicBp()
                            )

                            .diastolicBp(
                                    item.getDiastolicBp()
                            )

                            .bloodSugar(
                                    item.getBloodSugar()
                            )

                            .riskCount(
                                    riskCount
                            )

                            .riskLevel(
                                    calculatedRiskLevel
                            )

                            .riskReasons(
                                    reasons
                            )

                            .checkupReserved(
                                    item.getCheckupReserved() != null
                                    &&
                                    item.getCheckupReserved() == 1
                            )

                            .build();


            result.add(response);
        }


        return result;
    }
}