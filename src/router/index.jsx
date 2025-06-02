import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Booking from '../pages/Booking';
import SearchRooms from '../pages/SearchRooms';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/booking" element={<Booking />} />
        <Route path="/" element={<SearchRooms />} />


      </Routes>
    </BrowserRouter>
  );
}