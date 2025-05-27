import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import './SearchRooms.css';

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export default function SearchRooms() {
  const location = useLocation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    checkin: "",
    checkout: "",
    adults: 2,
    children: 0,
  });

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  const numberOfRooms = Math.max(1, Math.ceil(form.adults / 4));

  // ✅ Pre-fill form using query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const checkinParam = params.get("checkin");
    const checkoutParam = params.get("checkout");
    const adultsParam = params.get("adults");
    const childrenParam = params.get("children");

    setForm((prev) => ({
      ...prev,
      checkin: checkinParam || "",
      checkout: checkoutParam || "",
      adults: adultsParam ? parseInt(adultsParam) : prev.adults,
      children: childrenParam ? parseInt(childrenParam) : prev.children,
    }));
  }, [location.search]);

  const handleCountChange = (field, delta) => {
    setForm((prev) => ({
      ...prev,
      [field]: Math.max(0, prev[field] + delta),
    }));
  };

  const handleSubmit = async () => {
    if (!form.checkin || !form.checkout || form.adults === '' || form.children === '') {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("https://radharidhani.in/api/search-rooms", {
        checkin: form.checkin,
        checkout: form.checkout,
        adults: form.adults,
        children: form.children,
      });
      setRooms(response.data.availableRooms || []);
    } catch (error) {
      console.error("Error fetching rooms:", error);
      alert("Failed to fetch available rooms");
    }
    setLoading(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="page">
        <div className="search-section">
          <div className="left-panel">
            <div className="card">
              <h3 className="step-title">1. Search</h3>

              <label>From</label>
              <DatePicker
                value={form.checkin ? dayjs(form.checkin) : null}
                onChange={(newValue) =>
                  setForm((prev) => ({
                    ...prev,
                    checkin: dayjs(newValue).format("YYYY-MM-DD"),
                  }))
                }
                slotProps={{ textField: { fullWidth: true, size: "small", className: "mui-date-input" } }}
              />

              <label>To</label>
              <DatePicker
                value={form.checkout ? dayjs(form.checkout) : null}
                onChange={(newValue) =>
                  setForm((prev) => ({
                    ...prev,
                    checkout: dayjs(newValue).format("YYYY-MM-DD"),
                  }))
                }
                slotProps={{ textField: { fullWidth: true, size: "small", className: "mui-date-input" } }}
              />

              <div className="row">
                <div>
                  <label>Adults</label>
                  <div className="counter">
                    <button onClick={() => handleCountChange("adults", -1)}>-</button>
                    <span>{form.adults}</span>
                    <button onClick={() => handleCountChange("adults", 1)}>+</button>
                  </div>
                </div>
                <div>
                  <label>Children</label>
                  <div className="counter">
                    <button onClick={() => handleCountChange("children", -1)}>-</button>
                    <span>{form.children}</span>
                    <button onClick={() => handleCountChange("children", 1)}>+</button>
                  </div>
                </div>
              </div>

              <div className="rooms-needed">
                Number of Rooms Needed: <strong>{numberOfRooms}</strong>
              </div>

              <button className="check-btn" onClick={handleSubmit}>
                Check Availability
              </button>
            </div>
          </div>

          <div className="right-panel">
            <div className="green-box">
              <p>✔ Lock-in a great price, book your stay now!</p>
              <p>
                ✔ Need a room for just 1 day?{" "}
                <span className="green-link">Click here to book by the hour!!</span>
              </p>
            </div>

            <div className="grey-box">
              <ul>
                <li>🍽 Multi-cuisine Veg Restaurant</li>
                <li>🎠 Kids Zone</li>
                <li>🚗 Paid pickup/drop Service</li>
                <li>🏊 Swimming pool & Indoor games</li>
                <li>🚉 Only 5 km from Itarsi Railway Station</li>
              </ul>
            </div>
          </div>
        </div>

        <h3 className="step-title">
          2. Select Room ({form.adults} Adults, {form.children} Children, {numberOfRooms} Room
          {numberOfRooms > 1 ? "s" : ""})
        </h3>

        {loading ? (
          <p>Loading rooms...</p>
        ) : rooms.length === 0 ? (
          <p>No rooms found for selected dates.</p>
        ) : (
          rooms.map((room) => (
            <div key={room.id} className="room-card">
              <img src="https://via.placeholder.com/160x100" alt="room" />
              <div className="room-info">
                <h4>{room.room_type}</h4>
                <p>Room only — ₹{room.base_price}/night</p>
                <p className="room-note">
                  In high demand! Only {room.total_inventory} rooms left
                </p>
                <button
                  className="book-btn"
                  onClick={() => navigate("/booking", { state: { ...form, room } })}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </LocalizationProvider>
  );
}
