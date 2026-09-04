package com.kh.wellsy.chat.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.wellsy.chat.model.service.ChatService;
import com.kh.wellsy.chat.model.vo.Chat;

@CrossOrigin
@RestController
@RequestMapping("/ai")
public class ChatController {
	
	@Autowired
	private ChatService chatService;
	
	// 프론트에서 { message: "..." } 형태로 요청을 받아서
	// { reply: "..." } 형태의 JSON으로 응답
	@PostMapping("/chat")
	public ResponseEntity<Chat> chat(@RequestBody Chat chat) {
		
		String reply = chatService.getAiReply(chat.getMessage());
		
		chat.setReply(reply);
		
		return ResponseEntity.ok(chat);
	}
}
