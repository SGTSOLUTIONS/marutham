import React from 'react';
import { LOGO_FALLBACK } from '../constants';

const MOTIVES = [
    {
        icon: 'fa-leaf',
        text: 'Protect soil & water through sustainable practices & geospatial tech.',
    },
    {
        icon: 'fa-graduation-cap',
        text: 'Empower the needy with education, scholarships & digital literacy.',
    },
    {
        icon: 'fa-hand-holding-heart',
        text: 'Support farmers, women SHGs, and indigenous cattle conservation.',
    },
    {
        icon: 'fa-microchip',
        text: 'Research and Development through Modern Technologies — leverage GIS, Remote Sensing, GPS for mapping, monitoring, and planning projects.',
    },
    {
        icon: 'fa-globe-asia',
        text: 'Promote environmental awareness & climate action for a balanced future.',
    },
];

export default function About() {
    return (
        <section id="about" className="about-aef fade-up">
            <div className="row align-items-center g-4">
                <div className="col-md-7">
                    <h2 className="section-head-aef">
                        <i className="fas fa-tree"></i>About Us
                    </h2>
                    <p className="mt-3" style={{ fontFamily: "'Inter',sans-serif", opacity: 0.85 }}>
                        <strong>"Marutham"</strong> — valleys in ancient Tamil literature, one of the five
                        landscapes (ஐந்திணைகள்) of Sangam tradition.
                    </p>
                    <p
                        className="fw-semibold mt-3"
                        style={{ color: '#1a3d14', fontFamily: "'Inter',sans-serif" }}
                    >
                        <i className="fas fa-user-circle me-2"></i>Founder: Dr. R. Saravani
                    </p>
                    <p style={{ color: '#1e2b1a', fontWeight: 500, fontFamily: "'Inter',sans-serif" }}>
                        Our Motive:
                    </p>
                    <ul className="about-list-aef">
                        {MOTIVES.map((m) => (
                            <li key={m.text}>
                                <i className={`fas ${m.icon}`}></i> {m.text}
                            </li>
                        ))}
                    </ul>
                    <div className="tamil-poem mt-3" style={{ fontSize: '0.95rem' }}>
                        <i className="fas fa-feather-alt me-2" style={{ color: '#25671E' }}></i>
                        "யாதும் ஊரே யாவரும் கேளிர்" —{' '}
                        <span style={{ color: '#25671E', fontWeight: 600 }}>
                            (Every place is our home, everyone is our kin)
                        </span>
                    </div>
                </div>
                <div className="col-md-5 text-center">
                    <img
                        src="Logo JPG.jpg.jpeg"
                        alt="Marutham Foundation"
                        width="300"
                        height="300"
                        className="logo-img-lg"
                        style={{ borderRadius: '50%', maxWidth: '100%' }}
                        onError={(e) => (e.currentTarget.src = LOGO_FALLBACK)}
                    />
                </div>
            </div>
        </section>
    );
}