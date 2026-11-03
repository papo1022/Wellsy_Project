package com.kh.wellsy.adminhealth.model.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.kh.wellsy.bmi.model.vo.Bmi;
import com.kh.wellsy.adminhealth.model.vo.AdminHealthView;

public interface AdminHealthDao
        extends JpaRepository<Bmi, Integer> {

    @Query(
        value = """
        SELECT
            e.EMPLOYEE_NO AS employeeNo,
            e.NAME AS name,
            d.DEPARTMENT_NAME AS departmentName,
            j.JOB_NAME AS jobName,
            h.RECORD_DATE AS recordDate,
            h.HEIGHT AS height,
            h.WEIGHT AS weight,
            h.BMI AS bmi,
            h.SYSTOLIC_BP AS systolicBp,
            h.DIASTOLIC_BP AS diastolicBp,
            h.BLOOD_SUGAR AS bloodSugar
        FROM EMPLOYEE e

        LEFT JOIN DEPARTMENT d
            ON e.DEPARTMENT_ID = d.DEPARTMENT_ID

        LEFT JOIN JOB j
            ON e.JOB_ID = j.JOB_ID

        LEFT JOIN HEALTH_RECORD h
            ON h.HEALTH_RECORD_ID = (
                SELECT h2.HEALTH_RECORD_ID
                FROM HEALTH_RECORD h2
                WHERE h2.EMPLOYEE_NO = e.EMPLOYEE_NO
                ORDER BY h2.RECORD_DATE DESC
                LIMIT 1
            )

        WHERE
            (:departmentId IS NULL
                OR e.DEPARTMENT_ID = :departmentId)

        AND
            (:jobId IS NULL
                OR e.JOB_ID = :jobId)

        AND
            (:name IS NULL
                OR :name = ''
                OR e.NAME LIKE CONCAT('%', :name, '%'))

        AND e.STATUS = 'Y'

        ORDER BY e.NAME
        """,
        countQuery = """
        SELECT COUNT(*)
        FROM EMPLOYEE e
        WHERE
            (:departmentId IS NULL
                OR e.DEPARTMENT_ID = :departmentId)
        AND
            (:jobId IS NULL
                OR e.JOB_ID = :jobId)
        AND
            (:name IS NULL
                OR :name = ''
                OR e.NAME LIKE CONCAT('%', :name, '%'))
        AND e.STATUS = 'Y'
        """,
        nativeQuery = true)
    Page<AdminHealthView> searchEmployees(
            @Param("departmentId") Integer departmentId,
            @Param("jobId") Integer jobId,
            @Param("name") String name,
            Pageable pageable
    );
}
