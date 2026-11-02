import React from 'react';
import { LOGO_FALLBACK } from '../constants';

export default function Hero() {
    return (
        <section className="hero-aef fade-up visible">
            <div className="row align-items-center g-4">
                <div className="col-md-8">
                    <div className="d-flex align-items-center gap-3 mb-2">
                        <img
                            src="Logo JPG.jpg.jpeg"
                            alt="Marutham"
                            width="80"
                            height="80"
                            className="logo-img-lg"
                            onError={(e) => (e.currentTarget.src = LOGO_FALLBACK)}
                        />
                        <div>
                            <h1 className="hero-title-aef">
                                Marutham <span>Foundation</span>
                            </h1>
                            <div className="hero-sub-aef">
                                <i className="fas fa-tree me-2"></i>The Light of Nature, the Guarantee of Life
                            </div>
                        </div>
                    </div>

                    <div className="tamil-poem mt-3">
                        <i className="fas fa-quote-left me-2" style={{ color: '#25671E' }}></i>
                        மருத நிலம் வளம் சூழும் — மண்ணும் நீரும் காப்போம்
                        <br />
                        கல்வி ஒளி தந்து — கரங்கள் சேர்த்து வாழ்வோம்{' '}
                        <i className="fas fa-quote-right me-2" style={{ color: '#25671E' }}></i>
                        <br />
                        <span style={{ fontSize: '0.9rem', color: '#1e2b1a', opacity: 0.7 }}>
                            <i className="fas fa-leaf me-1"></i> (Marutham land rich with nature — we protect
                            soil and water, we light the lamp of education and join hands to live together.)
                        </span>
                    </div>

                    <p
                        className="mt-3 fs-5"
                        style={{
                            color: '#1e2b1a',
                            maxWidth: 650,
                            opacity: 0.85,
                            fontFamily: "'Inter',sans-serif",
                        }}
                    >
                        <i className="fas fa-quote-left me-2" style={{ color: '#25671E' }}></i>
                        Empowering communities through ecology, education, and rural livelihood. Building a
                        generation that uplifts the nation through wisdom and values{' '}
                        <i className="fas fa-quote-right me-2" style={{ color: '#25671E' }}></i>
                    </p>

                    <div className="d-flex flex-wrap gap-3 mt-4">
                        <a href="programs.html" className="btn btn-outline-aef">
                            <i className="fas fa-graduation-cap me-2"></i>Learn More
                        </a>
                        <a href="contact.html" className="btn btn-outline-aef">
                            <i className="fas fa-envelope me-2"></i>Get in Touch
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}