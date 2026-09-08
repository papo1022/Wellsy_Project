package com.kh.wellsy.health.controller;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kh.wellsy.health.model.service.SleepService;
import com.kh.wellsy.health.model.vo.SleepRecord;

@RestController
public class SleepController {

    @Autowired
    private SleepService sleepService;

    // 수면 기록 조회
    @GetMapping("/sleep/{employeeNo}")
    public SleepRecord getSleepRecord(
            @PathVariable int employeeNo,
            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate date
    ) {

        if (date == null) {
            return sleepService.getTodaySleepRecord(employeeNo);
        }

        return sleepService.getSleepRecordByDate(
            employeeNo,
            date
        );
    }

    // 수면 기록 저장 또는 업데이트
    @PostMapping("/sleep")
    public SleepRecord saveSleep(
            @RequestBody SleepRecord sleepRecord
    ) {
        return sleepService.saveOrUpdateSleepRecord(
            sleepRecord
        );
    }
}