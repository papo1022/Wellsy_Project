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
	private int noticeId;				// NOTICE_ID INT (PK)

	@Column(name = "EMPLOYEE_NO", nullable = false)
	private int employeeNo;				// EMPLOYEE_NO INT (FK)

	@Column(name = "TITLE", nullable = false, length = 200)
	private String title;				// TITLE VARCHAR(200)

	@Column(name = "CONTENT", nullable = false, length = 4000)
	private String content;				// CONTENT VARCHAR(4000)

	@Column(name = "IS_PINNED", nullable = false)
	private int isPinned;				// IS_PINNED INTEGER

	@Column(name = "VIEW_COUNT", nullable = false)
	private int viewCount;				// VIEW_COUNT INT

	@Column(name = "STATUS", nullable = false, length = 20)
	private String status = "Y";		// STATUS Y / N

	@Column(name = "CREATED_AT", insertable = false, updatable = false)
	private LocalDateTime createdAt;	// CREATED_AT DATETIME

	@Column(name = "UPDATED_AT")
	private LocalDateTime updatedAt;	// UPDATED_AT DATETIME
}
