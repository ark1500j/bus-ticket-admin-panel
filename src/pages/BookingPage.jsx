import { useState, useEffect } from "react";
import "./Bookings.css";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  const [filteredBookings, setFilteredBookings] = useState(bookings);
  const [filter, setFilter] = useState("");

  const handleFilterChange = (e) => {
    const value = e.target.value.toLowerCase();
    setFilter(value);
    const filtered = bookings.filter(
      (booking) =>
        booking.customerName.toLowerCase().includes(value) ||
        booking.route.toLowerCase().includes(value) ||
        booking.status.toLowerCase().includes(value)
    );
    setFilteredBookings(filtered);
  };

  async function fetchData() {
    const response = await fetch("http://localhost:3000/bookings");
    const data = await response.json();
    if (!data) return;
    setBookings(data);
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="bookings-container">
      <div className="header">
        <h1 className="header-title">Manage Bookings</h1>
        <input
          type="text"
          placeholder="Search bookings..."
          value={filter}
          onChange={handleFilterChange}
          className="filter-input"
        />
      </div>

      <div className="booking-summary">
        <div className="card">
          <h3>Total Bookings</h3>
          <p className="summary-number">{bookings.length}</p>
        </div>
        <div className="card">
          <h3>Confirmed</h3>
          <p className="summary-number">
            {
              bookings.filter((booking) => booking.status === "Confirmed")
                .length
            }
          </p>
        </div>
        <div className="card">
          <h3>Pending</h3>
          <p className="summary-number">
            {bookings.filter((booking) => booking.status === "Pending").length}
          </p>
        </div>
        <div className="card">
          <h3>Canceled</h3>
          <p className="summary-number">
            {bookings.filter((booking) => booking.status === "Canceled").length}
          </p>
        </div>
      </div>

      <div className="booking-management-table">
        <h3>All Bookings</h3>
        <table>
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Contact</th>
              <th>Route</th>
              <th>Bus Number</th>
              <th>Booking Date</th>
              <th>Travel Date</th>
              <th>Status</th>
              <th>Amount Paid</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.customerName}</td>
                <td>{booking.contact}</td>
                <td>{booking.route}</td>
                <td>{booking.busNum}</td>
                <td>{booking.bookingDate}</td>
                <td>{booking.travelDate}</td>
                <td>{booking.status}</td>
                <td>{booking.amountPaid}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredBookings.length === 0 && (
          <div className="w-full mt-4 flex items-center justify-center">
            no bookings
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;
