package com.kh.wellsy.my.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.wellsy.my.model.service.MyService;
import com.kh.wellsy.my.model.vo.My;
import com.kh.wellsy.my.model.vo.PasswordChangeRequest;

@CrossOrigin
@RestController
@RequestMapping("/my")
public class MyController {


	@Autowired
	private MyService myService;



	// =========================================
	// 마이페이지 조회
	// =========================================

	@GetMapping("/{loginId}")
	public ResponseEntity<My>
			selectMy(

		@PathVariable
		String loginId

	) {


		My my
			= myService.selectMy(
				loginId
			);


		if(my == null) {

			return ResponseEntity
					.notFound()
					.build();
		}


		return ResponseEntity.ok(
			my
		);
	}



	// =========================================
	// 개인정보 수정
	// =========================================

	@PutMapping("/{employeeNo}")
	public ResponseEntity<?>
			updateMy(

		@PathVariable
		int employeeNo,

		@RequestBody
		My my

	) {


		try {


			My result
				= myService.updateMy(
					employeeNo,
					my
				);


			if(result == null) {

				return ResponseEntity
						.notFound()
						.build();
			}


			return ResponseEntity.ok(
				result
			);


		} catch(
			IllegalArgumentException e
		) {


			return ResponseEntity
					.badRequest()
					.body(

						Map.of(
							"message",
							e.getMessage()
						)
					);
		}

	}



	// =========================================
	// 비밀번호 변경
	// =========================================

	@PutMapping("/{employeeNo}/password")
	public ResponseEntity<?>
			updatePassword(

		@PathVariable
		int employeeNo,

		@RequestBody
		PasswordChangeRequest request

	) {


		int result
			= myService.updatePassword(

				employeeNo,

				request.getCurrentPassword(),

				request.getNewPassword()
			);


		// 직원 없음
		if(result == 0) {

			return ResponseEntity
					.notFound()
					.build();
		}


		// 현재 비밀번호 불일치
		if(result == -1) {

			return ResponseEntity
					.badRequest()
					.body(

						Map.of(
							"message",
							"현재 비밀번호가 일치하지 않습니다."
						)
					);
		}


		// 기존 비밀번호와 동일
		if(result == -2) {

			return ResponseEntity
					.badRequest()
					.body(

						Map.of(
							"message",
							"현재 비밀번호와 다른 비밀번호를 입력해주세요."
						)
					);
		}


		return ResponseEntity.ok(

			Map.of(
				"message",
				"비밀번호가 변경되었습니다."
			)
		);
	}

}