import React from 'react';
import { LOGO_FALLBACK } from '../constants';

export default function Footer({ onOpenModal, onNavigate }) {
    return (
        <footer className="footer-aef fade-up">
            <div className="row g-4">
                <div className="col-md-4">
                    <div className="d-flex align-items-center gap-3 mb-2">
                        <img
                            src="Logo JPG.jpg.jpeg"
                            width="44"
                            height="44"
                            className="logo-img"
                            alt="logo"
                            onError={(e) => (e.currentTarget.src = LOGO_FALLBACK)}
                        />
                        <div className="footer-brand">
                            Marutham <span>Foundation</span>
                        </div>
                    </div>
                    <div className="footer-copyright">
                        Marutham Foundation © 2026
                    </div>
                </div>

                <div className="col-md-5">
                    <div className="row">
                        <div className="col-4">
                            <div className="footer-heading">Programs</div>
                            <ul className="footer-links">
                                <li><a onClick={() => onNavigate('programs')}>Education</a></li>
                                <li><a onClick={() => onNavigate('programs')}>Environment</a></li>
                                <li><a onClick={() => onNavigate('programs')}>Livelihood</a></li>
                                <li><a onClick={() => onNavigate('programs')}>Cattle Care</a></li>
                            </ul>
                        </div>
                        <div className="col-4">
                            <div className="footer-heading">About</div>
                            <ul className="footer-links">
                                <li><a onClick={() => onNavigate('about')}>Our Story</a></li>
                                <li><a onClick={() => onNavigate('about')}>Team</a></li>
                                <li><a onClick={() => onNavigate('contact')}>Contact</a></li>
                            </ul>
                        </div>
                        <div className="col-4">
                            <div className="footer-heading">Quick Links</div>
                            <ul className="footer-links">
                                <li><a onClick={() => onNavigate('gallery')}>Gallery</a></li>
                                <li><a onClick={() => onNavigate('programs')}>Programs</a></li>
                                <li><a onClick={() => onNavigate('contact')}>Contact</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-divider"></div>

            <div className="row">
                <div className="col-12 text-center footer-bottom-text">
                    <i className="fas fa-seedling me-1"></i>
                    Marutham Foundation — nurturing nature, empowering communities, building a sustainable future.
                    <i className="fas fa-seedling ms-1"></i>
                </div>
            </div>

            <div className="policy-buttons-wrap">
                <button className="policy-btn pricing" onClick={() => onOpenModal('pricing')}>
                    <i className="fas fa-hand-holding-heart"></i> Pricing Policy
                </button>
                <button className="policy-btn refund" onClick={() => onOpenModal('refund')}>
                    <i className="fas fa-undo-alt"></i> Refund Policy
                </button>
                <button className="policy-btn cancel" onClick={() => onOpenModal('cancellation')}>
                    <i className="fas fa-times-circle"></i> Cancellation Policy
                </button>
                <button className="policy-btn terms" onClick={() => onOpenModal('terms')}>
                    <i className="fas fa-file-contract"></i> Terms &amp; Conditions
                </button>
            </div>
        </footer>
    );
}