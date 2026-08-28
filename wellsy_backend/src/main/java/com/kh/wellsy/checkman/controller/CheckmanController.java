package com.kh.wellsy.checkman.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kh.wellsy.checkman.model.service.CheckmanService;
import com.kh.wellsy.checkman.model.vo.Checkman;

@CrossOrigin
@RestController
@RequestMapping("/checkman")
public class CheckmanController {


    @Autowired
    private CheckmanService checkmanService;


    // =========================================
    // 직원 건강정보 전체조회 / 검색
    // =========================================

    @GetMapping("/health")
    public ResponseEntity<List<Checkman>>
            selectCheckmanList(

        @RequestParam(required = false)
        String keyword,


        @RequestParam(required = false)
        @DateTimeFormat(
            iso = DateTimeFormat.ISO.DATE
        )
        LocalDate startDate,


        @RequestParam(required = false)
        @DateTimeFormat(
            iso = DateTimeFormat.ISO.DATE
        )
        LocalDate endDate

    ) {


        return ResponseEntity.ok(

            checkmanService
                .selectCheckmanList(
                    keyword,
                    startDate,
                    endDate
                )
        );
    }


    // =========================================
    // 특정 직원 건강정보
    // =========================================

    @GetMapping("/health/employee/{employeeNo}")
    public ResponseEntity<List<Checkman>>
            selectEmployeeCheckmanList(

        @PathVariable
        int employeeNo

    ) {


        return ResponseEntity.ok(

            checkmanService
                .selectEmployeeCheckmanList(
                    employeeNo
                )
        );
    }


    // =========================================
    // 건강정보 상세
    // =========================================

    @GetMapping("/health/{healthRecordId}")
    public ResponseEntity<Checkman>
            selectCheckman(

        @PathVariable
        int healthRecordId

    ) {


        Checkman checkman
            = checkmanService
                .selectCheckman(
                    healthRecordId
                );


        if(checkman == null) {

            return ResponseEntity
                    .notFound()
                    .build();
        }


        return ResponseEntity.ok(
            checkman
        );
    }


    // =========================================
    // 건강 이상 알림 목록
    // =========================================

    @GetMapping("/alerts")
    public ResponseEntity<List<Checkman>>
            selectCheckmanAlertList(

        @RequestParam(required = false)
        String keyword,


        @RequestParam(required = false)
        String severity,


        @RequestParam(required = false)
        String isRead,


        @RequestParam(required = false)
        @DateTimeFormat(
            iso = DateTimeFormat.ISO.DATE
        )
        LocalDate startDate,


        @RequestParam(required = false)
        @DateTimeFormat(
            iso = DateTimeFormat.ISO.DATE
        )
        LocalDate endDate

    ) {


        return ResponseEntity.ok(

            checkmanService
                .selectCheckmanAlertList(
                    keyword,
                    severity,
                    isRead,
                    startDate,
                    endDate
                )
        );
    }


    // =========================================
    // 건강 이상 알림 상세
    // =========================================

    @GetMapping("/alerts/{alertId}")
    public ResponseEntity<Checkman>
            selectCheckmanAlert(

        @PathVariable
        int alertId

    ) {


        Checkman checkman
            = checkmanService
                .selectCheckmanAlert(
                    alertId
                );


        if(checkman == null) {

            return ResponseEntity
                    .notFound()
                    .build();
        }


        return ResponseEntity.ok(
            checkman
        );
    }


    // =========================================
    // 미확인 -> 확인완료
    // =========================================

    @PutMapping("/alerts/{alertId}/read")
    public ResponseEntity<String>
            updateCheckmanAlert(

        @PathVariable
        int alertId

    ) {


        int result
            = checkmanService
                .updateCheckmanAlert(
                    alertId
                );


        if(result > 0) {

            return ResponseEntity.ok(
                "success"
            );
        }


        return ResponseEntity.ok(
            "fail"
        );
    }

}