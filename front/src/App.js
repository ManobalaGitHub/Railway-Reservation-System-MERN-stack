import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import User from './User';
import Dashboard from './Dashboard';
import PNRStatus from './PNRStatus';
import BookingForm from './BookingForm';
import BookingDetails from './BookingDetails';
import CancelPage from './CancelPage';
import Profile from './Profile';
import PaymentPage from './PaymentPage';
import AdminDashboard from './AdminDashboard';
import ManageTickets from './ManageTickets';
import TrainSchedule from './TrainSchedule';
import ScheduleTrainForm from './ScheduleTrainForm';
import Reservation from './Reservation';
import Refund from './Refund'; 
import Admin from './admin';
import ProtectedRoute from './ProtectedRoute';
import PaymentMethodPage from './PaymentMethodPage';
function App() {
  return (
    <Router>
      <Routes>
  
        <Route path="/dashboard" element={<Dashboard />} />
    
        <Route path="/pnrstatus" element={<PNRStatus />} />
        <Route path="/BookingForm" element={<BookingForm />} />
        <Route path="/bookingdetails" element={<BookingDetails />} />
        <Route path="/cancelpage" element={<CancelPage />} />
        <Route path="/Profile" element={<Profile/>}/>
        <Route path="/paymentpage" element={<PaymentPage />} />  
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/manage-tickets" element={<ManageTickets />} />
        <Route path="/trainschedule" element={<TrainSchedule />} />
       <Route path="/scheduletrainform" element={<ScheduleTrainForm/>}/>
       <Route path="/paymentmethodpage " element={<PaymentMethodPage />}/>
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/refund" element={<Refund />} />
        <Route path="/User" element={<User/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
       </Routes>
    </Router>
  );
}

export default App;
