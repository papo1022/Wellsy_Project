package com.kh.wellsy.schedule.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kh.wellsy.schedule.model.service.ScheduleService;
import com.kh.wellsy.schedule.model.vo.Schedule;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/schedules")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ScheduleController {

    private final ScheduleService scheduleService;

    // 일정 목록 조회
    @GetMapping
    public List<Schedule> selectScheduleList(
            @RequestParam Integer memberId) {

        return scheduleService
                .selectScheduleList(memberId);
    }

    // 일정 상세 조회
    @GetMapping("/{scheduleId}")
    public Schedule selectSchedule(
            @PathVariable Integer scheduleId) {

        return scheduleService
                .selectSchedule(scheduleId);
    }

    // 일정 등록
    @PostMapping
    public Schedule insertSchedule(
            @RequestBody Schedule schedule) {

        return scheduleService
                .insertSchedule(schedule);
    }

    // 일정 수정
    @PutMapping("/{scheduleId}")
    public Schedule updateSchedule(
            @PathVariable Integer scheduleId,
            @RequestBody Schedule schedule) {

        return scheduleService
                .updateSchedule(
                        scheduleId,
                        schedule
                );
    }

    // 일정 삭제
    @DeleteMapping("/{scheduleId}")
    public void deleteSchedule(
            @PathVariable Integer scheduleId) {

        scheduleService
                .deleteSchedule(scheduleId);
    }
}