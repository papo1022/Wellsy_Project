package com.kh.wellsy.health.model.service;

import com.kh.wellsy.health.model.vo.SleepRecord;

public interface SleepService {
    // 오늘의 수면 기록 가져오기
    SleepRecord getTodaySleepRecord(int employeeNo);
}
