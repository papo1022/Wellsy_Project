package com.kh.wellsy.chat.model.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChatServiceImpl implements ChatService {
	
	@Autowired
	private ChatClient.Builder chatClientBuilder;
	
	public String getAiReply(String message) {
		
		ChatClient chatClient = chatClientBuilder.build();
		
		// 사용자가 보낸 메시지를 그대로 AI에게 전달하고, 응답 텍스트만 꺼내옴
		String reply = chatClient.prompt()
                .user(message)
                .call()
                .content();
		
		return reply;
	}
}
