package com.kh.wellsy.health.model.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kh.wellsy.health.model.vo.HealthStandard;

@Repository
public interface HealthStandardDao
        extends JpaRepository<HealthStandard, Integer> {

    List<HealthStandard> findByMetricType(String metricType);
}