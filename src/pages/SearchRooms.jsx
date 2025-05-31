

// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate, useLocation } from "react-router-dom";
// import "./SearchRooms.css";

// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import dayjs from "dayjs";

// export default function SearchRooms() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     checkin: "",
//     checkout: "",
//     adults: 2,
//     children: 0,
//   });

//   const [rooms, setRooms] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const numberOfRooms = Math.max(1, Math.ceil(form.adults / 4));

//   // ✅ Pre-fill form using query params (DD/MM/YYYY)
//  useEffect(() => {
//   const params = new URLSearchParams(location.search);
//   const checkinParam = params.get("checkin");
//   const checkoutParam = params.get("checkout");
//   const adultsParam = params.get("adults");
//   const childrenParam = params.get("children");
//   const roomsParam = params.get("rooms");

//   const isValidDate = (str) => dayjs(str, "DD/MM/YYYY", true).isValid();

//   setForm((prev) => ({
//     ...prev,
//     checkin: isValidDate(checkinParam) ? checkinParam : prev.checkin,
//     checkout: isValidDate(checkoutParam) ? checkoutParam : prev.checkout,
//     adults: adultsParam
//       ? parseInt(adultsParam)
//       : roomsParam
//       ? parseInt(roomsParam) * 2
//       : prev.adults,
//     children: childrenParam ? parseInt(childrenParam) : prev.children,
//   }));
// }, [location.search]);


//   const handleCountChange = (field, delta) => {
//     setForm((prev) => ({
//       ...prev,
//       [field]: Math.max(0, prev[field] + delta),
//     }));
//   };

//   const handleSubmit = async () => {
//     if (
//       !form.checkin ||
//       !form.checkout ||
//       form.adults === "" ||
//       form.children === ""
//     ) {
//       alert("Please fill all fields");
//       return;
//     }

//     // ✅ Convert DD/MM/YYYY to YYYY-MM-DD before sending to backend
//     const formattedCheckin = dayjs(form.checkin, "DD/MM/YYYY").format(
//       "YYYY-MM-DD"
//     );
//     const formattedCheckout = dayjs(form.checkout, "DD/MM/YYYY").format(
//       "YYYY-MM-DD"
//     );

//     setLoading(true);
//     try {
//       const response = await axios.post(
//         "https://radharidhani.in/api/search-rooms",
//         {
//           checkin: formattedCheckin,
//           checkout: formattedCheckout,
//           adults: form.adults,
//           children: form.children,
//         }
//       );
//       setRooms(response.data.availableRooms || []);
//     } catch (error) {
//       console.error("Error fetching rooms:", error);
//       alert("Failed to fetch available rooms");
//     }
//     setLoading(false);
//   };

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <div className="page">
//         <div className="search-section">
//           <div className="left-panel">
//             <div className="card">
//               <h3 className="step-title">1. Search</h3>

//               <label>From</label>
//               <DatePicker
//                 format="DD/MM/YYYY"
//                 value={form.checkin ? dayjs(form.checkin, "DD/MM/YYYY") : null}
//                 onChange={(newValue) =>
//                   setForm((prev) => ({
//                     ...prev,
//                     checkin: dayjs(newValue).format("DD/MM/YYYY"),
//                   }))
//                 }
//                 slotProps={{
//                   textField: {
//                     fullWidth: true,
//                     size: "small",
//                     className: "mui-date-input",
//                   },
//                 }}
//               />

//               <label>To</label>
//               <DatePicker
//                 format="DD/MM/YYYY"
//                 value={
//                   form.checkout ? dayjs(form.checkout, "DD/MM/YYYY") : null
//                 }
//                 onChange={(newValue) =>
//                   setForm((prev) => ({
//                     ...prev,
//                     checkout: dayjs(newValue).format("DD/MM/YYYY"),
//                   }))
//                 }
//                 slotProps={{
//                   textField: {
//                     fullWidth: true,
//                     size: "small",
//                     className: "mui-date-input",
//                   },
//                 }}
//               />

//               <div className="row">
//                 <div>
//                   <label>Adults</label>
//                   <div className="counter">
//                     <button onClick={() => handleCountChange("adults", -1)}>
//                       -
//                     </button>
//                     <span>{form.adults}</span>
//                     <button onClick={() => handleCountChange("adults", 1)}>
//                       +
//                     </button>
//                   </div>
//                 </div>
//                 <div>
//                   <label>Children</label>
//                   <div className="counter">
//                     <button onClick={() => handleCountChange("children", -1)}>
//                       -
//                     </button>
//                     <span>{form.children}</span>
//                     <button onClick={() => handleCountChange("children", 1)}>
//                       +
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               <div className="rooms-needed">
//                 Number of Rooms Needed: <strong>{numberOfRooms}</strong>
//               </div>

//               <button className="check-btn" onClick={handleSubmit}>
//                 Check Availability
//               </button>
//             </div>
//           </div>

