import "../../../health/styles/Card.css";
function HealthGrade({ grade }) {
    console.log("grade:", grade);
 
    const gradeText = {
        normal: "정상",
        interest: "관심",
        caution: "주의",
        warning: "경고",
        danger: "위험"
    };

    return (
        <div className="health-main-card health-grade-card">
            <div className="health-grade-info">
                <span>현재 건강 등급</span><br/>
                <strong>{gradeText[grade] ?? "-"}</strong>
            </div>

            <hr />
            <div className="description">
                <p>건강 등급은 혈압, 혈당, 수면, 체중 등 다양한 건강 지표를 종합하여 산출됩니다.</p>
                <p>정기적인 건강 검진과 생활 습관 개선을 통해 건강 등급을 향상시킬 수 있습니다.</p>
            </div>  
        </div>
    );
}

export default HealthGrade;