import React from 'react';

export default function Navbar({
    onOpenDonate,
    currentPage,
    onNavigate,
    isMobileMenuOpen,
    onToggleMobileMenu,
}) {
    const links = [
        { key: 'home', label: 'Home', icon: 'fa-home' },
        { key: 'about', label: 'About', icon: 'fa-users' },
        { key: 'programs', label: 'Programs', icon: 'fa-leaf' },
        { key: 'gallery', label: 'Gallery', icon: 'fa-images' },
        // { key: 'findings', label: 'Findings', icon: 'fa-chart-pie' },  <-- Removed this line
        { key: 'contact', label: 'Contact', icon: 'fa-envelope' },
    ];

    return (
        <div className="navbar-heritage-shell">
            <nav className="navbar-aef navbar navbar-expand-lg">
                <div className="container-fluid px-0">

                    {/* Brand Logo + Name */}
                    <a
                        className="navbar-brand heritage-brand d-flex align-items-center"
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            onNavigate('home');
                        }}
                    >
                        <img src="/logo.jpeg" alt="Marutham Foundation" className="hero-logo" />
                        <span className="heritage-brand-name ms-2">Marutham Foundation</span>
                    </a>

                    {/* Mobile Hamburger Toggle Button */}
                    <button
                        className="navbar-toggler heritage-toggler d-lg-none"
                        type="button"
                        onClick={onToggleMobileMenu}
                        aria-label="Toggle navigation"
                        aria-expanded={isMobileMenuOpen}
                    >
                        <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                    </button>

                    {/* Collapsible Menu Wrapper */}
                    <div className={`collapse navbar-collapse ${isMobileMenuOpen ? 'show' : ''}`}>
                        <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
                            {links.map((link) => (
                                <li className="nav-item" key={link.key}>
                                    <a
                                        className={`nav-link nav-link-aef ${currentPage === link.key ? 'active' : ''}`}
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            onNavigate(link.key);
                                        }}
                                    >
                                        <i className={`fas ${link.icon} me-2 d-lg-none`}></i>
                                        {link.label}
                                    </a>
                                </li>
                            ))}

                            {/* Donate Button */}
                            <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
                                <button
                                    className="btn-donate-aef"
                                    type="button"
                                    onClick={onOpenDonate}
                                >
                                    <i className="fas fa-heart me-2"></i>
                                    Donate
                                </button>
                            </li>
                        </ul>
                    </div>

                </div>
            </nav>
        </div>
    );
}