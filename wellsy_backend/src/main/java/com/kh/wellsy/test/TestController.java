package com.kh.wellsy.test;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

// TODO: 연결 테스트를 위한 컨트롤러 (반드시 지울 것)
@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class TestController {

    @GetMapping("/test")
    public String test() {
        return "Wellsy Backend OK";
    }
}