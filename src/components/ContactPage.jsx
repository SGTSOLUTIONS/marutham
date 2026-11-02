import React, { useState } from 'react';

export default function ContactPage() {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

    const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) return alert('Please fill all required fields.');
        alert(`✅ Thanks ${formData.name}! Your message has been sent.`);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    };

    const openGoogleMaps = () => {
        const address = "124, MKN Rd, Ramapuram, Alandur, Chennai, Tamil Nadu 600016";
        window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, '_blank');
    };

    return (
        <div className="fade-up visible">
            <div className="page-header">
                <h1><i className="fas fa-address-card me-3"></i>Contact Us</h1>
                <p>Get in touch with us — we'd love to hear from you and collaborate for a greener, more sustainable future.</p>
            </div>

            <div className="contact-grid">
                <div className="contact-info-card">
                    <h3>Contact Information</h3>
                    <div className="contact-detail-item">
                        <div className="contact-icon"><i className="fas fa-map-marker-alt"></i></div>
                        <span>New 533, Old 124, MKN Rd, First floor, Alandur, Chennai, Tamil Nadu 600016</span>
                    </div>
                    <div className="contact-detail-item">
                        <div className="contact-icon"><i className="fas fa-phone-alt"></i></div>
                        <a href="tel:+918903138792">+91 89031 38792</a>
                    </div>
                    <div className="contact-detail-item">
                        <div className="contact-icon"><i className="fas fa-envelope"></i></div>
                        <a href="mailto:maruthamfoundationinfo@gmail.com">maruthamfoundationinfo@gmail.com</a>
                    </div>
                    <div className="business-hours">
                        <h4><i className="far fa-clock"></i> Business Hours</h4>
                        <p><span>Monday – Saturday:</span> <span>9:00 AM – 5:00 PM</span></p>
                        <p><span>Sunday:</span> <span style={{ color: '#b33c3c', fontWeight: 600 }}>Closed</span></p>
                    </div>
                    <div className="social-links">
                        <a href="#"><i className="fab fa-facebook-f"></i></a>
                        <a href="#"><i className="fab fa-instagram"></i></a>
                        <a href="#"><i className="fab fa-twitter"></i></a>
                        <a href="#"><i className="fab fa-youtube"></i></a>
                    </div>
                </div>

                <div className="map-card">
                    <h3><i className="fas fa-map-pin"></i> Our Location</h3>
                    <div className="map-preview" onClick={openGoogleMaps}>
                        <div className="map-placeholder">
                            <i className="fas fa-map-marked-alt"></i>
                            <p>Marutham Foundation, Alandur</p>
                            <div className="address-badge"><i className="fas fa-location-dot"></i> 124, MKN Rd, Ramapuram, Alandur, Chennai</div>
                        </div>
                    </div>
                    <button className="google-map-btn" onClick={openGoogleMaps}>
                        <i className="fab fa-google"></i> Open in Google Maps
                    </button>
                </div>
            </div>

            <div className="contact-form-card">
                <h3><i className="fas fa-paper-plane"></i> Send us a Message</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group"><input type="text" id="name" placeholder="Full Name *" value={formData.name} onChange={handleChange} required /></div>
                    <div className="form-group"><input type="email" id="email" placeholder="Email Address *" value={formData.email} onChange={handleChange} required /></div>
                    <div className="form-group"><input type="tel" id="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} /></div>
                    <div className="form-group">
                        <select id="subject" value={formData.subject} onChange={handleChange}>
                            <option value="">Select Subject</option>
                            <option value="General Inquiry">General Inquiry</option>
                            <option value="Volunteering">Volunteering</option>
                            <option value="Donation Support">Donation Support</option>
                            <option value="Partnership">Partnership / Collaboration</option>
                        </select>
                    </div>
                    <div className="form-group"><textarea id="message" rows="4" placeholder="Tell us about your inquiry... *" value={formData.message} onChange={handleChange} required></textarea></div>
                    <button type="submit" className="btn-submit">Send Message <i className="fas fa-arrow-right"></i></button>
                </form>
            </div>
        </div>
    );
}