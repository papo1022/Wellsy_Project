package com.kh.wellsy.notice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kh.wellsy.notice.model.service.NoticeService;
import com.kh.wellsy.notice.model.vo.Notice;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class NoticeController {

	@Autowired
	private NoticeService noticeService;
	
	// 공지사항 목록 조회용 컨트롤러
	@GetMapping("/notice")
	public ResponseEntity<List<Notice>> selectNoticeList() {
		
		// 서비스 호출
		List<Notice> list = noticeService.selectNoticeList();
		
		return ResponseEntity.status(HttpStatus.OK)
							 .body(list);
	}
	
	// 공지사항 작성용 컨트롤러
	@PostMapping("/notice")
	public ResponseEntity<String> insertNotice(@RequestBody Notice notice) {
		
		// 서비스 호출
		Notice result = noticeService.insertNotice(notice);
		
		String message = (result != null) ? "success" : "fail";
		
		return ResponseEntity.status(HttpStatus.OK)
							 .body(message);
	}
	
	// 공지사항 상세 조회용 컨트롤러
	@GetMapping("/notice/{noticeId}")
	public ResponseEntity<Notice> selectNotice(@PathVariable int noticeId) {
		
		Notice notice = noticeService.selectNotice(noticeId);
		
		return ResponseEntity.status(HttpStatus.OK)
							 .body(notice);
	}
	
	// 공지사항 수정용 컨트롤러
	@PutMapping("/notice/{noticeId}")
	public ResponseEntity<String> updateNotice(@PathVariable int noticeId,
											   @RequestBody Notice notice) {
		
		// URL로 받은 noticeId를 Notice 객체에 저장
		notice.setNoticeId(noticeId);
		
		// 서비스 호출
		Notice result = noticeService.updateNotice(notice);
		
		String message = (result != null) ? "success" : "fail";
		
		return ResponseEntity.status(HttpStatus.OK)
							 .body(message);
	}
	
	// 공지사항 삭제용 컨트롤러
	@DeleteMapping("/notice/{noticeId}")
	public ResponseEntity<String> deleteNotice(@PathVariable int noticeId) {
		
		// 서비스 호출
		int result = noticeService.deleteNotice(noticeId);
		
		String message = (result > 0) ? "success" : "fail";
		
		return ResponseEntity.status(HttpStatus.OK)
							 .body(message);
	}
	
	@GetMapping("/page")
	public Page<Notice> selectNoticePage(

	        @RequestParam(
	            defaultValue = "10"
	        )
	        int page,

	        @RequestParam(
	            defaultValue = "3"
	        )
	        int size
	) {


	    return noticeService
	        .selectNoticePage(
	            page,
	            size
	        );
	}
}
