package com.kh.wellsy.chat.model.vo;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

// DB에 저장하는 Entity가 아니라, 프론트와 주고받는 데이터를 담는 용도의 일반 VO 클래스
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Chat {
	
	// 사용자가 보낸 메시지
	private String message;
	
	// AI가 응답한 내용
	private String reply;
}
