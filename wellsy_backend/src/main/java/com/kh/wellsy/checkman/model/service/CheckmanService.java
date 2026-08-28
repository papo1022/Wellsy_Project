package com.kh.wellsy.checkman.model.service;

import java.time.LocalDate;
import java.util.List;

import com.kh.wellsy.checkman.model.vo.Checkman;


public interface CheckmanService {


    // =========================================
    // 직원 건강정보
    // =========================================

    List<Checkman> selectCheckmanList(
        String keyword,
        LocalDate startDate,
        LocalDate endDate
    );


    List<Checkman> selectEmployeeCheckmanList(
        int employeeNo
    );


    Checkman selectCheckman(
        int healthRecordId
    );


    // =========================================
    // 건강 이상 알림
    // =========================================

    List<Checkman> selectCheckmanAlertList(
        String keyword,
        String severity,
        String isRead,
        LocalDate startDate,
        LocalDate endDate
    );


    Checkman selectCheckmanAlert(
        int alertId
    );


    int updateCheckmanAlert(
        int alertId
    );

}