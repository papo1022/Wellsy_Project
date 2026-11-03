package com.kh.wellsy.health.model.dto;

import java.util.List;

public class MealAiImageResponse {

    private List<MealAiResponse> foods;

    public MealAiImageResponse() {}

    public List<MealAiResponse> getFoods() {
        return foods;
    }

    public void setFoods(List<MealAiResponse> foods) {
        this.foods = foods;
    }
}