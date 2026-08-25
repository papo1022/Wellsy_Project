package com.kh.wellsy.login.controller;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.kh.wellsy.employee.model.vo.Employee;
import com.kh.wellsy.login.model.service.LoginService;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@CrossOrigin
@RestController
public class LoginController {

	public static final String SECRET_KEY = "Wellsy2026TeamProjectSecretKeyForJWTAuth";
	
	@Autowired
	private LoginService loginService;
	
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@PostMapping("/login")
	public ResponseEntity<String> loginEmploy(@RequestBody Employee e) {
		
		Optional<Employee> result = loginService.loginEmploy(e.getLoginId());
		
		if(result.isPresent() &&
				bCryptPasswordEncoder.matches(e.getPassword(), result.get().getPassword())) {
			
			Employee loginUser = result.get();
			
			Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8));
			
			String jwt = Jwts.builder()
							 .setSubject(loginUser.getLoginId())
							 .claim("employeeNo", loginUser.getEmployeeNo())
							 .claim("name", loginUser.getName())
							 .claim("role", loginUser.getRole())
							 .setIssuedAt(new Date())
							 .setExpiration(new Date(System.currentTimeMillis() + 60 * 60 * 1000))
							 .compact();
			
			return ResponseEntity.ok(jwt);
		}
		
		return ResponseEntity.ok(null);
	}
}
