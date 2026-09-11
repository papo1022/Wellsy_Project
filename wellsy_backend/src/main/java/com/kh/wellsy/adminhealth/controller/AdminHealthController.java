package com.kh.wellsy.adminhealth.controller;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kh.wellsy.adminhealth.model.service.AdminHealthService;
import com.kh.wellsy.adminhealth.model.vo.AdminHealthView;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/health")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AdminHealthController {

    private final AdminHealthService adminHealthService;

    @GetMapping
    public Page<AdminHealthView> searchEmployees(
            @RequestParam(required = false) Integer departmentId,
            @RequestParam(required = false) Integer jobId,
            @RequestParam(required = false) String name,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        return adminHealthService.searchEmployees(
                departmentId,
                jobId,
                name,
                page,
                size
        );
    }
}