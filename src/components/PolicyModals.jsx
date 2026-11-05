
import React, { useEffect } from 'react';
import {
    pricingPolicy,
    refundPolicy,
    cancellationPolicy,
    termsPolicy
} from '../data/policies';

import './PolicyModals.css';

const POLICIES = {
    pricing: pricingPolicy,
    refund: refundPolicy,
    cancellation: cancellationPolicy,
    terms: termsPolicy,
};

export default function PolicyModals({ activePolicy, onClose }) {
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };

        if (activePolicy) {
            document.addEventListener('keydown', handleEsc);
            document.body.classList.add('policy-modal-open');
        }

        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.classList.remove('policy-modal-open');
        };
    }, [activePolicy, onClose]);

    if (!activePolicy) return null;

    const policy = POLICIES[activePolicy];

    if (!policy) return null;

    return (
        <div
            className="foundation-policy-overlay"
            onClick={onClose}
        >
            <div
                className="foundation-policy-dialog"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="foundation-policy-frame">

                    {/* Header */}
                    <div className="foundation-policy-header">

                        <div className="foundation-policy-emblem">
                            <i className={`fas ${policy.icon}`}></i>
                        </div>

                        <div className="foundation-policy-heading">
                            <h2>{policy.title}</h2>
                            <p>
                                <strong>Marutham Foundation</strong>
                                {' '}· Policies & Guidelines
                            </p>
                        </div>

                        <button
                            type="button"
                            className="foundation-policy-close"
                            onClick={onClose}
                            aria-label="Close"
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    </div>

                    {/* Section label */}
                    <div className="foundation-policy-label">
                        <span>
                            <i className="fas fa-leaf"></i>
                            {policy.title}
                        </span>

                        <span className="foundation-policy-label-mark">
                            OFFICIAL POLICY
                        </span>
                    </div>

                    {/* Policy content */}
                    <div className="foundation-policy-body">
                        <div className="foundation-policy-content">
                            {policy.content}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="foundation-policy-footer">
                        <p>
                            <i className="fas fa-seedling"></i>
                            Together for Nature, Education & Community
                        </p>

                        <button
                            type="button"
                            className="foundation-policy-footer-button"
                            onClick={onClose}
                        >
                            <i className="fas fa-times"></i>
                            Close
                        </button>
                    </div>

                    <div className="foundation-policy-bottom-mark">
                        ❧ &nbsp; MARUTHAM FOUNDATION &nbsp; ❧
                    </div>

                </div>
            </div>
        </div>
    );
}
