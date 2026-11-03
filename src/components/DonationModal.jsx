
import React, { useState } from 'react';

const AMOUNTS = [
    { value: '500', label: '₹500' },
    { value: '1000', label: '₹1,000' },
    { value: '2500', label: '₹2,500' },
    { value: '5000', label: '₹5,000' },
    { value: '10000', label: '₹10,000' },
    { value: 'other', label: 'Other' },
];

const PURPOSES = [
    'General Support',
    'Education & Scholarships',
    'Environment & Soil/Water',
    'Livelihood & SHGs',
    'Indigenous Cattle Conservation',
];

export default function DonationModal({ show, onClose, onOpenModal }) {
    const [amount, setAmount] = useState('1000');
    const [customAmount, setCustomAmount] = useState('');

    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        purpose: 'General Support',
        message: '',
        consent: false,
    });

    const [error, setError] = useState('');
    const [processing, setProcessing] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));

        if (error) setError('');
    };

    const selectedAmount = amount === 'other'
        ? Number(customAmount)
        : Number(amount);

    const formatAmount = (value) =>
        Number(value).toLocaleString('en-IN');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
            setError('Please fill in your name, email and phone number.');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            setError('Please enter a valid email address.');
            return;
        }

        if (amount === 'other' && (!customAmount || selectedAmount <= 0)) {
            setError('Please enter a valid donation amount.');
            return;
        }

        if (!Number.isFinite(selectedAmount) || selectedAmount <= 0) {
            setError('Please select a valid donation amount.');
            return;
        }

        if (!form.consent) {
            setError('Please agree to the terms and conditions.');
            return;
        }

        setProcessing(true);

        try {
            // TODO: Replace this simulation with the ICICI payment API.
            await new Promise((resolve) => setTimeout(resolve, 1500));

            alert(
                `Thank you, ${form.name}! Your donation of ₹${formatAmount(selectedAmount)} is ready for payment integration.`
            );

            onClose();
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setProcessing(false);
        }
    };

    const openPolicy = (policy) => {
        if (onOpenModal) onOpenModal(policy);
    };

    if (!show) return null;

    return (
        <div
            className="donation-overlay"
            onClick={onClose}
            role="presentation"
        >
            <div
                className="donation-modal-premium"
                role="dialog"
                aria-modal="true"
                aria-labelledby="donationTitle"
                onClick={(e) => e.stopPropagation()}
            >
                {/* HEADER */}
                <div className="donation-modal-header">
                    <div className="donation-header-icon">
                        <i className="fas fa-hand-holding-heart"></i>
                    </div>

                    <div className="donation-header-content">
                        <h2 id="donationTitle">Make a Donation</h2>
                        <p>
                            Your generosity nurtures nature, education
                            and communities.
                        </p>
                    </div>

                    <button
                        type="button"
                        className="donation-close"
                        onClick={onClose}
                        aria-label="Close donation window"
                    >
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                <form className="donation-modal-form" onSubmit={handleSubmit}>
                    <div className="donation-modal-body">

                        {/* DONOR INFORMATION */}
                        <div className="donation-section-heading">
                            <i className="fas fa-user-circle"></i>
                            Donor Information
                        </div>

                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="donation-label">
                                    Full Name <span>*</span>
                                </label>

                                <div className="donation-input-wrap">
                                    <i className="fas fa-user"></i>
                                    <input
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="Enter your full name"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <label className="donation-label">
                                    Email Address <span>*</span>
                                </label>

                                <div className="donation-input-wrap">
                                    <i className="fas fa-envelope"></i>
                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="you@example.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <label className="donation-label">
                                    Phone Number <span>*</span>
                                </label>

                                <div className="donation-input-wrap">
                                    <i className="fas fa-phone-alt"></i>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={form.phone}
                                        onChange={handleChange}
                                        placeholder="+91 98765 43210"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* DONATION AMOUNT */}
                        <div className="donation-section-heading mt-4">
                            <i className="fas fa-rupee-sign"></i>
                            Choose Your Contribution
                        </div>

                        <div className="donation-amount-grid">
                            {AMOUNTS.map((item) => (
                                <button
                                    type="button"
                                    key={item.value}
                                    className={`donation-amount-btn ${
                                        amount === item.value ? 'active' : ''
                                    }`}
                                    onClick={() => {
                                        setAmount(item.value);
                                        setError('');
                                    }}
                                >
                                    {item.value === 'other' && (
                                        <i className="fas fa-pen me-1"></i>
                                    )}
                                    {item.label}
                                </button>
                            ))}
                        </div>

                        {amount === 'other' && (
                            <div className="mt-3">
                                <label className="donation-label">
                                    Enter Custom Amount (₹)
                                </label>

                                <div className="donation-input-wrap">
                                    <i className="fas fa-rupee-sign"></i>
                                    <input
                                        type="number"
                                        min="1"
                                        step="1"
                                        value={customAmount}
                                        onChange={(e) => {
                                            setCustomAmount(e.target.value);
                                            setError('');
                                        }}
                                        placeholder="Enter your contribution"
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        <div className="donation-summary">
                            <div>
                                <span>Your Contribution</span>
                                <small>Every contribution makes a difference.</small>
                            </div>

                            <strong>
                                ₹{formatAmount(selectedAmount || 0)}
                            </strong>
                        </div>

                        {/* PURPOSE */}
                        <div className="donation-section-heading mt-4">
                            <i className="fas fa-seedling"></i>
                            Donation Purpose
                        </div>

                        <div className="donation-input-wrap donation-select-wrap">
                            <i className="fas fa-hand-holding-heart"></i>

                            <select
                                name="purpose"
                                value={form.purpose}
                                onChange={handleChange}
                            >
                                {PURPOSES.map((purpose) => (
                                    <option key={purpose} value={purpose}>
                                        {purpose}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* MESSAGE */}
                        <div className="donation-section-heading mt-4">
                            <i className="fas fa-comment-dots"></i>
                            Your Message
                            <small>(Optional)</small>
                        </div>

                        <textarea
                            className="donation-message"
                            name="message"
                            rows="3"
                            value={form.message}
                            onChange={handleChange}
                            placeholder="Write a message of encouragement..."
                        />

                        {/* CONSENT */}
                        <div className="donation-consent">
                            <input
                                type="checkbox"
                                id="donorConsent"
                                name="consent"
                                checked={form.consent}
                                onChange={handleChange}
                            />

                            <label htmlFor="donorConsent">
                                I agree to the{' '}
                                <button type="button" onClick={() => openPolicy('terms')}>
                                    Terms & Conditions
                                </button>
                                ,{' '}
                                <button type="button" onClick={() => openPolicy('pricing')}>
                                    Pricing Policy
                                </button>
                                {' '}and{' '}
                                <button type="button" onClick={() => openPolicy('refund')}>
                                    Refund / Cancellation Policy
                                </button>.
                            </label>
                        </div>

                        {/* ERROR */}
                        {error && (
                            <div className="donation-error">
                                <i className="fas fa-exclamation-circle"></i>
                                {error}
                            </div>
                        )}

                        {/* PAYMENT */}
                        <button
                            type="submit"
                            className="donation-payment-btn"
                            disabled={processing}
                        >
                            {processing ? (
                                <>
                                    <i className="fas fa-spinner fa-spin"></i>
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <i className="fas fa-lock"></i>
                                    Pay ₹{formatAmount(selectedAmount || 0)} with ICICI Bank
                                    <i className="fas fa-arrow-right"></i>
                                </>
                            )}
                        </button>

                        <div className="donation-security-note">
                            <i className="fas fa-shield-alt"></i>
                            Your information will be used to process your donation.
                        </div>
                    </div>
                </form>

                {/* FOOTER */}
                <div className="donation-modal-footer">
                    <span>
                        <i className="fas fa-leaf"></i>
                        Nature · Education · Community
                    </span>

                    <button type="button" onClick={onClose}>
                        Close <i className="fas fa-times"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}
