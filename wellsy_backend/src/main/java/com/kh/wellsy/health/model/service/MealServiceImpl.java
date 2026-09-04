package com.kh.wellsy.health.model.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kh.wellsy.health.model.dao.MealItemDao;
import com.kh.wellsy.health.model.dao.MealRecordDao;
import com.kh.wellsy.health.model.vo.MealItem;
import com.kh.wellsy.health.model.vo.MealRecord;

@Service
public class MealServiceImpl implements MealService {

    private final MealRecordDao mealRecordDao;
    private final MealItemDao mealItemDao;

    public MealServiceImpl(
            MealRecordDao mealRecordDao,
            MealItemDao mealItemDao) {

        this.mealRecordDao = mealRecordDao;
        this.mealItemDao = mealItemDao;
    }

    @Override
    @Transactional
    public void saveMeal(Map<String, Object> mealData) {

        // 1. 기본 식사 정보 꺼내기
        Integer employeeNo =
                Integer.valueOf(mealData.get("employeeNo").toString());

        String mealType =
                mealData.get("mealType").toString();

        // 2. MEAL_RECORD 저장
        MealRecord mealRecord = new MealRecord();
        mealRecord.setEmployeeNo(employeeNo);
        mealRecord.setMealDate(LocalDate.now());
        mealRecord.setMealType(mealType);

        MealRecord savedRecord = mealRecordDao.save(mealRecord);

        // 3. 음식 목록 꺼내기
        List<Map<String, Object>> mealItems =
                (List<Map<String, Object>>) mealData.get("mealItems");

        // 4. MEAL_ITEM 저장
        for (Map<String, Object> item : mealItems) {

            MealItem mealItem = new MealItem();

            mealItem.setMealRecordId(savedRecord.getMealRecordId());
            mealItem.setFoodName((String) item.get("foodName"));
            mealItem.setAmountDescription(
                    (String) item.get("amountDescription"));

            mealItem.setCalories(toBigDecimal(item.get("calories")));
            mealItem.setProtein(toBigDecimal(item.get("protein")));
            mealItem.setCarbohydrate(
                    toBigDecimal(item.get("carbohydrate")));
            mealItem.setFat(toBigDecimal(item.get("fat")));

            mealItemDao.save(mealItem);
        }
    }

    private BigDecimal toBigDecimal(Object value) {
        if (value == null || value.toString().isBlank()) {
            return null;
        }

        return new BigDecimal(value.toString());
    }
}