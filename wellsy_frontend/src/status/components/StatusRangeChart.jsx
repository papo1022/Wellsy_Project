import {
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    ReferenceArea,
    LabelList
} from "recharts";

import "../styles/StatusChart.css";

const EXERCISE_MIN = 30;
const EXERCISE_MAX = 60;

const SLEEP_MIN = 7;
const SLEEP_MAX = 9;


function StatusRangeChart({
    departmentStats = []
}) {


    // =========================================
    // 값 숫자로 변환
    // =========================================

    const toNumber = value => {


        const number
            = Number(value);


        return Number.isNaN(number)
            ?
            0
            :
            number;
    };


    // =========================================
    // 권장 범위 상태 확인
    // =========================================

    const getRangeStatus = (
        value,
        min,
        max
    ) => {


        if(value === 0) {

            return "데이터 없음";
        }


        if(value < min) {

            return "부족";
        }


        if(value > max) {

            return "초과";
        }


        return "권장 범위";
    };


    // =========================================
    // 기존 STATUS 데이터
    // 그래프 형식으로 변환
    // =========================================

    // =========================================
// 기존 STATUS 데이터
// 그래프 형식으로 변환
// =========================================

const chartData
    = departmentStats.map(
        status => {


            const exercise
                = toNumber(
                    status.averageExerciseTime
                );


            const sleep
                = toNumber(
                    status.averageSleepTime
                );


            return {


                department :
                    status.departmentName
                    ??
                    "미지정",


                exercise :
                    exercise,


                sleep :
                    sleep,


                employeeCount :
                    status.employeeCount
                    ??
                    0,


                exerciseStatus :
                    getRangeStatus(

                        exercise,

                        EXERCISE_MIN,

                        EXERCISE_MAX,

                        status.employeeCount
                    ),


                sleepStatus :
                    getRangeStatus(

                        sleep,

                        SLEEP_MIN,

                        SLEEP_MAX,

                        status.employeeCount
                    )

            };

        }
    );


    // =========================================
    // 그래프 최대값
    // =========================================

    const maxExercise
        = Math.max(

            70,

            ...chartData.map(
                item => item.exercise + 10
            )
        );


    const maxSleep
        = Math.max(

            10,

            ...chartData.map(
                item => item.sleep + 1
            )
        );


    // =========================================
    // 상태 CSS
    // =========================================

    const getStatusClass
        = status => {


            if(status === "권장 범위") {

                return "status-range-good";
            }


            if(status === "부족") {

                return "status-range-low";
            }


            if(status === "초과") {

                return "status-range-high";
            }


            return "status-range-empty";
        };


    return (

        <div className="status-chart-section">


            {/* ================================= */}
            {/* 제목 */}
            {/* ================================= */}

            <div className="status-chart-header">


                <div>

                    <h2>
                        권장시간 비교
                    </h2>

                    <p>
                        부서별 평균 운동시간과 수면시간이 권장 범위에 포함되는지 확인할 수 있습니다.
                    </p>

                </div>


            </div>


            {
                chartData.length === 0
                ?
                (

                    <div className="status-chart-empty">

                        조회된 통계 데이터가 없습니다.

                    </div>

                )
                :
                (

                    <>

                        {/* ================================= */}
                        {/* 그래프 */}
                        {/* ================================= */}

                        <div className="status-chart-grid">


                            {/* ================================= */}
                            {/* 운동시간 */}
                            {/* ================================= */}

                            <div className="status-chart-card">


                                <div className="status-chart-card-header">


                                    <div>

                                        <h3>
                                            평균 운동시간
                                        </h3>

                                        <p>
                                            하루 평균 운동시간
                                        </p>

                                    </div>


                                    <span className="status-recommended-label">

                                        권장 {EXERCISE_MIN} ~ {EXERCISE_MAX}분

                                    </span>


                                </div>


                                <div className="status-chart">


                                    <ResponsiveContainer
                                        width="100%"
                                        height="100%"
                                    >

                                        <BarChart
                                            data={
                                                chartData
                                            }

                                            margin={{
                                                top : 30,
                                                right : 25,
                                                left : 0,
                                                bottom : 10
                                            }}
                                        >


                                            <CartesianGrid
                                                strokeDasharray="3 3"
                                                vertical={false}
                                            />


                                            <XAxis
                                                dataKey="department"
                                                tickLine={false}
                                                axisLine={false}
                                            />


                                            <YAxis
                                                domain={[
                                                    0,
                                                    maxExercise
                                                ]}
                                                unit="분"
                                                tickLine={false}
                                                axisLine={false}
                                            />


                                            <Tooltip
                                                formatter={(
                                                    value
                                                ) => [

                                                    `${value}분`,

                                                    "평균 운동시간"
                                                ]}
                                            />


                                            {/* 권장 범위 영역 */}

                                            <ReferenceArea
                                                y1={
                                                    EXERCISE_MIN
                                                }

                                                y2={
                                                    EXERCISE_MAX
                                                }

                                                fill="#9bc88c"

                                                fillOpacity={0.35}
                                            />


                                            <Bar
                                                dataKey="exercise"

                                                name="평균 운동시간"

                                                fill="#5d8f78"

                                                radius={[
                                                    6,
                                                    6,
                                                    0,
                                                    0
                                                ]}

                                                maxBarSize={55}

                                                isAnimationActive={false}
                                            >

                                                <LabelList
                                                    dataKey="exercise"

                                                    position="top"

                                                    formatter={ value =>
                                                        `${value}분`
                                                    }
                                                />

                                            </Bar>


                                        </BarChart>


                                    </ResponsiveContainer>


                                </div>


                            </div>


                            {/* ================================= */}
                            {/* 수면시간 */}
                            {/* ================================= */}

                            <div className="status-chart-card">


                                <div className="status-chart-card-header">


                                    <div>

                                        <h3>
                                            평균 수면시간
                                        </h3>

                                        <p>
                                            하루 평균 수면시간
                                        </p>

                                    </div>


                                    <span className="status-recommended-label">

                                        권장 {SLEEP_MIN} ~ {SLEEP_MAX}시간

                                    </span>


                                </div>


                                <div className="status-chart">


                                    <ResponsiveContainer
                                        width="100%"
                                        height="100%"
                                    >

                                        <BarChart
                                            data={
                                                chartData
                                            }

                                            margin={{
                                                top : 30,
                                                right : 25,
                                                left : 0,
                                                bottom : 10
                                            }}
                                        >


                                            <CartesianGrid
                                                strokeDasharray="3 3"
                                                vertical={false}
                                            />


                                            <XAxis
                                                dataKey="department"
                                                tickLine={false}
                                                axisLine={false}
                                            />


                                            <YAxis
                                                domain={[
                                                    0,
                                                    maxSleep
                                                ]}
                                                unit="시간"
                                                tickLine={false}
                                                axisLine={false}
                                            />


                                            <Tooltip
                                                formatter={(
                                                    value
                                                ) => [

                                                    `${value}시간`,

                                                    "평균 수면시간"
                                                ]}
                                            />


                                            {/* 권장 범위 영역 */}

                                            <ReferenceArea
                                                y1={
                                                    SLEEP_MIN
                                                }

                                                y2={
                                                    SLEEP_MAX
                                                }

                                                fill="#9bc88c"

                                                fillOpacity={0.35}
                                            />


                                            <Bar
                                                dataKey="sleep"

                                                name="평균 수면시간"

                                                fill="#718fa1"

                                                radius={[
                                                    6,
                                                    6,
                                                    0,
                                                    0
                                                ]}

                                                maxBarSize={55}

                                                isAnimationActive={false}
                                            >

                                                <LabelList
                                                    dataKey="sleep"

                                                    position="top"

                                                    formatter={ value =>
                                                        `${value}시간`
                                                    }
                                                />

                                            </Bar>


                                        </BarChart>


                                    </ResponsiveContainer>


                                </div>


                            </div>


                        </div>


                        {/* ================================= */}
                        {/* 부서별 판정 */}
                        {/* ================================= */}

                        <div className="status-range-result">


                            <h3>
                                부서별 권장시간 확인
                            </h3>


                            <div className="status-range-table">


                                <div className="status-range-row status-range-row-header">

                                    <span>
                                        부서
                                    </span>

                                    <span>
                                        운동시간
                                    </span>

                                    <span>
                                        운동 판정
                                    </span>

                                    <span>
                                        수면시간
                                    </span>

                                    <span>
                                        수면 판정
                                    </span>

                                </div>


                                {
                                    chartData.map(
                                        item => (

                                            <div
                                                className="status-range-row"

                                                key={
                                                    item.department
                                                }
                                            >


                                                <strong>
                                                    {item.department}
                                                </strong>


                                                <span>
                                                    {item.exercise}분
                                                </span>


                                                <span>

                                                    <em
                                                        className={
                                                            getStatusClass(
                                                                item.exerciseStatus
                                                            )
                                                        }
                                                    >
                                                        {
                                                            item.exerciseStatus
                                                        }
                                                    </em>

                                                </span>


                                                <span>
                                                    {item.sleep}시간
                                                </span>


                                                <span>

                                                    <em
                                                        className={
                                                            getStatusClass(
                                                                item.sleepStatus
                                                            )
                                                        }
                                                    >
                                                        {
                                                            item.sleepStatus
                                                        }
                                                    </em>

                                                </span>


                                            </div>

                                        )
                                    )
                                }


                            </div>


                        </div>

                    </>

                )
            }


        </div>
    );

}


export default StatusRangeChart;