
import React from 'react';

const OBJECTIVES = [
    {
        num: '01',
        title: 'Soil Protection & Conservation',
        icon: 'fa-seedling',
        theme: 'soil',
        items: [
            'Promote soil health through sustainable agricultural practices.',
            'Encourage organic farming, natural fertilizers, and erosion control.',
            'Conduct soil testing & fertility mapping using Geospatial technology.',
        ],
    },
    {
        num: '02',
        title: 'Renovation & Protection of Water Bodies',
        icon: 'fa-water',
        theme: 'water',
        items: [
            'Identify, restore, and rejuvenate ponds, lakes, and traditional systems.',
            'Implement rainwater harvesting & watershed management.',
            'Use remote sensing & GIS to monitor water body health.',
        ],
    },
    {
        num: '03',
        title: 'Educational Support to the Needy',
        icon: 'fa-book-open',
        theme: 'education',
        items: [
            'Offer scholarships, study materials & mentorship.',
            'Conduct coaching, career guidance & digital literacy programs.',
        ],
    },
];

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
                OUR OBJECTIVES
            ================================= */}

            <section className="programs-objectives-section">

                <ProgramsHeading
                    icon="fa-bullseye"
                    subtitle="Our commitment to nature, education and community development"
                >
                    Our Objectives
                </ProgramsHeading>

                <div className="row g-4">

                    {OBJECTIVES.map((obj) => (

                        <div
                            className="col-lg-4 col-md-6"
                            key={obj.num}
                        >

                            <article
                                className={`objective-heritage-card objective-${obj.theme}`}
                            >

                                <div className="objective-card-top">

                                    <span className="objective-number">
                                        {obj.num}
                                    </span>

                                    <div className="objective-icon">
                                        <i className={`fas ${obj.icon}`}></i>
                                    </div>

                                    <span className="objective-corner">
                                        ❧
                                    </span>

                                </div>

                                <h3>{obj.title}</h3>

                                <div className="objective-divider">
                                    <span>❧</span>
                                </div>

                                <ul>
                                    {obj.items.map((item, index) => (

                                        <li key={index}>
                                            <i className="fas fa-circle"></i>
                                            <span>{item}</span>
                                        </li>

                                    ))}
                                </ul>

                                <div className="objective-bottom-ornament">
                                    ❧
                                </div>

                            </article>

                        </div>

                    ))}

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
