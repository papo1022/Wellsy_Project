import { useEffect, useState } from "react";
import axios from "axios";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import "../styles/WeeklyExerciseDashboard.css";

const API_URL = "/wellsy/api/exercise/weekly";
const EMPLOYEE_NO = 1;

function WeeklyExerciseDashboard() {
  const [exerciseList, setExerciseList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartOpen, setChartOpen] = useState(false);

  const selectWeeklyExerciseList = async () => {
    try {
      const response = await axios.get(API_URL, {
        params: {
          employeeNo: EMPLOYEE_NO
        }
      });

      setExerciseList(response.data);
    } catch (error) {
      console.error("주간 운동량 조회 실패", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    selectWeeklyExerciseList();
  }, []);

  if (loading) {
    return (
      <div className="exercise-dashboard">
        주간 운동 데이터를 불러오는 중입니다.
      </div>
    );
  }

  const totalDuration = exerciseList.reduce(
    (sum, record) => sum + (record.duration || 0),
    0
  );

  const exerciseCount = exerciseList.length;
  const achievementList = exerciseList.filter(
    (record) => record.achievementRate !== null
  );

  const averageAchievement =
    achievementList.length > 0
      ? (
          achievementList.reduce(
            (sum, record) => sum + Number(record.achievementRate),
            0
          ) / achievementList.length
        ).toFixed(1)
      : "0.0";

  const completedCount = exerciseList.filter(
    (record) => record.status === "Y"
  ).length;

  const weeklyData = createWeeklyChartData(exerciseList);

  return (
    <div className="exercise-dashboard">
      <div className="exercise-title">
        <div>
          <h2>주간 운동량</h2>
          <p>이번 주 운동 기록을 확인합니다.</p>
        </div>

        <button
          type="button"
          className={`chart-toggle-btn ${chartOpen ? "is-open" : ""}`}
          onClick={() => setChartOpen((prev) => !prev)}
          aria-expanded={chartOpen}
          aria-label={chartOpen ? "주간 운동 그래프 닫기" : "주간 운동 그래프 보기"}
          title={chartOpen ? "그래프 닫기" : "그래프 보기"}
        >
          <ChartIcon />
        </button>
      </div>

      <div className="exercise-card-container">
        <div className="exercise-card">
          <span>총 운동시간</span>
          <strong>{totalDuration}분</strong>
        </div>

        <div className="exercise-card">
          <span>운동 횟수</span>
          <strong>{exerciseCount}회</strong>
        </div>

        <div className="exercise-card">
          <span>평균 달성률</span>
          <strong>{averageAchievement}%</strong>
        </div>

        <div className="exercise-card">
          <span>완료한 운동</span>
          <strong>{completedCount}회</strong>
        </div>
      </div>

      {chartOpen && (
        <div className="exercise-chart-box">
          <h3>요일별 운동시간</h3>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart
              data={weeklyData}
              margin={{ top: 12, right: 22, bottom: 8, left: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis unit="분" width={42} />
              <Tooltip
                formatter={(value) => [`${value}분`, "운동시간"]}
              />
              <Line
                type="monotone"
                dataKey="duration"
                name="운동시간"
                stroke="#8fbc97"
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

function ChartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 19V5" />
      <path d="M4 19H20" />
      <path d="M7 15L11 11L14 13L19 7" />
    </svg>
  );
}

function createWeeklyChartData(exerciseList) {
  const week = [
    { day: "월", dayNumber: 1, duration: 0 },
    { day: "화", dayNumber: 2, duration: 0 },
    { day: "수", dayNumber: 3, duration: 0 },
    { day: "목", dayNumber: 4, duration: 0 },
    { day: "금", dayNumber: 5, duration: 0 },
    { day: "토", dayNumber: 6, duration: 0 },
    { day: "일", dayNumber: 0, duration: 0 }
  ];

  exerciseList.forEach((record) => {
    const date = new Date(`${record.exerciseDate}T00:00:00`);
    const dayNumber = date.getDay();
    const target = week.find((item) => item.dayNumber === dayNumber);

    if (target) {
      target.duration += record.duration || 0;
    }
  });

  return week;
}

export default WeeklyExerciseDashboard;
