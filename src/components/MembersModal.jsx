
import React, { useEffect } from 'react';

const MEMBERS = [
    { name: 'Dr. S. Santhanaraman', role: 'Hydrologist', icon: 'fa-water' },
    { name: 'Dr. T. Balasubramanian', role: 'Hydrogeologist', icon: 'fa-mountain' },
    { name: 'Er. Vezhalagan', role: 'Hydrologist', icon: 'fa-water' },
    { name: 'M. Manavazhagan', role: 'Legal Advisor', icon: 'fa-balance-scale' },
    { name: 'Dr. M. Jayaprathiga', role: 'Environmental Specialist', icon: 'fa-leaf' },
    { name: 'Dr. G. Ravi', role: 'Senior Geologist', icon: 'fa-globe-asia' },
    { name: 'S. Suburaj', role: 'Agriculture Economist', icon: 'fa-tractor' },
    { name: 'S. Mohana', role: 'GIS Specialist', icon: 'fa-map-marked-alt' },
    { name: 'R. Gayathri', role: 'IT Specialist', icon: 'fa-vector-square' },
    { name: 'G. Muthu', role: 'Social Activist', icon: 'fa-hands-helping' },
    { name: 'D. M. Raja', role: 'Social Activist', icon: 'fa-users' },
];

export default function MembersModal({ show, onClose }) {

    useEffect(() => {
        if (!show) return;

        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        document.addEventListener('keydown', handleEsc);

        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = previousOverflow;
        };
    }, [show, onClose]);

    if (!show) return null;

    return (
        <div
            className="heritage-modal-overlay"
            onClick={onClose}
            role="presentation"
        >
            <div
                className="heritage-members-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="members-modal-title"
                onClick={(e) => e.stopPropagation()}
            >

                {/* Decorative top ornament */}
                <div className="members-modal-top-ornament">
                    <span>❧</span>
                    <i className="fas fa-leaf"></i>
                    <span>❧</span>
                </div>

                {/* Modal Header */}
                <div className="heritage-modal-header">

                    <div className="members-modal-heading">

                        <div className="members-modal-heading-icon">
                            <i className="fas fa-users"></i>
                        </div>

                        <div>
                            <h2 id="members-modal-title">
                                Our Foundation Members
                            </h2>

                            <p>
                                <span>Marutham Foundation</span>
                                {' '}· Dedicated People, Shared Purpose
                            </p>
                        </div>

                    </div>

                    <button
                        type="button"
                        className="heritage-modal-close"
                        onClick={onClose}
                        aria-label="Close members modal"
                    >
                        <i className="fas fa-times"></i>
                    </button>

                </div>

                {/* Member Count */}
                <div className="members-count-area">
                    <span>
                        <i className="fas fa-users me-2"></i>
                        Our Members
                    </span>

                    <strong>{MEMBERS.length} Members</strong>
                </div>

                {/* Modal Body */}
                <div className="heritage-modal-body">

                    <div className="members-heritage-grid">

                        {MEMBERS.map((member, index) => (
                            <article
                                className="member-heritage-card"
                                key={member.name}
                            >

                                <span className="member-card-number">
                                    {String(index + 1).padStart(2, '0')}
                                </span>

                                <div className="member-heritage-avatar">
                                    <i className={`fas ${member.icon}`}></i>
                                </div>

                                <div className="member-heritage-info">

                                    <h3>{member.name}</h3>

                                    <p>{member.role}</p>

                                </div>

                                <div className="member-card-decoration">
                                    ❧
                                </div>

                            </article>
                        ))}

                    </div>

                </div>

                {/* Modal Footer */}
                <div className="heritage-modal-footer">

                    <div className="members-footer-quote">
                        <i className="fas fa-seedling"></i>
                        Together for Nature, Education & Community
                    </div>

                    <button
                        type="button"
                        className="members-modal-close-btn"
                        onClick={onClose}
                    >
                        <i className="fas fa-times me-2"></i>
                        Close
                    </button>

                </div>

                {/* Bottom Ornament */}
                <div className="members-modal-bottom-ornament">
                    <span>❧</span>
                    MARUTHAM FOUNDATION
                    <span>❧</span>
                </div>

            </div>
        </div>
    );
}
