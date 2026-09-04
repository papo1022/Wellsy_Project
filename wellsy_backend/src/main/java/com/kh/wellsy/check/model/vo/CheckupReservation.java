package com.kh.wellsy.check.model.vo;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "CHECKUP_RESERVATION")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CheckupReservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "RESERVATION_ID")
    private Integer reservationId;

    @Column(name = "EMPLOYEE_NO", nullable = false)
    private Integer employeeNo;

    @Column(name = "RESERVATION_DATE", nullable = false)
    private LocalDate reservationDate;

    @Column(name = "RECENT_CHECKUP_DATE")
    private LocalDate recentCheckupDate;

    @Column(name = "HOSPITAL_NAME", length = 100)
    private String hospitalName;

    @Column(name = "STATUS", nullable = false, length = 20)
    private String status;

    @Column(name = "MEMO", length = 500)
    private String memo;

    @Column(name = "CREATED_AT", nullable = false)
    private LocalDateTime createdAt;


    @PrePersist
    public void prePersist() {

        if (status == null) {
            status = "N";
        }

        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
    }
}