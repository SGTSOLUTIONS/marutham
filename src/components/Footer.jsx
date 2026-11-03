
import React from 'react';

export default function Footer({ onOpenModal, onNavigate }) {

    const footerGroups = [
        {
            title: 'Programs',
            links: [
                { label: 'Education', page: 'programs' },
                { label: 'Environment', page: 'programs' },
                { label: 'Livelihood', page: 'programs' },
                { label: 'Cattle Care', page: 'programs' },
            ],
        },
        {
            title: 'About',
            links: [
                { label: 'Our Story', page: 'about' },
                { label: 'Our Team', page: 'about' },
                { label: 'Our Approach', page: 'home' },
                { label: 'Contact', page: 'contact' },
            ],
        },
        {
            title: 'Quick Links',
            links: [
                { label: 'Home', page: 'home' },
                { label: 'Gallery', page: 'gallery' },
                { label: 'What We Do', page: 'programs' },
                { label: 'Contact', page: 'contact' },
            ],
        },
    ];

    const policies = [
        {
            key: 'pricing',
            label: 'Pricing Policy',
            icon: 'fa-hand-holding-heart',
        },
        {
            key: 'refund',
            label: 'Refund Policy',
            icon: 'fa-undo-alt',
        },
        {
            key: 'cancellation',
            label: 'Cancellation Policy',
            icon: 'fa-times-circle',
        },
        {
            key: 'terms',
            label: 'Terms & Conditions',
            icon: 'fa-file-contract',
        },
    ];

    return (
        <footer className="footer-heritage">

            {/* Decorative top border */}
            <div className="footer-top-ornament">
                <span>❧</span>
                <i className="fas fa-leaf"></i>
                <span>❧</span>
            </div>

            <div className="row g-4 footer-main-content">

                {/* Foundation information */}
                <div className="col-lg-4 col-md-12">

                    <div className="footer-brand-area">

                        <img
                            src="/Images/foundation-logo.jpeg"
                            alt="Marutham Foundation"
                            className="footer-foundation-logo"
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                            }}
                        />

                        <div>
                            <h3 className="footer-brand-title">
                                Marutham <span>Foundation</span>
                            </h3>

                            <p className="footer-tagline">
                                The Light of Nature, the Guarantee of Life
                            </p>
                        </div>

                    </div>

                    <p className="footer-description">
                        Nurturing nature, empowering communities and
                        building a sustainable future through education,
                        environmental protection and rural development.
                    </p>

                    <div className="footer-social-decoration">
                        <i className="fas fa-leaf"></i>
                        <span>Nature · Education · Community</span>
                        <i className="fas fa-seedling"></i>
                    </div>

                </div>

                {/* Footer link groups */}
                <div className="col-lg-8 col-md-12">

                    <div className="row g-4">

                        {footerGroups.map((group) => (
                            <div className="col-4" key={group.title}>

                                <h4 className="footer-group-title">
                                    {group.title}
                                </h4>

                                <ul className="footer-heritage-links">

                                    {group.links.map((link, index) => (
                                        <li key={`${group.title}-${index}`}>

                                            <button
                                                type="button"
                                                onClick={() => onNavigate?.(link.page)}
                                            >
                                                <i className="fas fa-angle-right"></i>
                                                {link.label}
                                            </button>

                                        </li>
                                    ))}

                                </ul>

                            </div>
                        ))}

                    </div>

                </div>

            </div>

            {/* Footer divider */}
            <div className="footer-heritage-divider">
                <span>❧</span>
            </div>

            {/* Copyright */}
            <div className="footer-copyright-area">

                <p>
                    <i className="fas fa-seedling"></i>
                    Marutham Foundation — nurturing nature, empowering
                    communities, building a sustainable future.
                    <i className="fas fa-seedling"></i>
                </p>

                <span>
                    © {new Date().getFullYear()} Marutham Foundation.
                    All Rights Reserved.
                </span>

            </div>

            {/* Policy buttons */}
            <div className="footer-policy-area">

                {policies.map((policy) => (
                    <button
                        type="button"
                        key={policy.key}
                        className={`footer-policy-btn footer-policy-${policy.key}`}
                        onClick={() => onOpenModal?.(policy.key)}
                    >
                        <i className={`fas ${policy.icon}`}></i>
                        {policy.label}
                    </button>
                ))}

            </div>

            <div className="footer-bottom-ornament">
                <span>❧</span>
                <span>MARUTHAM FOUNDATION</span>
                <span>❧</span>
            </div>

        </footer>
    );
}
