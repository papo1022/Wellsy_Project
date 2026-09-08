package com.kh.wellsy.chat.model.vo;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "AI_CHAT_ROOM")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class ChatRoom {

	// 채팅방
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "CHAT_ROOM_ID")
	private int chatRoomId;
	
	// 만약 운동 추천 등 채팅방 용도별 세부 기능을 나눌 생각이라면 이 값 사용
	@Column(name = "CONSULTATION_TYPE")
	private String cosultationType;
	
	// 채팅방 이름
	@Column(name = "TITLE")
	private String title;
	
	@Column(name = "CREATED_AT")
	private LocalDateTime createAt;
	
	@Column(name = "EMPLOYEE_NO")
	private int employeeNo;
}
