package com.kh.wellsy.my.model.vo;

import java.time.LocalDate;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@NoArgsConstructor
@Setter
@Getter
@ToString
public class My {

	private int employeeNo;				// 사번

	private String loginId;				// 로그인 아이디

	private String email;				// 이메일

	private String name;				// 이름

	private String phone;				// 전화번호

	private String gender;				// M / F

	private LocalDate birthDate;		// 생년월일

	private String role;				// ADMIN / EMPLOYEE

	private LocalDate hireDate;			// 입사일

	private String status;				// Y / N

	private Integer departmentId;

	private String departmentName;

	private Integer jobId;

	private String jobName;

}