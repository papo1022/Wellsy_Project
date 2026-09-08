package com.kh.wellsy.chat.model.vo;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="AI_CHAT_MESSAGE")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class ChatMessageEntity {
	
	// 채팅 메시지
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "CHAT_MESSAGE_ID")
	private int chatMessageId;
	
	// 채팅방
	@Column(name = "CHAT_ROOM_ID")
	private int chatRoomId;
	
	// "USER" 또는 "AI"
	@Column(name = "SENDER_TYPE")
	private String senderType;
	
	// 채팅 메시지 내용
	@Column(name = "MESSAGE_CONTENT")
	private String messageContent;
	
	@Column(name = "CREATED_AT")
	private LocalDateTime sentAt;
}
