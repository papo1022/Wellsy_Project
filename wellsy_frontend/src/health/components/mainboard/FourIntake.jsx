import { useNavigate } from "react-router-dom";
import "../../../health/styles/Card.css";

function FourIntake() {
  const navigate = useNavigate();

  const todayHealth = {
    meal: 2819,
    caffeine: 250,
    alcohol: 11,
    smoking: 3,
  };

  return (
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
          onClick={() => navigate("/health/three")}
        >
          <span>카페인</span>

          <div>
            <strong>{todayHealth.caffeine}</strong>
            <small> mg</small>
          </div>
        </div>

        <div
          className="four-health-card-item"
          onClick={() => navigate("/health/three")}
        >
          <span>알코올</span>

          <div>
            <strong>{todayHealth.alcohol}</strong>
            <small> g</small>
          </div>
        </div>

        <div
          className="four-health-card-item"
          onClick={() => navigate("/health/three")}
        >
          <span>담배</span>

          <div>
            <strong>{todayHealth.smoking}</strong>
            <small> 개비</small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FourIntake;