package com.kh.wellsy.adminhealth.model.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.kh.wellsy.adminhealth.model.dao.AdminHealthDao;
import com.kh.wellsy.adminhealth.model.vo.AdminHealthView;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminHealthService {

    private final AdminHealthDao adminHealthDao;

    public Page<AdminHealthView> searchEmployees(
            Integer departmentId,
            Integer jobId,
            String name,
            int page,
            int size) {

        page = Math.max(page, 0);
        size = Math.max(size, 1);

        Pageable pageable = PageRequest.of(page, size);

        return adminHealthDao.searchEmployees(
                departmentId,
                jobId,
                name,
                pageable
        );
    }
}
