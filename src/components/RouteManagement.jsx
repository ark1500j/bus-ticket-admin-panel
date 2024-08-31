import { useEffect, useState } from "react";
import "./RouteManagement.css";
import { auth } from "../firebase/firebase";
import { format } from "date-fns";
const RouteManagement = () => {
  const [routes, setRoutes] = useState([]);

  const [newRoute, setNewRoute] = useState({
    id: null,
    origin: "",
    destination: "",
    departureTime: "",
    arrivalTime: "",
    busType: "",
    price: "",
    seats: "",
    type: "OneWay",
    busName: "",
    status: "Active",
  });

  const [showAddRouteForm, setShowAddRouteForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRoute({ ...newRoute, [name]: value });
  };

  const handleEditRoute = (route) => {
    console.log(route);
    setNewRoute({
      id: route.id,
      origin: route.from, // Mapping 'from' to 'origin'
      destination: route.to, // Mapping 'to' to 'destination'
      departureTime: route.departureDate, // Mapping 'departureDate' to 'departureTime'
      arrivalTime: route.arrivalTime, // Mapping 'arrivalTime' to 'arrivalTime'
      returnDate: route.returnDate || "", // Mapping 'returnDate' to 'returnDate'
      busType: route.busNumber, // Mapping 'busNumber' to 'busType'
      price: route.amount, // Mapping 'amount' to 'price'
      seats: route.numberOfSeats.toString(), // Mapping 'numberOfSeats' to 'seats'
      type: route.type, // Mapping 'type' to 'type'
      status: route.status, // Assuming you have 'status' in your route object
    });
    setIsEditing(true);
    setShowAddRouteForm(true);
  };
  const toggleAddRouteForm = () => {
    setShowAddRouteForm(!showAddRouteForm);
    if (isEditing) {
      setIsEditing(false);
      setNewRoute({
        id: null,
        origin: "",
        destination: "",
        departureTime: "",
        arrivalTime: "",
        busType: "",
        price: "",
        seats: "",
        type: "OneWay",
        stops: "",
        status: "Active",
      });
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setShowAddRouteForm(false);
    const tripData = {
      id: newRoute.id,
      type: newRoute.type, // Assuming status is related to trip type
      from: newRoute.origin,
      to: newRoute.destination,
      departureDate: newRoute.departureTime,
      arrivalTime: newRoute.arrivalTime,
      returnDae: newRoute.returnDate, // Adjust this based on the form data if needed
      amount: newRoute.price,
      numberOfSeats: parseInt(newRoute.seats),
      seatsBooked: [], // Start with an empty array for booked seats
      busNumber: newRoute.busType,
      email: auth.currentUser.email,
    };
    if (isEditing) {
      const response = await fetch("http://localhost:3000/trips", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tripData),
      });
      if (response.status === 204) {
        fetchData();
      }
      return;
    }

    const response = await fetch("http://localhost:3000/trips", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tripData),
    });
    if (response.status === 201) {
      fetchData();
    }
  }
  async function handleDelete(id) {
    const data = {
      id,
    };
    const response = await fetch("http://localhost:3000/trips", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.status === 202) {
      fetchData();
    }
  }
  async function fetchData() {
    const response = await fetch("http://localhost:3000/trips");
    const data = await response.json();
    if (!data) return;
    setRoutes(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="manage-routes-container">
      <div className="page-header">
        <h1>Manage Routes & Schedules</h1>
        <button className="route-button" onClick={toggleAddRouteForm}>
          {showAddRouteForm ? "Close Add Route" : "Add New Route"}
        </button>
      </div>

      <div className="route-management-table">
        <h3>Route Management</h3>
        <table>
          <thead>
            <tr>
              <th>Origin</th>
              <th>Destination</th>
              <th>Departure Time</th>
              <th>Arrival Time</th>
              <th>Bus Type</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {routes.map((route) => (
              <tr key={route.id}>
                <td>{route.from}</td>
                <td>{route.to}</td>
                <td>{format(route.departureDate, "yyyy-MM-dd")}</td>
                <td>{format(route.arrivalTime, "yyyy-MM-dd")}</td>
                <td>{route.type}</td>
                <td>{route.amount}</td>
                <td className="table-actions">
                  <button
                    className="edit"
                    onClick={() => handleEditRoute(route)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete"
                    onClick={() => {
                      handleDelete(route.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddRouteForm && (
        <form className="add-route-form" onSubmit={handleSubmit}>
          <h3>{isEditing ? "Edit Route" : "Add New Route"}</h3>
          <div className="form-group">
            <label htmlFor="type">Trip type</label>
            <select
              id="type"
              name="type"
              required
              value={newRoute.type}
              onChange={handleInputChange}
            >
              <option value="OneWay">One Way</option>
              <option value="RoundTrip">Round Trip</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="origin">Origin</label>
            <input
              type="text"
              id="origin"
              name="origin"
              required
              value={newRoute.origin}
              onChange={handleInputChange}
              placeholder="Enter origin"
            />
          </div>
          <div className="form-group">
            <label htmlFor="destination">Destination</label>
            <input
              type="text"
              id="destination"
              name="destination"
              required
              value={newRoute.destination}
              onChange={handleInputChange}
              placeholder="Enter destination"
            />
          </div>
          <div className="form-group">
            <label htmlFor="departureTime">Departure Time</label>
            <input
              type="datetime-local"
              id="departureTime"
              name="departureTime"
              value={newRoute.departureTime}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="arrivalTime">Arrival Time</label>
            <input
              type="datetime-local"
              id="arrivalTime"
              name="arrivalTime"
              value={newRoute.arrivalTime}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="arrivalTime">Retun Data</label>
            <input
              type="datetime-local"
              id="returnDate"
              name="returnDate"
              value={newRoute.returnDate}
              onChange={handleInputChange}
              placeholder="for RoundTrip ONLY"
            />
          </div>
          <div className="form-group">
            <label htmlFor="busType">Bus Name</label>
            <input
              type="text"
              id="busType"
              name="busType"
              value={newRoute.busType}
              onChange={handleInputChange}
              placeholder="Enter bus name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="seats">Number of Seats</label>
            <input
              type="text"
              id="seats"
              name="seats"
              required
              value={newRoute.seats}
              onChange={handleInputChange}
              placeholder="Enter number of seats"
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="text"
              id="price"
              name="price"
              required
              value={newRoute.price}
              onChange={handleInputChange}
              placeholder="Enter price in cedis"
            />
          </div>
          <button type="submit">
            {isEditing ? "Update Route" : "Add Route"}
          </button>
        </form>
      )}
    </div>
  );
};

export default RouteManagement;
