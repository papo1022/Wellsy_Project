package com.kh.wellsy.adminhealth.model.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kh.wellsy.adminhealth.model.dao.AdminHealthDao;
import com.kh.wellsy.adminhealth.model.vo.AdminHealthView;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminHealthService {

    private final AdminHealthDao adminHealthDao;

    public List<AdminHealthView> searchEmployees(
            Integer departmentId,
            Integer jobId,
            String name) {

        return adminHealthDao.searchEmployees(
                departmentId,
                jobId,
                name
        );
    }
}