
import React, { useState } from 'react';

const ADDRESS =
    'New 533, Old 124, MKN Rd, First Floor, Alandur, Chennai, Tamil Nadu 600016';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const openGoogleMaps = () => {
        window.open(
            `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`,
            '_blank',
            'noopener,noreferrer'
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const subject = formData.subject || 'General Inquiry';

        const body = `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Subject: ${subject}

Message:
${formData.message}
        `;

        window.location.href =
            `mailto:maruthamfoundationinfo@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    return (
        <div className="fade-up visible contact-page">

            {/* PAGE HERO */}
            <section className="contact-hero">
                <div className="hero-ornament top-left">❧</div>
                <div className="hero-ornament bottom-right">❧</div>

                <div className="contact-hero-icon">
                    <i className="fas fa-envelope-open-text"></i>
                </div>

                <h1>Get in Touch</h1>

                <div className="contact-hero-subtitle">
                    The Light of Nature, the Guarantee of Life
                </div>

                <p>
                    We believe every meaningful change begins with a conversation.
                    Reach out to us, share your ideas, and join our journey towards
                    a greener and more sustainable future.
                </p>

                <div className="contact-hero-tag">
                    <i className="fas fa-leaf"></i>
                    Let's Grow Together
                </div>
            </section>

            {/* CONTACT SECTION */}
            <section className="contact-main-section">

                <div className="text-center mb-5">
                    <h2 className="section-head-aef">
                        <i className="fas fa-address-card me-2"></i>
                        Contact Information
                    </h2>

                </div>

                <div className="row g-4">

                    {/* LEFT CONTACT DETAILS */}
                    <div className="col-lg-5">
                        <div className="contact-info-card">

                            <div className="contact-card-heading">
                                <span className="contact-heading-icon">
                                    <i className="fas fa-headset"></i>
                                </span>
                                <div>
                                    <h3>Let's Connect</h3>
                                    <p>We're always happy to help.</p>
                                </div>
                            </div>

                            <div className="contact-detail-item">
                                <div className="contact-icon">
                                    <i className="fas fa-map-marker-alt"></i>
                                </div>
                                <div>
                                    <h5>Our Office</h5>
                                    <p>{ADDRESS}</p>
                                    <button
                                        className="contact-text-link"
                                        onClick={openGoogleMaps}
                                    >
                                        Get Directions
                                        <i className="fas fa-arrow-right ms-2"></i>
                                    </button>
                                </div>
                            </div>

                            <div className="contact-detail-item">
                                <div className="contact-icon">
                                    <i className="fas fa-phone-alt"></i>
                                </div>
                                <div>
                                    <h5>Call Us</h5>
                                    <a href="tel:+918903138792">
                                        +91 89031 38792
                                    </a>
                                </div>
                            </div>

                            <div className="contact-detail-item">
                                <div className="contact-icon">
                                    <i className="fas fa-envelope"></i>
                                </div>
                                <div>
                                    <h5>Email Us</h5>
                                    <a href="mailto:maruthamfoundationinfo@gmail.com">
                                        maruthamfoundationinfo@gmail.com
                                    </a>
                                </div>
                            </div>

                            <div className="business-hours">
                                <h4>
                                    <i className="far fa-clock me-2"></i>
                                    Office Hours
                                </h4>

                                <div className="hours-row">
                                    <span>Monday – Saturday</span>
                                    <strong>9:00 AM – 5:00 PM</strong>
                                </div>

                                <div className="hours-row">
                                    <span>Sunday</span>
                                    <strong className="closed-text">Closed</strong>
                                </div>
                            </div>

                            <div className="contact-social">
                                <h5>Connect With Us</h5>
                                <div className="social-links">
                                    <a href="#" aria-label="Facebook">
                                        <i className="fab fa-facebook-f"></i>
                                    </a>
                                    <a href="#" aria-label="Instagram">
                                        <i className="fab fa-instagram"></i>
                                    </a>
                                    <a href="#" aria-label="Twitter">
                                        <i className="fab fa-twitter"></i>
                                    </a>
                                    <a href="#" aria-label="YouTube">
                                        <i className="fab fa-youtube"></i>
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* RIGHT CONTACT FORM */}
                    <div className="col-lg-7">
                        <div className="contact-form-card">

                            <div className="contact-form-heading">
                                <div className="contact-form-icon">
                                    <i className="fas fa-paper-plane"></i>
                                </div>
                                <div>
                                    <h3>Send Us a Message</h3>
                                    <p>
                                        Have a question or an idea?
                                        Write to us.
                                    </p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit}>

                                <div className="row g-3">

                                    <div className="col-md-6">
                                        <label>Full Name *</label>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Enter your name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label>Email Address *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Enter your email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label>Phone Number</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            placeholder="Enter phone number"
                                            value={formData.phone}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label>Subject</label>
                                        <select
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select Subject</option>
                                            <option value="General Inquiry">
                                                General Inquiry
                                            </option>
                                            <option value="Volunteering">
                                                Volunteering
                                            </option>
                                            <option value="Donation Support">
                                                Donation Support
                                            </option>
                                            <option value="Partnership">
                                                Partnership / Collaboration
                                            </option>
                                        </select>
                                    </div>

                                    <div className="col-12">
                                        <label>Your Message *</label>
                                        <textarea
                                            name="message"
                                            rows="5"
                                            placeholder="Tell us how we can help you..."
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                        ></textarea>
                                    </div>

                                    <div className="col-12">
                                        <button
                                            type="submit"
                                            className="btn-submit"
                                        >
                                            Send Message
                                            <i className="fas fa-arrow-right ms-2"></i>
                                        </button>
                                    </div>

                                </div>
                            </form>

                            <div className="contact-form-note">
                                <i className="fas fa-lock me-2"></i>
                                Your contact details are used only to respond
                                to your inquiry.
                            </div>

                        </div>
                    </div>

                </div>
            </section>

            {/* MAP SECTION */}
            <section className="contact-map-section">

                <div className="text-center mb-4">
                    <h2 className="section-head-aef">
                        <i className="fas fa-map-marked-alt me-2"></i>
                        Find Our Location
                    </h2>

                </div>

                <div className="contact-map-card">

                    <div className="contact-map-frame">
                        <iframe
                            title="Marutham Foundation Location"
                            src={`https://maps.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`}
                            width="100%"
                            height="400"
                            style={{ border: 0 }}
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>

                    <div className="map-bottom-info">
                        <div>
                            <i className="fas fa-map-marker-alt"></i>
                            <span>Marutham Foundation, Alandur, Chennai</span>
                        </div>

                        <button onClick={openGoogleMaps}>
                            <i className="fas fa-directions me-2"></i>
                            Get Directions
                        </button>
                    </div>

                </div>
            </section>

            {/* BOTTOM MESSAGE */}
            <section className="contact-bottom-banner">
                <i className="fas fa-leaf"></i>
                <h2>Nature · Education · Community</h2>
                <p>
                    Together, let's create a better tomorrow for generations to come.
                </p>
                <span>Marutham Foundation</span>
            </section>

        </div>
    );
}
