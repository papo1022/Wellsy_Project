package com.kh.wellsy.health.model.dto;

import java.math.BigDecimal;

public class MealAiResponse {

    private String foodName;
    private String amountDescription;
    private BigDecimal calories;
    private BigDecimal protein;
    private BigDecimal carbohydrate;
    private BigDecimal fat;

    public MealAiResponse() {}

    public String getFoodName() {
        return foodName;
    }

    public void setFoodName(String foodName) {
        this.foodName = foodName;
    }

    public String getAmountDescription() {
        return amountDescription;
    }

    public void setAmountDescription(String amountDescription) {
        this.amountDescription = amountDescription;
    }

    public BigDecimal getCalories() {
        return calories;
    }

    public void setCalories(BigDecimal calories) {
        this.calories = calories;
    }

    public BigDecimal getProtein() {
        return protein;
    }

    public void setProtein(BigDecimal protein) {
        this.protein = protein;
    }

    public BigDecimal getCarbohydrate() {
        return carbohydrate;
    }

    public void setCarbohydrate(BigDecimal carbohydrate) {
        this.carbohydrate = carbohydrate;
    }

    public BigDecimal getFat() {
        return fat;
    }

    public void setFat(BigDecimal fat) {
        this.fat = fat;
    }
}