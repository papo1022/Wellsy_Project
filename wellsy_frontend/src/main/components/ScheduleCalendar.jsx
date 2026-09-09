import {
  useEffect,
  useState
} from "react";

import axios from "axios";

import FullCalendar
  from "@fullcalendar/react";

import dayGridPlugin
  from "@fullcalendar/daygrid";

import timeGridPlugin
  from "@fullcalendar/timegrid";

import interactionPlugin
  from "@fullcalendar/interaction";

import "../styles/ScheduleCalendar.css";


const API_URL =
  "/wellsy/api/schedules";


// 로그인 연동 전 임시 사원번호
const EMPLOYEE_NO = 1;

function ScheduleCalendar() {

  const [events, setEvents] =
    useState([]);

  const [modalOpen, setModalOpen] =
    useState(false);


  const [form, setForm] =
    useState({

      scheduleId: null,

      title: "",

      content: "",

      startDate: "",

      endDate: ""

    });


  // ======================================
  // 일정 전체 조회
  // ======================================

  const selectScheduleList =
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


        const calendarEvents =
          response.data.map(
            (schedule) => ({

              id:
                String(
                  schedule.scheduleId
                ),

              title:
                schedule.title,

              start:
                schedule.startDate,

              end:
                schedule.endDate,

              extendedProps: {

                content:
                  schedule.content

              }

            })
          );


        setEvents(
          calendarEvents
        );

      } catch (error) {

        console.error(
          "일정 조회 실패",
          error
        );

      }

    };


  useEffect(() => {

    selectScheduleList();

  }, []);


  // ======================================
  // 날짜 클릭
  // ======================================

  const handleDateClick =
    (info) => {

      setForm({

        scheduleId: null,

        title: "",

        content: "",

        startDate:
          `${info.dateStr}T09:00`,

        endDate:
          `${info.dateStr}T10:00`

      });


      setModalOpen(true);

    };


  // ======================================
  // 일정 클릭
  // ======================================

  const handleEventClick =
    (info) => {

      const event =
        info.event;


      setForm({

        scheduleId:
          Number(event.id),

        title:
          event.title,

        content:
          event.extendedProps
            .content || "",

        startDate:
          formatDateTime(
            event.start
          ),

        endDate:
          formatDateTime(
            event.end
          )

        

      });


      setModalOpen(true);

    };

    // ======================================
// 일정 마우스 오버
// 제목 + 시작시간 ~ 종료시간 표시
// ======================================

