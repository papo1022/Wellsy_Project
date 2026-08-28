package com.kh.wellsy.checkman.model.service;

import java.math.BigDecimal;
import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kh.wellsy.checkman.model.dao.CheckmanDao;
import com.kh.wellsy.checkman.model.vo.Checkman;


@Service
public class CheckmanServiceImpl implements CheckmanService {

    @Autowired
    private CheckmanDao checkmanDao;


    // =========================================
    // 직원 건강정보 목록
    // =========================================

    @Override
    @Transactional(readOnly = true)
    public List<Checkman> selectCheckmanList(
            String keyword,
            LocalDate startDate,
            LocalDate endDate) {


        List<Object[]> resultList
            = checkmanDao.selectCheckmanList(
                keyword,
                startDate,
                endDate
            );


        List<Checkman> checkmanList
            = new ArrayList<>();


        for(Object[] result : resultList) {

            checkmanList.add(
                healthRecordToCheckman(result)
            );
        }


        return checkmanList;
    }


    // =========================================
    // 특정 직원 건강정보
    // =========================================

    @Override
    @Transactional(readOnly = true)
    public List<Checkman> selectEmployeeCheckmanList(
            int employeeNo) {


        List<Object[]> resultList
            = checkmanDao
                .selectEmployeeCheckmanList(
                    employeeNo
                );


        List<Checkman> checkmanList
            = new ArrayList<>();


        for(Object[] result : resultList) {

            checkmanList.add(
                healthRecordToCheckman(result)
            );
        }


        return checkmanList;
    }


    // =========================================
    // 건강정보 상세
    // =========================================

    @Override
    @Transactional(readOnly = true)
    public Checkman selectCheckman(
            int healthRecordId) {


        List<Object[]> resultList
            = checkmanDao.selectCheckman(
                healthRecordId
            );


        if(resultList.isEmpty()) {

            return null;
        }


        return healthRecordToCheckman(
            resultList.get(0)
        );
    }


    // =========================================
    // 이상 알림 목록
    // =========================================

    @Override
    @Transactional(readOnly = true)
    public List<Checkman> selectCheckmanAlertList(
            String keyword,
            String severity,
            String isRead,
            LocalDate startDate,
            LocalDate endDate) {


        List<Object[]> resultList
            = checkmanDao
                .selectCheckmanAlertList(
                    keyword,
                    severity,
                    isRead,
                    startDate,
                    endDate
                );


        List<Checkman> checkmanList
            = new ArrayList<>();


        for(Object[] result : resultList) {


            Checkman checkman
                = new Checkman();


            checkman.setAlertId(
                toInteger(result[0])
            );


            checkman.setCheckupId(
                toInteger(result[1])
            );


            checkman.setEmployeeNo(
                toInteger(result[2])
            );


            checkman.setEmployeeName(
                (String) result[3]
            );


            checkman.setDepartmentName(
                (String) result[4]
            );


            checkman.setJobName(
                (String) result[5]
            );


            checkman.setAlertType(
                (String) result[6]
            );


            checkman.setSeverity(
                (String) result[7]
            );


            checkman.setMessage(
                (String) result[8]
            );


            checkman.setIsRead(
                (String) result[9]
            );


            checkman.setAlertCreatedAt(
                toLocalDateTime(
                    result[10]
                )
            );


            checkmanList.add(
                checkman
            );
        }


        return checkmanList;
    }


    // =========================================
    // 이상 알림 상세
    // =========================================

