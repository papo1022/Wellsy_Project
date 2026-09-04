package com.kh.wellsy.health.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.kh.wellsy.health.model.service.SleepService;
import com.kh.wellsy.health.model.vo.SleepRecord;

@RestController
public class SleepController {

    @Autowired
    private SleepService sleepService;

    // 오늘의 수면 기록 가져오기
    @GetMapping("/sleep/{employeeNo}")
    public SleepRecord getTodaySleepRecord(@PathVariable int employeeNo) {
        return sleepService.getTodaySleepRecord(employeeNo);
    }

    // 수면 기록 저장 또는 업데이트
    @PostMapping("/sleep")
    public SleepRecord saveSleep(@RequestBody SleepRecord sleepRecord) {
        return sleepService.saveOrUpdateSleepRecord(sleepRecord);
    }
}
