package com.kh.wellsy.health.model.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
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
    @SuppressWarnings("unchecked")
    public void saveMeal(Map<String, Object> mealData) {

        Integer employeeNo = Integer.valueOf(mealData.get("employeeNo").toString());

        String mealType = mealData.get("mealType").toString();

        LocalDate today = LocalDate.now();

        // 1. 오늘 해당 끼니의 MealRecord 조회
        MealRecord mealRecord = mealRecordDao
                .findByEmployeeNoAndMealDateAndMealType(
                        employeeNo,
                        today,
                        mealType)
                .orElseGet(() -> {

                    MealRecord newRecord = new MealRecord();

                    newRecord.setEmployeeNo(employeeNo);
                    newRecord.setMealDate(today);
                    newRecord.setMealType(mealType);

                    return mealRecordDao.save(newRecord);
                });

        // 2. 삭제된 기존 음식 처리
        Object deletedObject = mealData.get("deletedMealItemIds");

        if (deletedObject != null) {

            List<Object> deletedIds = (List<Object>) deletedObject;

            for (Object id : deletedIds) {

                Integer mealItemId = Integer.valueOf(id.toString());

                mealItemDao.deleteById(mealItemId);
            }
        }

        // 3. 등록 / 수정할 음식
        List<Map<String, Object>> mealItems = (List<Map<String, Object>>) mealData.get("mealItems");

        if (mealItems == null) {
            return;
        }

        for (Map<String, Object> item : mealItems) {

            Object mealItemIdObject = item.get("mealItemId");

            MealItem mealItem;

            // 기존 음식 → UPDATE
            if (mealItemIdObject != null &&
                    !mealItemIdObject.toString().isBlank()) {

                Integer mealItemId = Integer.valueOf(
                        mealItemIdObject.toString());

                mealItem = mealItemDao
                        .findById(mealItemId)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "식사 항목을 찾을 수 없습니다."));

            }

            // 새로운 음식 → INSERT
            else {

                mealItem = new MealItem();

                mealItem.setMealRecordId(
                        mealRecord.getMealRecordId());
            }

            // 4. 공통 데이터 적용
            mealItem.setFoodName(
                    (String) item.get("foodName"));

            mealItem.setAmountDescription(
                    (String) item.get("amountDescription"));

            mealItem.setCalories(
                    toBigDecimal(item.get("calories")));

            mealItem.setProtein(
                    toBigDecimal(item.get("protein")));

            mealItem.setCarbohydrate(
                    toBigDecimal(item.get("carbohydrate")));

            mealItem.setFat(
                    toBigDecimal(item.get("fat")));

            // ID가 있으면 UPDATE
            // ID가 없으면 INSERT
            mealItemDao.save(mealItem);
        }
    }

    // BigDecimal 변환 메서드
    private BigDecimal toBigDecimal(Object value) {
        if (value == null || value.toString().isBlank()) {
            return null;
        }

        return new BigDecimal(value.toString());
    }

    // 오늘 식사 조회
    @Override
    public Map<String, Object> getTodayMeal(Integer employeeNo) {

        LocalDate today = LocalDate.now();

        List<MealRecord> mealRecords = mealRecordDao.findByEmployeeNoAndMealDate(employeeNo, today);

        List<Map<String, Object>> meals = new ArrayList<>();

        BigDecimal totalCalories = BigDecimal.ZERO;
        BigDecimal totalProtein = BigDecimal.ZERO;
        BigDecimal totalCarbohydrate = BigDecimal.ZERO;
        BigDecimal totalFat = BigDecimal.ZERO;

        for (MealRecord record : mealRecords) {

            List<MealItem> items = mealItemDao.findByMealRecordId(record.getMealRecordId());

            Map<String, Object> meal = new HashMap<>();

            meal.put("mealRecordId", record.getMealRecordId());
            meal.put("mealType", record.getMealType());
            meal.put("items", items);

            meals.add(meal);

            for (MealItem item : items) {

                if (item.getCalories() != null) {
                    totalCalories = totalCalories.add(item.getCalories());
                }

                if (item.getProtein() != null) {
                    totalProtein = totalProtein.add(item.getProtein());
                }

                if (item.getCarbohydrate() != null) {
                    totalCarbohydrate = totalCarbohydrate.add(item.getCarbohydrate());
                }

                if (item.getFat() != null) {
                    totalFat = totalFat.add(item.getFat());
                }
            }
        }

        Map<String, Object> totalNutrition = new HashMap<>();

        totalNutrition.put("calories", totalCalories);
        totalNutrition.put("protein", totalProtein);
        totalNutrition.put("carbohydrate", totalCarbohydrate);
        totalNutrition.put("fat", totalFat);

        Map<String, Object> result = new HashMap<>();

        result.put("totalNutrition", totalNutrition);
        result.put("meals", meals);

        return result;
    }
}