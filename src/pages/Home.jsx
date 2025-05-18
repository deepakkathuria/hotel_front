



// import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';

// export default function Home() {
//   const [form, setForm] = useState({ checkin: '', checkout: '', adults: '', children: '' });
//   const navigate = useNavigate();

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = () => {
//     if (!form.checkin || !form.checkout || !form.adults || !form.children) {
//       alert('Please fill all fields');
//       return;
//     }
//     navigate('/booking', { state: form });
//   };

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.heading}>Book Your Stay</h2>
//       <input type="date" name="checkin" onChange={handleChange} style={styles.input} placeholder="Check-in" />
//       <input type="date" name="checkout" onChange={handleChange} style={styles.input} placeholder="Check-out" />
//       <input type="number" name="adults" onChange={handleChange} style={styles.input} placeholder="Adults" />
//       <input type="number" name="children" onChange={handleChange} style={styles.input} placeholder="Children" />
//       <button onClick={handleSubmit} style={styles.button}>Check Availability</button>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     maxWidth: 400,
//     margin: '50px auto',
//     padding: 25,
//     background: '#f7f7f7',
//     borderRadius: 10,
//     boxShadow: '0 0 15px rgba(0,0,0,0.1)'
//   },
//   heading: {
//     textAlign: 'center',
//     marginBottom: 20,
//     color: '#333'
//   },
//   input: {
//     width: '100%',
//     padding: 12,
//     margin: '10px 0',
//     border: '1px solid #ccc',
//     borderRadius: 6,
//     fontSize: 16
//   },
//   button: {
//     width: '100%',
//     padding: 12,
//     backgroundColor: '#0066cc',
//     color: 'white',
//     fontSize: 16,
//     border: 'none',
//     borderRadius: 6,
//     cursor: 'pointer'
//   }
// };






import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Home() {
  const [form, setForm] = useState({
    checkin: '',
    checkout: '',
    adults: '',
    children: '',
    number_of_rooms: 1,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };

    // Auto-calculate number of rooms based on adults
    if (name === 'adults') {
      const adults = parseInt(value) || 0;
      updatedForm.number_of_rooms = Math.max(1, Math.ceil(adults / 4));
    }

    setForm(updatedForm);
  };

  const handleSubmit = () => {
    const { checkin, checkout, adults, children } = form;
    if (!checkin || !checkout || !adults || !children) {
      alert('Please fill all fields');
      return;
    }

    navigate('/booking', { state: form });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Book Your Stay</h2>
      <input type="date" name="checkin" onChange={handleChange} style={styles.input} placeholder="Check-in" />
      <input type="date" name="checkout" onChange={handleChange} style={styles.input} placeholder="Check-out" />
      <input type="number" name="adults" onChange={handleChange} style={styles.input} placeholder="Adults" />
      <input type="number" name="children" onChange={handleChange} style={styles.input} placeholder="Children" />
      <input
        type="number"
        name="number_of_rooms"
        value={form.number_of_rooms}
        readOnly
        style={{ ...styles.input, backgroundColor: '#eee' }}
        placeholder="Rooms (auto)"
      />
      <button onClick={handleSubmit} style={styles.button}>Check Availability</button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 400,
    margin: '50px auto',
    padding: 25,
    background: '#f7f7f7',
    borderRadius: 10,
    boxShadow: '0 0 15px rgba(0,0,0,0.1)'
  },
  heading: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#333'
  },
  input: {
    width: '100%',
    padding: 12,
    margin: '10px 0',
    border: '1px solid #ccc',
    borderRadius: 6,
    fontSize: 16
  },
  button: {
    width: '100%',
    padding: 12,
    backgroundColor: '#0066cc',
    color: 'white',
    fontSize: 16,
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer'
  }
};
