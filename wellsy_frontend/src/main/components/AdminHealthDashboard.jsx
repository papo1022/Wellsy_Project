import {
  useEffect,
  useState
} from "react";

import axios from "axios";

import CheckupReservationDashboard
  from "./CheckupReservationDashboard";

import "../styles/AdminHealthDashboard.css";


const API_URL =
  "/wellsy/api/admin/health";

const PAGE_SIZE = 10;


function AdminHealthDashboard() {

  const [employees, setEmployees] =
    useState([]);

  const [departmentId, setDepartmentId] =
    useState("");

  const [jobId, setJobId] =
    useState("");

  const [name, setName] =
    useState("");

  const [selectedEmployee, setSelectedEmployee] =
    useState(null);

  const [page, setPage] =
    useState(0);

  const [totalPages, setTotalPages] =
    useState(0);

  const [totalElements, setTotalElements] =
    useState(0);


  const searchEmployees =
    async (targetPage = 0) => {

      try {

        const response =
          await axios.get(
            API_URL,
            {
              params: {
                departmentId:
                  departmentId || undefined,

                jobId:
                  jobId || undefined,

                name:
                  name || undefined,

                page: targetPage,

                size: PAGE_SIZE
              }
            }
          );

        setEmployees(
          response.data.content ?? []
        );

        setPage(
          response.data.number ?? targetPage
        );

        setTotalPages(
          response.data.totalPages ?? 0
        );

        setTotalElements(
          response.data.totalElements ?? 0
        );

      } catch (error) {

        console.error(
          "직원 건강정보 조회 실패",
          error
        );

        setEmployees([]);
        setTotalPages(0);
        setTotalElements(0);

      }

    };


  const handleSearch = () => {

    setSelectedEmployee(null);
    searchEmployees(0);

  };


  const movePage = (nextPage) => {

    if (
      nextPage < 0 ||
      nextPage >= totalPages ||
      nextPage === page
    ) {
      return;
    }

    searchEmployees(nextPage);

  };


  useEffect(() => {

    searchEmployees(0);

  }, []);


  return (
    <div className="admin-dashboard-grid">

      <section className="admin-dashboard-panel">

        <div className="admin-health-dashboard">

          <h2>
            직원 건강정보 조회
          </h2>


          <div className="admin-health-search">

            <select
              value={departmentId}
              onChange={(e) =>
                setDepartmentId(e.target.value)
              }
            >

              <option value="">
                전체 부서
              </option>

              <option value="1">
                개발부
              </option>

              <option value="2">
                인사부
              </option>

              <option value="3">
                영업부
              </option>

            </select>


            <select
              value={jobId}
              onChange={(e) =>
                setJobId(e.target.value)
              }
            >

              <option value="">
                전체 직급
              </option>

              <option value="1">
                사원
              </option>

              <option value="2">
                대리
              </option>

              <option value="3">
                과장
              </option>

            </select>


            <input
              type="text"
              value={name}
              placeholder="직원 이름"
              onChange={(e) =>
                setName(e.target.value)
              }
              onKeyDown={(e) => {

                if (e.key === "Enter") {
                  handleSearch();
                }

              }}
            />


            <button
              onClick={handleSearch}
            >
              조회
            </button>

          </div>


          <div className="admin-health-count">
            전체 {totalElements}명
          </div>


          <table className="admin-health-table">

            <tbody>

              {employees.map(
                (employee) => (

                  <tr
                    key={employee.employeeNo}
                  >

                    <td>
                      {employee.employeeNo}
                    </td>

                    <td>
                      {employee.name}
                    </td>

                    <td>
                      {employee.departmentName ?? "-"}
                    </td>

                    <td>
                      {employee.jobName ?? "-"}
                    </td>

                    <td>
                      {employee.recordDate ?? "-"}
                    </td>

                    <td>

                      <button
                        className="health-detail-btn"
                        onClick={() =>
                          setSelectedEmployee(employee)
                        }
                      >
                        건강정보
                      </button>

                    </td>

                  </tr>

                )
              )}

              {employees.length === 0 && (

                <tr>
                  <td colSpan="6">
                    조회된 직원이 없습니다.
                  </td>
                </tr>

              )}

            </tbody>

          </table>


          {totalPages > 0 && (

            <div className="admin-health-pagination">

              <button
                type="button"
                disabled={page === 0}
                onClick={() => movePage(page - 1)}
              >
                &lt;
              </button>


              {Array.from(
                { length: totalPages },
                (_, index) => (

                  <button
                    type="button"
                    key={index}
                    className={
                      page === index ? "active" : ""
                    }
                    onClick={() => movePage(index)}
                  >
                    {index + 1}
                  </button>

                )
              )}


              <button
                type="button"
                disabled={page === totalPages - 1}
                onClick={() => movePage(page + 1)}
              >
                &gt;
              </button>

            </div>

          )}


          {
            selectedEmployee &&
            (

              <div
                className="admin-health-modal-background"
                onMouseDown={(e) => {

                  if (
                    e.target ===
                    e.currentTarget
                  ) {

                    setSelectedEmployee(null);

                  }

                }}
              >

                <div className="admin-health-modal">

                  <h3>
                    {selectedEmployee.name}
                    님 건강정보
                  </h3>


                  <p>
                    부서 :{" "}
                    {selectedEmployee.departmentName ?? "-"}
                  </p>

                  <p>
                    직급 :{" "}
                    {selectedEmployee.jobName ?? "-"}
                  </p>

                  <hr />


                  <p>
                    키 :{" "}
                    {selectedEmployee.height ?? "-"} cm
                  </p>

                  <p>
                    체중 :{" "}
                    {selectedEmployee.weight ?? "-"} kg
                  </p>

                  <p>
                    BMI :{" "}
                    {selectedEmployee.bmi ?? "-"}
                  </p>

                  <p>
                    혈압 :{" "}
                    {selectedEmployee.systolicBp ?? "-"}
                    /
                    {selectedEmployee.diastolicBp ?? "-"}
                    {" "}mmHg
                  </p>

                  <p>
                    혈당 :{" "}
                    {selectedEmployee.bloodSugar ?? "-"}
                    {" "}mg/dL
                  </p>


                  <button
                    onClick={() =>
                      setSelectedEmployee(null)
                    }
                  >
                    닫기
                  </button>

                </div>

              </div>

            )
          }

        </div>

      </section>


      <section className="admin-dashboard-panel">

        <CheckupReservationDashboard />

      </section>

    </div>
  );
}


export default AdminHealthDashboard;
