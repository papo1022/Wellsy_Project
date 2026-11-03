package com.kh.wellsy.employee.model.vo;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Entity
@Table(name = "DEPARTMENT")

@NoArgsConstructor
@Setter
@Getter
@ToString
public class Department {


    @Id
    @Column(name = "DEPARTMENT_ID")
    private int departmentId;


    @Column(
        name = "DEPARTMENT_NAME",
        nullable = false,
        length = 100
    )
    private String departmentName;

}