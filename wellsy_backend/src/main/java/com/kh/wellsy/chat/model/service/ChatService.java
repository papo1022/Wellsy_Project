package com.kh.wellsy.chat.model.service;

public interface ChatService {
	
	// 사용자 메시지를 받아서 AI 응답을 반환
	String getAiReply(String message);
}