    @Override
    @Transactional(readOnly = true)
    public Checkman selectCheckmanAlert(
            int alertId) {


        List<Object[]> resultList
            = checkmanDao
                .selectCheckmanAlert(
                    alertId
                );


        if(resultList.isEmpty()) {

            return null;
        }


        Object[] result
            = resultList.get(0);


        Checkman checkman
            = new Checkman();


        checkman.setAlertId(
            toInteger(result[0])
        );


        checkman.setCheckupId(
            toInteger(result[1])
        );


        checkman.setEmployeeNo(
            toInteger(result[2])
        );


        checkman.setEmployeeName(
            (String) result[3]
        );


        checkman.setDepartmentName(
            (String) result[4]
        );


        checkman.setJobName(
            (String) result[5]
        );


        checkman.setAlertType(
            (String) result[6]
        );


        checkman.setSeverity(
            (String) result[7]
        );


        checkman.setMessage(
            (String) result[8]
        );


        checkman.setIsRead(
            (String) result[9]
        );


        checkman.setAlertCreatedAt(
            toLocalDateTime(
                result[10]
            )
        );


        checkman.setResultGrade(
            (String) result[11]
        );


        checkman.setCheckupSystolicBp(
            toInteger(result[12])
        );


        checkman.setCheckupDiastolicBp(
            toInteger(result[13])
        );


        checkman.setCheckupBloodSugar(
            toBigDecimal(result[14])
        );


        checkman.setTotalCholesterol(
            toBigDecimal(result[15])
        );


        checkman.setCheckupWeight(
            toBigDecimal(result[16])
        );


        checkman.setCheckupHeight(
            toBigDecimal(result[17])
        );


        checkman.setResultDetail(
            (String) result[18]
        );


        checkman.setCheckupCreatedAt(
            toLocalDateTime(
                result[19]
            )
        );


        checkman.setReservationDate(
            toLocalDate(
                result[20]
            )
        );


        checkman.setHospitalName(
            (String) result[21]
        );


        return checkman;
    }


    // =========================================
    // 알림 읽음 처리
    // =========================================

    @Override
    @Transactional
    public int updateCheckmanAlert(
            int alertId) {


        return checkmanDao
                .updateCheckmanAlert(
                    alertId
                );
    }


    // =========================================
    // HEALTH_RECORD -> Checkman 변환
    // =========================================

    private Checkman healthRecordToCheckman(
            Object[] result) {


        Checkman checkman
            = new Checkman();


        checkman.setHealthRecordId(
            toInteger(result[0])
        );


        checkman.setEmployeeNo(
            toInteger(result[1])
        );


        checkman.setEmployeeName(
            (String) result[2]
        );


        checkman.setDepartmentName(
            (String) result[3]
        );


        checkman.setJobName(
            (String) result[4]
        );


        checkman.setRecordDate(
            toLocalDate(result[5])
        );


        checkman.setHeight(
            toBigDecimal(result[6])
        );


        checkman.setWeight(
            toBigDecimal(result[7])
        );


        checkman.setBmi(
            toBigDecimal(result[8])
        );


        checkman.setSystolicBp(
            toInteger(result[9])
        );


        checkman.setDiastolicBp(
            toInteger(result[10])
        );


        checkman.setBloodSugar(
            toBigDecimal(result[11])
        );


        checkman.setCaffeineAmount(
            toBigDecimal(result[12])
        );


        checkman.setSmokingCount(
            toInteger(result[13])
        );


        checkman.setAlcoholAmount(
            toBigDecimal(result[14])
        );


        return checkman;
    }


    // =========================================
    // Integer 변환
    // =========================================

    private Integer toInteger(
            Object value) {


        if(value == null) {

            return null;
        }


        return ((Number) value)
                .intValue();
    }


    // =========================================
    // BigDecimal 변환
    // =========================================

    private BigDecimal toBigDecimal(
            Object value) {


        if(value == null) {

            return null;
        }


        if(value instanceof BigDecimal) {

            return (BigDecimal) value;
        }


        return new BigDecimal(
            value.toString()
        );
    }


    // =========================================
    // LocalDate 변환
    // =========================================

    private LocalDate toLocalDate(
            Object value) {


        if(value == null) {

            return null;
        }


        if(value instanceof Date) {

            return ((Date) value)
                    .toLocalDate();
        }


        if(value instanceof LocalDate) {

            return (LocalDate) value;
        }


        return LocalDate.parse(
            value.toString()
        );
    }


    // =========================================
    // LocalDateTime 변환
    // =========================================

    private LocalDateTime toLocalDateTime(
            Object value) {


        if(value == null) {

            return null;
        }


        if(value instanceof Timestamp) {

            return ((Timestamp) value)
                    .toLocalDateTime();
        }


        if(value instanceof LocalDateTime) {

            return (LocalDateTime) value;
        }


        return LocalDateTime.parse(
            value.toString()
                .replace(" ", "T")
        );
    }

}