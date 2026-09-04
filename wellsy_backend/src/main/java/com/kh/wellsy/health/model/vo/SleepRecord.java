package com.kh.wellsy.health.model.vo;
    
import java.time.LocalDate;
import java.time.LocalDateTime;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import jakarta.persistence.Id;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "SLEEP_RECORD")
@DynamicInsert
@DynamicUpdate
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class SleepRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "SLEEP_RECORD_ID")
    private Integer sleepRecordId;

    @Column(name = "EMPLOYEE_NO")
    private Integer employeeNo;

    @Column(name = "SLEEP_DATE")
    private LocalDate sleepDate;

    @Column(name = "SLEEP_START")
    private LocalDateTime sleepStart;

    @Column(name = "SLEEP_END")
    private LocalDateTime sleepEnd;

    @Column(name = "SLEEP_QUALITY")
    private Integer sleepQuality;

    @Column(name = "MEMO")
    private String memo;
}