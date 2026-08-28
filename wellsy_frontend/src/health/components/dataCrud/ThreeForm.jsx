import "../../../health/styles/Card.css";
import "../../styles/CrudForm.css";
import { useState } from "react";

function ThreeForm({ onClose }) {

    const [coffee, setCoffee] = useState("");
    const [coffeeUnit, setCoffeeUnit] = useState("glass");

    const [beer, setBeer] = useState("");
    const [beerUnit, setBeerUnit] = useState("glass");

    const [soju, setSoju] = useState("");
    const [sojuUnit, setSojuUnit] = useState("glass");

    const [etcPercent, setEtcPercent] = useState("");
    const [etc, setEtc] = useState("");

    const [smoking, setSmoking] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            coffee: Number(coffee),

            beer: Number(beer),
            beerUnit,

            soju: Number(soju),
            sojuUnit,

            etcAlcoholPercent: Number(etcPercent),
            etcAmount: Number(etc),

            smoking: Number(smoking)
        });

        alert("음주/흡연/카페인 정보가 저장되었습니다.");
        onClose();

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
                2026년 8월 26일
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
                        max={5000}
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
                        max={5000}
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
                        max={100}
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