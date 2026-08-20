package com.kh.wellsy.bmi.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kh.wellsy.bmi.model.service.BmiService;
import com.kh.wellsy.bmi.model.vo.Bmi;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/bmi")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class BmiController {

    private final BmiService bmiService;

    @GetMapping
    public List<Bmi> selectBmiList(
            @RequestParam Integer memberId) {

        return bmiService.selectBmiList(memberId);
    }
}