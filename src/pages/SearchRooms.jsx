// import { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; // ✅ Added for navigation

// export default function SearchRooms() {
//   const [form, setForm] = useState({
//     checkin: '',
//     checkout: '',
//     adults: 2,
//     children: 0,
//   });

//   const [rooms, setRooms] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate(); // ✅ Added here

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleCountChange = (field, delta) => {
//     setForm((prev) => ({
//       ...prev,
//       [field]: Math.max(0, prev[field] + delta),
//     }));
//   };

//   const handleSubmit = async () => {
//     if (!form.checkin || !form.checkout) {
//       alert('Please select check-in and check-out dates');
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.post('http://localhost:5000/search-rooms', {
//         checkin: form.checkin,
//         checkout: form.checkout,
//       });
//       setRooms(response.data.availableRooms || []);
//     } catch (error) {
//       console.error('Error fetching rooms:', error);
//       alert('Failed to fetch available rooms');
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="page">
//       <div className="search-section">
//         <div className="left-panel">
//           <div className="card">
//             <h3 className="step-title">1. Search</h3>

//             <label>From</label>
//             <input type="date" name="checkin" value={form.checkin} onChange={handleChange} />

//             <label>To</label>
//             <input type="date" name="checkout" value={form.checkout} onChange={handleChange} />

//             <div className="row">
//               <div>
//                 <label>Adults</label>
//                 <div className="counter">
//                   <button onClick={() => handleCountChange('adults', -1)}>-</button>
//                   <span>{form.adults}</span>
//                   <button onClick={() => handleCountChange('adults', 1)}>+</button>
//                 </div>
//               </div>
//               <div>
//                 <label>Children</label>
//                 <div className="counter">
//                   <button onClick={() => handleCountChange('children', -1)}>-</button>
//                   <span>{form.children}</span>
//                   <button onClick={() => handleCountChange('children', 1)}>+</button>
//                 </div>
//               </div>
//             </div>

//             <button className="check-btn" onClick={handleSubmit}>
//               Check Availability
//             </button>
//           </div>
//         </div>

//         <div className="right-panel">
//           <div className="green-box">
//             <p>✔ Lock-in a great price, book your stay now!</p>
//             <p>
//               ✔ Need a room for just 1 day?{' '}
//               <span className="green-link">Click here to book by the hour!!</span>
//             </p>
//           </div>

//           <div className="grey-box">
//             <ul>
//               <li>🍽 Multi-cuisine Veg Restaurant</li>
//               <li>🎠 Kids Zone</li>
//               <li>🚗 Paid pickup/drop Service</li>
//               <li>🏊 Swimming pool & Indoor games</li>
//               <li>🚉 Only 5 km from Itarsi Railway Station</li>
//             </ul>
//           </div>
//         </div>
//       </div>

//       <h3 className="step-title">2. Select Room ({form.adults} Adults, {form.children} Children)</h3>
//       {loading ? (
//         <p>Loading rooms...</p>
//       ) : rooms.length === 0 ? (
//         <p>No rooms found for selected dates.</p>
//       ) : (
//         rooms.map((room) => (
//           <div key={room.id} className="room-card">
//             <img src="https://via.placeholder.com/160x100" alt="room" />
//             <div className="room-info">
//               <h4>{room.room_type}</h4>
//               <p>Room only — ₹{room.base_price}/night</p>
//               <p className="room-note">In high demand! Only 2 rooms left</p>
//               <button
//                 className="book-btn"
//                 onClick={() =>
//                   navigate('/booking', {
//                     state: {
//                       ...form,
//                       room
//                     }
//                   })
//                 }
//               >
//                 Book Now
//               </button>
//             </div>
//           </div>
//         ))
//       )}

//       <style>{`
//         html, body {
//           margin: 0;
//           padding: 0;
//           width: 100%;
//           height: 100%;
//           background-color: #ffffff !important;
//           font-family: 'Segoe UI', sans-serif;
//         }

//         .page {
//           background: #fff;
//           padding: 20px 40px;
//           width: 100vw;
//           box-sizing: border-box;
//         }

//         .search-section {
//           display: flex;
//           flex-wrap: wrap;
//           gap: 30px;
//           width: 100%;
//         }

//         .left-panel,
//         .right-panel {
//           flex: 1;
//           min-width: 300px;
//         }

//         .card {
//           background: #fff;
//           padding: 20px;
//           border-radius: 6px;
//           border: 1px solid #ccc;
//         }

//         .step-title {
//           background: #f0f0f0;
//           padding: 10px;
//           font-weight: bold;
//           border-left: 5px solid #b59a45;
//           margin-bottom: 15px;
//           color: #222;
//         }

//         label {
//           display: block;
//           margin-top: 10px;
//           font-weight: 500;
//           color: #222;
//         }

//         input[type="date"] {
//           width: 100%;
//           padding: 10px;
//           margin-top: 5px;
//           border: 1px solid #ccc;
//           border-radius: 5px;
//           font-size: 15px;
//           background: white;
//           color: #000;
//         }

//         .row {
//           display: flex;
//           gap: 20px;
//           margin-top: 10px;
//         }

//         .counter {
//           display: flex;
//           align-items: center;
//           gap: 10px;
//           margin-top: 5px;
//         }

//         .counter button {
//           width: 30px;
//           height: 30px;
//           font-size: 16px;
//           background: #eee;
//           border: 1px solid #ccc;
//           border-radius: 4px;
//           cursor: pointer;
//         }

//         .check-btn {
//           margin-top: 15px;
//           width: 100%;
//           background: #b59a45;
//           color: white;
//           font-weight: bold;
//           padding: 12px;
//           border: none;
//           border-radius: 6px;
//           cursor: pointer;
//         }

//         .green-box {
//           background: #e6f9e6;
//           padding: 15px;
//           border-left: 5px solid #4caf50;
//           font-size: 14px;
//           border-radius: 5px;
//           color: #222;
//         }

//         .green-link {
//           color: #1b5e20;
//           text-decoration: underline;
//           cursor: pointer;
//         }

//         .grey-box {
//           background: #f0f0f0;
//           padding: 15px;
//           font-size: 14px;
//           border-radius: 5px;
//           color: #333;
//           margin-top: 10px;
//         }

//         .grey-box ul {
//           list-style: none;
//           padding: 0;
//           margin: 0;
//         }

//         .grey-box li {
//           margin-bottom: 6px;
//         }

//         .room-card {
//           display: flex;
//           background: #fff;
//           border: 1px solid #ccc;
//           margin-top: 20px;
//           border-radius: 6px;
//           overflow: hidden;
//         }

//         .room-card img {
//           width: 160px;
//           height: 100px;
//           object-fit: cover;
//         }

//         .room-info {
//           padding: 15px;
//           flex: 1;
//           color: #222;
//         }

//         .room-note {
//           color: red;
//           font-size: 14px;
//           font-weight: bold;
//         }

//         .book-btn {
//           margin-top: 10px;
//           background: #b59a45;
//           color: white;
//           padding: 8px 16px;
//           border: none;
//           border-radius: 4px;
//           cursor: pointer;
//         }

//         @media (max-width: 768px) {
//           .search-section {
//             flex-direction: column;
//           }

//           .page {
//             padding: 15px;
//           }
//         }
//       `}</style>
//     </div>
//   );
// // }

// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function SearchRooms() {
//   const [form, setForm] = useState({
//     checkin: "",
//     checkout: "",
//     adults: 2,
//     children: 0,
//   });

//   const [rooms, setRooms] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const numberOfRooms = Math.max(1, Math.ceil(form.adults / 4));

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleCountChange = (field, delta) => {
//     setForm((prev) => ({
//       ...prev,
//       [field]: Math.max(0, prev[field] + delta),
//     }));
//   };

// const handleSubmit = async () => {
//   if (
//     !form.checkin ||
//     !form.checkout ||
//     form.adults === '' ||
//     form.children === ''
//   ) {
//     alert("Please fill all fields");
//     return;
//   }

//   setLoading(true);
//   try {
//     const response = await axios.post("http://localhost:5000/search-rooms", {
//       checkin: form.checkin,
//       checkout: form.checkout,
//       adults: form.adults,
//       children: form.children,
//     });
//     setRooms(response.data.availableRooms || []);
//   } catch (error) {
//     console.error("Error fetching rooms:", error);
//     alert("Failed to fetch available rooms");
//   }
//   setLoading(false);
// };

//   return (
//     <div className="page">
//       <div className="search-section">
//         <div className="left-panel">
//           <div className="card">
//             <h3 className="step-title">1. Search</h3>

//             <label>From</label>
//             <input
//               type="date"
//               name="checkin"
//               value={form.checkin}
//               onChange={handleChange}
//             />

//             <label>To</label>
//             <input
//               type="date"
//               name="checkout"
//               value={form.checkout}
//               onChange={handleChange}
//             />

//             <div className="row">
//               <div>
//                 <label>Adults</label>
//                 <div className="counter">
//                   <button onClick={() => handleCountChange("adults", -1)}>
//                     -
//                   </button>
//                   <span>{form.adults}</span>
//                   <button onClick={() => handleCountChange("adults", 1)}>
//                     +
//                   </button>
//                 </div>
//               </div>
//               <div>
//                 <label>Children</label>
//                 <div className="counter">
//                   <button onClick={() => handleCountChange("children", -1)}>
//                     -
//                   </button>
//                   <span>{form.children}</span>
//                   <button onClick={() => handleCountChange("children", 1)}>
//                     +
//                   </button>
//                 </div>
//               </div>
//             </div>

//             <div className="rooms-needed">
//               Number of Rooms Needed: <strong>{numberOfRooms}</strong>
//             </div>

//             <button className="check-btn" onClick={handleSubmit}>
//               Check Availability
//             </button>
//           </div>
//         </div>

//         <div className="right-panel">
//           <div className="green-box">
//             <p>✔ Lock-in a great price, book your stay now!</p>
//             <p>
//               ✔ Need a room for just 1 day?{" "}
//               <span className="green-link">
//                 Click here to book by the hour!!
//               </span>
//             </p>
//           </div>

//           <div className="grey-box">
//             <ul>
//               <li>🍽 Multi-cuisine Veg Restaurant</li>
//               <li>🎠 Kids Zone</li>
//               <li>🚗 Paid pickup/drop Service</li>
//               <li>🏊 Swimming pool & Indoor games</li>
//               <li>🚉 Only 5 km from Itarsi Railway Station</li>
//             </ul>
//           </div>
//         </div>
//       </div>

//       <h3 className="step-title">
//         2. Select Room ({form.adults} Adults, {form.children} Children,{" "}
//         {numberOfRooms} Room{numberOfRooms > 1 ? "s" : ""})
//       </h3>

//       {loading ? (
//         <p>Loading rooms...</p>
//       ) : rooms.length === 0 ? (
//         <p>No rooms found for selected dates.</p>
//       ) : (
//         rooms.map((room) => (
//           <div key={room.id} className="room-card">
//             <img src="https://via.placeholder.com/160x100" alt="room" />
//             <div className="room-info">
//               <h4>{room.room_type}</h4>
//               <p>Room only — ₹{room.base_price}/night</p>
//               <p className="room-note">
//                 In high demand! Only {room.total_inventory} rooms left
//               </p>
//               <button
//                 className="book-btn"
//                 onClick={() =>
//                   navigate("/booking", {
//                     state: {
//                       ...form,
//                       room,
//                     },
//                   })
//                 }
//               >
//                 Book Now
//               </button>
//             </div>
//           </div>
//         ))
//       )}

//       <style>{`
//         html, body {
//           margin: 0;
//           padding: 0;
//           width: 100%;
//           height: 100%;
//           background-color: #ffffff !important;
//           font-family: 'Segoe UI', sans-serif;
//         }

//         .page {
//           background: #fff;
//           padding: 20px 40px;
//           width: 100vw;
//           box-sizing: border-box;
//         }

//         .search-section {
//           display: flex;
//           flex-wrap: wrap;
//           gap: 30px;
//           width: 100%;
//         }

//         .left-panel,
//         .right-panel {
//           flex: 1;
//           min-width: 300px;
//         }

//         .card {
//           background: #fff;
//           padding: 20px;
//           border-radius: 6px;
//           border: 1px solid #ccc;
//         }

//         .step-title {
//           background: #f0f0f0;
//           padding: 10px;
//           font-weight: bold;
//           border-left: 5px solid #b59a45;
//           margin-bottom: 15px;
//           color: #222;
//         }

//         label {
//           display: block;
//           margin-top: 10px;
//           font-weight: 500;
//           color: #222;
//         }

//         input[type="date"] {
//           width: 100%;
//           padding: 10px;
//           margin-top: 5px;
//           border: 1px solid #ccc;
//           border-radius: 5px;
//           font-size: 15px;
//           background: white;
//           color: #000;
//         }

//         .row {
//           display: flex;
//           gap: 20px;
//           margin-top: 10px;
//         }

//         .counter {
//           display: flex;
//           align-items: center;
//           gap: 10px;
//           margin-top: 5px;
//         }

//         .counter button {
//           width: 30px;
//           height: 30px;
//           font-size: 16px;
//           background: #eee;
//           border: 1px solid #ccc;
//           border-radius: 4px;
//           cursor: pointer;
//         }

//         .check-btn {
//           margin-top: 15px;
//           width: 100%;
//           background: #b59a45;
//           color: white;
//           font-weight: bold;
//           padding: 12px;
//           border: none;
//           border-radius: 6px;
//           cursor: pointer;
//         }

//         .green-box {
//           background: #e6f9e6;
//           padding: 15px;
//           border-left: 5px solid #4caf50;
//           font-size: 14px;
//           border-radius: 5px;
//           color: #222;
//         }

//         .green-link {
//           color: #1b5e20;
//           text-decoration: underline;
//           cursor: pointer;
//         }

//         .grey-box {
//           background: #f0f0f0;
//           padding: 15px;
//           font-size: 14px;
//           border-radius: 5px;
//           color: #333;
//           margin-top: 10px;
//         }

//         .grey-box ul {
//           list-style: none;
//           padding: 0;
//           margin: 0;
//         }

//         .grey-box li {
//           margin-bottom: 6px;
//         }

//         .room-card {
//           display: flex;
//           background: #fff;
//           border: 1px solid #ccc;
//           margin-top: 20px;
//           border-radius: 6px;
//           overflow: hidden;
//         }

//         .room-card img {
//           width: 160px;
//           height: 100px;
//           object-fit: cover;
//         }

//         .room-info {
//           padding: 15px;
//           flex: 1;
//           color: #222;
//         }

//         .room-note {
//           color: red;
//           font-size: 14px;
//           font-weight: bold;
//         }

//         .book-btn {
//           margin-top: 10px;
//           background: #b59a45;
//           color: white;
//           padding: 8px 16px;
//           border: none;
//           border-radius: 4px;
//           cursor: pointer;
//         }

//         .rooms-needed {
//   margin: 15px 0;
//   padding: 10px 15px;
//   background: #f8f8f8;
//   border-left: 4px solid #b59a45;
//   font-size: 15px;
//   font-weight: 500;
//   color: #333;
//   border-radius: 6px;
// }


//         @media (max-width: 768px) {
//           .search-section {
//             flex-direction: column;
//           }

//           .page {
//             padding: 15px;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }










// SearchRooms.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './SearchRooms.css';

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export default function SearchRooms() {
  const [form, setForm] = useState({
    checkin: "",
    checkout: "",
    adults: 2,
    children: 0,
  });

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const numberOfRooms = Math.max(1, Math.ceil(form.adults / 4));

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
