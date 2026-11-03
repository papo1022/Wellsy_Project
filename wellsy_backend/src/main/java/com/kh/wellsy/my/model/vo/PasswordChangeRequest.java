package com.kh.wellsy.my.model.vo;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@NoArgsConstructor
@Setter
@Getter
@ToString
public class PasswordChangeRequest {


	private String currentPassword;		// 현재 비밀번호

	private String newPassword;			// 새로운 비밀번호

}