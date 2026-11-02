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
    { name: 'R. Gayathri', role: 'Web Developer', icon: 'fa-vector-square' },
    { name: 'G. Muthu', role: 'Social Activist', icon: 'fa-hands-helping' },
    { name: 'D. M. Raja', role: 'Social Activist', icon: 'fa-users' },
];

export default function MembersModal({ show, onClose }) {
    useEffect(() => {
        const handleEsc = (e) => e.key === 'Escape' && onClose();
        if (show) document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, [show, onClose]);

    if (!show) return null;

    return (
        <div className="modal fade show d-block" style={{ background: 'rgba(0,0,0,0.5)', zIndex: 1060 }} onClick={onClose}>
            <div className="modal-dialog modal-dialog-centered modal-lg" onClick={(e) => e.stopPropagation()}>
                <div className="modal-content" style={{ background: 'rgba(247, 240, 240, 0.96)', backdropFilter: 'blur(20px)', borderRadius: '56px 12px 56px 12px' }}>
                    <div className="modal-header" style={{ borderBottom: '2px solid rgba(242, 181, 11, 0.20)', padding: '1.4rem 2rem' }}>
                        <h5 className="modal-title" style={{ fontFamily: "'Playfair Display', serif", color: '#1a3d14', fontWeight: 700 }}>
                            <i className="fas fa-users me-2" style={{ color: '#48A111' }}></i> All Members
                            <span style={{ fontSize: '0.9rem', fontWeight: 400, opacity: 0.6, fontFamily: "'Inter', sans-serif" }}> — Marutham Foundation</span>
                        </h5>
                        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body" style={{ padding: '2rem', maxHeight: '70vh', overflowY: 'auto' }}>
                        {MEMBERS.map((member) => (
                            <div className="member-item" key={member.name}>
                                <div className="member-avatar-sm"><i className={`fas ${member.icon}`}></i></div>
                                <div className="member-info">
                                    <h6>{member.name}</h6>
                                    <div className="member-role">{member.role}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="modal-footer" style={{ borderTop: '2px solid rgba(242, 181, 11, 0.20)' }}>
                        <button type="button" className="btn-close-donate" onClick={onClose}>
                            <i className="fas fa-times me-1"></i>Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}