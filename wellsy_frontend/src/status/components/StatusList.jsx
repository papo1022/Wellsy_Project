import {
    useEffect,
    useRef,
    useState
} from "react";

import {
    selectStatusListApi,
    selectWarningEmployeeListApi
} from "../api/statusApi";

import StatusRangeChart
    from "./StatusRangeChart";

import {
    downloadStatusPdf,
    downloadStatusPng
} from "../utils/statusReportDownload";

import "../styles/Status.css";


function StatusList() {


    // ===========================================
    // PDF / PNG 다운로드 영역
    // ===========================================
    const reportRef
        = useRef(null);



    // ===========================================
    // 오늘 날짜 YYYY-MM-DD
    // ===========================================
    const getToday = () => {


        const today
            = new Date();


        today.setMinutes(
            today.getMinutes()
            -
            today.getTimezoneOffset()
        );


        return today
            .toISOString()
            .substring(0, 10);
    };



    // ===========================================
    // 한달 전 날짜
    // ===========================================
    const getOneMonthAgo = () => {


        const date
            = new Date();


        date.setMonth(
            date.getMonth() - 1
        );


        date.setMinutes(
            date.getMinutes()
            -
            date.getTimezoneOffset()
        );


        return date
            .toISOString()
            .substring(0, 10);
    };



    // ===========================================
    // 조회 조건
    // ===========================================
    const [filter, setFilter]
        = useState({

            departmentId : "",

            startDate :
                getOneMonthAgo(),

            endDate :
                getToday()

        });



    // ===========================================
    // 부서별 통계
    // ===========================================
    const [statusList, setStatusList]
        = useState([]);



    // ===========================================
    // 주의 직원 목록
    //
    // 지금 화면에서는 사용하지 않지만
    // 기존 API 호출은 유지
    // ===========================================
    const [, setWarningList]
        = useState([]);



    // ===========================================
    // 다운로드 중 상태
    // ===========================================
    const [downloading, setDownloading]
        = useState(false);



    // ===========================================
    // 입력값 변경
    // ===========================================
    const handleChange = e => {


        setFilter({

            ...filter,

            [e.target.name] :
                e.target.value

        });
    };



    // ===========================================
    // API로 전달할 조회 조건 생성
    // ===========================================
    const makeParams = () => {


        const params = {

            startDate :
                filter.startDate,

            endDate :
                filter.endDate

        };


        // 부서를 선택했을 경우에만 전달
        if(
            filter.departmentId !== ""
        ) {

            params.departmentId
                = Number(
                    filter.departmentId
                );
        }


        return params;
    };



    // ===========================================
    // 건강 통계 조회
    // ===========================================
    const selectStatusList = async () => {


        try {


            const response
                = await selectStatusListApi(
                    makeParams()
                );


            setStatusList(
                response.data
            );


        } catch(error) {


            console.log(
                "건강 통계 조회용 ajax 통신 실패!"
            );


            console.log(error);
        }
    };



    // ===========================================
    // 주의 직원 조회
    // ===========================================
    const selectWarningEmployeeList
        = async () => {


            try {


                const response
                    = await selectWarningEmployeeListApi(
                        makeParams()
                    );


                setWarningList(
                    response.data
                );


            } catch(error) {


                console.log(
                    "주의 직원 목록 조회용 ajax 통신 실패!"
                );


                console.log(error);
            }
        };



    // ===========================================
    // 조회 버튼
    // ===========================================
    const searchStatus = () => {


        if(
            filter.startDate
            >
            filter.endDate
        ) {

            alert(
                "시작일은 종료일보다 늦을 수 없습니다."
            );

            return;
        }


        selectStatusList();

        selectWarningEmployeeList();
    };



    // ===========================================
    // PDF 다운로드
    // ===========================================
    const downloadPdf = async () => {


        if(!reportRef.current) {

            return;
        }


        try {


            setDownloading(true);


            await downloadStatusPdf(

                reportRef.current,

                "Wellsy_부서별_건강리포트"
            );


        } catch(error) {


            console.log(
                "PDF 다운로드 실패"
            );


            console.log(error);


            alert(
                "PDF 저장에 실패했습니다."
            );


        } finally {


            setDownloading(false);
        }

    };



    // ===========================================
    // PNG 다운로드
    // ===========================================
    const downloadPng = async () => {


        if(!reportRef.current) {

            return;
        }


        try {


            setDownloading(true);


            await downloadStatusPng(

                reportRef.current,

                "Wellsy_부서별_건강리포트"
            );


        } catch(error) {


            console.log(
                "PNG 다운로드 실패"
            );


            console.log(error);


            alert(
                "PNG 저장에 실패했습니다."
            );


        } finally {


            setDownloading(false);
        }

    };



    // ===========================================
    // 최초 화면 로딩
    // ===========================================
    useEffect(() => {


        selectStatusList();

        selectWarningEmployeeList();


    }, []);



    return (

        <div className="status-dashboard">


            {/* ================================= */}
            {/* 다운로드 버튼 */}
            {/* ================================= */}
            {/* PDF / PNG 캡처에는 버튼 제외 */}
            {/* ================================= */}

            <div className="status-report-download">


                <button
                    type="button"

                    className="status-png-download-btn"

                    onClick={
                        downloadPng
                    }

                    disabled={
                        downloading
                    }
                >

                    PNG 다운로드

                </button>


                <button
                    type="button"

                    className="status-pdf-download-btn"

                    onClick={
                        downloadPdf
                    }

                    disabled={
                        downloading
                    }
                >

                    {
                        downloading
                        ?
                        "저장 중..."
                        :
                        "PDF 다운로드"
                    }

                </button>


            </div>



            {/* ================================= */}
            {/* 실제 PDF / PNG 다운로드 영역 */}
            {/* ================================= */}

            <div
                ref={
                    reportRef
                }

                className="status-report-capture"
            >


                {/* ================================= */}
                {/* 페이지 제목 */}
                {/* ================================= */}

                <div className="status-title-area">


                    <h2>
                        부서별 건강 통계
                    </h2>


                    <p>
                        부서별 직원 건강 데이터를 기간에 따라 확인할 수 있습니다.
                    </p>


                </div>



                {/* ================================= */}
                {/* 조회 조건 카드 */}
                {/* ================================= */}

                <div className="status-filter-card">


                    <div className="status-filter-content">


                        {/* 부서 */}

                        <div className="status-filter-item">


                            <span>
                                부서
                            </span>


                            <select
                                name="departmentId"

                                value={
                                    filter.departmentId
                                }

                                onChange={
                                    handleChange
                                }
                            >

                                <option value="">
                                    전체 부서
                                </option>

                                <option value="1">
                                    개발팀
                                </option>

                                <option value="2">
                                    인사팀
                                </option>

                                <option value="3">
                                    기획팀
                                </option>

                            </select>


                        </div>



                        {/* 시작일 */}

                        <div className="status-filter-item">


                            <span>
                                시작일
                            </span>


                            <input
                                type="date"

                                name="startDate"

                                value={
                                    filter.startDate
                                }

                                onChange={
                                    handleChange
                                }
                            />


                        </div>



                        {/* 종료일 */}

                        <div className="status-filter-item">


                            <span>
                                종료일
                            </span>


                            <input
                                type="date"

                                name="endDate"

                                value={
                                    filter.endDate
                                }

                                onChange={
                                    handleChange
                                }
                            />


                        </div>



                        {/* 조회 */}

                        <button
                            type="button"

                            className="status-search-btn"

                            onClick={
                                searchStatus
                            }
                        >
                            조회
                        </button>


                    </div>


                </div>



                {/* ================================= */}
                {/* 부서별 카드 영역 */}
                {/* ================================= */}

                <div className="status-card-area">


                    {
                        statusList.length > 0
                        ?
                        statusList.map(
                            status => {


                                return (

                                    <div
                                        className="status-card"

                                        key={
                                            status.departmentId
                                        }
                                    >


                                        {/* 부서명 */}

                                        <div className="status-card-title">


                                            <h3>

                                                {
                                                    status.departmentName
                                                }

                                            </h3>


                                            <span>

                                                {
                                                    status.employeeCount
                                                }명

                                            </span>


                                        </div>



                                        {/* 카드 내용 */}

                                        <div className="status-card-content">


                                            {/* 평균 운동시간 */}

                                            <div className="status-card-item">


                                                <span>
                                                    평균 운동시간
                                                </span>


                                                <strong>

                                                    {
                                                        status.averageExerciseTime
                                                    }

                                                </strong>


                                                <small>
                                                    분
                                                </small>


                                            </div>



                                            {/* 평균 수면시간 */}

                                            <div className="status-card-item">


                                                <span>
                                                    평균 수면시간
                                                </span>


                                                <strong>

                                                    {
                                                        status.averageSleepTime
                                                    }

                                                </strong>


                                                <small>
                                                    시간
                                                </small>


                                            </div>



                                            {/* 건강 이상 */}

                                            <div className="status-card-item">


                                                <span>
                                                    건강 이상
                                                </span>


                                                <strong>

                                                    {
                                                        status.alertCount
                                                    }

                                                </strong>


                                                <small>
                                                    건
                                                </small>


                                            </div>



                                            {/* 미확인 */}

                                            <div className="status-card-item">


                                                <span>
                                                    미확인
                                                </span>


                                                <strong>

                                                    {
                                                        status.unreadAlertCount
                                                    }

                                                </strong>


                                                <small>
                                                    건
                                                </small>


                                            </div>


                                        </div>


                                    </div>

                                );

                            }
                        )
                        :
                        (

                            <div className="status-empty-card">

                                조회된 건강통계가 없습니다.

                            </div>

                        )
                    }


                </div>



                {/* ================================= */}
                {/* 부서별 상세 테이블 */}
                {/* ================================= */}

                <div className="status-table-card">


                    <h3>
                        부서별 건강 통계 상세
                    </h3>


                    <table className="status-table">


                        <thead>


                            <tr>


                                <th>
                                    부서
                                </th>


                                <th>
                                    직원 수
                                </th>


                                <th>
                                    평균 운동시간
                                </th>


                                <th>
                                    평균 수면시간
                                </th>


                                <th>
                                    건강 이상
                                </th>


                                <th>
                                    미확인
                                </th>


                            </tr>


                        </thead>



                        <tbody>


                            {
                                statusList.length > 0
                                ?
                                statusList.map(
                                    status => {


                                        return (

                                            <tr
                                                key={
                                                    status.departmentId
                                                }
                                            >


                                                <td className="status-department-name">

                                                    {
                                                        status.departmentName
                                                    }

                                                </td>


                                                <td>

                                                    {
                                                        status.employeeCount
                                                    }명

                                                </td>


                                                <td>

                                                    {
                                                        status.averageExerciseTime
                                                    }분

                                                </td>


                                                <td>

                                                    {
                                                        status.averageSleepTime
                                                    }시간

                                                </td>


                                                <td>

                                                    {
                                                        status.alertCount
                                                    }건

                                                </td>


                                                <td>

                                                    {
                                                        status.unreadAlertCount
                                                    }건

                                                </td>


                                            </tr>

                                        );

                                    }
                                )
                                :
                                (

                                    <tr>


                                        <td
                                            colSpan="6"

                                            className="status-table-empty"
                                        >

                                            조회된 데이터가 없습니다.

                                        </td>


                                    </tr>

                                )
                            }


                        </tbody>


                    </table>


                </div>



                {/* ================================= */}
                {/* 권장 운동 / 수면시간 그래프 */}
                {/* ================================= */}

                <StatusRangeChart

                    departmentStats={
                        statusList
                    }

                />


            </div>


        </div>
    );
}


export default StatusList;