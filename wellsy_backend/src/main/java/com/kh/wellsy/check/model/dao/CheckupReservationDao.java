package com.kh.wellsy.check.model.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kh.wellsy.check.model.vo.CheckupReservation;

public interface CheckupReservationDao
        extends JpaRepository<CheckupReservation, Integer> {

    // 사원 본인의 예약 목록
	  List<CheckupReservation>
	    findByEmployeeNoAndStatusNotOrderByReservationDateDesc(
	            Integer employeeNo,
	            String status
	    );

    // 관리자가 상태별 조회
    List<CheckupReservation>
    findByStatusOrderByReservationDateAsc(
            String status
    );

    // 전체 예약
    List<CheckupReservation>
    findAllByOrderByReservationDateAsc();
    
  
}