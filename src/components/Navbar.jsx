
import React from 'react';

const NAV_LINKS = [
    { id: 'home', icon: 'fa-home', label: 'Home' },
    { id: 'about', icon: 'fa-seedling', label: 'Who we are' },
    { id: 'programs', icon: 'fa-leaf', label: 'What we do' },
    { id: 'gallery', icon: 'fa-image', label: 'Gallery' },
    { id: 'contact', icon: 'fa-envelope', label: 'Contact' },
];

export default function Navbar({
    onOpenDonate,
    currentPage,
    onNavigate
}) {
    return (
        <div className="navbar-heritage-shell">

            <nav className="navbar navbar-expand-lg navbar-aef">

                <div className="container-fluid px-2 px-lg-3">

                    {/* Foundation Brand with Logo */}
                    <a
                        className="navbar-brand heritage-brand"
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            onNavigate('home');
                        }}
                    >
                        <img
                            src="/Images/foundation-logo.jpeg?v=2"
                            alt="Marutham Foundation"
                            className="hero-logo"
                            onError={(e) => console.log("Logo failed:", e.currentTarget.src)}
                        />

                        <span className="heritage-brand-name">
                            Marutham Foundation
                        </span>
                    </a>

                    {/* Mobile Toggle */}
                    <button
                        className="navbar-toggler heritage-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#mainNav"
                        aria-controls="mainNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <i className="fas fa-bars"></i>
                    </button>

                    {/* Navigation Links */}
                    <div
                        className="collapse navbar-collapse"
                        id="mainNav"
                    >
                        <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">

                            {NAV_LINKS.map((link) => (
                                <li className="nav-item" key={link.id}>
                                    <a
                                        className={`nav-link nav-link-aef ${currentPage === link.id ? 'active' : ''
                                            }`}
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            onNavigate(link.id);
                                        }}
                                    >
                                        <i className={`fas ${link.icon} me-1`}></i>
                                        {link.label}
                                    </a>
                                </li>
                            ))}

                            {/* Donate Button */}
                            <li className="nav-item ms-lg-2">
                                <button
                                    type="button"
                                    className="btn btn-donate-aef"
                                    onClick={onOpenDonate}
                                >
                                    <i className="fas fa-heart me-2"></i>
                                    Donate Now
                                </button>
                            </li>

                        </ul>
                    </div>

                </div>

            </nav>

        </div>
    );
}
