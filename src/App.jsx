import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import InvitationPage from './pages/InvitationPage';
import GuestListPage from './pages/GuestListPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Halaman Undangan Khusus Tamu */}
        <Route path="/" element={<InvitationPage />} />
        <Route path="/undangan" element={<InvitationPage />} />
        <Route path="/to/:guestParam" element={<InvitationPage />} />

        {/* Halaman Manajemen Nama Tamu & Generator Link WhatsApp */}
        <Route path="/tamu" element={<GuestListPage />} />
        <Route path="/share" element={<GuestListPage />} />

        {/* Redirect route lama (/edit dan /admin) langsung ke /tamu */}
        <Route path="/edit" element={<Navigate to="/tamu" replace />} />
        <Route path="/admin" element={<Navigate to="/tamu" replace />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
