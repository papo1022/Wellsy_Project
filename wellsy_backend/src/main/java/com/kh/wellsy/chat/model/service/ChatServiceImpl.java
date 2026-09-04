package com.kh.wellsy.chat.model.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChatServiceImpl implements ChatService {
	
	@Autowired
	private ChatClient.Builder chatClientBuilder;
	
	// AI 시스템 프롬프트
	private static final String SYSTEM_PROMPT =
			"너는 Wellsy 서비스의 헬스코치야."
			+ "사용자의 운동, 식단, 건강 관리와 관련된 질문에만 친절하고 전문적으로 답변해."
			+ "운동, 식단, 건강과 관련이 없는 질문(예: 정치, 시사, 코딩, 잡담 등)이 들어오면,"
			+ "'저는 건강 관련 상담만 도와드릴 수 있어요 😊'라고 답하고 다른 주제는 다루지 마.";
	
	public String getAiReply(String message) {
		
		ChatClient chatClient = chatClientBuilder.build();
		
		// 사용자가 보낸 메시지를 그대로 AI에게 전달하고, 응답 텍스트만 꺼내옴
		String reply = chatClient.prompt()
				.system(SYSTEM_PROMPT) // 역할 고정용 프롬프트
                .user(message)
                .call()
                .content();
		
		return reply;
	}
}
