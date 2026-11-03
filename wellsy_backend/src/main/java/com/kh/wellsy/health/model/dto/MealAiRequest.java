package com.kh.wellsy.health.model.dto;

public class MealAiRequest {

    private String foodName;
    private String amountDescription;

    public MealAiRequest() {}

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
}