import React from 'react';

const FINDINGS = [
    {
        id: 1,
        img: '/Images/ARS_kattankulathur.jpg', // Make sure your folder is 'Images' with a capital I
        title: 'Kattankolathur Block',
        desc: 'Artificial Recharge Zone'
    },
    {
        id: 2,
        img: '/Images/GWPotential_Kattankulathur.jpg',
        title: 'Kattankolathur Block',
        desc: 'Groundwater Potential Map'
    },
    {
        id: 3,
        img: '/Images/Uthiramerur Block.jpg',
        title: 'Uthiramerur Block',
        desc: 'Recharge Zonation Map'
    },
    {
        id: 4,
        img: '/Images/Walajabad Block.jpg',
        title: 'Walajabad Block',
        desc: 'Recharge Zonation Map'
    },
];

export default function FindingsPage({ onNavigate }) {
    return (
        <div className="findings-heritage-page fade-up visible">

            {/* 1. The Top Dark Banner */}
            <div className="findings-heritage-banner">
                <div className="findings-banner-ornament left">❧</div>
                <div className="findings-banner-ornament right">❧</div>

                <div className="findings-banner-content">
                    <i className="fas fa-images findings-banner-icon"></i>
                    <h1>Our Findings</h1>
                    <h3>The Light of Nature, the Guarantee of Life</h3>
                    <p>Explore our research initiatives and groundwater potential maps across Tamil Nadu districts.</p>

                    <div className="findings-banner-actions">
                        <button onClick={() => onNavigate('programs')} className="findings-btn-back">
                            <i className="fas fa-arrow-left"></i> Back to What We Do
                        </button>
                    </div>
                </div>
            </div>

            {/* 2. The Grid Section */}
            <div className="findings-heritage-section-heading">
                <div className="findings-heading-frame">
                    <i className="fas fa-leaf"></i>
                    <h2>Research Maps</h2>
                </div>
            </div>

            <div className="findings-heritage-grid">
                {FINDINGS.map((item, index) => (
                    <div className="findings-heritage-card" key={item.id}>
                        <div className="findings-card-number">0{index + 1}</div>

                        <div className="findings-image-wrapper">
                            <img
                                src={item.img}
                                alt={`${item.title} - ${item.desc}`}
                                title={`${item.title} - ${item.desc}`}
                            />
                        </div>

                        <div className="findings-card-content">
                            <h3>{item.title}</h3>
                            <p>{item.desc}</p>
                        </div>

                        <div className="findings-card-bottom-ornament">❧</div>
                    </div>
                ))}
            </div>
        </div>
    );
}