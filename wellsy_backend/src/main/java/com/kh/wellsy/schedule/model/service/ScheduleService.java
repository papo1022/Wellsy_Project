package com.kh.wellsy.schedule.model.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kh.wellsy.schedule.model.dao.ScheduleDao;
import com.kh.wellsy.schedule.model.vo.Schedule;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ScheduleService {

    private final ScheduleDao scheduleDao;

    // 일정 목록 조회
    public List<Schedule> selectScheduleList(Integer memberId) {

        return scheduleDao
                .findByMemberIdOrderByStartDateAsc(memberId);
    }

    // 일정 상세 조회
    public Schedule selectSchedule(Integer scheduleId) {

        return scheduleDao
                .findById(scheduleId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "일정을 찾을 수 없습니다."
                        )
                );
    }

    // 일정 등록
    public Schedule insertSchedule(Schedule schedule) {

        schedule.setScheduleId(null);

        return scheduleDao.save(schedule);
    }

    // 일정 수정
    public Schedule updateSchedule(
            Integer scheduleId,
            Schedule request) {

        Schedule schedule =
                scheduleDao
                        .findById(scheduleId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "일정을 찾을 수 없습니다."
                                )
                        );

        schedule.setTitle(
                request.getTitle()
        );

        schedule.setContent(
                request.getContent()
        );

        schedule.setStartDate(
                request.getStartDate()
        );

        schedule.setEndDate(
                request.getEndDate()
        );

        return scheduleDao.save(schedule);
    }

    // 일정 삭제
    public void deleteSchedule(Integer scheduleId) {

        Schedule schedule =
                scheduleDao
                        .findById(scheduleId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "일정을 찾을 수 없습니다."
                                )
                        );

        scheduleDao.delete(schedule);
    }
}