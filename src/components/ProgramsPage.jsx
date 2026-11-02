import React from 'react';

const OBJECTIVES = [
    { num: '01', title: 'Soil Protection & Conservation', icon: 'fa-seedling', items: ['Promote soil health through sustainable agricultural practices.', 'Encourage organic farming, natural fertilizers, and erosion control.', 'Conduct soil testing & fertility mapping using Geospatial tech.'] },
    { num: '02', title: 'Renovation & Protection of Water Bodies', icon: 'fa-water', items: ['Identify, restore, and rejuvenate ponds, lakes, and traditional systems.', 'Implement rainwater harvesting & watershed management.', 'Use remote sensing & GIS to monitor water body health.'] },
    { num: '03', title: 'Educational Support to the Needy', icon: 'fa-book-open', items: ['Offer scholarships, study materials & mentorship.', 'Conduct coaching, career guidance & digital literacy programs.'] },
    // Add the remaining objectives from your HTML here...
];

const APPROACHES = [
    { title: 'Community-Centered Development', icon: 'fa-users', desc: 'Working with people, not just for them.' },
    { title: 'Technology-Enabled Solutions', icon: 'fa-satellite-dish', desc: 'Using modern tech to bring traditional practices into the future.' },
    { title: 'Sustainability First', icon: 'fa-recycle', desc: 'Every project ensures long-term impact and environmental balance.' },
    { title: 'Inclusive Growth', icon: 'fa-hand-holding-heart', desc: 'Special focus on empowering women, youth, farmers & marginalized communities.' },
];

export default function ProgramsPage({ onNavigate }) {
    return (
        <div className="fade-up visible">
            <div className="page-header">
                <h1><i className="fas fa-leaf me-3"></i>What We Do</h1>
                <p>Marutham Foundation works across 10 core areas — from soil and water to education, women empowerment, and research — all guided by a people-first, technology-enabled approach.</p>
            </div>

            <section className="my-5">
                <div className="text-center mb-4">
                    <h2 className="section-head-aef"><i className="fas fa-bullseye"></i> Our Objectives</h2>
                    <p className="section-subtitle">Ten pillars that define our work and impact</p>
                </div>
                <div className="row g-4">
                    {OBJECTIVES.map(obj => (
                        <div className="col-md-6 col-lg-4" key={obj.num}>
                            <div className="object-card">
                                <div className="object-number">{obj.num}</div>
                                <h5><i className={`fas ${obj.icon}`}></i>{obj.title}</h5>
                                <ul>
                                    {obj.items.map((item, i) => (
                                        <li key={i}><i className="fas fa-circle"></i> {item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="my-5">
                <div className="text-center mb-4">
                    <h2 className="section-head-aef"><i className="fas fa-compass"></i> Our Approach</h2>
                    <p className="section-subtitle">Four pillars that guide everything we do</p>
                </div>
                <div className="row g-4">
                    {APPROACHES.map((app, i) => (
                        <div className="col-md-6 col-lg-3" key={i}>
                            <div className="approach-card">
                                <div className="icon-circle"><i className={`fas ${app.icon}`}></i></div>
                                <h6>{app.title}</h6>
                                <p>{app.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="my-5">
                <div className="text-center py-4">
                    <h2 className="section-head-aef"><i className="fas fa-microscope"></i> Research & Development</h2>
                    <p className="section-subtitle">Explore our research initiatives across Tamil Nadu districts</p>
                    <div className="mt-4 d-flex flex-wrap justify-content-center gap-3">
                        <button className="btn-rd">
                            <i className="fas fa-map-marked-alt"></i> Explore R&D Projects <i className="fas fa-arrow-right"></i>
                        </button>
                        <button onClick={() => onNavigate('findings')} className="btn-rd btn-findings">
                            <i className="fas fa-images"></i> Findings
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}