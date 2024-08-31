import {useState} from 'react';
import './Dashboard.css';
import adminImg from "../assets/3dmanglasses.jpg"
import { Link } from 'react-router-dom';
import { FaBus, FaRoute, FaUsers, FaMoneyBillWave, FaCogs } from 'react-icons/fa';
import { GiSteeringWheel, GiHamburgerMenu } from "react-icons/gi";
import { BiSolidReport } from "react-icons/bi";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="dashboard-container">
      <div className={`sidebar ${isSidebarOpen ? '' : 'closed'}`}>
      {/* <div className="sidebar"> */}
        <div className="adamin-profile">
          <img src={adminImg} style={{height:'80px',width:'80px',borderRadius:'50%', marginBottom: '10px', objectFit:'cover'}} alt="Admin" />
          <h2>admin</h2>
         
        </div>
        <ul className="nav-links">
          <li><FaCogs />Dashboard</li>
          <li><FaBus /><Link to="/fleet-management">Buses</Link></li>
          <li><FaRoute /><Link to="/route-management"> Routes</Link></li>
          <li><GiSteeringWheel /><Link to="/driver">Drivers</Link></li>
          <li><FaUsers /><Link to="/bookings">Bookings</Link></li>
          <li><FaMoneyBillWave /><Link to="/payment-management"> Manage Payments</Link></li>
          <li><FaMoneyBillWave /><Link to="/bus-tracking"> Bus Tracking</Link></li>
          <li><BiSolidReport /><Link to="/reporting-analytics">Reporting & Analytics</Link></li>
        </ul>
      </div>

      <div className="main-content">
        <div className="header">
          <h1>Welcome, Admin</h1>
          <button className="logout-button">Log Out</button>
        </div>
        <div className="cards">
          <div className="card">
            <FaBus className="icon" />
            <div className="card-details">
              <h2>Buses</h2>
              <p>Total Buses: 10</p>
              <a href="/fleet-management">View More</a>
            </div>
          </div>
          <div className="card">
            <FaRoute className="icon" />
            <div className="card-details">
              <h2>Routes</h2>
              <p>Total Routes: 7</p>
              <a href="/route-management">View More</a>
            </div>
          </div>
          <div className="card">
            <FaUsers className="icon" />
            <div className="card-details">
              <h2>Customers</h2>
              <p>Total Customers: 6</p>
              <a href="/bookings">View More</a>
            </div>
          </div>
          <div className="card">
            <FaMoneyBillWave className="icon" />
            <div className="card-details">
              <h2>Revenue</h2>
              <p>Total Revenue: GHC4090</p>
              <a href="#">View More</a>
            </div>
          </div>
        </div>
      </div>
      <div className="hamburger" onClick={toggleSidebar}>
      <GiHamburgerMenu />
        {/* ☰ */}
      </div>
    </div>
  );
}

export default Dashboard;

