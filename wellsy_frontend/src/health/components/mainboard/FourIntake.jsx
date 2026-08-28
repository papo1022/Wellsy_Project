import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../health/styles/Card.css";
import ThreeForm from "../dataCrud/ThreeForm";

function FourIntake() {
  const navigate = useNavigate();

  const todayHealth = {
    meal: 2819,
    caffeine: 250,
    alcohol: 11,
    smoking: 3,
  };

  const [isThreeOpen, setIsThreeOpen] = useState(false);

  return (
    <>
      <div className="health-card four-health-card">
        <h3>오늘의 건강 기록</h3>

        <div className="four-health-card-content">

          <div
            className="four-health-card-item"
            onClick={() => navigate("/health/meal")}
          >
            <span>식사</span>

            <div>
              <strong>{todayHealth.meal}</strong>
              <small> kcal</small>
            </div>
          </div>

          <div
            className="four-health-card-item"
            onClick={() => setIsThreeOpen(true)}
          >
            <span>카페인</span>

            <div>
              <strong>{todayHealth.caffeine}</strong>
              <small> mg</small>
            </div>
          </div>

          <div
            className="four-health-card-item"
            onClick={() => setIsThreeOpen(true)}
          >
            <span>알코올</span>

            <div>
              <strong>{todayHealth.alcohol}</strong>
              <small> g</small>
            </div>
          </div>

          <div
            className="four-health-card-item"
            onClick={() => setIsThreeOpen(true)}
          >
            <span>담배</span>

            <div>
              <strong>{todayHealth.smoking}</strong>
              <small> 개비</small>
            </div>
          </div>

        </div>
      </div>

      {isThreeOpen && (
        <div className="health-modal-background">
          <div className="health-modal-content">
            <ThreeForm onClose={() => setIsThreeOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}

export default FourIntake;