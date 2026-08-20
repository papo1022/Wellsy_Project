package com.kh.wellsy.notice.model.vo;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "NOTICE")
@NoArgsConstructor
@Setter
@Getter
@ToString
public class Notice {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "NOTICE_ID")
	private int noticeId;				// NOTICE_ID INT

	@Column(name = "TITLE", nullable = false)
	private String title;				// TITLE VARCHAR(200)

	@Column(name = "CONTENT", nullable = false)
	private String content;				// CONTENT TEXT

	@Column(name = "IS_PINNED", nullable = false)
	private int isPinned;				// IS_PINNED TINYINT

	@Column(name = "VIEW_COUNT", nullable = false)
	private int viewCount;				// VIEW_COUNT INT

	@Column(name = "IS_DELETED", nullable = false)
	private int isDeleted;				// IS_DELETED TINYINT

	@Column(name = "CREATED_AT", insertable = false, updatable = false)
	private LocalDateTime createdAt;	// CREATED_AT TIMESTAMP

	@Column(name = "EMPLOYEE_NO", nullable = false)
	private int employeeNo;				// EMPLOYEE_NO INT
	
}
