package com.kh.wellsy.chat.model.dao;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.kh.wellsy.chat.model.vo.ChatMessageEntity;

public interface ChatMessageDao extends JpaRepository<ChatMessageEntity, Integer> {

	// 특정 채팅방의 대화 내역을 시간순으로 조회
	List<ChatMessageEntity> findByChatRoomIdOrderBySentAtAsc(int chatRoomId);
}
