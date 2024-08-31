import { useEffect, useState } from "react";
import "./Buses.css";
import { auth } from "../firebase/firebase";
import { format } from "date-fns";

const FleetManagement = () => {
  const [buses, setBuses] = useState([]);
      const [isEditing, setIsEditing] = useState(false);

  const [newBus, setNewBus] = useState({
    busNumber: "",
    status: "",
    lastMaintenance: "",
  });

  const [isFormVisible, setIsFormVisible] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBus({ ...newBus, [name]: value });
  };


  const handleEditBus = (id) => {
    const busToEdit = buses.find(bus => bus.id === id);
    setNewBus(busToEdit);
    setIsEditing(true);
    setIsFormVisible(true);
  };

  async function handleDelete(busNumber){
    const data={
      busNumber
    }
        const response = await fetch("http://localhost:3000/buses", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.status === 202) {
      fetchData();
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setIsFormVisible(false)
      
    const maintenanceDate = new Date(newBus.lastMaintenance);
        const data = {
          ...newBus,
          lastMaintenance: maintenanceDate,
          email: auth.currentUser.email,
        };
      setNewBus({
        busNumber: "",
        status: "",
        lastMaintenance: "",
      });
    if(isEditing){
         setIsEditing(false)
         
          const response = await fetch("http://localhost:3000/buses", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
          if (response.status === 201) {
            fetchData();
          }
          console.log(response.status);
          return;
    }


    const response = await fetch("http://localhost:3000/buses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.status === 201) {
      fetchData();

    }
    console.log(response.status);
  }
  async function fetchData() {
    const response = await fetch("http://localhost:3000/buses");
    const data = await response.json();
    if (!data) return;
    setBuses(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="buses-container">
      <div className="header">
        <h1>Manage Fleet</h1>
        <button
          className="add-bus-button"
          onClick={() => setIsFormVisible(!isFormVisible)}
        >
          {isFormVisible ? "Close Form" : "Add New Bus"}
        </button>
      </div>

      <div className="fleet-overview">
        <div className="card">
          <h3>Total Buses</h3>
          <p>{buses.length}</p>
        </div>
        <div className="card">
          <h3>In Service</h3>
          <p>{buses.filter((bus) => bus.status === "In Service").length}</p>
        </div>
        <div className="card">
          <h3>Under Maintenance</h3>
          <p>
            {buses.filter((bus) => bus.status === "Under Maintenance").length}
          </p>
        </div>
        <div className="card">
          <h3>Needs Maintenance</h3>
          <p>
            {buses.filter((bus) => bus.status === "Needs Maintenance").length}
          </p>
        </div>
      </div>

      <div className="bus-management-table">
        <h3>Bus Management</h3>
        <table>
          <thead>
            <tr>
              <th>Bus Name</th>
              <th>Status</th>
              <th>Last Maintenance</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {buses.length > 0 &&
              buses.map((bus) => (
                <tr key={bus.id}>
                  <td>{bus.busNumber}</td>
                  <td>{bus.status}</td>
                  <td>{format(bus.lastMaintenance, "yyyy-MM-dd")} </td>
                  <td className="table-actions">
                    <button
                      className="edit"
                      onClick={() => handleEditBus(bus.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete"
                      type="button"
                      onClick={() => handleDelete(bus.busNumber)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {buses.length === 0 && (
          <div className="w-full items-center justify-center flex h-12">
            no buses
          </div>
        )}
      </div>

      <form
        className={`add-bus-form ${isFormVisible ? "visible" : "hidden"}`}
        onSubmit={handleSubmit}
      >
        <h3>{isEditing ? "Update" : "Add New Bus"}</h3>
        <div className="form-group">
          <label htmlFor="name">Bus Name</label>
          <input
            type="text"
            id="name"
            name="busNumber"
            value={newBus.busNumber}
            onChange={handleInputChange}
            placeholder="Enter bus name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={newBus.status}
            onChange={handleInputChange}
          >
            <option value="">Select status</option>
            <option value="In Service">In Service</option>
            <option value="Under Maintenance">Under Maintenance</option>
            <option value="Needs Maintenance">Needs Maintenance</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="lastMaintenance">Last Maintenance Date</label>
          <input
            type="date"
            id="lastMaintenance"
            name="lastMaintenance"
            value={newBus.lastMaintenance}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">{isEditing ? "Update" : "Add Bus"}</button>
      </form>
    </div>
  );
};

export default FleetManagement;
