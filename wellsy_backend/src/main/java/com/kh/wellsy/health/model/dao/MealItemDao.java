package com.kh.wellsy.health.model.dao;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.kh.wellsy.health.model.vo.MealItem;

public interface MealItemDao extends JpaRepository<MealItem, Integer>{  
    List<MealItem> findByMealRecordId(Integer mealRecordId);
}
