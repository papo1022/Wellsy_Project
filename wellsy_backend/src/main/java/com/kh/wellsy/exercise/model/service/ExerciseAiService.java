package com.kh.wellsy.exercise.model.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kh.wellsy.exercise.model.dto.ExerciseAiRequest;
import com.kh.wellsy.exercise.model.dto.ExerciseAiResponse;

@Service
public class ExerciseAiService {

    private final ChatClient chatClient;
    private final ObjectMapper objectMapper;

    public ExerciseAiService(
            ChatClient.Builder chatClientBuilder
    ) {
        this.chatClient = chatClientBuilder.build();
        this.objectMapper = new ObjectMapper();
    }

    public ExerciseAiResponse analyzeExercise(
            ExerciseAiRequest request
    ) {

        String weightText =
                request.getWeight() != null
                        ? request.getWeight() + "kg"
                        : "체중 정보 없음";

        String prompt = """
                다음 운동 기록을 분석해줘.

                운동명: %s
                운동량: %s
                사용자 체중: %s

                사용자가 입력한 운동명과 운동량을 기준으로
                다음 정보를 추정해줘.

                - exerciseName: 운동명
                - amountDescription: 사용자가 입력한 운동량
                - exerciseType: 유산소, 근력, 유연성 등 운동 종류
                - difficulty: 저강도, 중강도, 고강도 중 하나
                - durationMinutes: 운동 시간을 분 단위 숫자로 작성
                - count: 횟수 기반 운동이면 횟수, 아니면 0
                - caloriesPerMinute: 1분당 예상 소모 칼로리
                - estimatedCalories: 전체 예상 소모 칼로리

                운동량이 횟수만 입력되어 정확한 운동 시간을
                판단할 수 없다면 일반적인 수행 속도를 기준으로
                durationMinutes를 추정해.

                사용자 체중이 존재하면 체중을 고려해서
                칼로리를 계산해.

                사용자 체중이 없다면 일반적인 성인 기준으로
                추정해.

                정보를 판단하기 어려운 경우 숫자는 0으로 작성해.

                반드시 아래 JSON 형식만 반환해.
                설명, 마크다운, 코드블록은 작성하지 마.

                {
                  "exerciseName": "%s",
                  "amountDescription": "%s",
                  "exerciseType": "",
                  "difficulty": "",
                  "durationMinutes": 0,
                  "count": 0,
                  "caloriesPerMinute": 0,
                  "estimatedCalories": 0
                }
                """.formatted(
                request.getExerciseName(),
                request.getAmountDescription(),
                weightText,
                request.getExerciseName(),
                request.getAmountDescription()
        );

        String result = chatClient
                .prompt()
                .user(prompt)
                .call()
                .content();

        try {

            return objectMapper.readValue(
                    result,
                    ExerciseAiResponse.class
            );

        } catch (Exception e) {

            throw new RuntimeException(
                    "AI 운동 분석 결과 변환 실패",
                    e
            );
        }
    }
}