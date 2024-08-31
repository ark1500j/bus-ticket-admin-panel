import  { useState } from 'react';
import './Bookings.css';

const Bookings = () => {
  // Sample data
  const [bookings, setBookings] = useState([
    { id: 1, customerName: 'John Doe', route: 'Kumasi - Accra', bus: 'VIP', bookingDate: '2024-08-01', travelDate: '2024-08-10', status: 'Confirmed', amountPaid: '100 GHC' },
    { id: 2, customerName: 'Jane Smith', route: 'Accra - Kumasi', bus: '2M Express', bookingDate: '2024-08-05', travelDate: '2024-08-12', status: 'Pending', amountPaid: '90 GHC' },
    { id: 3, customerName: 'Robert Brown', route: 'Kumasi - Takoradi', bus: 'VIP', bookingDate: '2024-08-07', travelDate: '2024-08-14', status: 'Canceled', amountPaid: '0 GHC' },
    // Add more bookings as needed
  ]);

  const [filteredBookings, setFilteredBookings] = useState(bookings);
  const [filter, setFilter] = useState('');

  const handleFilterChange = (e) => {
    const value = e.target.value.toLowerCase();
    setFilter(value);
    const filtered = bookings.filter(booking =>
      booking.customerName.toLowerCase().includes(value) ||
      booking.route.toLowerCase().includes(value) ||
      booking.status.toLowerCase().includes(value)
    );
    setFilteredBookings(filtered);
  };

  const handleEditBooking = (id) => {
    // Logic to edit a booking
    console.log(`Editing booking with ID: ${id}`);
  };

  const handleCancelBooking = (id) => {
    // Logic to cancel a booking
    setBookings(bookings.map(booking =>
      booking.id === id ? { ...booking, status: 'Canceled' } : booking
    ));
  };

  return (
    <div className="bookings-container">
      <div className="header">
        <h1>Manage Bookings</h1>
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
          <p>{bookings.length}</p>
        </div>
        <div className="card">
          <h3>Confirmed</h3>
          <p>{bookings.filter(booking => booking.status === 'Confirmed').length}</p>
        </div>
        <div className="card">
          <h3>Pending</h3>
          <p>{bookings.filter(booking => booking.status === 'Pending').length}</p>
        </div>
        <div className="card">
          <h3>Canceled</h3>
          <p>{bookings.filter(booking => booking.status === 'Canceled').length}</p>
        </div>
      </div>

      <div className="booking-management-table">
        <h3>All Bookings</h3>
        <table>
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Route</th>
              <th>Bus</th>
              <th>Booking Date</th>
              <th>Travel Date</th>
              <th>Status</th>
              <th>Amount Paid</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map(booking => (
              <tr key={booking.id}>
                <td>{booking.customerName}</td>
                <td>{booking.route}</td>
                <td>{booking.bus}</td>
                <td>{booking.bookingDate}</td>
                <td>{booking.travelDate}</td>
                <td>{booking.status}</td>
                <td>{booking.amountPaid}</td>
                <td className="table-actions">
                  <button className="edit" onClick={() => handleEditBooking(booking.id)}>Edit</button>
                  <button className="cancel" onClick={() => handleCancelBooking(booking.id)}>Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookings;
