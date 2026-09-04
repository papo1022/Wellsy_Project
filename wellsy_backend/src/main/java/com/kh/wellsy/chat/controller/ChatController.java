package com.kh.wellsy.chat.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class ChatController {
	
	// - Message 객체: LLM과 사람이 나누는 대화 내용을 담는 객체 (부모타입)
	// - UserMessage 객체: 사용자의 텍스트 메시지를 담는 객체 (자식타입)
	// - AiMessage 객체: AI의 응답 메시지를 담는 객체 (자식타입)
}
