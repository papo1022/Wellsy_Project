import "../../../health/styles/Card.css";
import { useNavigate } from "react-router-dom";
function BodyInfo() {

    let navigate = useNavigate();
    const bodyInfo = {
        height: 175.2,
        weight: 72.5,
        bmi: 23.6
    };

    return (
        <div className="health-card body-info-card" onClick={() => navigate("/health/bodyform")}>
            
            <h3>신체 정보</h3>

            <div className="health-card-content">
                <div className="health-card-item">
                    <span>키</span>
                    <strong>{bodyInfo.height}</strong>
                    <small>cm</small>
                </div>

                <div className="health-card-item">
                    <span>몸무게</span>
                    <strong>{bodyInfo.weight}</strong>
                    <small>kg</small>
                </div>

                <div className="health-card-item">
                    <span>BMI</span>
                    <strong>{bodyInfo.bmi}</strong>
                </div>
            </div>
        </div>
    );
}

export default BodyInfo;