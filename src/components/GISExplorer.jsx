import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet.vectorgrid';
import proj4 from 'proj4';
import 'leaflet/dist/leaflet.css';

// Candidate projection for River Basin source coordinates.
// The file's EPSG:4326 label conflicts with its metre-scale coordinates.
// This UTM Zone 43N definition is a working hypothesis and must be checked
// visually against the known Tamil Nadu boundary layers.
proj4.defs(
    'EPSG:32643',
    '+proj=utm +zone=43 +datum=WGS84 +units=m +no_defs +type=crs'
);


export default function GISExplorer({ onBack }) {
    const mapRef = useRef(null);
    const mapInstance = useRef(null);

    const districtLayerRef = useRef(null);
    const talukLayerRef = useRef(null);
    const blockLayerRef = useRef(null);
    const firkaLayerRef = useRef(null);
    const villageLayerRef = useRef(null);
    const roadLayerRef = useRef(null);
    const drainageLayerRef = useRef(null);
    const riverBasinLayerRef = useRef(null);
    const geologyLayerRef = useRef(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [districtCount, setDistrictCount] = useState(0);
    const [talukCount, setTalukCount] = useState(0);
    const [blockCount, setBlockCount] = useState(0);
    const [firkaCount, setFirkaCount] = useState(0);
    const [villageCount, setVillageCount] = useState(0);
    const [roadCount, setRoadCount] = useState(0);
    const [drainageCount, setDrainageCount] = useState(0);
    const [riverBasinCount, setRiverBasinCount] = useState(0);
    const [geologyCount, setGeologyCount] = useState(0);

    const [showDistricts, setShowDistricts] = useState(true);
    const [showTaluks, setShowTaluks] = useState(false);
    const [showBlocks, setShowBlocks] = useState(false);
    const [showFirkas, setShowFirkas] = useState(false);
    const [showVillages, setShowVillages] = useState(false);
    const [showRoads, setShowRoads] = useState(false);
    const [showDrainage, setShowDrainage] = useState(false);
    const [showRiverBasins, setShowRiverBasins] = useState(false);
    const [showGeology, setShowGeology] = useState(false);

    // Read a feature name from the available GeoJSON property fields.
    const getFeatureName = (feature) => {
        const properties = feature?.properties || {};

        const possibleNames = [
            'DISTRICT_NAME',
            'DISTRICT',
            'TALUK_NAME',
            'TALUK',
            'TALUKNAME',
            'BLOCK_NAME',
            'BLOCKNAME',
            'BLK_NAME',
            'BLKNAME',
            'FIRKA_NAME',
            'FIRKA',
            'FIRKA_NAM',
            'FIRKA_NA',
            'FIRK_NAME',
            'FIRK',
            'VILLAGE_NAME',
            'VILLAGENAME',
            'VILL_NAME',
            'VILLNAME',
            'VILLAGE',
            'VILL',
            'ROAD_NAME',
            'ROADNAME',
            'RD_NAME',
            'RDNAME',
            'ROAD',
            'STREET_NAME',
            'STREET',
            'NAME',
            'name',
            'VILLAGE_NAME',
            'BASIN',
            'SubBasin',
            'SUBBASIN',
            'LITHO_UNIT',
            'ROCK_TYPE'
        ];

        for (const key of possibleNames) {
            if (
                properties[key] !== undefined &&
                properties[key] !== null &&
                properties[key] !== ''
            ) {
                return String(properties[key]);
            }
        }

        return 'Unknown';
    };

    // Escape property values before placing them in Leaflet popup HTML.
    const escapeHtml = (value) => {
        return String(value)
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')
            .replaceAll('"', '&quot;')
            .replaceAll("'", '&#039;');
    };

    // Convert EPSG:3857 coordinates to EPSG:4326.
    // Keep this only if the source GeoJSON files are actually EPSG:3857.
    const transformCoordinates = (coords, sourceCrs = 'EPSG:3857') => {
        if (Array.isArray(coords) && typeof coords[0] === 'number') {
            const transformed = sourceCrs === 'EPSG:3857'
                ? proj4('EPSG:3857', 'EPSG:4326', coords.slice(0, 2))
                : coords.slice(0, 2);

            return transformed.concat(coords.slice(2));
        }

        if (!Array.isArray(coords)) {
            return coords;
        }

        return coords.map((child) => transformCoordinates(child, sourceCrs));
    };

    const createGeoJSONLayer = (geojson, type) => {
        const isDistrict = type === 'district';
        const isTaluk = type === 'taluk';
        const isBlock = type === 'block';
        const isFirka = type === 'firka';
        const isVillage = type === 'village';
        const isRoad = type === 'road';
        const isRiverBasin = type === 'riverbasin';
        const isGeology = type === 'geology';
        // Existing boundary datasets use EPSG:3857.
        // River Basin uses a provisional UTM Zone 43N transform because its
        // coordinate values are metres despite the GeoJSON EPSG:4326 label.
        const sourceCrs = isRiverBasin ? 'EPSG:32643' : 'EPSG:3857';

        // Clone the response so the original parsed object is not mutated.
        const safeGeoJSON = {
            ...geojson,
            features: geojson.features.map((feature) => ({
                ...feature,
                geometry: feature.geometry
                    ? {
                        ...feature.geometry,
                        coordinates: transformCoordinates(
                            feature.geometry.coordinates,
                            sourceCrs
                        )
                    }
                    : feature.geometry
            }))
        };

        // TEMPORARY DEBUG: print one transformed River Basin coordinate.
        // This runs once per layer creation, not once for every polygon vertex.
        if (isRiverBasin) {
            const findFirstPosition = (coordinates) => {
                if (
                    Array.isArray(coordinates) &&
                    coordinates.length >= 2 &&
                    typeof coordinates[0] === 'number' &&
                    typeof coordinates[1] === 'number'
                ) {
                    return coordinates.slice(0, 2);
                }

                if (Array.isArray(coordinates)) {
                    for (const child of coordinates) {
                        const position = findFirstPosition(child);
                        if (position) return position;
                    }
                }

                return null;
            };

            console.log(
                'River Basin transformed coordinate [longitude, latitude]:',
                findFirstPosition(safeGeoJSON.features?.[0]?.geometry?.coordinates)
            );
        }

        const layerStyle = {
            district: {
                color: '#c51f1a',
                weight: 2.2,
                fillColor: '#e65b42',
                fillOpacity: 0.12
            },
            taluk: {
                color: '#f59e0b',
                weight: 1.5,
                fillColor: '#facc15',
                fillOpacity: 0.08
            },
            block: {
                color: '#16803c',
                weight: 1.2,
                fillColor: '#86efac',
                fillOpacity: 0.07
            },
            firka: {
                color: '#7c3aed',
                weight: 1.1,
                fillColor: '#a78bfa',
                fillOpacity: 0.06
            },
            village: {
                color: '#0891b2',
                weight: 0.9,
                fillColor: '#67e8f9',
                fillOpacity: 0.045
            },
            riverbasin: {
                color: '#1d4ed8',
                weight: 1.8,
                fillColor: '#60a5fa',
                fillOpacity: 0.16
            },
            geology: {
                color: '#92400e',
                weight: 1.1,
                fillColor: '#d6a756',
                fillOpacity: 0.24
            },
            road: {
                color: '#d97706',
                weight: 2.2,
                opacity: 0.9,
                fillColor: '#d97706',
                fillOpacity: 0
            }
        }[type];

        return L.geoJSON(safeGeoJSON, {
            style: () => ({
                ...layerStyle,
                opacity: 1
            }),

            onEachFeature: (feature, layer) => {
                const name = getFeatureName(feature);
                const properties = feature.properties || {};

                const boundaryType = isDistrict
                    ? 'District Boundary'
                    : isTaluk
                        ? 'Taluk Boundary'
                        : isBlock
                            ? 'Block Boundary'
                            : isFirka
                                ? 'Firka Boundary'
                                : isVillage
                                    ? 'Village Boundary'
                                    : isRiverBasin
                                        ? 'River Basin / Sub-Basin'
                                        : isGeology
                                            ? 'Geological Formation'
                                            : isRoad
                                            ? 'Road / Street'
                                            : 'Boundary';

                const propertyRows = Object.entries(properties)
                    .filter(([, value]) =>
                        value !== null &&
                        value !== undefined &&
                        value !== ''
                    )
                    .slice(0, 8)
                    .map(([key, value]) => (
                        `<div><strong>${escapeHtml(key)}:</strong> ${escapeHtml(value)}</div>`
                    ))
                    .join('');

                const popupHtml = `
                    <div style="min-width:170px">
                        <h4 style="color:#14532d;margin:0 0 8px">
                            ${escapeHtml(name)}
                        </h4>
                        <p style="margin:0 0 8px">${boundaryType}</p>
                        ${propertyRows}
                    </div>
                `;

                layer.bindPopup(popupHtml);
                layer.bindTooltip(escapeHtml(name));

                layer.on('mouseover', function () {
                    if (typeof this.setStyle === 'function') {
                        this.setStyle({
                            weight: layerStyle.weight + 1.2,
                            fillOpacity: 0.25
                        });
                    }
                });

                layer.on('mouseout', function () {
                    if (typeof this.setStyle === 'function') {
                        this.setStyle({
                            weight: layerStyle.weight,
                            fillOpacity: layerStyle.fillOpacity
                        });
                    }
                });
            }
        });
    };

    // Initialize the map and load District, Taluk and Block GeoJSON layers.
    useEffect(() => {
        const container = mapRef.current;

        if (!container || mapInstance.current) {
            return undefined;
        }

        let cancelled = false;
        const controller = new AbortController();

        const map = L.map(container, {
            center: [10.7905, 78.7047],
            zoom: 7,
            zoomControl: false
        });

        mapInstance.current = map;

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
            maxZoom: 19
        }).addTo(map);

        L.control.zoom({
            position: 'topright'
        }).addTo(map);

        const loadLayer = async (url, type) => {
            try {
                const response = await fetch(url, {
                    signal: controller.signal
                });

                if (!response.ok) {
                    throw new Error(
                        `HTTP ${response.status}: Unable to load ${url}`
                    );
                }

                const geojson = await response.json();

                if (cancelled || mapInstance.current !== map) {
                    return;
                }

                if (
                    !geojson ||
                    geojson.type !== 'FeatureCollection' ||
                    !Array.isArray(geojson.features)
                ) {
                    throw new Error('Invalid GeoJSON FeatureCollection');
                }

                const layer = createGeoJSONLayer(geojson, type);

                // Do not add a layer to a map that has already been cleaned up.
                if (cancelled || mapInstance.current !== map) {
                    return;
                }

                if (type === 'district') {
                    districtLayerRef.current = layer;
                    setDistrictCount(geojson.features.length);

                    if (showDistricts) {
                        layer.addTo(map);
                    }

                    // Use the district extent as the initial map extent.
                    if (layer.getBounds().isValid()) {
                        map.fitBounds(layer.getBounds(), {
                            padding: [20, 20]
                        });
                    }
                }

                if (type === 'taluk') {
                    talukLayerRef.current = layer;
                    setTalukCount(geojson.features.length);

                    if (showTaluks) {
                        layer.addTo(map);
                    }
                }

                if (type === 'block') {
                    blockLayerRef.current = layer;
                    setBlockCount(geojson.features.length);

                    if (showBlocks) {
                        layer.addTo(map);
                    }
                }
            } catch (err) {
                if (cancelled || err.name === 'AbortError') {
                    return;
                }

                console.error(`${type} layer error:`, err);

                setError((previous) => (
                    previous
                        ? `${previous}\n${type}: ${err.message}`
                        : `${type}: ${err.message}`
                ));
            }
        };

        const loadAllLayers = async () => {
            await Promise.all([
                loadLayer('/data/TN_District.geojson', 'district'),
                loadLayer('/data/TN_Taluk_simplified.geojson', 'taluk'),
                loadLayer('/data/TN_Blocks.geojson', 'block')
            ]);

            if (!cancelled) {
                setLoading(false);
            }
        };

        loadAllLayers();

        return () => {
            cancelled = true;
            controller.abort();

            if (mapInstance.current === map) {
                districtLayerRef.current = null;
                talukLayerRef.current = null;
                blockLayerRef.current = null;
                firkaLayerRef.current = null;
                villageLayerRef.current = null;
                roadLayerRef.current = null;
                drainageLayerRef.current = null;
                riverBasinLayerRef.current = null;
                geologyLayerRef.current = null;
                mapInstance.current = null;

                // Remove the Leaflet map only if its container is initialized.
                if (map._container && map._container._leaflet_id) {
                    map.remove();
                }
            }
        };
    }, []);

    // District layer visibility.
    useEffect(() => {
        const map = mapInstance.current;
        const layer = districtLayerRef.current;

        if (!map || !layer) return;

        if (showDistricts && !map.hasLayer(layer)) {
            layer.addTo(map);
        } else if (!showDistricts && map.hasLayer(layer)) {
            map.removeLayer(layer);
        }
    }, [showDistricts]);

    // Taluk layer visibility.
    useEffect(() => {
        const map = mapInstance.current;
        const layer = talukLayerRef.current;

        if (!map || !layer) return;

        if (showTaluks && !map.hasLayer(layer)) {
            layer.addTo(map);
        } else if (!showTaluks && map.hasLayer(layer)) {
            map.removeLayer(layer);
        }
    }, [showTaluks]);

    // Block layer visibility.
    useEffect(() => {
        const map = mapInstance.current;
        const layer = blockLayerRef.current;

        if (!map || !layer) return;

        if (showBlocks && !map.hasLayer(layer)) {
            layer.addTo(map);
        } else if (!showBlocks && map.hasLayer(layer)) {
            map.removeLayer(layer);
        }
    }, [showBlocks]);

    // Firkas are downloaded only when the user enables the Firkas checkbox.
    // Once downloaded, the layer is kept in memory and reused when toggled.
    useEffect(() => {
        const map = mapInstance.current;

        if (!map) return undefined;

        // Hide the layer when the checkbox is switched off.
        if (!showFirkas) {
            if (
                firkaLayerRef.current &&
                map.hasLayer(firkaLayerRef.current)
            ) {
                map.removeLayer(firkaLayerRef.current);
            }

            return undefined;
        }

        // If already downloaded, simply show the existing layer.
        if (firkaLayerRef.current) {
            if (!map.hasLayer(firkaLayerRef.current)) {
                firkaLayerRef.current.addTo(map);
            }

            return undefined;
        }

        let cancelled = false;
        const controller = new AbortController();

        const loadFirkas = async () => {
            try {
                const response = await fetch('/data/TN_Firkas.geojson', {
                    signal: controller.signal
                });

                if (!response.ok) {
                    throw new Error(
                        `HTTP ${response.status}: Unable to load TN_Firkas.geojson`
                    );
                }

                const geojson = await response.json();

                if (cancelled || mapInstance.current !== map) return;

                if (
                    !geojson ||
                    geojson.type !== 'FeatureCollection' ||
                    !Array.isArray(geojson.features)
                ) {
                    throw new Error(
                        'Invalid TN_Firkas.geojson FeatureCollection'
                    );
                }

                const layer = createGeoJSONLayer(geojson, 'firka');

                if (cancelled || mapInstance.current !== map) return;

                firkaLayerRef.current = layer;
                setFirkaCount(geojson.features.length);
                layer.addTo(map);

                console.log(
                    `Firkas layer loaded: ${geojson.features.length} features`
                );
            } catch (err) {
                if (cancelled || err.name === 'AbortError') return;

                console.error('Firkas layer error:', err);

                setError((previous) =>
                    previous
                        ? `${previous}\\nFirkas: ${err.message}`
                        : `Firkas: ${err.message}`
                );

                setShowFirkas(false);
            }
        };

        loadFirkas();

        return () => {
            cancelled = true;
            controller.abort();
        };
    }, [showFirkas]);

    // Villages are loaded only when the user enables the Villages checkbox.
    // The simplified GeoJSON is used to reduce download and rendering cost.
    useEffect(() => {
        const map = mapInstance.current;

        if (!map) return undefined;

        if (!showVillages) {
            if (
                villageLayerRef.current &&
                map.hasLayer(villageLayerRef.current)
            ) {
                map.removeLayer(villageLayerRef.current);
            }

            return undefined;
        }

        // Reuse the layer after its first successful load.
        if (villageLayerRef.current) {
            if (!map.hasLayer(villageLayerRef.current)) {
                villageLayerRef.current.addTo(map);
            }

            return undefined;
        }

        let cancelled = false;
        const controller = new AbortController();

        const loadVillages = async () => {
            try {
                const response = await fetch(
                    '/data/TN_Villages_simplified.geojson',
                    { signal: controller.signal }
                );

                if (!response.ok) {
                    throw new Error(
                        `HTTP ${response.status}: Unable to load TN_Villages_simplified.geojson`
                    );
                }

                const geojson = await response.json();

                if (cancelled || mapInstance.current !== map) return;

                if (
                    !geojson ||
                    geojson.type !== 'FeatureCollection' ||
                    !Array.isArray(geojson.features)
                ) {
                    throw new Error(
                        'Invalid TN_Villages_simplified.geojson FeatureCollection'
                    );
                }

                const layer = createGeoJSONLayer(geojson, 'village');

                if (cancelled || mapInstance.current !== map) return;

                villageLayerRef.current = layer;
                setVillageCount(geojson.features.length);
                layer.addTo(map);

                console.log(
                    `Villages layer loaded: ${geojson.features.length} features`
                );
            } catch (err) {
                if (cancelled || err.name === 'AbortError') return;

                console.error('Villages layer error:', err);

                setError((previous) =>
                    previous
                        ? `${previous}\nVillages: ${err.message}`
                        : `Villages: ${err.message}`
                );

                setShowVillages(false);
            }
        };

        loadVillages();

        return () => {
            cancelled = true;
            controller.abort();
        };
    }, [showVillages]);

    // Roads are served as MVT/PBF tiles from the local MBTiles tile server.
    // Only tiles needed for the current map view and zoom are requested.
    useEffect(() => {
        const map = mapInstance.current;

        if (!map) return undefined;

        if (!showRoads) {
            if (roadLayerRef.current && map.hasLayer(roadLayerRef.current)) {
                map.removeLayer(roadLayerRef.current);
            }
            return undefined;
        }

        // Reuse the existing vector-tile layer when toggled back on.
        if (roadLayerRef.current) {
            if (!map.hasLayer(roadLayerRef.current)) {
                roadLayerRef.current.addTo(map);
            }
            return undefined;
        }

        if (!L.vectorGrid || typeof L.vectorGrid.protobuf !== 'function') {
            setError(
                'Roads: Leaflet.VectorGrid did not load. Check the leaflet.vectorgrid package import.'
            );
            setShowRoads(false);
            return undefined;
        }

        const roadTileLayer = L.vectorGrid.protobuf(
            'http://localhost:8000/tiles/{z}/{x}/{y}.pbf',
            {
                minZoom: 5,
                maxZoom: 19,
                maxNativeZoom: 16,
                interactive: true,
                vectorTileLayerStyles: {
                    roads: (properties) => {
                        const roadType = String(properties?.TYPE || '').toUpperCase();
                        const isHighway =
                            roadType.includes('HIGHWAY') ||
                            roadType.includes('NATIONAL');

                        return {
                            color: isHighway ? '#b45309' : '#d97706',
                            weight: isHighway ? 2.8 : 1.7,
                            opacity: 0.9,
                            lineCap: 'round',
                            lineJoin: 'round'
                        };
                    }
                }
            }
        );

        // VectorGrid emits feature properties on its click event.
        roadTileLayer.on('click', (event) => {
            const properties = event.layer?.properties || {};

            const title =
                properties.TYPE ||
                properties.SUB_CAT ||
                'Road / Street';

            const propertyRows = Object.entries(properties)
                .filter(([, value]) =>
                    value !== null &&
                    value !== undefined &&
                    value !== ''
                )
                .slice(0, 12)
                .map(([key, value]) =>
                    `<div style="margin:3px 0"><strong>${escapeHtml(key)}:</strong> ${escapeHtml(value)}</div>`
                )
                .join('');

            L.popup({ maxWidth: 320 })
                .setLatLng(event.latlng)
                .setContent(`
                    <div style="min-width:180px">
                        <h4 style="color:#14532d;margin:0 0 8px">
                            ${escapeHtml(title)}
                        </h4>
                        <p style="margin:0 0 8px">Road / Street</p>
                        ${propertyRows || '<div>No road attributes available.</div>'}
                    </div>
                `)
                .openOn(map);
        });

        roadTileLayer.on('tileerror', (event) => {
            console.warn('Road vector tile request failed:', event);
        });

        roadLayerRef.current = roadTileLayer;
        roadTileLayer.addTo(map);

        // MVT is tiled data; a statewide feature count is not available
        // without downloading and decoding every tile.
        setRoadCount('MVT');

        console.log('Roads vector-tile layer enabled.');

        return undefined;
    }, [showRoads]);

    // Drainage is served as MVT/PBF tiles. Only visible map tiles are requested.
    // DESC distinguishes CANAL from SEASONAL STREAM.
    useEffect(() => {
        const map = mapInstance.current;

        if (!map) return undefined;

        if (!showDrainage) {
            if (
                drainageLayerRef.current &&
                map.hasLayer(drainageLayerRef.current)
            ) {
                map.removeLayer(drainageLayerRef.current);
            }

            return undefined;
        }

        // Reuse the vector-tile layer after the first successful creation.
        if (drainageLayerRef.current) {
            if (!map.hasLayer(drainageLayerRef.current)) {
                drainageLayerRef.current.addTo(map);
            }

            return undefined;
        }

        if (!L.vectorGrid || typeof L.vectorGrid.protobuf !== 'function') {
            setError(
                'Drainage: Leaflet.VectorGrid did not load. Check the leaflet.vectorgrid package import.'
            );
            setShowDrainage(false);
            return undefined;
        }

        const drainageTileLayer = L.vectorGrid.protobuf(
            'http://localhost:8000/tiles/drainage/{z}/{x}/{y}.pbf',
            {
                minZoom: 5,
                maxZoom: 19,
                maxNativeZoom: 16,
                interactive: true,
                vectorTileLayerStyles: {
                    drainage: (properties) => {
                        const description = String(
                            properties?.DESC || ''
                        ).toUpperCase();

                        const isSeasonalStream =
                            description.includes('SEASONAL');

                        return {
                            color: isSeasonalStream ? '#06b6d4' : '#2563eb',
                            weight: isSeasonalStream ? 1.8 : 2.4,
                            opacity: 0.95,
                            lineCap: 'round',
                            lineJoin: 'round'
                        };
                    }
                }
            }
        );

        drainageTileLayer.on('click', (event) => {
            const properties = event.layer?.properties || {};
            const description = String(
                properties.DESC || 'Drainage'
            );

            const propertyRows = Object.entries(properties)
                .filter(([, value]) =>
                    value !== null &&
                    value !== undefined &&
                    value !== ''
                )
                .slice(0, 12)
                .map(([key, value]) =>
                    `<div style="margin:3px 0"><strong>${escapeHtml(key)}:</strong> ${escapeHtml(value)}</div>`
                )
                .join('');

            L.popup({ maxWidth: 320 })
                .setLatLng(event.latlng)
                .setContent(`
                    <div style="min-width:180px">
                        <h4 style="color:#14532d;margin:0 0 8px">
                            ${escapeHtml(description)}
                        </h4>
                        <p style="margin:0 0 8px">Drainage Feature</p>
                        ${propertyRows || '<div>No drainage attributes available.</div>'}
                    </div>
                `)
                .openOn(map);
        });

        drainageTileLayer.on('tileerror', (event) => {
            console.warn('Drainage vector tile request failed:', event);
        });

        drainageLayerRef.current = drainageTileLayer;
        drainageTileLayer.addTo(map);

        // MVT is tiled data; the statewide feature count is not available
        // without downloading and decoding every tile.
        setDrainageCount('MVT');

        console.log('Drainage vector-tile layer enabled.');

        return undefined;
    }, [showDrainage]);

    // River Basins are loaded directly from GeoJSON only when enabled.
    // The coordinates are transformed from UTM Zone 43N to WGS84.
    useEffect(() => {
        const map = mapInstance.current;

        if (!map) return undefined;

        if (!showRiverBasins) {
            if (
                riverBasinLayerRef.current &&
                map.hasLayer(riverBasinLayerRef.current)
            ) {
                map.removeLayer(riverBasinLayerRef.current);
            }

            return undefined;
        }

        if (riverBasinLayerRef.current) {
            if (!map.hasLayer(riverBasinLayerRef.current)) {
                riverBasinLayerRef.current.addTo(map);
            }
            return undefined;
        }

        let cancelled = false;
        const controller = new AbortController();

        const loadRiverBasins = async () => {
            try {
                const response = await fetch(
                    '/data/TN_River_Basin_Sub_Basin.geojson',
                    { signal: controller.signal }
                );

                if (!response.ok) {
                    throw new Error(
                        `HTTP ${response.status}: Unable to load TN_River_Basin_Sub_Basin.geojson`
                    );
                }

                const geojson = await response.json();

                if (cancelled || mapInstance.current !== map) return;

                if (
                    !geojson ||
                    geojson.type !== 'FeatureCollection' ||
                    !Array.isArray(geojson.features)
                ) {
                    throw new Error(
                        'Invalid TN_River_Basin_Sub_Basin.geojson FeatureCollection'
                    );
                }

                const layer = createGeoJSONLayer(geojson, 'riverbasin');

                if (cancelled || mapInstance.current !== map) return;

                riverBasinLayerRef.current = layer;
                setRiverBasinCount(geojson.features.length);
                layer.addTo(map);

                console.log(
                    `River Basins layer loaded: ${geojson.features.length} features`
                );
            } catch (err) {
                if (cancelled || err.name === 'AbortError') return;

                console.error('River Basins layer error:', err);

                setError((previous) =>
                    previous
                        ? `${previous}\\nRiver Basins: ${err.message}`
                        : `River Basins: ${err.message}`
                );

                setShowRiverBasins(false);
            }
        };

        loadRiverBasins();

        return () => {
            cancelled = true;
            controller.abort();
        };
    }, [showRiverBasins]);

    // Geology is loaded directly from GeoJSON only when enabled.
    // Source coordinates are Web Mercator (EPSG:3857), matching the other boundary layers.
    useEffect(() => {
        const map = mapInstance.current;

        if (!map) return undefined;

        if (!showGeology) {
            if (geologyLayerRef.current && map.hasLayer(geologyLayerRef.current)) {
                map.removeLayer(geologyLayerRef.current);
            }
            return undefined;
        }

        if (geologyLayerRef.current) {
            if (!map.hasLayer(geologyLayerRef.current)) {
                geologyLayerRef.current.addTo(map);
            }
            return undefined;
        }

        let cancelled = false;
        const controller = new AbortController();

        const loadGeology = async () => {
            try {
                const response = await fetch('/data/TN_Geology.geojson', {
                    signal: controller.signal
                });

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: Unable to load TN_Geology.geojson`);
                }

                const geojson = await response.json();

                if (cancelled || mapInstance.current !== map) return;

                if (!geojson || geojson.type !== 'FeatureCollection' || !Array.isArray(geojson.features)) {
                    throw new Error('Invalid TN_Geology.geojson FeatureCollection');
                }

                const layer = createGeoJSONLayer(geojson, 'geology');

                if (cancelled || mapInstance.current !== map) return;

                geologyLayerRef.current = layer;
                setGeologyCount(geojson.features.length);
                layer.addTo(map);

                console.log(`Geology layer loaded: ${geojson.features.length} features`);
            } catch (err) {
                if (cancelled || err.name === 'AbortError') return;

                console.error('Geology layer error:', err);
                setError((previous) => previous
                    ? `${previous}\\nGeology: ${err.message}`
                    : `Geology: ${err.message}`
                );
                setShowGeology(false);
            }
        };

        loadGeology();

        return () => {
            cancelled = true;
            controller.abort();
        };
    }, [showGeology]);

    // Search boundary GeoJSON layers by feature name. Vector tiles are not iterated here.
    const handleSearch = (event) => {
        const value = event.target.value.trim().toLowerCase();
        const map = mapInstance.current;

        if (!value || !map) return;

        const layers = [
            districtLayerRef.current,
            talukLayerRef.current,
            blockLayerRef.current,
            firkaLayerRef.current,
            villageLayerRef.current
        ];

        for (const layer of layers) {
            if (!layer) continue;

            let matchedLayer = null;

            layer.eachLayer((featureLayer) => {
                if (matchedLayer) return;

                const name = getFeatureName(featureLayer.feature).toLowerCase();

                if (name.includes(value)) {
                    matchedLayer = featureLayer;
                }
            });

            if (matchedLayer) {
                if (!map.hasLayer(layer)) {
                    layer.addTo(map);

                    if (layer === districtLayerRef.current) {
                        setShowDistricts(true);
                    } else if (layer === talukLayerRef.current) {
                        setShowTaluks(true);
                    } else if (layer === blockLayerRef.current) {
                        setShowBlocks(true);
                    } else if (layer === firkaLayerRef.current) {
                        setShowFirkas(true);
                    } else if (layer === villageLayerRef.current) {
                        setShowVillages(true);
                    }
                }

                const bounds = matchedLayer.getBounds();

                if (bounds.isValid()) {
                    map.fitBounds(bounds, {
                        padding: [40, 40],
                        maxZoom: 11
                    });
                }

                matchedLayer.openPopup();
                return;
            }
        }
    };

    return (
        <div className="gis-explorer">
            {/* LEFT SIDEBAR */}
            <aside className="gis-sidebar">
                <div className="gis-brand">
                    <img
                        src="/Images/foundation-logo.jpeg?v=2"
                        alt="Marutham Foundation"
                    />

                    <div>
                        <h3>Marutham Foundation</h3>
                        <small>Tamil Nadu · GIS Explorer</small>
                    </div>
                </div>

                <button
                    className="gis-back"
                    type="button"
                    onClick={onBack}
                >
                    ← Back
                </button>

                <input
                    className="gis-search"
                    type="text"
                    placeholder="Search district, taluk, block, firka, village or road..." 
                    onChange={handleSearch}
                />

                <div className="gis-layer-heading">
                    MAP LAYERS
                </div>

                <div className="gis-layer-list">
                    {/* DISTRICTS */}
                    <label className="gis-layer-row">
                        <span className="gis-layer-color red"></span>
                        <span className="gis-layer-icon">▦</span>
                        <span className="gis-layer-name">Districts</span>
                        <small>BOUNDARY</small>

                        <input
                            type="checkbox"
                            checked={showDistricts}
                            onChange={(event) =>
                                setShowDistricts(event.target.checked)
                            }
                        />

                        <span className="gis-layer-count">
                            {districtCount || '...'}
                        </span>
                    </label>

                    {/* TALUKS */}
                    <label className="gis-layer-row">
                        <span className="gis-layer-color orange"></span>
                        <span className="gis-layer-icon">▦</span>
                        <span className="gis-layer-name">Taluks</span>
                        <small>BOUNDARY</small>

                        <input
                            type="checkbox"
                            checked={showTaluks}
                            onChange={(event) =>
                                setShowTaluks(event.target.checked)
                            }
                        />

                        <span className="gis-layer-count">
                            {talukCount || '...'}
                        </span>
                    </label>

                    {/* BLOCKS */}
                    <label className="gis-layer-row">
                        <span className="gis-layer-color green"></span>
                        <span className="gis-layer-icon">▦</span>
                        <span className="gis-layer-name">Blocks</span>
                        <small>BOUNDARY</small>

                        <input
                            type="checkbox"
                            checked={showBlocks}
                            onChange={(event) =>
                                setShowBlocks(event.target.checked)
                            }
                        />

                        <span className="gis-layer-count">
                            {blockCount || '...'}
                        </span>
                    </label>

                    {/* FIRKAS - loaded on demand */}
                    <label className="gis-layer-row">
                        <span className="gis-layer-color purple"></span>
                        <span className="gis-layer-icon">▦</span>
                        <span className="gis-layer-name">Firkas</span>
                        <small>BOUNDARY</small>

                        <input
                            type="checkbox"
                            checked={showFirkas}
                            onChange={(event) =>
                                setShowFirkas(event.target.checked)
                            }
                        />

                        <span className="gis-layer-count">
                            {firkaCount > 0
                                ? firkaCount
                                : showFirkas
                                    ? '...'
                                    : 'OFF'}
                        </span>
                    </label>

                    {/* VILLAGES - loaded on demand from the simplified GeoJSON */}
                    <label className="gis-layer-row">
                        <span className="gis-layer-color cyan"></span>
                        <span className="gis-layer-icon">▦</span>
                        <span className="gis-layer-name">Villages</span>
                        <small>BOUNDARY</small>

                        <input
                            type="checkbox"
                            checked={showVillages}
                            onChange={(event) =>
                                setShowVillages(event.target.checked)
                            }
                        />

                        <span className="gis-layer-count">
                            {villageCount > 0
                                ? villageCount
                                : showVillages
                                    ? '...'
                                    : 'OFF'}
                        </span>
                    </label>

                    {/* ROADS - vector tiles are requested for the current map view */}
                    <label className="gis-layer-row">
                        <span className="gis-layer-color orange"></span>
                        <span className="gis-layer-icon">↝</span>
                        <span className="gis-layer-name">Roads</span>
                        <small>FLOW</small>

                        <input
                            type="checkbox"
                            checked={showRoads}
                            onChange={(event) =>
                                setShowRoads(event.target.checked)
                            }
                        />

                        <span className="gis-layer-count">
                            {roadCount || (showRoads ? '...' : 'OFF')}
                        </span>
                    </label>

                    {/* DRAINAGE - vector tiles are requested for the current map view */}
                    <label className="gis-layer-row">
                        <span className="gis-layer-color cyan"></span>
                        <span className="gis-layer-icon">≋</span>
                        <span className="gis-layer-name">Drainage</span>
                        <small>FLOW</small>

                        <input
                            type="checkbox"
                            checked={showDrainage}
                            onChange={(event) =>
                                setShowDrainage(event.target.checked)
                            }
                        />

                        <span className="gis-layer-count">
                            {drainageCount || (showDrainage ? '...' : 'OFF')}
                        </span>
                    </label>

                    {/* RIVER BASINS - direct GeoJSON, loaded on demand */}
                    <label className="gis-layer-row">
                        <span className="gis-layer-color blue"></span>
                        <span className="gis-layer-icon">▦</span>
                        <span className="gis-layer-name">River Basins</span>
                        <small>WATER</small>

                        <input
                            type="checkbox"
                            checked={showRiverBasins}
                            onChange={(event) =>
                                setShowRiverBasins(event.target.checked)
                            }
                        />

                        <span className="gis-layer-count">
                            {riverBasinCount > 0
                                ? riverBasinCount
                                : showRiverBasins
                                    ? '...'
                                    : 'OFF'}
                        </span>
                    </label>

                    {/* GEOLOGY - direct GeoJSON, loaded on demand */}
                    <label className="gis-layer-row">
                        <span className="gis-layer-color brown"></span>
                        <span className="gis-layer-icon">▦</span>
                        <span className="gis-layer-name">Geology</span>
                        <small>EARTH</small>
                        <input
                            type="checkbox"
                            checked={showGeology}
                            onChange={(event) => setShowGeology(event.target.checked)}
                        />
                        <span className="gis-layer-count">
                            {geologyCount > 0 ? geologyCount : showGeology ? '...' : 'OFF'}
                        </span>
                    </label>

                    {/* OTHER LAYERS - TO BE INTEGRATED */}
                    {[
                        ['River Tanks', 'WATER'],
                        ['Soil', 'EARTH']
                    ].map(([name, type]) => (
                        <div
                            className="gis-layer-row disabled"
                            key={name}
                        >
                            <span className="gis-layer-color"></span>
                            <span className="gis-layer-icon">▦</span>
                            <span className="gis-layer-name">{name}</span>
                            <small>{type}</small>
                            <span className="gis-layer-count">OFF</span>
                        </div>
                    ))}
                </div>

                <div className="gis-sidebar-footer">
                    Marutham Foundation · GIS
                </div>
            </aside>

            {/* MAP */}
            <main className="gis-map-area">
                <div
                    ref={mapRef}
                    className="gis-map"
                ></div>

                {loading && (
                    <div className="gis-loading">
                        Loading Tamil Nadu GIS layers...
                    </div>
                )}

                {error && (
                    <div className="gis-error">
                        <h3>Layer Loading Error</h3>
                        <p style={{ whiteSpace: 'pre-line' }}>{error}</p>
                    </div>
                )}

                <div className="gis-map-info">
                    <span>🗺 Tamil Nadu GIS Explorer</span>
                    <span>
                        Districts: {districtCount} |
                        Taluks: {talukCount} |
                        Blocks: {blockCount} |
                        Firkas: {firkaCount} |
                        Villages: {villageCount} |
                        Roads: {roadCount} |
                        Drainage: {drainageCount} |
                        River Basins: {riverBasinCount} |
                        Geology: {geologyCount}
                    </span>
                </div>
            </main>
        </div>
    );
}
