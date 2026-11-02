import React from 'react';

const FINDINGS = [
    { id: 1, img: 'images/ARS_kattankulathur.jpg', title: 'Kattankolathur Block', desc: 'Artificial Recharge Zone' },
    { id: 2, img: 'images/GWPotential_Kattankulathur.jpg', title: 'Kattankolathur Block', desc: 'Groundwater Potential Map' },
    { id: 3, img: 'images/Uthiramerur Block.jpg', title: 'Uthiramerur Block', desc: 'Recharge Zonation Map' },
    { id: 4, img: 'images/Walajabad Block.jpg', title: 'Walajabad Block', desc: 'Recharge Zonation Map' },
];

export default function FindingsPage({ onNavigate }) {
    return (
        <div className="fade-up visible">
            <div className="page-header">
                <h1><i className="fas fa-images me-3"></i>Our Findings</h1>
                <p>Recharge Zonation and Groundwater Potential Maps</p>
                <button onClick={() => onNavigate('programs')} className="btn-back mt-3">
                    <i className="fas fa-arrow-left"></i> Back to What We Do
                </button>
            </div>

            <div className="row g-4 mb-5 justify-content-center">
                {FINDINGS.map((item) => (
                    <div className="col-12 col-md-6 col-lg-4" key={item.id}>
                        <div className="rd-image-card">
                            <img src={item.img} alt={item.title} title={`${item.title} - ${item.desc}`} />
                            <div className="rd-caption">{item.title} - {item.desc}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}