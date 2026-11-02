import React, { useEffect } from 'react';
import { pricingPolicy, refundPolicy, cancellationPolicy, termsPolicy } from '../data/policies';

const POLICIES = {
    pricing: pricingPolicy,
    refund: refundPolicy,
    cancellation: cancellationPolicy,
    terms: termsPolicy,
};

export default function PolicyModals({ activePolicy, onClose }) {
    useEffect(() => {
        const handleEsc = (e) => e.key === 'Escape' && onClose();
        if (activePolicy) document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, [activePolicy, onClose]);

    if (!activePolicy) return null;

    const policy = POLICIES[activePolicy];
    if (!policy) return null;

    return (
        <div
            className="modal fade policy-modal show d-block"
            tabIndex="-1"
            style={{
                background: 'rgba(0,0,0,0.5)',
                position: 'fixed',
                inset: 0,
                zIndex: 1060,
                overflowY: 'auto',
            }}
            onClick={onClose}
        >
            <div
                className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            <i className={`fas ${policy.icon} me-2`} style={{ color: '#48A111' }}></i>
                            {policy.title}
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">{policy.content}</div>
                </div>
            </div>
        </div>
    );
}