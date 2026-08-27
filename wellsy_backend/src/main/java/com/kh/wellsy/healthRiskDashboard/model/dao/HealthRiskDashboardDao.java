package com.kh.wellsy.healthRiskDashboard.model.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.kh.wellsy.bmi.model.vo.Bmi;
import com.kh.wellsy.healthRiskDashboard.model.vo.HealthRiskView;

public interface HealthRiskDashboardDao
        extends JpaRepository<Bmi, Integer> {

    @Query(value = """
        SELECT
            e.EMPLOYEE_NO AS employeeNo,
            e.NAME AS name,

            e.DEPARTMENT_ID AS departmentId,
            d.DEPARTMENT_NAME AS departmentName,

            e.JOB_ID AS jobId,
            j.JOB_NAME AS jobName,

            h.RECORD_DATE AS recordDate,
            h.HEIGHT AS height,
            h.WEIGHT AS weight,
            h.BMI AS bmi,
            h.SYSTOLIC_BP AS systolicBp,
            h.DIASTOLIC_BP AS diastolicBp,
            h.BLOOD_SUGAR AS bloodSugar,

            CASE
                WHEN EXISTS (
                    SELECT 1
                    FROM CHECKUP_RESERVATION cr
                    WHERE cr.EMPLOYEE_NO = e.EMPLOYEE_NO
                      AND YEAR(cr.RESERVATION_DATE) = YEAR(CURRENT_DATE)
                      AND MONTH(cr.RESERVATION_DATE) = MONTH(CURRENT_DATE)
                      AND cr.STATUS = 'Y'
                )
                THEN 1
                ELSE 0
            END AS checkupReserved

        FROM EMPLOYEE e

        LEFT JOIN DEPARTMENT d
            ON e.DEPARTMENT_ID = d.DEPARTMENT_ID

        LEFT JOIN JOB j
            ON e.JOB_ID = j.JOB_ID

        JOIN HEALTH_RECORD h
            ON h.HEALTH_RECORD_ID = (
                SELECT h2.HEALTH_RECORD_ID
                FROM HEALTH_RECORD h2
                WHERE h2.EMPLOYEE_NO = e.EMPLOYEE_NO
                ORDER BY
                    h2.RECORD_DATE DESC,
                    h2.HEALTH_RECORD_ID DESC
                LIMIT 1
            )

        WHERE e.STATUS = 'Y'

          AND (
              :departmentId IS NULL
              OR e.DEPARTMENT_ID = :departmentId
          )

          AND (
              :jobId IS NULL
              OR e.JOB_ID = :jobId
          )

          AND (
              :name IS NULL
              OR :name = ''
              OR e.NAME LIKE CONCAT('%', :name, '%')
          )

        ORDER BY
            e.NAME ASC
        """,
        nativeQuery = true)
    List<HealthRiskView> selectHealthRiskList(
            @Param("departmentId") Integer departmentId,
            @Param("jobId") Integer jobId,
            @Param("name") String name
    );
}