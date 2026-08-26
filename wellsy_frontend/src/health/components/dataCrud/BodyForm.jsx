function BodyForm() {

    return (
        <div>
            <h2>신체 정보 기록</h2>

            <p>오늘 날짜</p>

            <div>
                <label>키</label>
                <input type="number" />
                <span>cm</span>
            </div>

            <div>
                <label>몸무게</label>
                <input type="number" />
                <span>kg</span>
            </div>

            <button type="button" className="btn btn-primary">
                저장
            </button>
        </div>
    );
}

export default BodyForm;