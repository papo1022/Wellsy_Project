package com.kh.wellsy.health.model.service;

import java.math.BigDecimal;
import java.time.Duration;
import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kh.wellsy.health.model.dao.HealthDao;
import com.kh.wellsy.health.model.dao.HealthStandardDao;
import com.kh.wellsy.health.model.dao.SleepRecordDao;
import com.kh.wellsy.health.model.vo.Health;
import com.kh.wellsy.health.model.vo.HealthStandard;
import com.kh.wellsy.health.model.vo.SleepRecord;

@Service
public class HealthServiceImpl implements HealthService {

    private final HealthDao healthDao;
    private final HealthStandardDao healthStandardDao;
    private final SleepRecordDao sleepRecordDao;

    @Autowired
    public HealthServiceImpl(HealthDao healthDao, HealthStandardDao healthStandardDao, SleepRecordDao sleepRecordDao) {
        this.healthDao = healthDao;
        this.healthStandardDao = healthStandardDao;
        this.sleepRecordDao = sleepRecordDao;
    }

    @Override
    public Health getTodayHealth(int employeeNo) {
        LocalDate today = LocalDate.now();
        return healthDao.findByEmployeeNoAndRecordDate(employeeNo, today);
    }

    // 건강 등급 계산
    @Override
    public String getHealthGrade(int employeeNo) {

        Health health = getTodayHealth(employeeNo);

        if (health == null) {
            return null;
        }

        String finalGrade = "normal";

        // BMI
        if (health.getBmi() != null) {
            String grade = calculateGrade("BMI", health.getBmi());
            finalGrade = getHigherGrade(finalGrade, grade);
        }

        // 혈당
        if (health.getBloodSugar() != null) {
            String grade = calculateGrade(
                    "BLOOD_SUGAR",
                    health.getBloodSugar());
            finalGrade = getHigherGrade(finalGrade, grade);
        }

        // 수축기 혈압
        if (health.getSystolicBp() != null) {
            String grade = calculateGrade(
                    "SYSTOLIC_BP",
                    BigDecimal.valueOf(health.getSystolicBp()));
            finalGrade = getHigherGrade(finalGrade, grade);
        }

        // 이완기 혈압
        if (health.getDiastolicBp() != null) {
            String grade = calculateGrade(
                    "DIASTOLIC_BP",
                    BigDecimal.valueOf(health.getDiastolicBp()));
            finalGrade = getHigherGrade(finalGrade, grade);
        }

        // 수면시간
        SleepRecord sleepRecord = sleepRecordDao.findByEmployeeNoAndSleepDate(
                employeeNo,
                LocalDate.now());

        if (sleepRecord != null
                && sleepRecord.getSleepStart() != null
                && sleepRecord.getSleepEnd() != null) {

            Duration duration = Duration.between(
                    sleepRecord.getSleepStart(),
                    sleepRecord.getSleepEnd());

            BigDecimal sleepHours = BigDecimal.valueOf(
                    duration.toMinutes() / 60.0);

            String grade = calculateGrade(
                    "SLEEP_TIME",
                    sleepHours);

            finalGrade = getHigherGrade(finalGrade, grade);
        }

        return finalGrade;
    }

    // 등급 계산
    private String calculateGrade(String metricType, BigDecimal value) {

        List<HealthStandard> standards = healthStandardDao.findByMetricType(metricType);

        for (HealthStandard standard : standards) {

            BigDecimal min = standard.getMinValue();
            BigDecimal max = standard.getMaxValue();

            boolean minOk = min == null || value.compareTo(min) >= 0;

            boolean maxOk = max == null || value.compareTo(max) < 0;

            if (minOk && maxOk) {
                return standard.getGrade();
            }
        }

        return null;
    }

    // 위험도 비교
    private String getHigherGrade(String current, String newGrade) {

        if (newGrade == null) {
            return current;
        }

        List<String> gradeOrder = List.of(
                "normal",
                "interest",
                "caution",
                "warning",
                "danger");

        if (gradeOrder.indexOf(newGrade) > gradeOrder.indexOf(current)) {
            return newGrade;
        }

        return current;
    }

    // 건강기록 수정 또는 추가
    @Override
    public Health saveOrUpdateHealth(Health health) {

        Health existingHealth = healthDao.findByEmployeeNoAndRecordDate(
                health.getEmployeeNo(),
                health.getRecordDate());

        if (existingHealth == null) {
            return healthDao.save(health);
        }

        if (health.getHeight() != null) {
            existingHealth.setHeight(health.getHeight());
        }

        if (health.getWeight() != null) {
            existingHealth.setWeight(health.getWeight());
        }

        if (health.getCaffeineAmount() != null) {
            existingHealth.setCaffeineAmount(health.getCaffeineAmount());
        }

        if (health.getAlcoholAmount() != null) {
            existingHealth.setAlcoholAmount(health.getAlcoholAmount());
        }

        if (health.getSmokingCount() != null) {
            existingHealth.setSmokingCount(health.getSmokingCount());
        }

        return healthDao.save(existingHealth);
    }
}
