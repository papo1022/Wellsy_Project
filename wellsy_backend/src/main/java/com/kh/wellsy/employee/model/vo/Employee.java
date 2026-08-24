package com.kh.wellsy.employee.model.vo;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "EMPLOYEE")
@NoArgsConstructor
@Setter
@Getter
@ToString
public class Employee {
	
	@Id
	@Column(name = "EMPLOYEE_NO")
	private int employeeNo;				// EMPLOYEE_NO INT (PK, 사번)

	@Column(name = "LOGIN_ID", nullable = false, length = 50)
	private String loginId;				// LOGIN_ID VARCHAR(50)

	@Column(name = "EMAIL", nullable = false, length = 100)
	private String email;				// EMAIL VARCHAR(100)

	@Column(name = "PASSWORD", nullable = false, length = 300)
	private String password;			// PASSWORD VARCHAR(300)

	@Column(name = "NAME", nullable = false, length = 50)
	private String name;				// NAME VARCHAR(50)

	@Column(name = "PHONE", length = 20)
	private String phone;				// PHONE VARCHAR(20)

	@Column(name = "GENDER", length = 10)
	private String gender;				// GENDER VARCHAR(10)
										// MALE / FEMALE
	
	@Column(name = "BIRTH_DATE")
	private LocalDate birthDate;		// BIRTH_DATE DATE

	@Column(name = "ROLE", nullable = false, length = 20)
	private String role = "EMPLOYEE";	// ROLE VARCHAR(20)
											// EMPLOYEE / ADMIN

	@Column(name = "HIRE_DATE", nullable = false)
	private LocalDate hireDate;			// HIRE_DATE DATE

	@Column(name = "STATUS", nullable = false, length = 20)
	private String status = "EMPLOYED";	// STATUS VARCHAR(20)
											// EMPLOYED / RESIGNED

	@Column(name = "RESIGN_DATE")
	private LocalDate resignDate;		// RESIGN_DATE DATE

	@Column(name = "DEPARTMENT_ID")
	private Integer departmentId;		// DEPARTMENT_ID INT (FK)

	@Column(name = "JOB_ID", nullable = false)
	private int jobId;					// JOB_ID INT (FK)
}
