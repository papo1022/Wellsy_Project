package com.kh.wellsy.chat.model.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kh.wellsy.chat.model.dao.ChatMessageDao;
import com.kh.wellsy.chat.model.dao.ChatRoomDao;
import com.kh.wellsy.chat.model.vo.ChatMessageEntity;
import com.kh.wellsy.chat.model.vo.ChatRoom;

@Service
public class ChatServiceImpl implements ChatService {
	
	@Autowired
	private ChatClient.Builder chatClientBuilder;
	
	@Autowired
	private ChatRoomDao chatRoomDao;
	
	@Autowired
	private ChatMessageDao chatMessageDao;
	
	// AI 시스템 프롬프트
	private static final String SYSTEM_PROMPT =
			"너는 Wellsy 서비스의 헬스코치야."
			+ "사용자의 운동, 식단, 건강 관리와 관련된 질문에만 친절하고 전문적으로 답변해."
			+ "운동, 식단, 건강과 관련이 없는 질문(예: 정치, 시사, 코딩, 잡담 등)이 들어오면,"
			+ "'저는 건강 관련 상담만 도와드릴 수 있어요 😊'라고 답하고 다른 주제는 다루지 마.";
	
	@Override
	public ChatMessageEntity sendMessage(Integer roomId, int employeeNo, String message) {
		
		ChatRoom room;
		
		if(roomId == null) {
			// 만약 채팅방이 없다면 (즉, 새 대화라면)
			room = new ChatRoom();
			room.setEmployeeNo(employeeNo);
			room.setCosultationType("HEALTH_COACH");
			
			// 방 제목은 사용자의 첫 메시지 앞부분으로 자동 지정
			room.setTitle(message.length() > 20 ? message.substring(0, 20) + "..." : message);
			room.setCreateAt(LocalDateTime.now());
			room = chatRoomDao.save(room);
			
		} else {
			// 만약 채팅방이 있다면
			room = chatRoomDao.findById(roomId)
					.orElseThrow(() -> new IllegalArgumentException("존재하지 않는 채팅방입니다."));
		}
		
		// 1) 사용자 메시지 저장
		ChatMessageEntity userMsg = new ChatMessageEntity();
		userMsg.setChatRoomId(room.getChatRoomId());
		userMsg.setSenderType("USER");
		userMsg.setMessageContent(message);
		userMsg.setSentAt(LocalDateTime.now());
		chatMessageDao.save(userMsg);
		
		// 2) AI 응답 생성
		ChatClient chatClient = chatClientBuilder.build();
		String reply = chatClient.prompt()
				.system(SYSTEM_PROMPT)
				.user(message)
				.call()
				.content();
		
		// 3) AI 응답 저장
		ChatMessageEntity aiMsg = new ChatMessageEntity();
		aiMsg.setChatRoomId(room.getChatRoomId());
		aiMsg.setSenderType("AI");
		aiMsg.setMessageContent(reply);
		aiMsg.setSentAt(LocalDateTime.now());
		chatMessageDao.save(aiMsg);
		
		// roomId 정보까지 프론트에 돌려주기 위해 aiMsg에 방 번호가 이미 들어 있음
		return aiMsg;
	}
	
	@Override
	public List<ChatRoom> getRoomList(int employeeNo) {
		
		return chatRoomDao.findByEmployeeNoOrderByCreatedAtDesc(employeeNo);
	}
	
	@Override
	public List<ChatMessageEntity> getMessages(int roomId) {
		
		return chatMessageDao.findByChatRoomIdOrderBySentAtAsc(roomId);
	}
}
