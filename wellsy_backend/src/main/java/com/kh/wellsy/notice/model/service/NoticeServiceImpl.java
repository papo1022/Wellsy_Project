package com.kh.wellsy.notice.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kh.wellsy.notice.model.dao.NoticeDao;
import com.kh.wellsy.notice.model.vo.Notice;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NoticeServiceImpl implements NoticeService{

	@Autowired
	private NoticeDao noticeDao;
	
	// 공지사항 목록 조회
	@Transactional(readOnly=true)
	@Override
	public List<Notice> selectNoticeList() {
		
		return noticeDao.findByStatusOrderByIsPinnedDescCreatedAtDesc("Y");
	}
	
	// 공지사항 상세 조회
	@Transactional(readOnly=true)
	@Override
	public Notice selectNotice(int noticeId) {
		
		return noticeDao.findByNoticeIdAndStatus(noticeId, "Y").orElse(null);
	}
	
	// 공지사항 작성
	@Transactional
	@Override
	public Notice insertNotice(Notice notice) {
		
		return noticeDao.save(notice);
	}
	
	// 공지사항 수정
	@Transactional
	@Override
	public Notice updateNotice(Notice notice) {
		
		return noticeDao.save(notice);
	}
	
	// 공지사항 삭제
	@Transactional
	@Override
	public int deleteNotice(int noticeId) {
		
		return noticeDao.deleteNotice(noticeId);
	}
}
