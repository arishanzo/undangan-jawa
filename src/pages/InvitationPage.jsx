import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import CoverOpening from '../components/CoverOpening';
import HeroSection from '../components/HeroSection';
import QuoteSection from '../components/QuoteSection';
import CoupleSection from '../components/CoupleSection';
import EventsSection from '../components/EventsSection';
import TimelineSection from '../components/TimelineSection';
import GallerySection from '../components/GallerySection';
import GiftsSection from '../components/GiftsSection';
import RsvpSection from '../components/RsvpSection';
import ClosingSection from '../components/ClosingSection';
import AudioPlayer from '../components/AudioPlayer';
import Petals from '../components/Petals';
import Toast from '../components/Toast';
import { getStoredData, getStoredWishes, saveStoredWishes } from '../data/defaultData';

export default function InvitationPage() {
  const { guestParam } = useParams();
  const [searchParams] = useSearchParams();
  const [data, setData] = useState(getStoredData());
  const [wishes, setWishes] = useState(getStoredWishes());
  const [isOpened, setIsOpened] = useState(false);
  const [autoPlayAudio, setAutoPlayAudio] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Extract personalized guest name from param (/to/:guestParam) or query string (?to=...)
  const guestQuery = searchParams.get('to') || searchParams.get('u') || searchParams.get('kepada');
  const rawGuestName = guestParam ? decodeURIComponent(guestParam) : (guestQuery || '');
  const guestName = rawGuestName.trim() || 'Bapak / Ibu / Saudara / i';

  useEffect(() => {
    // Read latest data from storage
    setData(getStoredData());
    setWishes(getStoredWishes());
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3200);
  };

  const handleOpenEnvelope = () => {
    setIsOpened(true);
    setAutoPlayAudio(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopy = (text, successMsg) => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text)
        .then(() => showToast(successMsg))
        .catch(() => fallbackCopy(text, successMsg));
    } else {
      fallbackCopy(text, successMsg);
    }
  };

  const fallbackCopy = (text, successMsg) => {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    showToast(successMsg);
  };

  const handleAddWish = (newWish) => {
    const updated = [
      { id: 'w-' + Date.now(), ...newWish },
      ...wishes
    ];
    setWishes(updated);
    saveStoredWishes(updated);
  };

  return (
    <>
      <div className="desktop-backdrop" />

      {/* Floating Audio Player */}
      <AudioPlayer musicUrl={data.music?.url} autoPlayTrigger={autoPlayAudio} />

      {/* Gunungan Opening Cover */}
      <CoverOpening 
        data={data} 
        guestName={guestName} 
        isOpened={isOpened} 
        onOpen={handleOpenEnvelope} 
      />

      {/* Petals — hanya tampil setelah undangan dibuka */}
      {isOpened && <Petals count={22} />}

      {/* Main Invitation Body */}
      <main className="invitation-wrapper batik-pattern-overlay">
        <HeroSection data={data} />
        <QuoteSection data={data} />
        <CoupleSection data={data} />
        <EventsSection data={data} />
        <GiftsSection data={data} onCopy={handleCopy} />
        <RsvpSection 
          guestName={rawGuestName} 
          wishes={wishes} 
          onAddWish={handleAddWish} 
          onNotify={showToast}
          data={data}
        />
        <ClosingSection data={data} />
      </main>

      {/* Toast Notification */}
      <Toast message={toastMessage} />
    </>
  );
}
