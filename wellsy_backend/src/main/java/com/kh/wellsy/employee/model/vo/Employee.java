package com.kh.wellsy.employee.model.vo;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "EMPLOYEE_NO")
    private int employeeNo;
    // EMPLOYEE_NO INT AUTO_INCREMENT PK


    @Column(name = "LOGIN_ID",nullable = false,unique = true,length = 50)
    private String loginId;
    // LOGIN_ID VARCHAR(50)


    @Column(name = "EMAIL",nullable = false,unique = true,length = 100)
    private String email;
    // EMAIL VARCHAR(100)


    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(name = "PASSWORD",nullable = false,length = 300)
    private String password;
    // PASSWORD VARCHAR(300)


    @Column(name = "NAME",nullable = false,length = 50)
    private String name;
    // NAME VARCHAR(50)


    @Column(name = "PHONE",length = 20)
    private String phone;
    // PHONE VARCHAR(20)


    @Column(name = "GENDER",length = 10)
    private String gender;
    // M / F


    @Column(name = "BIRTH_DATE")
    private LocalDate birthDate;


    @Column(name = "ROLE",nullable = false,length = 20)
    private String role;


    @Column(name = "HIRE_DATE",insertable = false)
    private LocalDate hireDate;


    @Column(name = "STATUS",nullable = false,length = 20)
    private String status = "Y";
    // Y / N


    @Column(name = "RESIGN_DATE")
    private LocalDate resignDate;


	 // =========================================
	 // 부서
	 // =========================================
	
	 @Column(name = "DEPARTMENT_ID")
	 private Integer departmentId;
	
	
	 @ManyToOne(fetch = FetchType.EAGER)
	 @JoinColumn(
	     name = "DEPARTMENT_ID",
	     insertable = false,
	     updatable = false
	 )
	 @JsonIgnore
	 private Department department;
	
	
	 // 프론트로 전달할 부서명
	 public String getDepartmentName() {
	
	     if(department == null) {
	
	         return null;
	     }
	
	     return department.getDepartmentName();
	 }
	
	
	 // =========================================
	 // 직급
	 // =========================================
	
	 @Column(name = "JOB_ID")
	 private Integer jobId;
	
	
	 @ManyToOne(fetch = FetchType.EAGER)
	 @JoinColumn(
	     name = "JOB_ID",
	     insertable = false,
	     updatable = false
	 )
	 @JsonIgnore
	 private Job job;
	
	
	 // 프론트로 전달할 직급명
	 public String getJobName() {
	
	     if(job == null) {
	
	         return null;
	     }
	
	     return job.getJobName();
    }

}