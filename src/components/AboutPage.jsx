import React from 'react';

const TEAM_LEADERS = [
    { name: 'Dr. R. Saravani', role: 'Founder' },
    { name: 'U. Chelladhurai', role: 'President' },
    { name: 'Dr. S. Mahalingam', role: 'Vice President' },
    { name: 'V. R. Siva', role: 'Legal Advisor' },
];

const COLLABORATORS = [
    { name: 'Bannary Amman Sugars Limited', location: 'Sathamangalam' },
    { name: 'KPR Mills', location: 'Coimbatore' },
    { name: 'ITC Mission Sunehra Kal', location: 'Bangalore' },
];

const MEMBERS = [
    { name: 'Dr. S. Santhanaraman', role: 'Hydrologist', icon: 'fa-water' },
    { name: 'Dr. T. Balasubramanian', role: 'Hydrogeologist', icon: 'fa-mountain' },
    { name: 'Er. Vezhalagan', role: 'Hydrologist', icon: 'fa-water' },
    { name: 'M. Manavazhagan', role: 'Legal Advisor', icon: 'fa-balance-scale' },
    { name: 'Dr. M. Jayaprathiga', role: 'Environmental Specialist', icon: 'fa-leaf' },
    { name: 'Dr. G. Ravi', role: 'Senior Geologist', icon: 'fa-globe-asia' },
    { name: 'S. Suburaj', role: 'Agriculture Economist', icon: 'fa-tractor' },
    { name: 'S. Mohana', role: 'GIS Specialist', icon: 'fa-map-marked-alt' },
    { name: 'R. Gayathri', role: 'Web Developer', icon: 'fa-vector-square' },
    { name: 'G. Muthu', role: 'Social Activist', icon: 'fa-hands-helping' },
    { name: 'D. M. Raja', role: 'Social Activist', icon: 'fa-users' },
];

export default function AboutPage({ onOpenMembersModal }) {
    return (
        <div className="fade-up visible">
            {/* PAGE HEADER */}
            <div className="page-header">
                <h1><i className="fas fa-seedling me-3"></i>Who We Are</h1>
                <p>
                    Marutham Foundation is rooted in the ancient Tamil concept of <strong>“Marutham”</strong> — the fertile
                    agricultural landscape that sustains life. We are a collective of changemakers working to protect
                    nature, empower communities, and build a sustainable future.
                </p>
            </div>

            {/* OUR STORY */}
            <section className="my-5">
                <div className="text-center mb-4">
                    <h2 className="section-head-aef"><i className="fas fa-tree me-2"></i> Our Story</h2>
                </div>
                <div className="row g-4">
                    <div className="col-md-6">
                        <div className="card-aef">
                            <div className="icon-circle"><i className="fas fa-quote-left"></i></div>
                            <h5>Our Vision</h5>
                            <p>To create a world where nature and humanity thrive in harmony — where every community has access to clean water, fertile soil, quality education, and the tools to build a prosperous future.</p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card-aef">
                            <div className="icon-circle"><i className="fas fa-bullseye"></i></div>
                            <h5>Our Mission</h5>
                            <p>To protect and restore natural resources, empower marginalized communities through education and livelihood opportunities, and foster grassroots leadership for sustainable development — all guided by ancient wisdom and modern technology.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* OUR VALUES */}
            <section className="my-5">
                <div className="text-center mb-4">
                    <h2 className="section-head-aef"><i className="fas fa-heart me-2"></i> Our Core Values</h2>
                </div>
                <div className="row g-4">
                    <div className="col-md-6">
                        <div className="card-aef" style={{ padding: '1.8rem 1.5rem' }}>
                            <ul className="values-list">
                                <li><i className="fas fa-leaf"></i><span><strong>Ecological Integrity:</strong> We protect and restore nature as the foundation of all life.</span></li>
                                <li><i className="fas fa-users"></i><span><strong>Community First:</strong> We work with communities, not for them — ensuring participation and ownership.</span></li>
                                <li><i className="fas fa-graduation-cap"></i><span><strong>Education for All:</strong> We believe knowledge is the key to empowerment and transformation.</span></li>
                                <li><i className="fas fa-female"></i><span><strong>Inclusion & Equity:</strong> We prioritize women, youth, farmers, and marginalized groups.</span></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card-aef" style={{ padding: '1.8rem 1.5rem' }}>
                            <ul className="values-list">
                                <li><i className="fas fa-microchip"></i><span><strong>Innovation with Tradition:</strong> We combine ancient wisdom with modern technology for lasting impact.</span></li>
                                <li><i className="fas fa-handshake"></i><span><strong>Collaboration:</strong> We partner with governments, institutions, and communities to amplify our work.</span></li>
                                <li><i className="fas fa-recycle"></i><span><strong>Sustainability:</strong> Every action we take is designed for long-term ecological and social well-being.</span></li>
                                <li><i className="fas fa-globe-asia"></i><span><strong>Cultural Pride:</strong> We celebrate and preserve the rich cultural heritage of Tamil Nadu and its ecological traditions.</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* OUR TEAM */}
            <section className="my-5">
                <div className="text-center mb-4">
                    <h2 className="section-head-aef"><i className="fas fa-users me-2"></i> Our Team</h2>
                    <p className="text-secondary mt-2" style={{ fontFamily: "'Inter',sans-serif", opacity: 0.7 }}>Meet the dedicated leaders and members driving Marutham Foundation's mission</p>
                </div>
                <div className="row g-4 mb-4">
                    {TEAM_LEADERS.map((leader) => (
                        <div className="col-lg-3 col-md-6" key={leader.name}>
                            <div className="team-card highlight-leader">
                                <h6>{leader.name}</h6>
                                <span className="role">{leader.role}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* COLLABORATORS */}
                <div className="text-center mb-4 mt-5">
                    <h2 className="section-head-aef"><i className="fas fa-handshake me-2"></i> Our Collaborators</h2>
                    <p className="text-secondary mt-2" style={{ fontFamily: "'Inter',sans-serif", opacity: 0.7 }}>Proud partners who share our vision for a sustainable and empowered future</p>
                </div>
                <div className="row g-4 justify-content-center">
                    {COLLABORATORS.map((collab) => (
                        <div className="col-lg-4 col-md-6" key={collab.name}>
                            <div className="collab-card">
                                <h6>{collab.name}</h6>
                                <span className="collab-location"><i className="fas fa-map-pin me-1"></i>{collab.location}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="members-btn-wrapper">
                    <button className="btn btn-members-aef" onClick={onOpenMembersModal}>
                        <i className="fas fa-users"></i> View All Members
                    </button>
                </div>
            </section>
        </div>
    );
}