import "../../../health/styles/Card.css";

function BloodPressure( {systolicBp, diastolicBp }) {

    return (
        <div className="health-main-card blood-pressure-card">
            <h3>혈압</h3>

            <div className="health-card-content">
                <div className="health-card-item">
                    <span>최저</span>
                    <strong>{diastolicBp ?? "-"}</strong>
                </div>

                <div className="health-card-item">
                    <span>최고</span>
                    <strong>{systolicBp ?? "-"}</strong>
                </div>
            </div>
        </div>
    );
}

export default BloodPressure;