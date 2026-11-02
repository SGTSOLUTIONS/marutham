import React from 'react';

const NAV_LINKS = [
    { id: 'home', icon: 'fa-home', label: 'Home' },
    { id: 'about', icon: 'fa-seedling', label: 'Who we are' },
    { id: 'programs', icon: 'fa-leaf', label: 'What we do' },
    { id: 'gallery', icon: 'fa-image', label: 'Gallery' },
    { id: 'contact', icon: 'fa-envelope', label: 'Contact' },
];

const LOGO_FALLBACK = "data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Ccircle cx=%2250%22 cy=%2250%22 r=%2245%22 fill=%22%2348A111%22 /%3E%3Ctext x=%2220%22 y=%2265%22 font-size=%2230%22 fill=%22%23F7F0F0%22%3EMF%3C/text%3E%3C/svg%3E";

export default function Navbar({ onOpenDonate, currentPage, onNavigate }) {
    return (
        <nav className="navbar navbar-expand-lg navbar-aef">
            <div className="container-fluid px-0">
                <a className="navbar-brand d-flex align-items-center gap-3" href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>
                    <img src="Logo JPG.jpg.jpeg" alt="Marutham" width="48" height="48" className="logo-img" onError={(e) => (e.currentTarget.src = LOGO_FALLBACK)} />
                    <span>Marutham <span>Foundation</span></span>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
                    <i className="fas fa-bars"></i>
                </button>
                <div className="collapse navbar-collapse" id="mainNav">
                    <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-1 mt-2 mt-lg-0">
                        {NAV_LINKS.map((link) => (
                            <li className="nav-item" key={link.id}>
                                <a
                                    className={`nav-link nav-link-aef ${currentPage === link.id ? 'active' : ''}`}
                                    href="#"
                                    onClick={(e) => { e.preventDefault(); onNavigate(link.id); }}
                                >
                                    <i className={`fas ${link.icon} me-1`}></i>
                                    {link.label}
                                </a>
                            </li>
                        ))}
                        <li className="nav-item ms-lg-2">
                            <button className="btn btn-donate-aef" onClick={onOpenDonate}>
                                <i className="fas fa-heart me-2"></i>Donate Now
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}