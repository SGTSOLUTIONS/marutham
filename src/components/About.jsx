
import React from 'react';
import { LOGO_FALLBACK } from '../constants';

const MOTIVES = [
    {
        icon: 'fa-leaf',
        text: 'Protect soil and water through sustainable practices and geospatial technology.',
    },
    {
        icon: 'fa-graduation-cap',
        text: 'Empower the needy through education, scholarships and digital literacy.',
    },
    {
        icon: 'fa-hand-holding-heart',
        text: 'Support farmers, women SHGs and indigenous cattle conservation.',
    },
    {
        icon: 'fa-microchip',
        text: 'Research and development through GIS, Remote Sensing and GPS technologies.',
    },
    {
        icon: 'fa-globe-asia',
        text: 'Promote environmental awareness and climate action for a balanced future.',
    },
];

export default function About() {
    return (
        <section id="about" className="about-heritage-section">

            <div className="about-stone-panel">

                {/* Decorative top ornament */}
                <div className="stone-top-ornament">
                    <span>❧</span>
                    <i className="fas fa-leaf"></i>
                    <span>❧</span>
                </div>

                <div className="row align-items-center g-4">

                    {/* About content */}
                    <div className="col-lg-8">

                        <div className="about-heading">
                            <i className="fas fa-tree"></i>
                            <h2>About Us</h2>
                        </div>

                        <div className="about-introduction">
                            <p>
                                <strong>Marutham</strong> — valleys in ancient
                                Tamil literature, one of the five landscapes
                                (ஐந்திணைகள்) of Sangam tradition.
                            </p>
                        </div>

                        <div className="founder-info">
                            <i className="fas fa-user-circle"></i>
                            <span>Founder: <strong>Dr. R. Saravani</strong></span>
                        </div>

                        <h3 className="about-motive-heading">
                            <i className="fas fa-seedling"></i>
                            Our Motive
                        </h3>

                        <ul className="heritage-motive-list">
                            {MOTIVES.map((motive, index) => (
                                <li key={index}>
                                    <span className="motive-icon">
                                        <i className={`fas ${motive.icon}`}></i>
                                    </span>

                                    <span>{motive.text}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="about-tamil-quote">
                            <i className="fas fa-quote-left"></i>

                            <p>யாதும் ஊரே யாவரும் கேளிர்</p>

                            <span>
                                Every place is our home, everyone is our kin.
                            </span>
                        </div>

                    </div>

                    {/* Foundation emblem */}
                    <div className="col-lg-4 text-center">

                        <div className="foundation-emblem">

                            <div className="emblem-outer-ring">
                                <div className="emblem-inner-ring">

                                    <img
                                        src="/Images/foundation-logo.jpeg"
                                        alt="Marutham Foundation Emblem"
                                        onError={(e) => {
                                            e.currentTarget.src = LOGO_FALLBACK;
                                        }}
                                    />

                                </div>
                            </div>

                            <h3>Marutham Foundation</h3>

                            <p>
                                Nature · Education · Community
                            </p>

                            <div className="emblem-decoration">
                                ❧ ❧ ❧
                            </div>

                        </div>

                    </div>

                </div>

                {/* Bottom ornament */}
                <div className="stone-bottom-ornament">
                    <span>❧</span>
                    <span>MARUTHAM FOUNDATION</span>
                    <span>❧</span>
                </div>

            </div>

        </section>
    );
}