const handleEventDidMount = (info) => {

  const event =
    info.event;


  const title =
    event.title || "일정";


  const startTime =
    formatTime(
      event.start
    );


  const endTime =
    formatTime(
      event.end
    );


  let tooltipText = title;


  if (
    startTime &&
    endTime
  ) {

    tooltipText =
      `${title}\n${startTime} ~ ${endTime}`;

  } else if (
    startTime
  ) {

    tooltipText =
      `${title}\n${startTime}`;

  }


  info.el.setAttribute(
    "title",
    tooltipText
  );

};


  // ======================================
  // input 변경
  // ======================================

  const handleChange =
    (e) => {

      const {
        name,
        value
      } = e.target;


      setForm(
        (prev) => ({

          ...prev,

          [name]:
            value

        })
      );

    };


  // ======================================
  // 일정 추가 버튼
  // ======================================

  const openInsertModal =
    () => {

      const today =
        getToday();


      setForm({

        scheduleId: null,

        title: "",

        content: "",

        startDate:
          `${today}T09:00`,

        endDate:
          `${today}T10:00`

      });


      setModalOpen(true);

    };


  // ======================================
  // 일정 등록 / 수정
  // ======================================

  const saveSchedule =
    async () => {

      if (
        !form.title.trim()
      ) {

        alert(
          "일정 제목을 입력해주세요."
        );

        return;

      }


      if (
        !form.startDate ||
        !form.endDate
      ) {

        alert(
          "시작 시간과 종료 시간을 입력해주세요."
        );

        return;

      }


      if (
        new Date(
          form.startDate
        ) >=
        new Date(
          form.endDate
        )
      ) {

        alert(
          "종료 시간은 시작 시간보다 늦어야 합니다."
        );

        return;

      }


      const schedule = {
        employeeNo: EMPLOYEE_NO,
        title: form.title,
        content: form.content,
        startDate: form.startDate,
        endDate: form.endDate
      };

      try {

        // 수정
        if (
          form.scheduleId
        ) {

          await axios.put(

            `${API_URL}/${form.scheduleId}`,

            schedule

          );

          alert(
            "일정이 수정되었습니다."
          );

        }

        // 등록
        else {

          await axios.post(
            API_URL,
            schedule
          );

          alert(
            "일정이 등록되었습니다."
          );

        }


        setModalOpen(false);


        await selectScheduleList();


      } catch (error) {

        console.error(
          "일정 저장 실패",
          error
        );


        alert(
          "일정 저장에 실패했습니다."
        );

      }

    };


  // ======================================
  // 일정 삭제
  // ======================================

  const deleteSchedule =
    async () => {

      if (
        !form.scheduleId
      ) {

        return;

      }


      const result =
        window.confirm(
          "일정을 삭제하시겠습니까?"
        );


      if (!result) {

        return;

      }


      try {

        await axios.delete(

          `${API_URL}/${form.scheduleId}`

        );


        alert(
          "일정이 삭제되었습니다."
        );


        setModalOpen(false);


        await selectScheduleList();


      } catch (error) {

        console.error(
          "일정 삭제 실패",
          error
        );


        alert(
          "일정 삭제에 실패했습니다."
        );

      }

    };


  return (

    <div
      className="schedule-page"
    >


      <div
        className="schedule-container"
      >


        <div
          className="schedule-header"
        >


          <div>

            <h2>
              개인 일정
            </h2>

            <p>
              개인 일정을 등록하고
              관리할 수 있습니다.
            </p>

          </div>


        </div>

        <button
            className="schedule-add-btn"
            onClick={
              openInsertModal
            }
          >

            + 일정 등록

          </button>


    <FullCalendar

  plugins={[
    dayGridPlugin,
    timeGridPlugin,
    interactionPlugin
  ]}

  initialView="dayGridMonth"

  locale="ko"

  events={events}

  selectable={true}

  dateClick={handleDateClick}

  eventClick={handleEventClick}

  eventDidMount={handleEventDidMount}

  displayEventTime={false}

  height="auto"

  headerToolbar={{
    left: "prev,next today",
    center: "title",
    right: ""
  }}

/>


      </div>


      {
        modalOpen &&
        (

          <div
            className=
              "schedule-modal-background"

            onMouseDown={
              (e) => {

                if (
                  e.target ===
                  e.currentTarget
                ) {

                  setModalOpen(
                    false
                  );

                }

              }
            }
          >


            <div
              className=
                "schedule-modal"
            >


              <div
                className=
                  "schedule-modal-header"
              >


                <h3>

                  {
                    form.scheduleId
                      ? "일정 수정"
                      : "일정 등록"
                  }

                </h3>


                <button
                  className=
                    "schedule-close-btn"

                  onClick={
                    () =>
                      setModalOpen(
                        false
                      )
                  }
                >

                  ×

                </button>


              </div>


              <div
                className=
                  "schedule-form-group"
              >

                <label>
                  제목
                </label>

                <input

                  type="text"

                  name="title"

                  value={
                    form.title
                  }

                  onChange={
                    handleChange
                  }

                  placeholder=
                    "일정 제목을 입력하세요"

                />

              </div>


              <div
                className=
                  "schedule-form-group"
              >

                <label>
                  내용
                </label>

                <textarea

                  name="content"

                  value={
                    form.content
                  }

                  onChange={
                    handleChange
                  }

                  placeholder=
                    "일정 내용을 입력하세요"

                />

              </div>


              <div
                className=
                  "schedule-form-group"
              >

                <label>
                  시작 시간
                </label>

                <input

                  type=
                    "datetime-local"

                  name=
                    "startDate"

                  value={
                    form.startDate
                  }

                  onChange={
                    handleChange
                  }

                />

              </div>


              <div
                className=
                  "schedule-form-group"
              >

                <label>
                  종료 시간
                </label>

                <input

                  type=
                    "datetime-local"

                  name=
                    "endDate"

                  value={
                    form.endDate
                  }

                  onChange={
                    handleChange
                  }

                />

              </div>


              <div
                className=
                  "schedule-modal-buttons"
              >


                {
                  form.scheduleId &&
                  (

                    <button
                      className=
                        "schedule-delete-btn"

                      onClick={
                        deleteSchedule
                      }
                    >

                      삭제

                    </button>

                  )
                }


                <div
                  className=
                    "schedule-right-buttons"
                >


                  <button
                    className=
                      "schedule-cancel-btn"

                    onClick={
                      () =>
                        setModalOpen(
                          false
                        )
                    }
                  >

                    취소

                  </button>


                  <button
                    className=
                      "schedule-save-btn"

                    onClick={
                      saveSchedule
                    }
                  >

                    {
                      form.scheduleId
                        ? "수정"
                        : "등록"
                    }

                  </button>


                </div>


              </div>


            </div>


          </div>

        )
      }


    </div>

  );

}


// datetime-local 형식 변환
// ======================================
// 툴팁 시간 표시용
// ======================================

function formatTime(date) {

  if (!date) {

    return "";

  }


  const hour =
    String(
      date.getHours()
    ).padStart(
      2,
      "0"
    );


  const minute =
    String(
      date.getMinutes()
    ).padStart(
      2,
      "0"
    );


  return `${hour}:${minute}`;

}


// datetime-local 형식 변환
function formatDateTime(date) {

  if (!date) {

    return "";

  }


  const year =
    date.getFullYear();


  const month =
    String(
      date.getMonth() + 1
    ).padStart(
      2,
      "0"
    );


  const day =
    String(
      date.getDate()
    ).padStart(
      2,
      "0"
    );


  const hour =
    String(
      date.getHours()
    ).padStart(
      2,
      "0"
    );


  const minute =
    String(
      date.getMinutes()
    ).padStart(
      2,
      "0"
    );


  return (
    `${year}-${month}-${day}` +
    `T${hour}:${minute}`
  );

}


// 오늘 날짜
function getToday() {

  const date =
    new Date();


  const year =
    date.getFullYear();


  const month =
    String(
      date.getMonth() + 1
    ).padStart(
      2,
      "0"
    );


  const day =
    String(
      date.getDate()
    ).padStart(
      2,
      "0"
    );


  return (
    `${year}-${month}-${day}`
  );

}


export default ScheduleCalendar;