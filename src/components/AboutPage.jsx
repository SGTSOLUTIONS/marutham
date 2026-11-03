
import React from 'react';

const TEAM_LEADERS = [
    { name: 'Dr. R. Saravani', role: 'Founder', icon: 'fa-crown' },
    { name: 'U. Chelladhurai', role: 'President', icon: 'fa-user-tie' },
    { name: 'Dr. S. Mahalingam', role: 'Vice President', icon: 'fa-user-graduate' },
    { name: 'V. R. Siva', role: 'Legal Advisor', icon: 'fa-scale-balanced' },
];

const COLLABORATORS = [
    { name: 'Bannary Amman Sugars Limited', location: 'Sathamangalam' },
    { name: 'KPR Mills', location: 'Coimbatore' },
    { name: 'ITC Mission Sunehra Kal', location: 'Bangalore' },
];

const VALUES_LEFT = [
    {
        icon: 'fa-leaf',
        title: 'Ecological Integrity',
        text: 'We protect and restore nature as the foundation of all life.',
    },
    {
        icon: 'fa-users',
        title: 'Community First',
        text: 'We work with communities, ensuring participation and ownership.',
    },
    {
        icon: 'fa-graduation-cap',
        title: 'Education for All',
        text: 'We believe knowledge is the key to empowerment and transformation.',
    },
    {
        icon: 'fa-venus',
        title: 'Inclusion & Equity',
        text: 'We prioritize women, youth, farmers and marginalized groups.',
    },
];

const VALUES_RIGHT = [
    {
        icon: 'fa-microchip',
        title: 'Innovation with Tradition',
        text: 'We combine ancient wisdom with modern technology for lasting impact.',
    },
    {
        icon: 'fa-handshake',
        title: 'Collaboration',
        text: 'We partner with governments, institutions and communities.',
    },
    {
        icon: 'fa-recycle',
        title: 'Sustainability',
        text: 'Every action is designed for long-term ecological and social well-being.',
    },
    {
        icon: 'fa-globe-asia',
        title: 'Cultural Pride',
        text: 'We celebrate Tamil Nadu’s cultural heritage and ecological traditions.',
    },
];

function HeritageHeading({ icon, children, subtitle }) {
    return (
        <div className="heritage-section-heading">
            <div className="heritage-heading-frame">
                <i className={`fas ${icon}`}></i>
                <h2>{children}</h2>
            </div>
            {subtitle && <p>{subtitle}</p>}
        </div>
    );
}

