
import React, { useState, useEffect } from 'react';

const GALLERY_ITEMS = [
    {
        id: 1,
        category: 'soil',
        img: '/Images/soil.jpg',
        title: 'Soil Testing & Fertility Mapping',
        desc: 'Using geospatial technologies for sustainable agriculture.',
    },
    {
        id: 2,
        category: 'soil',
        img: '/Images/water.jpg',
        title: 'Water Body Restoration',
        desc: 'Rejuvenating ponds and traditional water systems.',
    },
    {
        id: 3,
        category: 'education',
        img: '/Images/education.jpg',
        title: 'Educational Support',
        desc: 'Scholarships and mentorship for underprivileged students.',
    },
    {
        id: 4,
        category: 'farming',
        img: '/Images/country.jpg',
        title: 'Country Cows Conservation',
        desc: 'Protecting indigenous cattle breeds for sustainable dairy.',
    },
    {
        id: 5,
        category: 'community',
        img: '/Images/community.jpg',
        title: 'Community Engagement',
        desc: 'Participatory development and grassroots leadership.',
    },
    {
        id: 6,
        category: 'women',
        img: '/Images/women%20empower.jpg',
        title: 'Women Self-Help Groups',
        desc: 'Entrepreneurship and leadership training for women.',
    },
];

const FILTERS = [
    { id: 'all', label: 'All Moments', icon: 'fa-images' },
    { id: 'soil', label: 'Soil & Water', icon: 'fa-seedling' },
    { id: 'education', label: 'Education', icon: 'fa-graduation-cap' },
    { id: 'farming', label: 'Farming', icon: 'fa-tractor' },
    { id: 'community', label: 'Community', icon: 'fa-users' },
    { id: 'women', label: 'Women SHGs', icon: 'fa-hands-helping' },
];

