import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import InvitationPage from './pages/InvitationPage';
import GuestListPage from './pages/GuestListPage';

function RedirectGuest() {
  const { guestParam } = useParams();
  return <Navigate to={`/undanganidindanfitra/to/${guestParam}`} replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Halaman Undangan */}
        <Route path="/undanganidindanfitra" element={<InvitationPage />} />
        <Route path="/undanganidindanfitra/to/:guestParam" element={<InvitationPage />} />

        {/* Redirect lama */}
        <Route path="/" element={<Navigate to="/undanganidindanfitra" replace />} />
        <Route path="/undangan" element={<Navigate to="/undanganidindanfitra" replace />} />
        <Route path="/to/:guestParam" element={<RedirectGuest />} />

        {/* Halaman Manajemen Tamu */}
        <Route path="/tamu" element={<GuestListPage />} />
        <Route path="/share" element={<GuestListPage />} />

        {/* Redirect admin lama */}
        <Route path="/edit" element={<Navigate to="/tamu" replace />} />
        <Route path="/admin" element={<Navigate to="/tamu" replace />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/undanganidindanfitra" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