export default function AboutPage({ onOpenMembersModal }) {
    return (
        <main className="who-we-are-page">

            {/* PAGE BANNER */}
            <section className="who-banner">
                <div className="who-banner-ornament left">❧</div>
                <div className="who-banner-content">
                    <div className="who-banner-icon">
                        <i className="fas fa-seedling"></i>
                    </div>

                    <h1>Who We Are</h1>

                    <h3>The Light of Nature, the Guarantee of Life</h3>

                    <p>
                        Marutham Foundation is rooted in the ancient Tamil
                        concept of <strong>Marutham</strong> — the fertile
                        agricultural landscape that sustains life.
                        We are a collective of changemakers working to protect
                        nature, empower communities and build a sustainable future.
                    </p>
                </div>
                <div className="who-banner-ornament right">❧</div>
            </section>

            {/* OUR STORY */}
            <section className="who-story-section">

                <HeritageHeading
                    icon="fa-tree"
                    subtitle="Our inspiration, our purpose and our commitment"
                >
                    Our Story
                </HeritageHeading>

                <div className="row g-4">

                    <div className="col-lg-6">
                        <article className="story-heritage-card vision-card">
                            <div className="story-card-top">
                                <span>01</span>
                                <div className="story-card-icon">
                                    <i className="fas fa-eye"></i>
                                </div>
                            </div>

                            <h3>Our Vision</h3>

                            <p>
                                To create a world where nature and humanity
                                thrive in harmony — where every community has
                                access to clean water, fertile soil, quality
                                education and the tools to build a prosperous future.
                            </p>

                            <div className="story-card-bottom">❧</div>
                        </article>
                    </div>

                    <div className="col-lg-6">
                        <article className="story-heritage-card mission-card">
                            <div className="story-card-top">
                                <span>02</span>
                                <div className="story-card-icon">
                                    <i className="fas fa-bullseye"></i>
                                </div>
                            </div>

                            <h3>Our Mission</h3>

                            <p>
                                To protect and restore natural resources,
                                empower marginalized communities through
                                education and livelihood opportunities, and
                                foster grassroots leadership for sustainable
                                development — guided by ancient wisdom and
                                modern technology.
                            </p>

                            <div className="story-card-bottom">❧</div>
                        </article>
                    </div>

                </div>
            </section>

            {/* CORE VALUES */}
            <section className="who-values-section">

                <HeritageHeading
                    icon="fa-heart"
                    subtitle="The principles that guide everything we do"
                >
                    Our Core Values
                </HeritageHeading>

                <div className="row g-4">

                    {[VALUES_LEFT, VALUES_RIGHT].map((group, groupIndex) => (
                        <div className="col-lg-6" key={groupIndex}>

                            <div className="values-heritage-panel">

                                {group.map((value, index) => (
                                    <div className="heritage-value-item" key={value.title}>

                                        <div className="heritage-value-icon">
                                            <i className={`fas ${value.icon}`}></i>
                                        </div>

                                        <div className="heritage-value-content">
                                            <h4>{value.title}</h4>
                                            <p>{value.text}</p>
                                        </div>

                                        <span className="value-number">
                                            {String(groupIndex * 4 + index + 1).padStart(2, '0')}
                                        </span>

                                    </div>
                                ))}

                            </div>

                        </div>
                    ))}

                </div>
            </section>

            {/* TEAM LEADERS */}
            <section className="who-team-section">

                <HeritageHeading
                    icon="fa-users"
                    subtitle="Meet the dedicated leaders driving our foundation's mission"
                >
                    Our Team
                </HeritageHeading>

                <div className="row g-4">

                    {TEAM_LEADERS.map((leader, index) => (
                        <div className="col-lg-3 col-md-6" key={leader.name}>

                            <article className="leader-heritage-card">

                                <div className="leader-card-number">
                                    0{index + 1}
                                </div>

                                <div className="leader-icon-frame">
                                    <i className={`fas ${leader.icon}`}></i>
                                </div>

                                <h3>{leader.name}</h3>

                                <div className="leader-role">
                                    {leader.role}
                                </div>

                                <div className="leader-ornament">❧</div>

                            </article>

                        </div>
                    ))}

                </div>

                <div className="members-btn-wrapper heritage-members-wrapper">

                    <button
                        type="button"
                        className="btn-members-heritage"
                        onClick={onOpenMembersModal}
                    >
                        <i className="fas fa-users me-2"></i>
                        View All Members
                        <i className="fas fa-arrow-right ms-2"></i>
                    </button>

                </div>
            </section>

            {/* COLLABORATORS */}
            <section className="who-collaborators-section">

                <HeritageHeading
                    icon="fa-handshake"
                    subtitle="Together, we work towards a sustainable and empowered future"
                >
                    Our Collaborators
                </HeritageHeading>

                <div className="row g-4 justify-content-center">

                    {COLLABORATORS.map((collab, index) => (
                        <div className="col-lg-4 col-md-6" key={collab.name}>

                            <article className="collaborator-heritage-card">

                                <div className="collaborator-icon">
                                    <i className="fas fa-landmark"></i>
                                </div>

                                <span className="collaborator-number">
                                    PARTNER 0{index + 1}
                                </span>

                                <h3>{collab.name}</h3>

                                <p>
                                    <i className="fas fa-map-marker-alt me-2"></i>
                                    {collab.location}
                                </p>

                                <div className="collaborator-decoration">❧</div>

                            </article>

                        </div>
                    ))}

                </div>
            </section>

            {/* FINAL QUOTATION */}
            <section className="who-final-quote">
                <i className="fas fa-quote-left"></i>

                <h3>யாதும் ஊரே யாவரும் கேளிர்</h3>

                <p>
                    Every place is our home, everyone is our kin.
                </p>

                <span>— Ancient Tamil Sangam Literature</span>

                <i className="fas fa-quote-right"></i>
            </section>

        </main>
    );
}
