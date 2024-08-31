import  { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { FaBusAlt, FaExclamationTriangle, FaSearch } from 'react-icons/fa';
import './BusTracking.css';

// Custom bus icon
const busIcon = new L.Icon({
  iconUrl: '/path-to-your-bus-icon.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

const BusTracking = () => {
  const [buses, setBuses] = useState([
    // ... your existing bus data
  ]);

  const [selectedBus, setSelectedBus] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulating real-time updates
    const interval = setInterval(() => {
      setBuses(prevBuses => prevBuses.map(bus => ({
        ...bus,
        location: [
          bus.location[0] + (Math.random() - 0.5) * 0.001,
          bus.location[1] + (Math.random() - 0.5) * 0.001
        ],
        speed: `${Math.floor(Math.random() * 30 + 30)} km/h`
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleBusClick = (bus) => {
    setSelectedBus(bus);
  };

  const filteredBuses = buses.filter(bus => 
    bus.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bus.route.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // eslint-disable-next-line react/prop-types
  function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }

  return (
    <div className="bus-tracking-container">
      <div className="header">
        <h1>Bus Tracking</h1>
        <div className="search-bar">
          <FaSearch />
          <input
            type="text"
            placeholder="Search buses or routes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="content-wrapper">
        <div className="map-container">
          <MapContainer center={[5.614818, -0.205874]} zoom={8} style={{ height: '600px', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            {selectedBus && <ChangeView center={selectedBus.location} zoom={12} />}
            {filteredBuses.map((bus) => (
              <Marker key={bus.id} position={bus.location} icon={busIcon} eventHandlers={{ click: () => handleBusClick(bus) }}>
                <Popup>
                  <div className="popup-content">
                    <h3>{bus.name}</h3>
                    <p><strong>Route:</strong> {bus.route}</p>
                    <p><strong>Status:</strong> {bus.status}</p>
                    <p><strong>Speed:</strong> {bus.speed}</p>
                    <p><strong>ETA:</strong> {bus.eta}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        <div className="bus-details">
          <h2>Bus Details</h2>
          <ul className="bus-list">
            {filteredBuses.map((bus) => (
              <li 
                key={bus.id} 
                onClick={() => handleBusClick(bus)} 
                className={`${bus.status === 'Delayed' || bus.status === 'Stopped' ? 'alert' : ''} ${selectedBus && selectedBus.id === bus.id ? 'selected' : ''}`}
              >
                <FaBusAlt className="bus-icon" />
                <span className="bus-name">{bus.name}</span>
                <span className="bus-status">{bus.status}</span>
                <FaExclamationTriangle className="alert-icon" style={{ display: bus.status === 'Delayed' || bus.status === 'Stopped' ? 'inline' : 'none' }} />
              </li>
            ))}
          </ul>
          {selectedBus && (
            <div className="bus-info">
              <h3>{selectedBus.name}</h3>
              <p><strong>Route:</strong> {selectedBus.route}</p>
              <p><strong>Status:</strong> {selectedBus.status}</p>
              <p><strong>Speed:</strong> {selectedBus.speed}</p>
              <p><strong>ETA:</strong> {selectedBus.eta}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusTracking;