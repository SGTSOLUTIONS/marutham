import React, { useState, useEffect } from 'react';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Approach from './components/Approach';
import About from './components/About';
import Footer from './components/Footer';

import DonationModal from './components/DonationModal';
import PolicyModals from './components/PolicyModals';
import AboutPage from './components/AboutPage';
import MembersModal from './components/MembersModal';
import ContactPage from './components/ContactPage';
import GalleryPage from './components/GalleryPage';
import ProgramsPage from './components/ProgramsPage';
import GISExplorer from './components/GISExplorer';

// Note: FindingsPage import has been removed here

import { useFadeAnimation } from './hooks/useFadeAnimation';
import './index.css';

export default function App() {
  const [showDonation, setShowDonation] = useState(false);
  const [showMembers, setShowMembers] = useState(false);
  const [activePolicy, setActivePolicy] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');

  // State for mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useFadeAnimation();

  // Lock body scroll when modals are open
  useEffect(() => {
    const anyModalOpen = showDonation || showMembers || activePolicy !== null;
    document.body.style.overflow = anyModalOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showDonation, showMembers, activePolicy]);

  // Close mobile menu on page change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentPage]);

  const openPolicy = (key) => {
    setShowDonation(false);
    setActivePolicy(key);
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  if (currentPage === 'rd-projects') {
    return (
      <GISExplorer
        onBack={() => handleNavigate('programs')}
      />
    );
  }

  return (
    <>
      <div className="bg-wrapper"></div>

      <div className="container-custom app-responsive-shell">

        <Navbar
          onOpenDonate={() => setShowDonation(true)}
          currentPage={currentPage}
          onNavigate={handleNavigate}
          isMobileMenuOpen={isMobileMenuOpen}
          onToggleMobileMenu={toggleMobileMenu}
        />

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

        {/* Note: The currentPage === 'findings' block has been removed here */}

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

      <PolicyModals
        activePolicy={activePolicy}
        onClose={() => setActivePolicy(null)}
      />

      <MembersModal
        show={showMembers}
        onClose={() => setShowMembers(false)}
      />
    </>
  );
}