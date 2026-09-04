package com.kh.wellsy.health.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.kh.wellsy.health.model.service.MealService;

@RestController
public class MealController {
    private final MealService mealService;

    public MealController(MealService mealService) {
        this.mealService = mealService;
    }

    @PostMapping("/meal")
    public ResponseEntity<Void> saveMeal(@RequestBody Map<String, Object> mealData) {
        mealService.saveMeal(mealData);
        return ResponseEntity.ok().build(); 
    }
}
