package com.kh.wellsy.health.model.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.kh.wellsy.health.model.dao.SleepDao;
import java.time.LocalDate;

import com.kh.wellsy.health.model.vo.SleepRecord;

@Service
public class SleepServiceImpl implements SleepService {

    private final SleepDao sleepDao;

    @Autowired
    public SleepServiceImpl(SleepDao sleepDao) {
        this.sleepDao = sleepDao;
    }

    @Override
    public SleepRecord getTodaySleepRecord(int employeeNo) {
        LocalDate today = LocalDate.now();
        return sleepDao.findByEmployeeNoAndSleepDate(employeeNo, today);
    }
}
