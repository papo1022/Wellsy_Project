package com.kh.wellsy.employee.model.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kh.wellsy.employee.model.vo.Job;

@Repository
public interface JobDao extends JpaRepository<Job, Integer> {

}