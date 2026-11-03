
import React from 'react';

export default function GISExplorer({ onBack }) {
    return (
        <div style={{
            minHeight: '100vh',
            background: '#f5f7f5',
            padding: '30px'
        }}>
            <button onClick={onBack}>
                ← Back to What We Do
            </button>

            <h2 style={{ marginTop: '30px' }}>
                Marutham Foundation - GIS Explorer
            </h2>

            <p>Tamil Nadu GIS Map Explorer</p>
        </div>
    );
}
