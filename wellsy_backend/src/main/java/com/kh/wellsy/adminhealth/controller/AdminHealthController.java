package com.kh.wellsy.adminhealth.controller;

import java.util.List;

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
    public List<AdminHealthView> searchEmployees(
            @RequestParam(required = false) Integer departmentId,
            @RequestParam(required = false) Integer jobId,
            @RequestParam(required = false) String name) {

        return adminHealthService.searchEmployees(
                departmentId,
                jobId,
                name
        );
    }
}