export default function GalleryPage() {

    const [filter, setFilter] = useState('all');
    const [selectedImage, setSelectedImage] = useState(null);

    const filteredItems =
        filter === 'all'
            ? GALLERY_ITEMS
            : GALLERY_ITEMS.filter(item => item.category === filter);

    const openImage = (item) => {
        setSelectedImage(item);
    };

    const closeImage = () => {
        setSelectedImage(null);
    };

    const showNext = () => {
        if (!selectedImage) return;

        const currentIndex = GALLERY_ITEMS.findIndex(
            item => item.id === selectedImage.id
        );

        const nextIndex = (currentIndex + 1) % GALLERY_ITEMS.length;

        setSelectedImage(GALLERY_ITEMS[nextIndex]);
    };

    const showPrevious = () => {
        if (!selectedImage) return;

        const currentIndex = GALLERY_ITEMS.findIndex(
            item => item.id === selectedImage.id
        );

        const previousIndex =
            (currentIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;

        setSelectedImage(GALLERY_ITEMS[previousIndex]);
    };

    useEffect(() => {

        if (!selectedImage) return;

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') closeImage();
            if (event.key === 'ArrowRight') showNext();
            if (event.key === 'ArrowLeft') showPrevious();
        };

        document.addEventListener('keydown', handleKeyDown);

        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };

    }, [selectedImage]);

    return (
        <main className="gallery-heritage-page">

            {/* =================================
                GALLERY HERO BANNER
            ================================= */}

            <section className="gallery-hero-banner">

                <div className="gallery-banner-ornament left">
                    ❧
                </div>

                <div className="gallery-banner-content">

                    <div className="gallery-banner-icon">
                        <i className="fas fa-images"></i>
                    </div>

                    <h1>Our Gallery</h1>

                    <h3>
                        The Light of Nature, the Guarantee of Life
                    </h3>

                    <p>
                        Every picture tells a story. Explore moments from
                        our journey of protecting nature, supporting
                        education, empowering communities and building
                        a sustainable future.
                    </p>

                    <div className="gallery-count">
                        <i className="fas fa-camera"></i>
                        <span>{GALLERY_ITEMS.length} Moments Captured</span>
                    </div>

                </div>

                <div className="gallery-banner-ornament right">
                    ❧
                </div>

            </section>


            {/* =================================
                GALLERY FILTERS
            ================================= */}

            <section className="gallery-content-section">

                <div className="gallery-section-heading">

                    <div className="gallery-heading-frame">
                        <i className="fas fa-camera-retro"></i>
                        <h2>Captured Moments</h2>
                    </div>

                    <p>
                        A glimpse into our work, people and achievements
                    </p>

                </div>


                <div className="gallery-filter-wrapper">

                    {FILTERS.map(item => (

                        <button
                            type="button"
                            key={item.id}
                            className={`gallery-filter-btn ${
                                filter === item.id ? 'active' : ''
                            }`}
                            onClick={() => setFilter(item.id)}
                        >

                            <i className={`fas ${item.icon}`}></i>

                            {item.label}

                        </button>

                    ))}

                </div>


                {/* =================================
                    IMAGE GRID
                ================================= */}

                <div className="row g-4 gallery-grid">

                    {filteredItems.map((item, index) => (

                        <div
                            className="col-lg-4 col-md-6"
                            key={item.id}
                        >

                            <article
                                className="gallery-heritage-card"
                                style={{
                                    animationDelay: `${index * 0.08}s`
                                }}
                            >

                                <div
                                    className="gallery-image-container"
                                    onClick={() => openImage(item)}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            openImage(item);
                                        }
                                    }}
                                    aria-label={`View ${item.title}`}
                                >

                                    <img
                                        src={item.img}
                                        alt={item.title}
                                        loading="lazy"
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'none';
                                            e.currentTarget.parentElement.classList.add('gallery-image-error');
                                        }}
                                    />

                                    <div className="gallery-image-overlay">

                                        <div className="gallery-view-icon">
                                            <i className="fas fa-search-plus"></i>
                                        </div>

                                        <span>View Photograph</span>

                                    </div>

                                    <div className="gallery-image-number">
                                        {String(item.id).padStart(2, '0')}
                                    </div>

                                </div>


                                <div className="gallery-card-content">

                                    <div className="gallery-card-category">
                                        <i className="fas fa-leaf"></i>
                                        {FILTERS.find(f => f.id === item.category)?.label}
                                    </div>

                                    <h3>{item.title}</h3>

                                    <p>{item.desc}</p>

                                    <div className="gallery-card-bottom">
                                        <span>Marutham Foundation</span>
                                        <i className="fas fa-seedling"></i>
                                    </div>

                                </div>

                            </article>

                        </div>

                    ))}

                </div>


                {filteredItems.length === 0 && (
                    <div className="gallery-empty">
                        No photographs found in this category.
                    </div>
                )}

            </section>


            {/* =================================
                GALLERY QUOTE
            ================================= */}

            <section className="gallery-final-quote">

                <i className="fas fa-leaf"></i>

                <h2>
                    Every Moment Has a Meaning
                </h2>

                <p>
                    Protecting nature, empowering people and preserving
                    our heritage for generations to come.
                </p>

                <span>
                    Nature · Education · Community
                </span>

            </section>


            {/* =================================
                IMAGE LIGHTBOX
            ================================= */}

            {selectedImage && (

                <div
                    className="gallery-lightbox"
                    onClick={closeImage}
                >

                    <button
                        type="button"
                        className="gallery-lightbox-close"
                        onClick={closeImage}
                        aria-label="Close image preview"
                    >
                        <i className="fas fa-times"></i>
                    </button>

                    <button
                        type="button"
                        className="gallery-lightbox-nav previous"
                        onClick={(e) => {
                            e.stopPropagation();
                            showPrevious();
                        }}
                        aria-label="Previous image"
                    >
                        <i className="fas fa-chevron-left"></i>
                    </button>

                    <div
                        className="gallery-lightbox-content"
                        onClick={(e) => e.stopPropagation()}
                    >

                        <img
                            src={selectedImage.img}
                            alt={selectedImage.title}
                        />

                        <div className="gallery-lightbox-caption">

                            <h3>{selectedImage.title}</h3>

                            <p>{selectedImage.desc}</p>

                        </div>

                    </div>

                    <button
                        type="button"
                        className="gallery-lightbox-nav next"
                        onClick={(e) => {
                            e.stopPropagation();
                            showNext();
                        }}
                        aria-label="Next image"
                    >
                        <i className="fas fa-chevron-right"></i>
                    </button>

                </div>

            )}

        </main>
    );
}
