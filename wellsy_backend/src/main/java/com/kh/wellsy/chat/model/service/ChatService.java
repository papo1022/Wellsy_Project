package com.kh.wellsy.chat.model.service;

import java.util.List;
import com.kh.wellsy.chat.model.vo.ChatMessageEntity;
import com.kh.wellsy.chat.model.vo.ChatRoom;

public interface ChatService {
	
	// 채팅 응답 기능 (roomId가 없으면 새 방 생성)
	ChatMessageEntity sendMessage(Integer roomId, int employeeNo, String message);
	
	// 사이드바 용도 - 사원의 채팅방 목록
	List<ChatRoom> getRoomList(int employeeNo);
	
	// 특정 채팅방의 대화 내역 전체
	List<ChatMessageEntity> getMessages(int roomId);
}
