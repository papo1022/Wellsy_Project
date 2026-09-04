import "../../../health/styles/Card.css";

function BloodSugar({ bloodSugar }) {

    return (
        <div className="health-main-card blood-sugar-card">
            <h3>혈당</h3>

            <div className="health-card-content">
                <div className="health-card-item">
                    <strong>{bloodSugar ?? "-"}</strong>
                    <small>mg/dL</small>
                </div>
            </div>
        </div>
    );
}

export default BloodSugar;