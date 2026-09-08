package com.kh.wellsy.chat.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
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
	public ResponseEntity<?> chat(@RequestBody Map<String, Object> body) {
		
		// 1. roomId 안전하게 파싱
		Integer roomId = null;
		if(body.get("roomId") != null) {
			roomId = Integer.parseInt(body.get("roomId").toString());
		}
		
		// 2. employeeNo 안전하게 파싱
		if(body.get("employeeNo") == null) {
			return ResponseEntity.badRequest().body("employeeNo가 누락되었습니다.");
		}
		int employeeNo = Integer.parseInt(body.get("employeeNo").toString());
		
		// 3. message 키 이름 유연하게 획득 (message, content, text 모두 호환)
		String message = null;
		if(body.get("message") != null) {
			
			message = body.get("message").toString();
			
		} else if(body.get("content") != null) {
			
			message = body.get("content").toString();
			
		} else if(body.get("text") != null) {
			
			message = body.get("text").toString();
		}
		
		// 디버깅용 콘솔 출력
		System.out.println("=== [/ai/chat 요청 유입] ===");
		System.out.println("roomId: " + roomId);
		System.out.println("employeeNo: " + employeeNo);
		System.out.println("message: " + message);
		
		if(message == null || message.trim().isEmpty()) {
			
			return ResponseEntity.badRequest().body("메시지 내용이 비어 있습니다.");
		}
		
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
	
	// 채팅방 삭제
	@DeleteMapping("/rooms/{roomId}")
	public ResponseEntity<Void> deleteRoom(@PathVariable int roomId) {
		
		chatService.deleteRoom(roomId);
		
		return ResponseEntity.ok().build();
	}
}
