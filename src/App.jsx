//import {usestate} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import FleetManagementPage from './pages/FleetManagementPage';
import TripTrackingPage from './pages/TripTrackingPage';
import ReportAnalyticsPage from './pages/ReportAnalyticsPage';
import BookingPage from './pages/BookingPage';
import PaymentManagementPage from './pages/PaymentManagementPage';
import BusTrackingPage from './pages/BusTrackingPage';
import RouteManagementPage from './pages/RouteManagementPage.';
import DriversPage from './pages/DriversPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard"  element={<Dashboard />} />
        <Route path="/fleet-management" element={<FleetManagementPage />} />
        <Route path="/trip-tracking" element={<TripTrackingPage />} />
        <Route path="/driver" element={<DriversPage />} />
        <Route path="/reporting-analytics" element={<ReportAnalyticsPage />} />
        <Route path="/bookings" element= {<BookingPage />} />
        <Route path="/payment-management" element={<PaymentManagementPage />} />
        <Route path="/bus-tracking" element={<BusTrackingPage />} />
        <Route path="/route-management" element={<RouteManagementPage />} />
      </Routes>
    </Router>
  );
}

export default App;