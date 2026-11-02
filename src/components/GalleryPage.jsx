import React, { useState } from 'react';

const GALLERY_ITEMS = [
    { id: 1, category: 'soil', img: 'images/soil.jpg', title: 'Soil Testing & Fertility Mapping', desc: 'Using geospatial technologies for sustainable agriculture' },
    { id: 2, category: 'soil', img: 'images/water.jpg', title: 'Water Body Restoration', desc: 'Rejuvenating ponds and traditional water systems' },
    { id: 3, category: 'education', img: 'images/education.jpg', title: 'Educational Support', desc: 'Scholarships and mentorship for underprivileged students' },
    { id: 4, category: 'farming', img: 'images/country.jpg', title: 'Country Cows Conservation', desc: 'Protecting indigenous cattle breeds for sustainable dairy' },
    { id: 5, category: 'community', img: 'images/community.jpg', title: 'Community Engagement', desc: 'Participatory development and grassroots leadership' },
    { id: 6, category: 'women', img: 'images/women empower.jpg', title: 'Women Self-Help Groups', desc: 'Entrepreneurship and leadership training for women' },
];

export default function GalleryPage() {
    const [filter, setFilter] = useState('all');

    const filteredItems = filter === 'all' ? GALLERY_ITEMS : GALLERY_ITEMS.filter(item => item.category === filter);

    return (
        <div className="fade-up visible">
            <div className="page-header">
                <h1><i className="fas fa-images me-3"></i>Our Gallery</h1>
                <p>Moments captured from our journey — protecting nature, empowering communities, and building a sustainable future.</p>
            </div>

            <div className="d-flex flex-wrap justify-content-center gap-2 gap-md-3 mb-4">
                <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
                <button className={`filter-btn ${filter === 'soil' ? 'active' : ''}`} onClick={() => setFilter('soil')}>Soil & Water</button>
                <button className={`filter-btn ${filter === 'education' ? 'active' : ''}`} onClick={() => setFilter('education')}>Education</button>
                <button className={`filter-btn ${filter === 'farming' ? 'active' : ''}`} onClick={() => setFilter('farming')}>Farming</button>
                <button className={`filter-btn ${filter === 'community' ? 'active' : ''}`} onClick={() => setFilter('community')}>Community</button>
                <button className={`filter-btn ${filter === 'women' ? 'active' : ''}`} onClick={() => setFilter('women')}>Women SHGs</button>
            </div>

            <section className="my-4">
                <div className="row g-4">
                    {filteredItems.map(item => (
                        <div className="col-md-6 col-lg-4 gallery-item-wrap" key={item.id}>
                            <div className="gallery-item">
                                <img src={item.img} alt={item.title} loading="lazy" />
                                <div className="overlay">
                                    <h5>{item.title}</h5>
                                    <p>{item.desc}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}