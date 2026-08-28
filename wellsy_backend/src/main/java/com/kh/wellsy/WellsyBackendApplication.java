package com.kh.wellsy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class WellsyBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(WellsyBackendApplication.class, args);
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		
		System.out.println(encoder.encode("1234"));
	}
}
