package com.kh.wellsy.health.model.vo;

import java.time.LocalDateTime;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "HEALTH_RECORD")

@DynamicInsert
@DynamicUpdate

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Health {

   @Id
   @Column(name = "HEALTH_RECORD_ID")
   @GeneratedValue(strategy = GenerationType.SEQUENCE)
   private int healthRecordId;

   @Column(name = "MEMBER_ID", nullable = false)
   private int memberId;

   @Column(name = "RECORD_DATE", nullable = false)
   private LocalDateTime recordDate;
   
   @Column(name = "HEIGHT")
   private double height;

   @Column(name = "WEIGHT")
   private double weight;

   @Column(name = "BMI")
   private double bmi;

   @Column(name = "SYSTOLIC_BP")
   private int systolicBp;

   @Column(name = "DIASTOLIC_BP")
   private int diastolicBp;

   @Column(name = "BLOOD_SUGAR")
   private double bloodSugar;

   @Column(name = "CAFFEINE_AMOUNT")
   private double caffeineAmount;

   @Column(name = "SMOKING_COUNT")
   private int smokingCount;

   @Column(name = "ALCOHOL_AMOUNT")
   private double alcoholAmount;

   @Column(name = "CREATED_AT", nullable = false)
   private LocalDateTime createdAt;

   @Column(name = "UPDATED_AT")
   private LocalDateTime updatedAt;

   @Column(name = "EMPLOYEE_NO")
   private int employeeNo;
}
