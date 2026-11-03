
import React from 'react';

const APPROACH_ITEMS = [
    {
        id: 'soil',
        number: '01',
        icon: 'fa-tint',
        title: 'Soil & Water Stewardship',
        text: 'Promote soil health through sustainable agricultural practices.',
        detail: 'Encourage organic farming, natural fertilizers, rainwater harvesting and watershed restoration.',
        className: 'objective-soil',
    },
    {
        id: 'education',
        number: '02',
        icon: 'fa-graduation-cap',
        title: 'Education for All',
        text: 'Scholarships, digital literacy and mentorship programs for rural youth.',
        detail: 'Bridge educational gaps through learning resources, coaching and career guidance.',
        className: 'objective-education',
    },
    {
        id: 'livelihood',
        number: '03',
        icon: 'fa-seedling',
        title: 'Livelihood & Empowerment',
        text: 'Supporting farmers, women SHGs and indigenous cattle conservation.',
        detail: 'Promote sustainable livelihoods, skill development and resilient rural communities.',
        className: 'objective-livelihood',
    },
    {
        id: 'leadership',
        number: '04',
        icon: 'fa-users',
        title: 'Grassroots Leadership',
        text: 'Youth engagement and community-led development.',
        detail: 'Encourage participatory governance and leadership for lasting social change.',
        className: 'objective-leadership',
    },
];

export default function Approach() {
    return (
        <section id="approach" className="approach-section">

            <div className="approach-heading text-center">
                <div className="approach-title-frame">
                    <i className="fas fa-bullseye"></i>
                    <h2>Our Objectives</h2>
                </div>

                <p className="section-subtitle">
                    Four pillars that define our work and impact
                </p>
            </div>

            <div className="row g-4 objective-grid">

                {APPROACH_ITEMS.map((item) => (
                    <div className="col-lg-3 col-md-6" key={item.id}>

                        <article className={`objective-card ${item.className}`}>

                            <div className="objective-card-inner">

                                <span className="objective-number">
                                    {item.number}
                                </span>

                                <div className="objective-icon">
                                    <i className={`fas ${item.icon}`}></i>
                                </div>

                                <h3>{item.title}</h3>

                                <p className="objective-main-text">
                                    {item.text}
                                </p>

                                <div className="objective-divider">
                                    <span>❧</span>
                                </div>

                                <p className="objective-detail">
                                    {item.detail}
                                </p>

                            </div>

                        </article>

                    </div>
                ))}

            </div>

        </section>
    );
}
