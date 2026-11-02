import React, { useState } from 'react';
import { Modal } from 'bootstrap';

const AMOUNTS = [
    { value: '500', label: '₹500' },
    { value: '1000', label: '₹1,000', selected: true },
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
        setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
            setError('Please fill in all required fields (Name, Email, Phone).');
            return;
        }
        if (!form.consent) {
            setError('Please agree to the terms and conditions.');
            return;
        }

        setProcessing(true);

        // Simulate submission — replace with real API call
        try {
            await new Promise((r) => setTimeout(r, 1500));
            // window.location.href = 'initiate_payment.php'; // Uncomment for real integration
            alert('Thank you! Your donation is being processed.');
            onClose();
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div
            className={`modal fade donation-modal ${show ? 'show d-block' : ''}`}
            tabIndex="-1"
            style={{ display: show ? 'block' : 'none', background: show ? 'rgba(0,0,0,0.5)' : 'transparent' }}
            aria-hidden={!show}
        >
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <div>
                            <h5 className="modal-title donation-title">
                                <i className="fas fa-hand-holding-heart me-2" style={{ color: '#F2B50B' }}></i>{' '}
                                Make a Donation
                            </h5>
                            <p className="donation-sub mt-1 mb-0">
                                <i className="fas fa-leaf me-1" style={{ color: '#48A111' }}></i> Your support
                                nurtures nature, education, and communities.
                            </p>
                        </div>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                            aria-label="Close"
                        ></button>
                    </div>

                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label htmlFor="donorName" className="form-label fw-semibold">
                                        <i className="fas fa-user me-1"></i> Full Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="donorName"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="Your name"
                                        required
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="donorEmail" className="form-label fw-semibold">
                                        <i className="fas fa-envelope me-1"></i> Email
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="donorEmail"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="you@example.com"
                                        required
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="donorPhone" className="form-label fw-semibold">
                                        <i className="fas fa-phone me-1"></i> Phone
                                    </label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        id="donorPhone"
                                        name="phone"
                                        value={form.phone}
                                        onChange={handleChange}
                                        placeholder="+91 98765 43210"
                                        required
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="donationAmount" className="form-label fw-semibold">
                                        <i className="fas fa-rupee-sign me-1"></i> Amount (₹)
                                    </label>
                                    <select
                                        className="form-select"
                                        id="donationAmount"
                                        name="donationAmount"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                    >
                                        {AMOUNTS.map((a) => (
                                            <option key={a.value} value={a.value}>
                                                {a.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {amount === 'other' && (
                                    <div className="col-12">
                                        <label htmlFor="customAmount" className="form-label fw-semibold">
                                            <i className="fas fa-pencil-alt me-1"></i> Custom Amount (₹)
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="customAmount"
                                            value={customAmount}
                                            onChange={(e) => setCustomAmount(e.target.value)}
                                            placeholder="Enter amount"
                                            min="1"
                                        />
                                    </div>
                                )}

                                <div className="col-12">
                                    <label htmlFor="donationPurpose" className="form-label fw-semibold">
                                        <i className="fas fa-tag me-1"></i> Purpose
                                    </label>
                                    <select
                                        className="form-select"
                                        id="donationPurpose"
                                        name="purpose"
                                        value={form.purpose}
                                        onChange={handleChange}
                                    >
                                        {PURPOSES.map((p) => (
                                            <option key={p} value={p}>
                                                {p}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="col-12">
                                    <label htmlFor="donorMessage" className="form-label fw-semibold">
                                        <i className="fas fa-comment me-1"></i> Message (optional)
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="donorMessage"
                                        name="message"
                                        value={form.message}
                                        onChange={handleChange}
                                        rows="2"
                                        placeholder="Your words of encouragement..."
                                    ></textarea>
                                </div>

                                <div className="col-12">
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="donorConsent"
                                            name="consent"
                                            checked={form.consent}
                                            onChange={handleChange}
                                            required
                                        />
                                        <label className="form-check-label" htmlFor="donorConsent">
                                            I agree to the{' '}
                                            <a
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    onOpenModal('terms');
                                                }}
                                                style={{ color: '#25671E' }}
                                            >
                                                Terms &amp; Conditions
                                            </a>
                                            ,{' '}
                                            <a
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    onOpenModal('pricing');
                                                }}
                                                style={{ color: '#25671E' }}
                                            >
                                                pricing policy
                                            </a>{' '}
                                            and{' '}
                                            <a
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    onOpenModal('refund');
                                                }}
                                                style={{ color: '#25671E' }}
                                            >
                                                refund/cancellation
                                            </a>{' '}
                                            terms.
                                        </label>
                                    </div>
                                </div>

                                {error && (
                                    <div className="col-12">
                                        <div className="alert alert-danger py-2 mb-0">{error}</div>
                                    </div>
                                )}

                                <div className="col-12">
                                    <button
                                        type="submit"
                                        className="btn-submit-donate w-100"
                                        disabled={processing}
                                    >
                                        <i className="fas fa-credit-card me-2"></i>{' '}
                                        {processing ? 'Processing...' : 'Pay with ICICI Bank'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn-close-donate" onClick={onClose}>
                            <i className="fas fa-times me-1"></i>Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}