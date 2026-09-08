package com.kh.wellsy.chat.model.dao;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.kh.wellsy.chat.model.vo.ChatRoom;

public interface ChatRoomDao extends JpaRepository<ChatRoom, Integer> {

	// 사원별 채팅방 목록을 최신순으로 조회 (왼쪽 사이드바 목록용)
	List<ChatRoom> findByEmployeeNoOrderByCreatedAtDesc(int employeeNo);
}
