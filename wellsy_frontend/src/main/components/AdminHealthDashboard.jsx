import {
  useEffect,
  useState
} from "react";

import axios from "axios";

import "../styles/AdminHealthDashboard.css";



const API_URL =
  "http://localhost:8006/wellsy/api/admin/health";


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


  const searchEmployees =
    async () => {

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
                  name || undefined
              }
            }
          );

        setEmployees(response.data);

      } catch (error) {

        console.error(
          "직원 건강정보 조회 실패",
          error
        );

      }

    };


  useEffect(() => {

    searchEmployees();

  }, []);


  return (
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
        />


        <button
          onClick={searchEmployees}
        >
          조회
        </button>

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
                    onClick={() =>
                      setSelectedEmployee(
                        employee
                      )
                    }
                  >
                    건강정보
                  </button>

                </td>

              </tr>

            )
          )}

        </tbody>

      </table>


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
                부서 :
                {" "}
                {selectedEmployee.departmentName ?? "-"}
              </p>

              <p>
                직급 :
                {" "}
                {selectedEmployee.jobName ?? "-"}
              </p>

              <hr />


              <p>
                키 :
                {" "}
                {selectedEmployee.height ?? "-"} cm
              </p>

              <p>
                체중 :
                {" "}
                {selectedEmployee.weight ?? "-"} kg
              </p>

              <p>
                BMI :
                {" "}
                {selectedEmployee.bmi ?? "-"}
              </p>

              <p>
                혈압 :
                {" "}
                {selectedEmployee.systolicBp ?? "-"}
                /
                {selectedEmployee.diastolicBp ?? "-"}
                {" "}
                mmHg
              </p>

              <p>
                혈당 :
                {" "}
                {selectedEmployee.bloodSugar ?? "-"}
                {" "}
                mg/dL
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
  );
}


export default AdminHealthDashboard;