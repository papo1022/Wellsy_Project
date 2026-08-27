import { useState } from "react";
import "../../../health/styles/Card.css";
import "../../../health/styles/CrudForm.css";
import BodyForm from "../dataCrud/BodyForm";

function BodyInfo() {

    const bodyInfo = {
        height: 175.2,
        weight: 72.5,
        bmi: 23.6
    };

    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="health-card body-info-card" onClick={() => setIsOpen(true)}>

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

            {isOpen && (
                <div className="health-modal-background">
                    <div className="health-modal-content">
                        <BodyForm onClose={() => setIsOpen(false)} />
                    </div>
                </div>
            )}
        </>
    );
}

export default BodyInfo;