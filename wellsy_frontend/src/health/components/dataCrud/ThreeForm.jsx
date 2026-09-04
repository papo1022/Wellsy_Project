import { useState } from "react";
import "../../../health/styles/Card.css";
import "../../styles/CrudForm.css";

function ThreeForm({ onClose, onHealthUpdate }) {

    const [coffee, setCoffee] = useState("");
    const [coffeeUnit, setCoffeeUnit] = useState("glass");

    const [beer, setBeer] = useState("");
    const [beerUnit, setBeerUnit] = useState("glass");

    const [soju, setSoju] = useState("");
    const [sojuUnit, setSojuUnit] = useState("glass");

    const [etcPercent, setEtcPercent] = useState("");
    const [etc, setEtc] = useState("");

    const [smoking, setSmoking] = useState("");

    const todayText = new Date().toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });


    const handleSubmit = (e) => {
        e.preventDefault();

        const COFFEE_ML_PER_GLASS = 250;
        const COFFINE_PER_ML = 0.12;

        const BEER_PERCENT = 0.05;
        const SOJU_PERCENT = 0.16;

        const today = new Date().toISOString().split("T")[0];

        let caffineAmount = 0;
        if (coffee !== "") {
            caffineAmount = coffeeUnit === "glass" ? Number(coffee) * COFFEE_ML_PER_GLASS * COFFINE_PER_ML : Number(coffee);
        }

        let alcoholAmount = 0;
        if (beer !== "") {
            alcoholAmount += beerUnit === "glass" ? Number(beer) * 500 * BEER_PERCENT : Number(beer) * BEER_PERCENT;
        }
        if (soju !== "") {
            alcoholAmount += sojuUnit === "glass" ? Number(soju) * 50 * SOJU_PERCENT : Number(soju) * SOJU_PERCENT;
        }

        if (etc !== "") {
            alcoholAmount += Number(etc) * (etcPercent / 100);
        }



        const healthData = {
            employeeNo: 1,
            recordDate: today,
            caffineAmount,
            alcoholAmount,
            smoking: smoking === "" ? 0 : Number(smoking)
        };

        fetch("http://localhost:8006/wellsy/health", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(healthData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("음주/흡연/카페인 정보 저장 실패");
                }

                return response.json();
            })
            .then(data => {
                console.log("저장 결과:", data);

                onHealthUpdate();

                alert("음주/흡연/카페인 정보가 저장되었습니다.");
                onClose();
            })
            .catch(error => {
                console.error(error);
                alert("음주/흡연/카페인 입력 값이 올바르지 않거나 서버 저장에 실패했습니다.");
            });

    };

    const changeCoffeeUnit = (unit) => {
        setCoffeeUnit(unit);
        setCoffee("");
    };

    const changeBeerUnit = (unit) => {
        setBeerUnit(unit);
        setBeer("");
    };

    const changeSojuUnit = (unit) => {
        setSojuUnit(unit);
        setSoju("");
    };

    return (
        <div className="crud-card">

            <h2>음주/흡연/카페인 기록</h2>

            <div className="crud-card-date">
                {todayText}
            </div>

            <div className="alert alert-warning" role="alert">
                입력하지 않은 기존 값은 전부 0으로 덮어 씌워집니다.
            </div>  

            <div className="crud-card-input">
                <label>커피</label>

                <span>
                    잔 단위 또는 카페인 함량(mg)으로 입력해주세요.
                </span>

                <div className="crud-card-input-value">
                    <input
                        type="number"
                        value={coffee}
                        min={0}
                        max={coffeeUnit === "glass" ? 100 : 10000}
                        step={coffeeUnit === "glass" ? 0.5 : 1}
                        placeholder="0"
                        onChange={(e) => setCoffee(e.target.value)}
                    />

                    <div className="unit-toggle">
                        <button
                            type="button"
                            className={coffeeUnit === "glass" ? "active" : ""}
                            onClick={() => changeCoffeeUnit("glass")}
                        >
                            잔
                        </button>

                        <button
                            type="button"
                            className={coffeeUnit === "mg" ? "active" : ""}
                            onClick={() => changeCoffeeUnit("mg")}
                        >
                            mg
                        </button>
                    </div>
                </div>
            </div>

            <div className="crud-card-input">
                <label>맥주</label>
                <span>1잔 = 500ml 기준</span>
                <div className="crud-card-input-value">
                    <input
                        type="number"
                        value={beer}
                        min={0}
                        max={beerUnit === "glass" ? 100 : 10000}
                        step={1}
                        placeholder={0}
                        onChange={(e) => setBeer(e.target.value)}
                    />
                    <div className="unit-toggle">
                        <button
                            type="button"
                            className={beerUnit === "glass" ? "active" : ""}
                            onClick={() => changeBeerUnit("glass")}> 잔
                        </button>
                        <button
                            type="button"
                            className={beerUnit === "ml" ? "active" : ""}
                            onClick={() => changeBeerUnit("ml")}> ml
                        </button>
                    </div>
                </div>
            </div>


            <div className="crud-card-input">
                <label>소주</label>
                <span>1잔 = 50ml 기준</span>
                <div className="crud-card-input-value">
                    <input
                        type="number"
                        value={soju}
                        min={0}
                        max={sojuUnit === "glass" ? 100 : 10000}
                        step={1}
                        placeholder={0}
                        onChange={(e) => setSoju(e.target.value)}
                    />
                    <div className="unit-toggle">
                        <button
                            type="button"
                            className={sojuUnit === "glass" ? "active" : ""}
                            onClick={() => changeSojuUnit("glass")}> 잔
                        </button>
                        <button
                            type="button"
                            className={sojuUnit === "ml" ? "active" : ""}
                            onClick={() => changeSojuUnit("ml")}> ml
                        </button>
                    </div>
                </div>
            </div>


            <div className="crud-card-input">
                <label>기타 주류</label>
                <span>본인이 섭취한 주류의 알코올 도수와 양을 입력해주세요.</span>
                <div className="crud-card-input-value">
                    <input
                        type="number"
                        style={{ width: "40px" }}
                        value={etcPercent}
                        min={0}
                        max={100}
                        step={1}
                        placeholder={"0%"}
                        onChange={(e) => setEtcPercent(e.target.value)}
                    />
                    <input
                        type="number"
                        style={{ width: "40px" }}
                        value={etc}
                        min={0}
                        max={5000}
                        step={1}
                        placeholder={0}
                        onChange={(e) => setEtc(e.target.value)}
                    />
                    <span>ml</span>
                </div>

            </div>


            <div className="crud-card-input">
                <label>흡연</label>
                <div className="crud-card-input-value">
                    <input
                        type="number"
                        value={smoking}
                        min={0}
                        max={200}
                        step={1}
                        placeholder={0}
                        onChange={(e) => setSmoking(e.target.value)}
                    />
                    <span>개비</span>
                </div>
            </div>

            <div className="crud-card-buttons">
                <button type="button" className="btn btn-secondary" onClick={onClose}>취소</button>&nbsp;&nbsp;
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>저장</button>
            </div>

        </div >
    );
}

export default ThreeForm;