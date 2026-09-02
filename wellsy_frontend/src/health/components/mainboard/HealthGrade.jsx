import "../../../health/styles/Card.css";

function HealthGrade() {
    const healthGrade = {
        grade: "정상 B",
        date: "2026-08-26"
    };

    return (
        <div className="health-main-card health-grade-card">
            <div className="health-grade-info">
                <span>현재 건강 등급</span>
                <strong>{healthGrade.grade}</strong>
            </div>

            <div className="description">
                <p>건강 등급은 혈압, 혈당, 수면, 체중 등 다양한 건강 지표를 종합하여 산출됩니다.</p>
                <p>정기적인 건강 검진과 생활 습관 개선을 통해 건강 등급을 향상시킬 수 있습니다.</p>
            </div>  
        </div>
    );
}

export default HealthGrade;