package com.kh.wellsy.health.model.service;
import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kh.wellsy.health.model.dao.HealthDao;
import com.kh.wellsy.health.model.vo.Health;

@Service
public class HealthServiceImpl implements HealthService{

    private final HealthDao healthDao;

    @Autowired
    public HealthServiceImpl(HealthDao healthDao) {
        this.healthDao = healthDao;
    }

    @Override
    public Health getTodayHealth(int employeeNo) {
        LocalDate today = LocalDate.now();
        return healthDao.findByEmployeeNoAndRecordDate(employeeNo, today);
    }
 

}
