import React from 'react';

const APPROACH_ITEMS = [
    {
        icon: 'fa-seedling',
        title: 'Soil & Water Stewardship',
        text: 'Sustainable agriculture, organic farming, rainwater harvesting, and watershed restoration using geospatial insights.',
    },
    {
        icon: 'fa-graduation-cap',
        title: 'Education for All',
        text: 'Scholarships, digital literacy, mentorship programs that bridge the gap for rural and underprivileged youth.',
    },
    {
        icon: 'fa-hand-holding-heart',
        title: 'Livelihood & Empowerment',
        text: 'Supporting farmers, women SHGs, indigenous cattle conservation, and skill-building for resilient communities.',
    },
    {
        icon: 'fa-users',
        title: 'Grassroots Leadership',
        text: 'Youth engagement, community-led development, and participatory governance for lasting change.',
    },
];

export default function Approach() {
    return (
        <section id="approach" className="my-5">
            <div className="text-center mb-4">
                <h2 className="section-head-aef">
                    <i className="fas fa-leaf"></i>Our Approach
                </h2>
                <p className="section-subtitle">Nature · Education · Community — in harmony</p>
            </div>
            <div className="row g-4">
                {APPROACH_ITEMS.map((item) => (
                    <div className="col-md-6" key={item.title}>
                        <div className="zig-box fade-up d-flex flex-column flex-md-row align-items-md-center gap-4">
                            <div className="icon-circle">
                                <i className={`fas ${item.icon}`}></i>
                            </div>
                            <div>
                                <h5>{item.title}</h5>
                                <p>{item.text}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}