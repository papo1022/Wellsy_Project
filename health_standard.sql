-- =========================================
-- 판정 규칙
-- MIN_VALUE <= 측정값 < MAX_VALUE
--
-- MAX_VALUE가 NULL인 경우
-- 측정값 >= MIN_VALUE
-- =========================================


-- =========================================
-- BMI
-- =========================================

INSERT INTO HEALTH_STANDARD
(
    METRIC_TYPE,
    GENDER,
    MIN_AGE,
    MAX_AGE,
    MIN_VALUE,
    MAX_VALUE,
    UNIT,
    GRADE,
    DESCRIPTION
)
VALUES
('BMI', 'ALL', 20, 999, 0, 15, 'kg/m²', 'danger',
 'BMI 15 미만'),

('BMI', 'ALL', 20, 999, 15, 16, 'kg/m²', 'warning',
 'BMI 15 이상 16 미만'),

('BMI', 'ALL', 20, 999, 16, 17, 'kg/m²', 'caution',
 'BMI 16 이상 17 미만'),

('BMI', 'ALL', 20, 999, 17, 18.5, 'kg/m²', 'interest',
 'BMI 17 이상 18.5 미만'),

('BMI', 'ALL', 20, 999, 18.5, 25, 'kg/m²', 'normal',
 'BMI 18.5 이상 25 미만'),

('BMI', 'ALL', 20, 999, 25, 30, 'kg/m²', 'interest',
 'BMI 25 이상 30 미만'),

('BMI', 'ALL', 20, 999, 30, 35, 'kg/m²', 'caution',
 'BMI 30 이상 35 미만'),

('BMI', 'ALL', 20, 999, 35, 40, 'kg/m²', 'warning',
 'BMI 35 이상 40 미만'),

('BMI', 'ALL', 20, 999, 40, NULL, 'kg/m²', 'danger',
 'BMI 40 이상');


-- =========================================
-- 수축기 혈압
-- =========================================

INSERT INTO HEALTH_STANDARD
(
    METRIC_TYPE,
    GENDER,
    MIN_AGE,
    MAX_AGE,
    MIN_VALUE,
    MAX_VALUE,
    UNIT,
    GRADE,
    DESCRIPTION
)
VALUES
('SYSTOLIC_BP', 'ALL', 20, 999, 0, 120, 'mmHg', 'normal',
 '수축기 혈압 120 미만'),

('SYSTOLIC_BP', 'ALL', 20, 999, 120, 130, 'mmHg', 'interest',
 '수축기 혈압 120 이상 130 미만'),

('SYSTOLIC_BP', 'ALL', 20, 999, 130, 140, 'mmHg', 'caution',
 '수축기 혈압 130 이상 140 미만'),

('SYSTOLIC_BP', 'ALL', 20, 999, 140, 180, 'mmHg', 'warning',
 '수축기 혈압 140 이상 180 미만'),

('SYSTOLIC_BP', 'ALL', 20, 999, 180, NULL, 'mmHg', 'danger',
 '수축기 혈압 180 이상');


-- =========================================
-- 이완기 혈압
-- =========================================

INSERT INTO HEALTH_STANDARD
(
    METRIC_TYPE,
    GENDER,
    MIN_AGE,
    MAX_AGE,
    MIN_VALUE,
    MAX_VALUE,
    UNIT,
    GRADE,
    DESCRIPTION
)
VALUES
('DIASTOLIC_BP', 'ALL', 20, 999, 0, 80, 'mmHg', 'normal',
 '이완기 혈압 80 미만'),

('DIASTOLIC_BP', 'ALL', 20, 999, 80, 85, 'mmHg', 'interest',
 '이완기 혈압 80 이상 85 미만'),

('DIASTOLIC_BP', 'ALL', 20, 999, 85, 90, 'mmHg', 'caution',
 '이완기 혈압 85 이상 90 미만'),

('DIASTOLIC_BP', 'ALL', 20, 999, 90, 120, 'mmHg', 'warning',
 '이완기 혈압 90 이상 120 미만'),

('DIASTOLIC_BP', 'ALL', 20, 999, 120, NULL, 'mmHg', 'danger',
 '이완기 혈압 120 이상');


-- =========================================
-- 혈당
-- =========================================

INSERT INTO HEALTH_STANDARD
(
    METRIC_TYPE,
    GENDER,
    MIN_AGE,
    MAX_AGE,
    MIN_VALUE,
    MAX_VALUE,
    UNIT,
    GRADE,
    DESCRIPTION
)
VALUES
('BLOOD_SUGAR', 'ALL', 20, 999, 0, 54, 'mg/dL', 'danger',
 '혈당 54 미만'),

('BLOOD_SUGAR', 'ALL', 20, 999, 54, 70, 'mg/dL', 'warning',
 '혈당 54 이상 70 미만'),

('BLOOD_SUGAR', 'ALL', 20, 999, 70, 100, 'mg/dL', 'normal',
 '혈당 70 이상 100 미만'),

('BLOOD_SUGAR', 'ALL', 20, 999, 100, 110, 'mg/dL', 'interest',
 '혈당 100 이상 110 미만'),

('BLOOD_SUGAR', 'ALL', 20, 999, 110, 126, 'mg/dL', 'caution',
 '혈당 110 이상 126 미만'),

('BLOOD_SUGAR', 'ALL', 20, 999, 126, 200, 'mg/dL', 'warning',
 '혈당 126 이상 200 미만'),

('BLOOD_SUGAR', 'ALL', 20, 999, 200, NULL, 'mg/dL', 'danger',
 '혈당 200 이상');


-- =========================================
-- 수면 시간
-- =========================================

INSERT INTO HEALTH_STANDARD
(
    METRIC_TYPE,
    GENDER,
    MIN_AGE,
    MAX_AGE,
    MIN_VALUE,
    MAX_VALUE,
    UNIT,
    GRADE,
    DESCRIPTION
)
VALUES
('SLEEP_TIME', 'ALL', 20, 999, 0, 4, 'hour', 'danger',
 '수면시간 4시간 미만'),

('SLEEP_TIME', 'ALL', 20, 999, 4, 5, 'hour', 'warning',
 '수면시간 4시간 이상 5시간 미만'),

('SLEEP_TIME', 'ALL', 20, 999, 5, 6, 'hour', 'caution',
 '수면시간 5시간 이상 6시간 미만'),

('SLEEP_TIME', 'ALL', 20, 999, 6, 7, 'hour', 'interest',
 '수면시간 6시간 이상 7시간 미만'),

('SLEEP_TIME', 'ALL', 20, 999, 7, 9, 'hour', 'normal',
 '수면시간 7시간 이상 9시간 미만'),

('SLEEP_TIME', 'ALL', 20, 999, 9, 10, 'hour', 'interest',
 '수면시간 9시간 이상 10시간 미만'),

('SLEEP_TIME', 'ALL', 20, 999, 10, 11, 'hour', 'caution',
 '수면시간 10시간 이상 11시간 미만'),

('SLEEP_TIME', 'ALL', 20, 999, 11, 12, 'hour', 'warning',
 '수면시간 11시간 이상 12시간 미만'),

('SLEEP_TIME', 'ALL', 20, 999, 12, NULL, 'hour', 'danger',
 '수면시간 12시간 이상');