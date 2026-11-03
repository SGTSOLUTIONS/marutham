import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Approach from './components/Approach';
import About from './components/About';
import Footer from './components/Footer';
import DonationModal from './components/DonationModal';
import PolicyModals from './components/PolicyModals';
import AboutPage from './components/AboutPage';
import MembersModal from './components/MembersModal';
import ContactPage from './components/ContactPage'; // <-- New
import GalleryPage from './components/GalleryPage'; // <-- New
import FindingsPage from './components/FindingsPage'; // <-- New
import ProgramsPage from './components/ProgramsPage'; // <-- New
import { useFadeAnimation } from './hooks/useFadeAnimation';
import './index.css';
export default function App() {
  const [showDonation, setShowDonation] = useState(false);
  const [showMembers, setShowMembers] = useState(false);
  const [activePolicy, setActivePolicy] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');

  useFadeAnimation();

  const openPolicy = (key) => {
    setShowDonation(false);
    setActivePolicy(key);
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <div className="bg-wrapper"></div>
      <div className="container-custom">
        <Navbar
          onOpenDonate={() => setShowDonation(true)}
          currentPage={currentPage}
          onNavigate={handleNavigate}
        />

        {/* --- Page Rendering Logic --- */}
        {currentPage === 'home' && (
          <>
            <Hero onNavigate={handleNavigate} />
            <Approach />
            <About />
          </>
        )}
        {currentPage === 'about' && (
          <AboutPage onOpenMembersModal={() => setShowMembers(true)} />
        )}
        {currentPage === 'programs' && (
          <ProgramsPage onNavigate={handleNavigate} />
        )}
        {currentPage === 'gallery' && (
          <GalleryPage />
        )}
        {currentPage === 'contact' && (
          <ContactPage />
        )}
        {currentPage === 'findings' && (
          <FindingsPage onNavigate={handleNavigate} />
        )}

        <Footer
          onOpenModal={openPolicy}
          onNavigate={handleNavigate}
        />
      </div>

      <DonationModal
        show={showDonation}
        onClose={() => setShowDonation(false)}
        onOpenModal={openPolicy}
      />

      <PolicyModals activePolicy={activePolicy} onClose={() => setActivePolicy(null)} />

      <MembersModal show={showMembers} onClose={() => setShowMembers(false)} />
    </>
  );
}