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
@Table(name = "JOB")

@NoArgsConstructor
@Setter
@Getter
@ToString
public class Job {


    @Id
    @Column(name = "JOB_ID")
    private int jobId;


    @Column(
        name = "JOB_NAME",
        nullable = false,
        length = 100
    )
    private String jobName;

}