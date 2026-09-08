package com.kh.wellsy.health.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.kh.wellsy.health.model.dao.SleepRecordDao;
import java.time.LocalDate;

import com.kh.wellsy.health.model.vo.SleepRecord;

@Service
public class SleepServiceImpl implements SleepService {

    private final SleepRecordDao sleepDao;

    @Autowired
    public SleepServiceImpl(SleepRecordDao sleepDao) {
        this.sleepDao = sleepDao;
    }

    @Override
    public SleepRecord getTodaySleepRecord(int employeeNo) {
        LocalDate today = LocalDate.now();
        return sleepDao.findByEmployeeNoAndSleepDate(employeeNo, today);
    }

    @Override
    public SleepRecord saveOrUpdateSleepRecord(SleepRecord sleepRecord) {

        LocalDate today = LocalDate.now();

        sleepRecord.setSleepDate(today);

        SleepRecord existingSleep = sleepDao.findByEmployeeNoAndSleepDate(
                sleepRecord.getEmployeeNo(),
                sleepRecord.getSleepDate());

        if (existingSleep != null) {
            existingSleep.setSleepStart(sleepRecord.getSleepStart());
            existingSleep.setSleepEnd(sleepRecord.getSleepEnd());
            existingSleep.setSleepQuality(sleepRecord.getSleepQuality());
            existingSleep.setMemo(sleepRecord.getMemo());

            return sleepDao.save(existingSleep);
        }

        return sleepDao.save(sleepRecord);
    }

    @Override
    public SleepRecord getSleepRecordByDate(
            int employeeNo,
            LocalDate date) {

        return sleepDao.findByEmployeeNoAndSleepDate(
                employeeNo,
                date);
    }
}
