package com.kh.wellsy.health.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import com.kh.wellsy.health.model.service.HealthService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class HealthController {

    @Autowired
    private HealthService healthService;

    // 
}
