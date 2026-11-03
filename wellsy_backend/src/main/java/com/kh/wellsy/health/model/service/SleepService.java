package com.kh.wellsy.health.model.service;

import java.time.LocalDate;

import com.kh.wellsy.health.model.vo.SleepRecord;

public interface SleepService {

    // 오늘의 수면 기록
    SleepRecord getTodaySleepRecord(int employeeNo);

    // 특정 날짜 수면 기록
    SleepRecord getSleepRecordByDate(
        int employeeNo,
        LocalDate date
    );

    // 수면 기록 저장 또는 업데이트
    SleepRecord saveOrUpdateSleepRecord(
        SleepRecord sleepRecord
    );
}