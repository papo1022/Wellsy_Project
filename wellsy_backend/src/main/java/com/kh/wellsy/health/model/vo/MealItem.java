package com.kh.wellsy.health.model.vo;

import java.math.BigDecimal;

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
@Table(name = "MEAL_ITEM")
@DynamicInsert
@DynamicUpdate
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class MealItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MEAL_ITEM_ID")
    private Integer mealItemId;

    // MEAL_RECORD 외래키
    @Column(name = "MEAL_RECORD_ID", nullable = false)
    private Integer mealRecordId;

    // 음식명
    @Column(name = "FOOD_NAME", nullable = false, length = 100)
    private String foodName;

    // 섭취량 설명
    @Column(name = "AMOUNT_DESCRIPTION", length = 100)
    private String amountDescription;

    // 칼로리
    @Column(name = "CALORIES", precision = 7, scale = 2)
    private BigDecimal calories;

    // 단백질
    @Column(name = "PROTEIN", precision = 7, scale = 2)
    private BigDecimal protein;

    // 탄수화물
    @Column(name = "CARBOHYDRATE", precision = 7, scale = 2)
    private BigDecimal carbohydrate;

    // 지방
    @Column(name = "FAT", precision = 7, scale = 2)
    private BigDecimal fat;
}