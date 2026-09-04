package com.kh.wellsy.checkupReservationDashboard.model.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.kh.wellsy.check.model.vo.CheckupReservation;
import com.kh.wellsy.checkupReservationDashboard.model.vo.CheckupReservationDashboard;

public interface CheckupReservationDashboardDao
        extends JpaRepository<CheckupReservation, Integer> {

    @Query(
        value = """
            SELECT
                cr.RESERVATION_ID AS reservationId,
                e.EMPLOYEE_NO AS employeeNo,
                e.NAME AS name,
                d.DEPARTMENT_NAME AS departmentName,
                j.JOB_NAME AS jobName,
                cr.RESERVATION_DATE AS reservationDate,
                cr.RECENT_CHECKUP_DATE AS recentCheckupDate,
                cr.HOSPITAL_NAME AS hospitalName,
                cr.STATUS AS status,
                cr.MEMO AS memo
            FROM CHECKUP_RESERVATION cr

            JOIN EMPLOYEE e
                ON cr.EMPLOYEE_NO = e.EMPLOYEE_NO

            LEFT JOIN DEPARTMENT d
                ON e.DEPARTMENT_ID = d.DEPARTMENT_ID

            LEFT JOIN JOB j
                ON e.JOB_ID = j.JOB_ID

            WHERE
                (:year IS NULL
                    OR YEAR(cr.RESERVATION_DATE) = :year)

            AND
                (:month IS NULL
                    OR MONTH(cr.RESERVATION_DATE) = :month)

            AND
                (:departmentId IS NULL
                    OR e.DEPARTMENT_ID = :departmentId)

            AND
                (:jobId IS NULL
                    OR e.JOB_ID = :jobId)

            AND
                (
                    :name IS NULL
                    OR :name = ''
                    OR e.NAME LIKE CONCAT('%', :name, '%')
                )

            AND
                (
                    :status IS NULL
                    OR :status = ''
                    OR cr.STATUS = :status
                )

            ORDER BY
                cr.RESERVATION_DATE ASC,
                cr.RESERVATION_ID ASC
            """,
        nativeQuery = true
    )
    List<CheckupReservationDashboard> selectReservationList(

            @Param("year")
            Integer year,

            @Param("month")
            Integer month,

            @Param("departmentId")
            Integer departmentId,

            @Param("jobId")
            Integer jobId,

            @Param("name")
            String name,

            @Param("status")
            String status
    );
}