//           <div className="right-panel">
//             <div className="green-box">
//               <p>✔ Lock-in a great price, book your stay now!</p>
//               <p>
//                 ✔ Need a room for just 1 day?{" "}
//                 <span className="green-link">
//                   Click here to book by the hour!!
//                 </span>
//               </p>
//             </div>

//             <div className="grey-box">
//               <ul>
//                 <li>🍽 Multi-cuisine Veg Restaurant</li>
//                 <li>🎠 Kids Zone</li>
//                 <li>🚗 Paid pickup/drop Service</li>
//                 <li>🏊 Swimming pool & Indoor games</li>
//                 <li>🚉 Only 5 km from Itarsi Railway Station</li>
//               </ul>
//             </div>
//           </div>
//         </div>

//         <h3 className="step-title">
//           2. Select Room ({form.adults} Adults, {form.children} Children,{" "}
//           {numberOfRooms} Room
//           {numberOfRooms > 1 ? "s" : ""})
//         </h3>

//         {loading ? (
//           <p>Loading rooms...</p>
//         ) : rooms.length === 0 ? (
//           <p>No rooms found for selected dates.</p>
//         ) : (
//           rooms.map((room) => (
//             <div key={room.id} className="room-card">
//               <img src="https://via.placeholder.com/160x100" alt="room" />
//               <div className="room-info">
//                 <h4>{room.room_type}</h4>
//                 <p>Room only — ₹{room.base_price}/night</p>
//                 <p className="room-note">
//                   In high demand! Only {room.total_inventory} rooms left
//                 </p>
//                 <button
//                   className="book-btn"
//                   onClick={() => {
//                     const formattedCheckin = dayjs(
//                       form.checkin,
//                       "DD/MM/YYYY"
//                     ).format("YYYY-MM-DD");
//                     const formattedCheckout = dayjs(
//                       form.checkout,
//                       "DD/MM/YYYY"
//                     ).format("YYYY-MM-DD");

//                     navigate("/booking", {
//                       state: {
//                         ...form,
//                         checkin: formattedCheckin,
//                         checkout: formattedCheckout,
//                         room,
//                       },
//                     });
//                   }}
//                 >
//                   Book Now
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </LocalizationProvider>
//   );
// }


import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/en";
import "bootstrap/dist/css/bootstrap.min.css";

// Image mapping
const roomImages = {
  "Suite Room": [
    "https://radharidhani.in/img/fmn.jpg",
        "https://radharidhani.in/img/fmn-1.jpg",
                "https://radharidhani.in/img/fmn-2.jpg",
                        "https://radharidhani.in/img/fmn-3.jpg"




  ],
  "Couple Room": [
    "https://radharidhani.in/img/cr.jpg",
                            "https://radharidhani.in/img/cr-2.jpg",
                                                        "https://radharidhani.in/img/cr-3.jpg"

                            

  ],
  "Family Room": [
    "https://radharidhani.in/img/ssr.jpg",
    "https://radharidhani.in/img/ssr-1.jpg",
        "https://radharidhani.in/img/ssr-2.jpg",
            "https://radharidhani.in/img/ssr-3.jpg"



  ],
  "Friends Room": [
    "https://radharidhani.in/img/fm-1.jpg",
    "https://radharidhani.in/img/fm-2.jpg",
        "https://radharidhani.in/img/fm-3.jpg"


  ]
};

