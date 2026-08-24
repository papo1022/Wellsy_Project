package com.kh.wellsy.healthstats.model.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kh.wellsy.bmi.model.vo.Bmi;
import com.kh.wellsy.healthstats.model.dao.HealthStatsDao;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class HealthStatsService {

    private final HealthStatsDao healthStatsDao;


    // 건강 통계 조회
    public List<Bmi> selectHealthStats(
            Integer employeeNo) {

        return healthStatsDao
                .findByEmployeeNoOrderByRecordDateAsc(
                        employeeNo
                );
    }
}