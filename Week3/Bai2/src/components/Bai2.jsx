import { useState } from "react";
import "./Bai2.css";
function Bai2() {
  const [invest, setInvest] = useState(100);
  const [rate, setRate] = useState(10);
  const [goal, setGoal] = useState(150);
  const [investmentData, setInvestmentData] = useState([]);

  const calculateInvestment = () => {
    let data = [];
    let year = 2024;
    let money = invest;

    while (money < goal) {
      let endYear = money * (1 + rate / 100);
      data.push({ year: ++year, money, rate, endYear });
      money = endYear;
    }
    setInvestmentData(data);
  };

  return (
    <div className="container">
      <h1>Investment Calculator</h1>
      <div className="form-group">
        {" "}
        <label>Investment Money:</label>
        <input
          type="number"
          value={invest}
          onChange={(e) => setInvest(Number(e.target.value))}
        />
        <br />
      </div>

      <div className="form-group">
        <label>Rate (%):</label>
        <input
          type="number"
          value={rate}
          onChange={(e) => setRate(Number(e.target.value))}
        />
        <br />
      </div>
      <div className="form-group">
        <label>Goal:</label>
        <input
          type="number"
          value={goal}
          onChange={(e) => setGoal(Number(e.target.value))}
        />
        <br />
      </div>

      <button onClick={calculateInvestment}>Calculate</button>

      {investmentData.length > 0 && (
        <table border="1" width="50%">
          <thead>
            <tr>
              <th>Year</th>
              <th>Money</th>
              <th>Rate (%)</th>
              <th>End Year</th>
            </tr>
          </thead>
          <tbody>
            {investmentData.map((row, index) => (
              <tr key={index}>
                <td>{row.year}</td>
                <td>{row.money.toFixed(2)}</td>
                <td>{row.rate}</td>
                <td>{row.endYear.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Bai2;
