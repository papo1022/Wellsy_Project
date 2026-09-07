package com.kh.wellsy.health.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.kh.wellsy.health.model.dto.MealAiImageResponse;
import com.kh.wellsy.health.model.dto.MealAiRequest;
import com.kh.wellsy.health.model.dto.MealAiResponse;
import com.kh.wellsy.health.model.service.MealAiService;

@RestController
@RequestMapping("/meal/ai")
public class MealAiController {
    private final MealAiService mealAiService;

    public MealAiController(MealAiService mealAiService) {
        this.mealAiService = mealAiService;
    }

    @PostMapping("/analyze-text")
    public MealAiResponse analyzeText(@RequestBody MealAiRequest request) {
        return mealAiService.analyzeFood(request);
    }

    @PostMapping(
        value = "/analyze-image",
        consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public MealAiImageResponse analyzeImage(@RequestParam("image") MultipartFile image) {
        return mealAiService.analyzeImage(image);
    }
}