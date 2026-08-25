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
	List<Notice> findByStatusOrderByIsPinnedDescNoticeIdDesc(String status);
	
	
	// 공지사항 상세 조회
	// 삭제되지 않은 공지사항만 조회
	Optional<Notice> findByNoticeIdAndStatus(int noticeId, String status);
	
	// 조회수 증가
    @Modifying
    @Query("UPDATE Notice n "
         + "SET n.viewCount = n.viewCount + 1 "
         + "WHERE n.noticeId = :noticeId "
         + "AND n.status = 'Y'")
    int increaseViewCount(@Param("noticeId") int noticeId);
	
	// 공지사항 삭제
	// 실제 DELETE가 아닌 STATUS = 'N' 처리
	@Modifying
	@Query("UPDATE Notice n "
		 + "SET n.status= 'N' "
		 + "WHERE n.noticeId = :noticeId")
	int deleteNotice(@Param("noticeId") int noticeId);
}
