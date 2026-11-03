
import React from 'react';
import { LOGO_FALLBACK } from '../constants';

export default function Hero({ onNavigate }) {
    return (
        <section className="hero-aef home-hero-frame fade-up visible">

            <div className="hero-decoration hero-decoration-left">
                <i className="fas fa-feather-alt"></i>
            </div>

            <div className="hero-content">

                <div className="hero-brand">
                    <img
                        src="/Logo JPG.jpg.jpeg"
                        alt="Marutham Foundation"
                        className="hero-logo"
                        onError={(e) => {
                            e.currentTarget.src = LOGO_FALLBACK;
                        }}
                    />

                    <div>
                        <h1 className="hero-title-aef">
                            <span className="hero-leaf">
                                <i className="fas fa-leaf"></i>
                            </span>
                            Marutham Foundation
                        </h1>

                        <div className="hero-sub-aef">
                            <i className="fas fa-tree me-2"></i>
                            The Light of Nature, the Guarantee of Life
                        </div>
                    </div>
                </div>

                <p className="hero-description">
                    Marutham Foundation works across nature, education,
                    women empowerment, rural livelihood and research —
                    all guided by a people-first, technology-enabled approach.
                </p>

                <div className="hero-quote">
                    <i className="fas fa-quote-left"></i>

                    <p>
                        Empowering communities through ecology, education,
                        and rural livelihood. Building a generation that
                        uplifts the nation through wisdom and values.
                    </p>

                    <i className="fas fa-quote-right"></i>
                </div>

                <div className="hero-actions">

                    <button
                        className="btn-outline-aef"
                        onClick={() => onNavigate?.('programs')}
                    >
                        <i className="fas fa-leaf me-2"></i>
                        Learn More
                    </button>

                    <button
                        className="btn-outline-aef"
                        onClick={() => onNavigate?.('contact')}
                    >
                        <i className="fas fa-envelope me-2"></i>
                        Get in Touch
                    </button>

                </div>
            </div>

            <div className="hero-decoration hero-decoration-right">
                <i className="fas fa-leaf"></i>
            </div>

        </section>
    );
}
