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

	// JWT를 서명(암호화)할 때 쓰는 비밀 키
	// 이 키를 아는 사람만 "진짜 우리 서버가 발급한 토큰"이라고 검증할 수 있음
	public static final String SECRET_KEY = "Wellsy2026TeamProjectSecretKeyForJWTAuth";

	@Autowired
	private LoginService loginService;

	// 기존 config에 미리 등록해둔 빈을 그대로 주입받음
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	@PostMapping("/login")
	public ResponseEntity<String> loginEmploy(@RequestBody Employee e) {

		// 1단계: 입력받은 아이디로 DB에서 재직중인 직원 찾기
		Optional<Employee> result = loginService.loginEmploy(e.getLoginId());

		// 2단계: 직원이 존재하고 + 입력한 비밀번호를 암호화했을 때
		// DB에 저장된 암호화된 비밀번호와 일치하는지 확인
		if (result.isPresent() &&
				bCryptPasswordEncoder.matches(e.getPassword(), result.get().getPassword())) {

			Employee loginUser = result.get();

			// 3단계: JWT 서명용 키 생성
			Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8));

			// 4단계: JWT 토큰 발급
			// - setSubject: 토큰의 "주인공"이 누구인지 (로그인 아이디)
			// - claim: 토큰 안에 같이 담아 보낼 추가 정보 (프론트가 굳이 서버에 또 안 물어봐도 되도록)
			// - setExpiration: 토큰 유효 기간 (여기서는 1시간)
			// - signWith: 위조 방지를 위한 서명
			String jwt = Jwts.builder()
					.setSubject(loginUser.getLoginId())
					.claim("employeeNo", loginUser.getEmployeeNo())
					.claim("name", loginUser.getName())
					.claim("role", loginUser.getRole())
					.setIssuedAt(new Date())
					.setExpiration(new Date(System.currentTimeMillis() + 60 * 60 * 1000))
					.compact();

			// 5단계: 발급한 토큰을 그대로 응답에 담아 프론트로 전송
			return ResponseEntity.ok(jwt);
		}

		// 아이디가 없거나 비밀번호를 틀리면 null 반환 (프론트에서 "로그인 실패" 처리)
		return ResponseEntity.ok(null);
	}
}