const getCarousel = (images, id) => (
  <div
    id={`carousel-${id}`}
    className="carousel slide me-3"
    data-bs-ride="carousel"
    style={{ width: "200px" }}
  >
    <div className="carousel-inner rounded">
      {images.map((url, index) => (
        <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
          <img src={url} className="d-block w-100" alt={`Room ${index + 1}`} />
        </div>
      ))}
    </div>
    {images.length > 1 && (
      <>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target={`#carousel-${id}`}
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" />
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target={`#carousel-${id}`}
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" />
        </button>
      </>
    )}
  </div>
);

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
  const [hasSearched, setHasSearched] = useState(false);

  const numberOfRooms = Math.max(1, Math.ceil(form.adults / 4));

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const checkinParam = params.get("checkin");
    const checkoutParam = params.get("checkout");
    const adultsParam = params.get("adults");
    const childrenParam = params.get("children");
    const roomsParam = params.get("rooms");

    const isValidDate = (str) => dayjs(str, "DD/MM/YYYY", true).isValid();

    setForm((prev) => ({
      ...prev,
      checkin: isValidDate(checkinParam) ? checkinParam : prev.checkin,
      checkout: isValidDate(checkoutParam) ? checkoutParam : prev.checkout,
      adults: adultsParam
        ? parseInt(adultsParam)
        : roomsParam
        ? parseInt(roomsParam) * 2
        : prev.adults,
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
    setHasSearched(true);

    if (!form.checkin || !form.checkout || form.adults === "" || form.children === "") {
      alert("Please fill all fields");
      return;
    }

    const checkinValid = dayjs(form.checkin, "DD/MM/YYYY", true).isValid();
    const checkoutValid = dayjs(form.checkout, "DD/MM/YYYY", true).isValid();

    if (!checkinValid || !checkoutValid) {
      alert("Invalid check-in or check-out date");
      return;
    }

    const formattedCheckin = dayjs(form.checkin, "DD/MM/YYYY").format("YYYY-MM-DD");
    const formattedCheckout = dayjs(form.checkout, "DD/MM/YYYY").format("YYYY-MM-DD");

    setLoading(true);
    try {
      const response = await axios.post("https://radharidhani.in/api/search-rooms", {
        checkin: formattedCheckin,
        checkout: formattedCheckout,
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
      <div className="container htfx py-4">
        {/* Search Section */}
        <div className="row g-4">
          <h1 style="color:#933830">Kanha Dham Radha Ri Dhani</h1>
          <div className="col-md-6">
            <div className="card p-4">
              <h3 className="mb-3">1. Search</h3>
              <label className="form-label">From</label>
              <DatePicker
                format="DD/MM/YYYY"
                value={form.checkin ? dayjs(form.checkin, "DD/MM/YYYY") : null}
                onChange={(newValue) =>
                  setForm((prev) => ({
                    ...prev,
                    checkin: dayjs(newValue).format("DD/MM/YYYY"),
                  }))
                }
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: "small",
                    className: "form-control",
                  },
                }}
              />
              <label className="form-label mt-3">To</label>
              <DatePicker
                format="DD/MM/YYYY"
                value={form.checkout ? dayjs(form.checkout, "DD/MM/YYYY") : null}
                onChange={(newValue) =>
                  setForm((prev) => ({
                    ...prev,
                    checkout: dayjs(newValue).format("DD/MM/YYYY"),
                  }))
                }
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: "small",
                    className: "form-control",
                  },
                }}
              />

              <div className="row mt-3">
                <div className="col">
                  <label className="form-label">Adults</label>
                  <div className="d-flex align-items-center gap-2">
                    <button className="btn btn-outline-secondary" onClick={() => handleCountChange("adults", -1)}>-</button>
                    <span>{form.adults}</span>
                    <button className="btn btn-outline-secondary" onClick={() => handleCountChange("adults", 1)}>+</button>
                  </div>
                </div>
                <div className="col">
                  <label className="form-label">Children</label>
                  <div className="d-flex align-items-center gap-2">
                    <button className="btn btn-outline-secondary" onClick={() => handleCountChange("children", -1)}>-</button>
                    <span>{form.children}</span>
                    <button className="btn btn-outline-secondary" onClick={() => handleCountChange("children", 1)}>+</button>
                  </div>
                </div>
              </div>

              <div className="alert alert-warning mt-3">
                Number of Rooms Needed: <strong>{numberOfRooms}</strong>
              </div>

              <button className="btn btn-warning w-100 mt-2" onClick={handleSubmit}>
                Check Availability
              </button>
            </div>
          </div>

          <div className="col-md-6">
            <div className="alert alert-success">
              Lock-in a great price, book your stay now! and get 50% off on your stay.
            </div>

            <div className="bg-light p-3 rounded">
              <ul className="mb-0">
                <li>Traditional Rajasthani hospitality with modern comforts</li>
                <li><b>FREE</b> access to all entertainment acitivties & Water Park</li>
                <li>Rajasthani Food</li>
                <li>Kids Zone</li>
                <li>Water Park & Indoor games</li>
                <li>Cultural Entertainment</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Room Results Section */}
        {hasSearched && (
          <div className="mt-5">
            <h3>
              2. Select Room ({form.adults} Adults, {form.children} Children, {numberOfRooms} Room{numberOfRooms > 1 ? "s" : ""})
            </h3>

            {loading ? (
              <p>Loading rooms...</p>
            ) : rooms.length === 0 ? (
              <p>No rooms found for selected dates.</p>
            ) : (
              rooms.map((room) => (
                <div key={room.id} className="card mt-3 p-3 d-flex flex-row align-items-center">
                  {getCarousel(roomImages[room.room_type] || ["https://via.placeholder.com/160x100"], room.id)}
                  <div>
                    <h5>{room.room_type}</h5>
                    <p>Room only — ₹{room.base_price}/night</p>
                    <p className="text-danger fw-bold">
                      In high demand! Only {room.total_inventory} rooms left
                    </p>
                    <button
                      className="btn btn-warning mt-2"
                      onClick={() => {
                        const formattedCheckin = dayjs(form.checkin, "DD/MM/YYYY").format("YYYY-MM-DD");
                        const formattedCheckout = dayjs(form.checkout, "DD/MM/YYYY").format("YYYY-MM-DD");

                        navigate("/booking", {
                          state: {
                            ...form,
                            checkin: formattedCheckin,
                            checkout: formattedCheckout,
                            room,
                          },
                        });
                      }}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </LocalizationProvider>
  );
}
