import React from "react";
import "./Dashboard.css";
import imgQuestion from "../assets/img/Question 1.png";
import imgAvt from "../assets/img/Avatar.png";
function Dashboard() {
  return (
    <>
      <div className="container">
        <aside className="sidebar">
          <h2>Logo</h2>
          <ul>
            <li>Dashboard</li>
            <li>Projects</li>
            <li>Teams</li>
            <li>Analytics</li>
            <li>Messages</li>
            <li>Integrations</li>
          </ul>
        </aside>
        <header className="header">
          <h2>Dashboard</h2>
          <input
            className="search_bar"
            type="search"
            name="search"
            id="search"
            placeholder="Search..."
          />
          <span>
            <img src={imgQuestion} alt="question" />
          </span>
          <span>
            <img src={imgAvt} alt="avt" />
          </span>
        </header>
        <main className="main">
          <div className="overview">
            <div className="card">Turnover: $92,405</div>
            <div className="card">Profit: $32,218</div>
            <div className="card">New Customers: 298</div>
          </div>
          <div className="report">
            <h3>Detailed Report</h3>
            <table width="100%">
              <thead>
                <tr>
                  <th>Customer Name</th>
                  <th>Company</th>
                  <th>Order Value</th>
                  <th>Order Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Elizabeth Lee</td>
                  <td>AvatarSystems</td>
                  <td>$559</td>
                  <td>10/07/2023</td>
                  <td>New</td>
                </tr>
                <tr>
                  <td>Carlos Garcia</td>
                  <td>SmoozaShift</td>
                  <td>$747</td>
                  <td>24/07/2023</td>
                  <td>New</td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </>
  );
}

export default Dashboard;
