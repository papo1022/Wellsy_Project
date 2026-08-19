package com.kh.wellsy.notice.model.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.kh.wellsy.notice.model.vo.Notice;

@Repository
public interface NoticeDao extends JpaRepository<Notice, Integer> {

	// 공지사항 목록 조회
	// 삭제되지 않은 공지사항만 조회
	List<Notice> findByIsDeletedOrderByIsPinnedDescCreatedAtDesc(int isDeleted);
	
	
	// 공지사항 상세 조회
	// 삭제되지 않은 공지사항만 조회
	Optional<Notice> findByNoticeIdAndIsDeleted(int noticeId, int isDeleted);
	
	// 공지사항 삭제
	// 실제 DELETE가 아닌 IS_DELETED = 1 처리
	@Modifying
	@Query("UPDATE Notice n "
		 + "SET n.isDeleted = 1 "
		 + "WHERE n.noticeId = :noticeId")
	int deleteNotice(@Param("noticeId") int noticeId);
}
