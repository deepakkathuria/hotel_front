import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function Booking() {
  const { state } = useLocation();
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    mobile: '',
    gst_number: '',
    special_request: '',
  });

  const { checkin, checkout, adults, children, room } = state;
  const subtotal = room.base_price;
  const tax = Math.round(subtotal * 0.12); // assume 12% GST
  const total = subtotal + tax;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post('https://radharidhani.in/api/confirm-booking', {
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
      alert('✅ Booking Confirmed!');
    } catch (err) {
      console.error(err);
      alert('❌ Failed to confirm booking');
    }
  };

  return (
    <div style={pageStyle}>
      <h2 style={headerStyle}>Reservations</h2>

      <div style={stepStyle}>✅ 1. Search <span style={{ fontWeight: 400, marginLeft: 10 }}>{checkin} - {checkout} / {adults} Adults, {children} Children</span></div>
      <div style={stepStyle}>✅ 2. Select Room <span style={{ fontWeight: 400, marginLeft: 10 }}>{room.room_type} - ₹{room.base_price} / night</span></div>
      <div style={stepStyle}>✅ 3. Enhance Your Stay <span style={{ fontWeight: 400, marginLeft: 10 }}>None selected</span></div>
      <div style={stepActiveStyle}>4. Guest Information</div>

      <div style={layoutStyle}>
        {/* LEFT: FORM */}
        <div style={formBoxStyle}>
          <input type="text" name="full_name" placeholder="First Name and Last Name" onChange={handleChange} style={inputStyle} />
          <div style={{ display: 'flex', gap: 10 }}>
            <input type="email" name="email" placeholder="Email Address" onChange={handleChange} style={{ ...inputStyle, flex: 1 }} />
            <input type="tel" name="mobile" placeholder="Phone Number" onChange={handleChange} style={{ ...inputStyle, flex: 1 }} />
          </div>
          <input type="text" name="gst_number" placeholder="GST Number (Optional)" onChange={handleChange} style={inputStyle} />
          <textarea name="special_request" placeholder="Special Requests" onChange={handleChange} style={{ ...inputStyle, height: 80 }} />

          <p style={successNote}>Book your stay before the prices go up!<br />
            <span style={{ color: 'green' }}>Book risk free! Cancel for free anytime before 11:59 PM on Jun 5, 2025</span>
          </p>

          <p style={{ fontSize: 12, color: '#444' }}>
            By completing this reservation you are accepting our <span style={{ color: '#b59a45', fontWeight: 'bold' }}>Terms & Conditions</span>
          </p>

          <button onClick={handleSubmit} style={submitButton}>Book Now & Pay Later</button>
        </div>

        {/* RIGHT: SUMMARY */}
        <div style={summaryStyle}>
          <div style={summaryRow}><strong>Check In</strong><span>{checkin}</span></div>
          <div style={summaryRow}><strong>Check Out</strong><span>{checkout}</span></div>
          <div style={summaryRow}><strong>No. of Nights</strong><span>1 Night</span></div>
          <div style={summaryRow}><strong>Room</strong><span>{room.room_type}</span></div>
          <div style={summaryRow}><strong>Guests</strong><span>{adults} Adults, {children} Children</span></div>

          <hr />

          <div style={summaryRow}><strong>Room only</strong><span>₹{subtotal}</span></div>
          <div style={summaryRow}><strong>Sub Total</strong><span>₹{subtotal}</span></div>
          <div style={summaryRow}><strong>Taxes and Fees</strong><span>₹{tax}</span></div>

          <hr />

          <div style={summaryRow}><strong>Grand Total</strong><span style={{ fontSize: 18, fontWeight: 'bold' }}>INR ₹{total}</span></div>
          <div style={summaryRow}><strong>Pay Now</strong><span style={{ color: 'green' }}>₹0.00</span></div>
          <div style={summaryRow}><strong>Balance (Pay Later)</strong><span style={{ fontWeight: 'bold' }}>INR ₹{total}</span></div>
        </div>
      </div>
    </div>
  );
}

const pageStyle = {
  width: '100vw', // ✅ instead of maxWidth: 1000
  padding: '30px 50px',
  fontFamily: 'Segoe UI, sans-serif',
  background: '#fff',
  color: '#222',
  boxSizing: 'border-box',
};


const headerStyle = {
  fontSize: 24,
  marginBottom: 10,
  borderBottom: '1px solid #ccc',
  paddingBottom: 5
};

const stepStyle = {
  background: '#f8f8f8',
  padding: '10px 15px',
  marginTop: 10,
  borderLeft: '5px solid #b59a45',
  fontWeight: 600
};

const stepActiveStyle = {
  ...stepStyle,
  background: '#444',
  color: '#fff'
};

const layoutStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: 40,
  marginTop: 30,
  flexWrap: 'wrap',
};


const formBoxStyle = {
  flex: 1,
  minWidth: 320
};

const summaryStyle = {
  flex: 1,
  minWidth: 320,
  border: '1px solid #ccc',
  borderRadius: 6,
  padding: 20,
  background: '#f9f9f9'
};

const summaryRow = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: 10,
  fontSize: 14
};

const inputStyle = {
  width: '100%',
  padding: 10,
  marginBottom: 12,
  border: '1px solid #ccc',
  borderRadius: 5
};

const submitButton = {
  width: '100%',
  padding: 14,
  background: '#b59a45',
  color: 'white',
  fontSize: 16,
  border: 'none',
  borderRadius: 6,
  cursor: 'pointer',
  marginTop: 10
};

const successNote = {
  marginTop: 10,
  fontSize: 14,
  color: 'green'
};
