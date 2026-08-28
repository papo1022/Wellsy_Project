import "../../../health/styles/Card.css";

function BloodPressure() {
    const bloodPressure = {
        diastolic: "120 / 80",
        systolic: "130 / 85",
    };

    return (
        <div className="health-card blood-pressure-card">
            <h3>혈압</h3>

            <div className="health-card-content">
                <span>최저</span>
                <strong>{bloodPressure.diastolic}</strong>
            </div>

            <div className="health-card-content">
                <span>최고</span>
                <strong>{bloodPressure.systolic}</strong>
            </div>
        </div>
    );
}

export default BloodPressure;