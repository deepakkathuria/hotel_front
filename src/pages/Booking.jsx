

// import { useLocation, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import axios from "axios";
// import dayjs from "dayjs";

// export default function Booking() {
//   const { state } = useLocation();
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     full_name: "",
//     email: "",
//     mobile: "",
//     gst_number: "",
//     special_request: "",
//   });

//   const { checkin, checkout, adults, children, room } = state;

//   const nights = Math.max(1, dayjs(checkout).diff(dayjs(checkin), "day"));
//   const discountedBasePrice = room.base_price * 0.5;
//   const subtotal = discountedBasePrice * nights;
//   const taxRate = 0.12;
//   const tax = Math.round(subtotal * (taxRate / (1 + taxRate))); // tax is included in subtotal
//   const total = subtotal; // no extra tax added

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async () => {
//     try {
//       await axios.post("https://radharidhani.in/api/confirm-booking", {
//         ...form,
//         checkin,
//         checkout,
//         room_id: room.id,
//         adults,
//         children,
//         addons: [],
//         subtotal,
//         tax,
//         total,
//       });
//       alert("✅ Booking Confirmed!");
//     } catch (err) {
//       console.error(err);
//       alert("❌ Failed to confirm booking");
//     }
//   };

//   return (
//     <div className="container py-4">
//       <h2 className="mb-3">Reservations</h2>

//       <div className="alert alert-light border-start border-warning">
//         ✅ 1. Search
//         <span className="ms-2 fw-normal">
//           {checkin} - {checkout} / {adults} Adults, {children} Children
//         </span>
//         <button
//           className="btn btn-sm btn-warning ms-3"
//           onClick={() => {
//             const formattedCheckin = dayjs(checkin).format("DD/MM/YYYY");
//             const formattedCheckout = dayjs(checkout).format("DD/MM/YYYY");

//             navigate(
//               `/?checkin=${formattedCheckin}&checkout=${formattedCheckout}&adults=${adults}&children=${children}&edit=true`
//             );
//           }}
//         >
//           ✏️ Edit
//         </button>
//       </div>

//       <div className="alert alert-light border-start border-warning">
//         ✅ 2. Select Room
//         <span className="ms-2 fw-normal">
//           {room.room_type} - ₹{room.base_price} / night
//         </span>
//       </div>

//       <div className="alert alert-dark">4. Guest Information</div>

//       <div className="row g-4">
//         <div className="col-md-6">
//           <input
//             type="text"
//             name="full_name"
//             className="form-control mb-3"
//             placeholder="Full Name"
//             onChange={handleChange}
//           />

//           <div className="d-flex gap-3 mb-3">
//             <input
//               type="email"
//               name="email"
//               className="form-control"
//               placeholder="Email Address"
//               onChange={handleChange}
//             />
//             <input
//               type="tel"
//               name="mobile"
//               className="form-control"
//               placeholder="Phone Number"
//               onChange={handleChange}
//             />
//           </div>

//           <input
//             type="text"
//             name="gst_number"
//             className="form-control mb-3"
//             placeholder="GST Number (Optional)"
//             onChange={handleChange}
//           />

//           <textarea
//             name="special_request"
//             className="form-control mb-3"
//             placeholder="Special Requests"
//             rows={4}
//             onChange={handleChange}
//           />

//           <div className="alert alert-success">
//             ✅ Book your stay before the prices go up!<br />
//             <strong className="text-success">
//               Book risk free! Cancel for free anytime before 11:59 PM on Jun 5, 2025
//             </strong>
//           </div>

//           <p className="text-muted small">
//             By completing this reservation you are accepting our{" "}
//             <span className="fw-bold text-warning">Terms & Conditions</span>
//           </p>

//           <button className="btn btn-warning w-100" onClick={handleSubmit}>
//             Book Now & Pay Later
//           </button>
//         </div>

//         <div className="col-md-6">
//           <div className="card p-3 bg-light">
//             <div className="d-flex justify-content-between mb-2">
//               <strong>Check In</strong>
//               <span>{checkin}</span>
//             </div>
//             <div className="d-flex justify-content-between mb-2">
//               <strong>Check Out</strong>
//               <span>{checkout}</span>
//             </div>
//             <div className="d-flex justify-content-between mb-2">
//               <strong>No. of Nights</strong>
//               <span>
//                 {nights} Night{nights > 1 ? "s" : ""}
//               </span>
//             </div>
//             <div className="d-flex justify-content-between mb-2">
//               <strong>Room</strong>
//               <span>{room.room_type}</span>
//             </div>
//             <div className="d-flex justify-content-between mb-2">
//               <strong>Guests</strong>
//               <span>
//                 {adults} Adults, {children} Children
//               </span>
//             </div>
//             <hr />
//             <div className="d-flex justify-content-between mb-2">
//               <strong>Room only (50% OFF)</strong>
//               <span>
//                 ₹{room.base_price} → ₹{discountedBasePrice} x {nights} = ₹{subtotal}
//               </span>
//             </div>
//             <div className="d-flex justify-content-between mb-2">
//               <strong>Sub Total (Tax Included)</strong>
//               <span>₹{subtotal}</span>
//             </div>
//             <div className="d-flex justify-content-between mb-2">
//               <strong>Included Tax</strong>
//               <span>₹{tax}</span>
//             </div>
//             <hr />
//             <div className="d-flex justify-content-between mb-2">
//               <strong>Grand Total</strong>
//               <span className="fw-bold text-dark fs-5">₹{total}</span>
//             </div>
//             <div className="d-flex justify-content-between mb-2">
//               <strong>Pay Now</strong>
//               <span className="text-success">₹0.00</span>
//             </div>
//             <div className="d-flex justify-content-between">
//               <strong>Balance (Pay Later)</strong>
//               <span className="fw-bold text-dark">₹{total}</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useLocation, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import axios from "axios";
import dayjs from "dayjs";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function Booking() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const modalRef = useRef(null);

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    mobile: "",
    gst_number: "",
    special_request: "",
  });

  const { checkin, checkout, adults, children, room } = state;

  const nights = Math.max(1, dayjs(checkout).diff(dayjs(checkin), "day"));
  const discountedBasePrice = room.base_price * 0.5;
  const subtotal = discountedBasePrice * nights;
  const taxRate = 0.12;
  const tax = Math.round(subtotal * (taxRate / (1 + taxRate)));
  const total = subtotal;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post("https://radharidhani.in/api/confirm-booking", {
        ...form,
        checkin,
        checkout,
        room_id: room.id,
        adults,
        children,
        addons: [],
        subtotal,
        tax,
        total,
      });

      if (modalRef.current) {
        const modal = new window.bootstrap.Modal(modalRef.current);
        modal.show();
      }

      setTimeout(() => {
        navigate("/");
      }, 5000); // 10 seconds
    } catch (err) {
      console.error(err);
      alert("❌ Failed to confirm booking");
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-3">Reservations</h2>

      <div className="alert alert-light border-start border-warning">
        ✅ 1. Search
        <span className="ms-2 fw-normal">
          {checkin} - {checkout} / {adults} Adults, {children} Children
        </span>
        <button
          className="btn btn-sm btn-warning ms-3"
          onClick={() => {
            const formattedCheckin = dayjs(checkin).format("DD/MM/YYYY");
            const formattedCheckout = dayjs(checkout).format("DD/MM/YYYY");

            navigate(
              `/?checkin=${formattedCheckin}&checkout=${formattedCheckout}&adults=${adults}&children=${children}&edit=true`
            );
          }}
        >
          ✏️ Edit
        </button>
      </div>

      <div className="alert alert-light border-start border-warning">
        ✅ 2. Select Room
        <span className="ms-2 fw-normal">
          {room.room_type} - ₹{room.base_price} / night
        </span>
      </div>

      <div className="alert alert-dark">4. Guest Information</div>

      <div className="row g-4">
        <div className="col-md-6">
          <input
            type="text"
            name="full_name"
            className="form-control mb-3"
            placeholder="Full Name"
            onChange={handleChange}
          />

          <div className="d-flex gap-3 mb-3">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email Address"
              onChange={handleChange}
            />
            <input
              type="tel"
              name="mobile"
              className="form-control"
              placeholder="Phone Number"
              onChange={handleChange}
            />
          </div>

          <input
            type="text"
            name="gst_number"
            className="form-control mb-3"
            placeholder="GST Number (Optional)"
            onChange={handleChange}
          />

          <textarea
            name="special_request"
            className="form-control mb-3"
            placeholder="Special Requests"
            rows={4}
            onChange={handleChange}
          />

          <div className="alert alert-success">
            ✅ Book your stay before the prices go up!<br />
            <strong className="text-success">
              Book risk free! Cancel for free anytime before 11:59 PM on Jun 5, 2025
            </strong>
          </div>

          <p className="text-muted small">
            By completing this reservation you are accepting our{" "}
            <span className="fw-bold text-warning">Terms & Conditions</span>
          </p>

          <button className="btn btn-warning w-100" onClick={handleSubmit}>
            Book Now & Pay Later
          </button>
        </div>

        <div className="col-md-6">
          <div className="card p-3 bg-light">
            <div className="d-flex justify-content-between mb-2">
              <strong>Check In</strong>
              <span>{checkin}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <strong>Check Out</strong>
              <span>{checkout}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <strong>No. of Nights</strong>
              <span>
                {nights} Night{nights > 1 ? "s" : ""}
              </span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <strong>Room</strong>
              <span>{room.room_type}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <strong>Guests</strong>
              <span>
                {adults} Adults, {children} Children
              </span>
            </div>
            <hr />
            <div className="d-flex justify-content-between mb-2">
              <strong>Room only (50% OFF)</strong>
              <span>
                ₹{room.base_price} → ₹{discountedBasePrice} x {nights} = ₹{subtotal}
              </span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <strong>Sub Total (Tax Included)</strong>
              <span>₹{subtotal}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <strong>Included Tax</strong>
              <span>₹{tax}</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between mb-2">
              <strong>Grand Total</strong>
              <span className="fw-bold text-dark fs-5">₹{total}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <strong>Pay Now</strong>
              <span className="text-success">₹0.00</span>
            </div>
            <div className="d-flex justify-content-between">
              <strong>Balance (Pay Later)</strong>
              <span className="fw-bold text-dark">₹{total}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Confirmation Modal */}
      <div
        className="modal fade"
        ref={modalRef}
        tabIndex="-1"
        aria-labelledby="bookingSuccessModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content text-center">
            <div className="modal-header bg-success text-white">
              <h5 className="modal-title w-100" id="bookingSuccessModalLabel">
                Booking Confirmed
              </h5>
            </div>
            <div className="modal-body">
              🎉 <strong>Your booking has been successfully confirmed!</strong>
              <br />
              {/* <br />
              Redirecting to homepage in <strong>10 seconds...</strong>
              <br /> */}
              {/* <span className="text-muted small">Please wait...</span> */}
            </div>
            <div className="modal-footer justify-content-center">
              <button
                type="button"
                className="btn btn-outline-success"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
