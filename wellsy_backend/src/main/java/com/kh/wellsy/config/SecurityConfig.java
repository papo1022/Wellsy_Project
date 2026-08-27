package com.kh.wellsy.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class SecurityConfig {

	// BCryptPasswordEncoder 를 빈으로 등록해주는 메소드
	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder() {
		
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		
		return http

                // CORS 설정
                .cors(cors ->cors.configurationSource(corsConfigurationSource()))


                // 요청 권한 설정
                .authorizeHttpRequests(auth -> auth

                    // CORS Preflight 요청 허용
                    .requestMatchers(HttpMethod.OPTIONS,"/**").permitAll()

                    // 현재는 전체 요청 허용
                    .anyRequest().permitAll())


                // CSRF 비활성화
                .csrf(csrf ->csrf.disable()).build();}
	
	// =========================================
    // CORS 설정
    // =========================================
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {


        CorsConfiguration configuration = new CorsConfiguration();


        // React 개발 서버 허용
        configuration.setAllowedOrigins(List.of("http://localhost:5173"));


        // 허용할 HTTP Method
        configuration.setAllowedMethods(List.of(
                "GET",
                "POST",
                "PUT",
                "DELETE",
                "OPTIONS"));


        // 허용할 요청 Header
        configuration.setAllowedHeaders(
            List.of(
                "Authorization",
                "Content-Type"));


        // 프론트에서 접근 가능한 응답 Header
        configuration.setExposedHeaders(
            List.of(
                "Authorization"));


        // 쿠키 / 인증정보 허용
        configuration.setAllowCredentials(true);


        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();


        // 모든 백엔드 API에 CORS 적용
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}
