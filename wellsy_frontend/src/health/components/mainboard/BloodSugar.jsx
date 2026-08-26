import "../../../health/styles/Card.css";

function BloodSugar() {

    const bloodSugar = {
        beforeMeal: 90,
        afterMeal: 135,
    };

    return (
        <div className="health-card blood-sugar-card">
            <h3>혈당</h3>

            <div className="health-card-content">
                <div className="health-card-item">
                    <span>식전</span>
                    <strong>{bloodSugar.beforeMeal}</strong>
                    <small>mg/dL</small>
                </div>

                <div className="health-card-item">
                    <span>식후</span>
                    <strong>{bloodSugar.afterMeal}</strong>
                    <small>mg/dL</small>
                </div>
            </div>
        </div>
    );
}

export default BloodSugar;