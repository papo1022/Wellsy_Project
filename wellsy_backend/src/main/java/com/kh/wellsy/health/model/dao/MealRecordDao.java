package com.kh.wellsy.health.model.dao;
import org.springframework.data.jpa.repository.JpaRepository;
import com.kh.wellsy.health.model.vo.MealRecord;

public interface MealRecordDao extends JpaRepository<MealRecord, Integer>{
    
}
