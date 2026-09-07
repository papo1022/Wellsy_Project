package com.kh.wellsy.health.model.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.stereotype.Service;
import org.springframework.util.MimeType;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kh.wellsy.health.model.dto.MealAiImageResponse;
import com.kh.wellsy.health.model.dto.MealAiRequest;
import com.kh.wellsy.health.model.dto.MealAiResponse;

@Service
public class MealAiService {

    private final ChatClient chatClient;
    private final ObjectMapper objectMapper;

    public MealAiService(ChatClient.Builder chatClientBuilder) {

        this.chatClient = chatClientBuilder.build();
        this.objectMapper = new ObjectMapper();
    }

    public MealAiResponse analyzeFood(MealAiRequest request) {

        String prompt = """
                다음 음식의 영양정보를 분석해줘.

                음식명: %s
                섭취량: %s

                사용자가 입력한 섭취량을 기준으로
                다음 영양정보를 숫자로 계산해줘.

                - calories: kcal
                - protein: g
                - carbohydrate: g
                - fat: g

                음식의 영양정보를 판단할 수 없는 경우에는
                해당 영양정보 값을 0으로 작성해.

                반드시 아래 JSON 형식만 반환해.
                설명, 마크다운, 코드블록은 절대 작성하지 마.

                {
                  "foodName": "%s",
                  "amountDescription": "%s",
                  "calories": 0,
                  "protein": 0,
                  "carbohydrate": 0,
                  "fat": 0
                }
                """.formatted(
                request.getFoodName(),
                request.getAmountDescription(),
                request.getFoodName(),
                request.getAmountDescription());

        String result = chatClient
                .prompt()
                .user(prompt)
                .call()
                .content();

        try {
            return objectMapper.readValue(
                    result,
                    MealAiResponse.class);

        } catch (Exception e) {
            throw new RuntimeException(
                    "AI 식사 분석 결과 변환 실패",
                    e);
        }
    }

    public MealAiImageResponse analyzeImage(
            MultipartFile image) {

        try {

            String prompt = """
                    이 식사 사진을 분석해줘.

                    사진에서 확인되는 음식을 가능한 한 모두 찾아줘.

                    각 음식별로 다음 정보를 추정해줘.

                    - foodName: 음식명
                    - amountDescription: 사진에서 보이는 예상 섭취량
                    - calories: kcal
                    - protein: g
                    - carbohydrate: g
                    - fat: g

                    음식이 여러 개라면 반드시 각각 별도의 항목으로 만들어.

                    양은 예를 들어
                    "약 150g", "1공기", "2개", "약 반 접시"
                    같은 형태로 작성해.

                    영양정보를 판단하기 어려운 음식은
                    해당 영양정보 값을 0으로 작성해.

                    사진에서 음식이 확인되지 않으면 foods를 빈 배열로 반환해.

                    반드시 아래 JSON 형식만 반환해.
                    설명, 마크다운, 코드블록은 절대 작성하지 마.

                    {
                      "foods": [
                        {
                          "foodName": "음식명",
                          "amountDescription": "예상 섭취량",
                          "calories": 0,
                          "protein": 0,
                          "carbohydrate": 0,
                          "fat": 0
                        }
                      ]
                    }
                    """;

            byte[] imageBytes = image.getBytes();

            String contentType = image.getContentType();

            MimeType mimeType = contentType != null
                    ? MimeTypeUtils.parseMimeType(contentType)
                    : MimeTypeUtils.IMAGE_JPEG;

            ByteArrayResource imageResource = new ByteArrayResource(imageBytes);

            String result = chatClient
                    .prompt()
                    .user(user -> user
                            .text(prompt)
                            .media(
                                    mimeType,
                                    imageResource))
                    .call()
                    .content();

            return objectMapper.readValue(
                    result,
                    MealAiImageResponse.class);

        } catch (Exception e) {

            throw new RuntimeException(
                    "AI 식사 사진 분석 실패",
                    e);
        }
    }

}