import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../health/styles/Card.css";
import ThreeForm from "../dataCrud/ThreeForm";

function FourIntake({ meal, caffeine, alcohol, smoking, onHealthUpdate }) {
  const navigate = useNavigate();

  const [isThreeOpen, setIsThreeOpen] = useState(false);

  return (
    <>
      <div className="health-main-card four-health-card">
        <h3>오늘의 건강 기록</h3>

        <div className="four-health-card-content">

          <div
            className="four-health-card-item"
            onClick={() => navigate("/health/meal")}
          >
            <span>식사</span>

            <div className="four-health-card-value">
              <strong>{meal ?? "-"}</strong>
              <small> kcal</small>
            </div>
          </div>

          <div
            className="four-health-card-item"
            onClick={() => setIsThreeOpen(true)}
          >
            <span>카페인</span>

            <div className="four-health-card-value">
              <strong>{caffeine ?? "-"}</strong>
              <small> mg</small>
            </div>
          </div>

          <div
            className="four-health-card-item"
            onClick={() => setIsThreeOpen(true)}
          >
            <span>알코올</span>

            <div className="four-health-card-value">
              <strong>{alcohol ?? "-"}</strong>
              <small> g</small>
            </div>
          </div>

          <div
            className="four-health-card-item"
            onClick={() => setIsThreeOpen(true)}
          >
            <span>담배</span>

            <div className="four-health-card-value">
              <strong>{smoking ?? "-"}</strong>
              <small> 개비</small>
            </div>
          </div>

        </div>
      </div>

      {isThreeOpen && (
        <div className="health-modal-background">
          <div className="health-modal-content">
            <ThreeForm onClose={() => setIsThreeOpen(false)} onHealthUpdate={onHealthUpdate} />
          </div>
        </div>
      )}
    </>
  );
}

export default FourIntake;