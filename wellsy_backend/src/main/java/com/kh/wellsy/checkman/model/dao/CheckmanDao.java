package com.kh.wellsy.checkman.model.dao;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.kh.wellsy.employee.model.vo.Employee;


@Repository
public interface CheckmanDao
        extends JpaRepository<Employee, Integer> {


    // =========================================
    // 직원 건강정보 목록 조회
    // 이름 + 기간 검색
    // =========================================

    @Query(
        value = """
            SELECT

                HR.HEALTH_RECORD_ID,

                E.EMPLOYEE_NO,
                E.NAME,

                D.DEPARTMENT_NAME,
                J.JOB_NAME,

                HR.RECORD_DATE,

                HR.HEIGHT,
                HR.WEIGHT,
                HR.BMI,

                HR.SYSTOLIC_BP,
                HR.DIASTOLIC_BP,

                HR.BLOOD_SUGAR,

                HR.CAFFEINE_AMOUNT,
                HR.SMOKING_COUNT,
                HR.ALCOHOL_AMOUNT

            FROM HEALTH_RECORD HR

            JOIN EMPLOYEE E
              ON HR.EMPLOYEE_NO = E.EMPLOYEE_NO

            LEFT JOIN DEPARTMENT D
              ON E.DEPARTMENT_ID = D.DEPARTMENT_ID

            LEFT JOIN JOB J
              ON E.JOB_ID = J.JOB_ID

            WHERE
            (
                :keyword IS NULL
                OR :keyword = ''
                OR E.NAME LIKE CONCAT('%', :keyword, '%')
            )

            AND
            (
                :startDate IS NULL
                OR HR.RECORD_DATE >= :startDate
            )

            AND
            (
                :endDate IS NULL
                OR HR.RECORD_DATE <= :endDate
            )

            ORDER BY
                HR.RECORD_DATE DESC,
                HR.HEALTH_RECORD_ID DESC
            """,
        nativeQuery = true
    )
    List<Object[]> selectCheckmanList(

        @Param("keyword")
        String keyword,

        @Param("startDate")
        LocalDate startDate,

        @Param("endDate")
        LocalDate endDate

    );


    // =========================================
    // 특정 직원 건강정보 조회
    // =========================================

    @Query(
        value = """
            SELECT

                HR.HEALTH_RECORD_ID,

                E.EMPLOYEE_NO,
                E.NAME,

                D.DEPARTMENT_NAME,
                J.JOB_NAME,

                HR.RECORD_DATE,

                HR.HEIGHT,
                HR.WEIGHT,
                HR.BMI,

                HR.SYSTOLIC_BP,
                HR.DIASTOLIC_BP,

                HR.BLOOD_SUGAR,

                HR.CAFFEINE_AMOUNT,
                HR.SMOKING_COUNT,
                HR.ALCOHOL_AMOUNT

            FROM HEALTH_RECORD HR

            JOIN EMPLOYEE E
              ON HR.EMPLOYEE_NO = E.EMPLOYEE_NO

            LEFT JOIN DEPARTMENT D
              ON E.DEPARTMENT_ID = D.DEPARTMENT_ID

            LEFT JOIN JOB J
              ON E.JOB_ID = J.JOB_ID

            WHERE E.EMPLOYEE_NO = :employeeNo

            ORDER BY
                HR.RECORD_DATE DESC,
                HR.HEALTH_RECORD_ID DESC
            """,
        nativeQuery = true
    )
    List<Object[]> selectEmployeeCheckmanList(

        @Param("employeeNo")
        int employeeNo

    );


    // =========================================
    // 건강정보 한 건 상세조회
    // =========================================

    @Query(
        value = """
            SELECT

                HR.HEALTH_RECORD_ID,

                E.EMPLOYEE_NO,
                E.NAME,

                D.DEPARTMENT_NAME,
                J.JOB_NAME,

                HR.RECORD_DATE,

                HR.HEIGHT,
                HR.WEIGHT,
                HR.BMI,

                HR.SYSTOLIC_BP,
                HR.DIASTOLIC_BP,

                HR.BLOOD_SUGAR,

                HR.CAFFEINE_AMOUNT,
                HR.SMOKING_COUNT,
                HR.ALCOHOL_AMOUNT

            FROM HEALTH_RECORD HR

            JOIN EMPLOYEE E
              ON HR.EMPLOYEE_NO = E.EMPLOYEE_NO

            LEFT JOIN DEPARTMENT D
              ON E.DEPARTMENT_ID = D.DEPARTMENT_ID

            LEFT JOIN JOB J
              ON E.JOB_ID = J.JOB_ID

            WHERE HR.HEALTH_RECORD_ID = :healthRecordId
            """,
        nativeQuery = true
    )
    List<Object[]> selectCheckman(

        @Param("healthRecordId")
        int healthRecordId

    );


    // =========================================
    // 건강 이상 알림 목록
    // =========================================

    @Query(
        value = """
            SELECT

                HA.ALERT_ID,
                HC.CHECKUP_ID,

                E.EMPLOYEE_NO,
                E.NAME,

                D.DEPARTMENT_NAME,
                J.JOB_NAME,

                HA.ALERT_TYPE,
                HA.SEVERITY,
                HA.MESSAGE,
                HA.IS_READ,
                HA.CREATED_AT

            FROM HEALTH_ALERT HA

            JOIN HEALTH_CHECKUP HC
              ON HA.CHECKUP_ID = HC.CHECKUP_ID

            JOIN CHECKUP_RESERVATION CR
              ON HC.RESERVATION_ID = CR.RESERVATION_ID

            JOIN EMPLOYEE E
              ON CR.EMPLOYEE_NO = E.EMPLOYEE_NO

            LEFT JOIN DEPARTMENT D
              ON E.DEPARTMENT_ID = D.DEPARTMENT_ID

            LEFT JOIN JOB J
              ON E.JOB_ID = J.JOB_ID

            WHERE
            (
                :keyword IS NULL
                OR :keyword = ''
                OR E.NAME LIKE CONCAT('%', :keyword, '%')
            )

            AND
            (
                :severity IS NULL
                OR :severity = ''
                OR HA.SEVERITY = :severity
            )

            AND
            (
                :isRead IS NULL
                OR :isRead = ''
                OR HA.IS_READ = :isRead
            )

            AND
            (
                :startDate IS NULL
                OR DATE(HA.CREATED_AT) >= :startDate
            )

            AND
            (
                :endDate IS NULL
                OR DATE(HA.CREATED_AT) <= :endDate
            )

            ORDER BY

                CASE
                    WHEN HA.IS_READ = 'N'
                    THEN 0
                    ELSE 1
                END,

                HA.CREATED_AT DESC
            """,
        nativeQuery = true
    )
    List<Object[]> selectCheckmanAlertList(

        @Param("keyword")
        String keyword,

        @Param("severity")
        String severity,

        @Param("isRead")
        String isRead,

        @Param("startDate")
        LocalDate startDate,

        @Param("endDate")
        LocalDate endDate

    );


    // =========================================
    // 건강 이상 알림 상세
    // =========================================

    @Query(
        value = """
            SELECT

                HA.ALERT_ID,
                HC.CHECKUP_ID,

                E.EMPLOYEE_NO,
                E.NAME,

                D.DEPARTMENT_NAME,
                J.JOB_NAME,

                HA.ALERT_TYPE,
                HA.SEVERITY,
                HA.MESSAGE,
                HA.IS_READ,
                HA.CREATED_AT,

                HC.RESULT_GRADE,

                HC.SYSTOLIC_BP,
                HC.DIASTOLIC_BP,

                HC.BLOOD_SUGAR,

                HC.TOTAL_CHOLESTEROL,

                HC.WEIGHT,
                HC.HEIGHT,

                HC.RESULT_DETAIL,
                HC.CREATED_AT,

                CR.RESERVATION_DATE,
                CR.HOSPITAL_NAME

            FROM HEALTH_ALERT HA

            JOIN HEALTH_CHECKUP HC
              ON HA.CHECKUP_ID = HC.CHECKUP_ID

            JOIN CHECKUP_RESERVATION CR
              ON HC.RESERVATION_ID = CR.RESERVATION_ID

            JOIN EMPLOYEE E
              ON CR.EMPLOYEE_NO = E.EMPLOYEE_NO

            LEFT JOIN DEPARTMENT D
              ON E.DEPARTMENT_ID = D.DEPARTMENT_ID

            LEFT JOIN JOB J
              ON E.JOB_ID = J.JOB_ID

            WHERE HA.ALERT_ID = :alertId
            """,
        nativeQuery = true
    )
    List<Object[]> selectCheckmanAlert(

        @Param("alertId")
        int alertId

    );


    // =========================================
    // 알림 확인
    // N -> Y
    // =========================================

    @Modifying
    @Query(
        value = """
            UPDATE HEALTH_ALERT

               SET IS_READ = 'Y'

             WHERE ALERT_ID = :alertId

               AND IS_READ = 'N'
            """,
        nativeQuery = true
    )
    int updateCheckmanAlert(

        @Param("alertId")
        int alertId

    );

}