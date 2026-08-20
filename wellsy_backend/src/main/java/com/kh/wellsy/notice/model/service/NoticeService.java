package com.kh.wellsy.notice.model.service;

import java.util.List;

import com.kh.wellsy.notice.model.vo.Notice;

public interface NoticeService {

	List<Notice> selectNoticeList();

    Notice selectNotice(int noticeId);

    Notice insertNotice(Notice notice);

    Notice updateNotice(Notice notice);

    int deleteNotice(int noticeId);
}
