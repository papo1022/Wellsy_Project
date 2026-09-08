package com.kh.wellsy.chat.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kh.wellsy.chat.model.service.ChatService;
import com.kh.wellsy.chat.model.vo.ChatMessageEntity;
import com.kh.wellsy.chat.model.vo.ChatRoom;

@CrossOrigin
@RestController
@RequestMapping("/ai")
public class ChatController {
	
	@Autowired
	private ChatService chatService;
	
	// 메시지 전송 (roomId 없으면 새 방 생성)
	@PostMapping("/chat")
	public ResponseEntity<ChatMessageEntity> chat(@RequestBody Map<String, Object> body) {
		
		Integer roomId = body.get("roomId") != null ? (Integer) body.get("roomId") : null;
		int employeeNo = (Integer) body.get("employeeNo");
		String message = (String) body.get("message");
		
		ChatMessageEntity reply = chatService.sendMessage(roomId, employeeNo, message);
		
		return ResponseEntity.ok(reply);
	}
	
	// 사이드바용 채팅방 목록
	@GetMapping("/rooms")
	public ResponseEntity<List<ChatRoom>> getRoomList(@RequestParam int employeeNo) {
		
		return ResponseEntity.ok(chatService.getRoomList(employeeNo));
	}
	
	// 특정 채팅방의 전체 대화 내역
	@GetMapping("/rooms/{roomId}/messages")
	public ResponseEntity<List<ChatMessageEntity>> getMessage(@PathVariable int roomId) {
		
		return ResponseEntity.ok(chatService.getMessages(roomId));
	}
}
