package com.kh.wellsy.health.model.vo;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "MEAL_RECORD")
@DynamicInsert
@DynamicUpdate
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString

public class MealRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MEAL_RECORD_ID")
    private Integer mealRecordId;

    @Column(name = "EMPLOYEE_NO", nullable = false)
    private Integer employeeNo;

    @Column(name = "MEAL_DATE", nullable = false, length = 10)
    private LocalDate mealDate;

    @Column(name = "MEAL_TYPE", nullable = false, length = 50)
    private String mealType;
}
