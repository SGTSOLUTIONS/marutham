import React from 'react';

const APPROACHES = [
    {
        title: 'Community-Centered Development',
        icon: 'fa-users',
        desc: 'Working with people, not just for them.',
    },
    {
        title: 'Technology-Enabled Solutions',
        icon: 'fa-satellite-dish',
        desc: 'Using modern technology to bring traditional practices into the future.',
    },
    {
        title: 'Sustainability First',
        icon: 'fa-recycle',
        desc: 'Every project ensures long-term impact and environmental balance.',
    },
    {
        title: 'Inclusive Growth',
        icon: 'fa-hand-holding-heart',
        desc: 'Empowering women, youth, farmers and marginalized communities.',
    },
];

function ProgramsHeading({ icon, children, subtitle }) {
    return (
        <div className="programs-section-heading">

            <div className="programs-heading-frame">
                <i className={`fas ${icon}`}></i>
                <h2>{children}</h2>
            </div>

            {subtitle && <p>{subtitle}</p>}

        </div>
    );
}

export default function ProgramsPage({ onNavigate }) {

    return (
        <main className="programs-heritage-page">

            {/* =================================
                WHAT WE DO BANNER
            ================================= */}

            <section className="programs-hero-banner">

                <div className="programs-banner-ornament left">
                    ❧
                </div>

                <div className="programs-banner-content">

                    <div className="programs-banner-icon">
                        <i className="fas fa-leaf"></i>
                    </div>

                    <h1>What We Do</h1>

                    <h3>The Light of Nature, the Guarantee of Life</h3>

                    <p>
                        Marutham Foundation works across 10 core areas —
                        from soil and water to education, women empowerment,
                        and research — all guided by a people-first,
                        technology-enabled approach.
                    </p>

                    <div className="programs-banner-quote">
                        <i className="fas fa-quote-left"></i>

                        <span>
                            Empowering communities through ecology,
                            education, and rural livelihood. Building a
                            generation that uplifts the nation through
                            wisdom and values.
                        </span>

                        <i className="fas fa-quote-right"></i>
                    </div>

                </div>

                <div className="programs-banner-ornament right">
                    ❧
                </div>

            </section>


            {/* =================================
                OUR APPROACH
            ================================= */}

            <section className="programs-approach-section">

                <ProgramsHeading
                    icon="fa-compass"
                    subtitle="Four pillars that guide everything we do"
                >
                    Our Approach
                </ProgramsHeading>

                <div className="row g-4">

                    {APPROACHES.map((app, index) => (

                        <div
                            className="col-lg-3 col-md-6"
                            key={app.title}
                        >

                            <article className={`approach-heritage-card approach-color-${index + 1}`}>

                                <span className="approach-number">
                                    0{index + 1}
                                </span>

                                <div className="approach-heritage-icon">
                                    <i className={`fas ${app.icon}`}></i>
                                </div>

                                <h3>{app.title}</h3>

                                <p>{app.desc}</p>

                                <div className="approach-bottom-ornament">
                                    ❧
                                </div>

                            </article>

                        </div>

                    ))}

                </div>

            </section>


            {/* =================================
                RESEARCH & DEVELOPMENT
            ================================= */}

            <section className="programs-rd-section">

                <div className="rd-ornament rd-ornament-left">
                    ❧
                </div>

                <div className="rd-content">

                    <div className="rd-main-icon">
                        <i className="fas fa-microscope"></i>
                    </div>

                    <h2>Research & Development</h2>

                    <p>
                        Explore our research initiatives across Tamil Nadu
                        districts, combining scientific knowledge,
                        geospatial technology and community participation
                        to support sustainable development.
                    </p>

                    <div className="rd-technology-tags">
                        <span>
                            <i className="fas fa-map-marked-alt"></i>
                            GIS
                        </span>

                        <span>
                            <i className="fas fa-satellite"></i>
                            Remote Sensing
                        </span>

                        <span>
                            <i className="fas fa-globe"></i>
                            Geospatial Research
                        </span>
                    </div>

                    <div className="rd-buttons">


                        <button
                            type="button"
                            onClick={() => onNavigate?.('rd-projects')}
                            className="rd-explore-btn"
                        >
                            <i className="fas fa-map-marked-alt"></i>
                            Explore R&D Projects
                            <i className="fas fa-arrow-right"></i>
                        </button>

                        <button
                            type="button"
                            onClick={() => onNavigate?.('findings')}
                            className="rd-findings-btn"
                        >
                            <i className="fas fa-images"></i>
                            View Findings
                        </button>

                    </div>

                </div>

                <div className="rd-ornament rd-ornament-right">
                    ❧
                </div>

            </section>


            {/* =================================
                FINAL QUOTE
            ================================= */}

            <section className="programs-final-quote">

                <i className="fas fa-leaf"></i>

                <h3>
                    Nature · Education · Community
                </h3>

                <p>
                    Working together for a greener, wiser and more
                    sustainable tomorrow.
                </p>

                <span>Marutham Foundation</span>

            </section>

        </main>
    );
}