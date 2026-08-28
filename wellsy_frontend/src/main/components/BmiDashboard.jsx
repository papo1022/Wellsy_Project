import { useEffect, useState } from "react";

import axios from "axios";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from "recharts";

import "../styles/BmiDashboard.css";


const API_URL =
  "http://localhost:8006/wellsy/api/bmi";

// 로그인 연동 전 임시 사원번호
const EMPLOYEE_NO = 1;

function BmiDashboard() {

  const [bmiList, setBmiList] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // BMI 목록 조회
  const selectBmiList =
    async () => {

      try {
        const response =
          await axios.get(
            API_URL,
            {
              params: {
                employeeNo: EMPLOYEE_NO
              }
            }
          );

        const data =
          response.data.map(
            (record) => ({

              healthRecordId: record.healthRecordId,
              recordDate: record.recordDate,

              bmi:
                Number( record.bmi ),
              weight:
                record.weight !== null ? Number( record.weight ) : null,
              height:
                record.height !== null ? Number( record.height ) : null
            })
          );


        setBmiList(data);


      } catch (error) {

        console.error(
          "BMI 데이터 조회 실패", error
        );

      } finally {

        setLoading(false);
      }
    };


  useEffect(() => {

    selectBmiList();
  }, []);

  if (loading) {

    return (
      <div className="bmi-dashboard">
        BMI 데이터를 불러오는 중입니다.
      </div>
    );
  }

  if (
    bmiList.length === 0
  ) {

    return (
      <div className="bmi-dashboard">

        <div className="bmi-empty">

          <h2>BMI 변화</h2>

          <p>
            등록된 BMI 기록이 없습니다.
          </p>

        </div>

      </div>
    );

  }

  const latest =
    bmiList[ bmiList.length - 1 ];

  const previous =
    bmiList.length >= 2 ? bmiList[ bmiList.length - 2 ] : null;

  const bmiChange =
    previous ? (
          latest.bmi -
          previous.bmi
        ).toFixed(2)
      : "0.00";

  const first =
    bmiList[0];

  const totalChange =
    (
      latest.bmi -
      first.bmi
    ).toFixed(2);

  const bmiStatus =
    getBmiStatus(
      latest.bmi
    );

  return (
    <div className="bmi-dashboard">

      <div className="bmi-title">

        <h2>BMI 변화</h2>

        <p>
          건강 기록을 기반으로 BMI 변화 추이를 확인합니다.
        </p>

      </div>

      <div className="bmi-card-container">

        <div className="bmi-card">

          <span>
            현재 BMI
          </span>

          <strong>
            {latest.bmi.toFixed(2)}
          </strong>

          <p>
            {bmiStatus}
          </p>

        </div>

        <div className="bmi-card">

          <span>
            최근 변화량
          </span>

          <strong
            className={
              Number(bmiChange) > 0
                ? "bmi-up"
                : Number(bmiChange) < 0
                ? "bmi-down"
                : ""
            }
          >

            {Number(bmiChange) > 0
              ? "+"
              : ""}

            {bmiChange}

          </strong>

          <p>
            직전 기록 대비
          </p>

        </div>

        <div className="bmi-card">

          <span>
            전체 변화량
          </span>

          <strong
            className={
              Number(totalChange) > 0
                ? "bmi-up"
                : Number(totalChange) < 0
                ? "bmi-down"
                : ""
            }
          >

            {Number(totalChange) > 0
              ? "+"
              : ""}

            {totalChange}

          </strong>

          <p>
            최초 기록 대비
          </p>

        </div>

        <div className="bmi-card">

          <span>
            현재 체중
          </span>

          <strong>

            {latest.weight !== null
              ? `${latest.weight.toFixed(1)} kg`
              : "-"}

          </strong>

          <p>
            최근 측정 기록
          </p>

        </div>

      </div>

      <div className="bmi-chart-box">

        <h3 className="bmi-card-title">
          BMI 변화 그래프
        </h3>

        <ResponsiveContainer className="bmi-graph" height={400}>

          <LineChart data={bmiList} >

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="recordDate" />

            <YAxis
              domain={[
                "dataMin - 2",
                "dataMax + 2"
              ]}
            />

            <Tooltip
              formatter={(value) => [
                Number(value)
                  .toFixed(2),
                "BMI"
              ]}
            />

            <ReferenceLine
              y={24.9}
              strokeDasharray="5 5"
              label="BMI 24.9"
            />

            <Line
              type="monotone"

              dataKey="bmi"

              strokeWidth={3}

              dot={{ r: 5 }}

              activeDot={{ r: 7 }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>
    </div>
  );
}


function getBmiStatus(bmi) {

  if (bmi < 18.5) {
    return "저체중";
  }

  if (bmi < 23) {
    return "정상";
  }

  if (bmi < 25) {
    return "과체중";
  }

  return "비만";
}

// 내보내기
export default BmiDashboard;