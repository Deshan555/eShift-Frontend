import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { icon } from 'leaflet';

const MapStopsPreview = ({ stops }) => {

    // Convert lat/lng to float and filter valid
    const parsedStops = stops
        .map(s => ({ ...s, lat: parseFloat(s.lat), lng: parseFloat(s.lng) }))
        .filter(s => !isNaN(s.lat) && !isNaN(s.lng));

    // Helper: Haversine distance
    function haversine(lat1, lng1, lat2, lng2) {
        const toRad = x => (x * Math.PI) / 180;
        const R = 6371; // km
        const dLat = toRad(lat2 - lat1);
        const dLng = toRad(lng2 - lng1);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    let pickup = parsedStops.find(s => s.stopType === 'PICKUP');
    let dropoff = parsedStops.find(s => s.stopType === 'DROP_OFF');
    let intermediates = parsedStops.filter(s => s.stopType === 'INTERMEDIATE');

    if (pickup && intermediates.length > 0) {
        intermediates.sort((a, b) => {
            const da = haversine(pickup.lat, pickup.lng, a.lat, a.lng);
            const db = haversine(pickup.lat, pickup.lng, b.lat, b.lng);
            return da - db;
        });
    }

    let points = [];
    if (pickup) points.push(pickup);
    points = points.concat(intermediates);
    if (dropoff) points.push(dropoff);

    if (points.length === 0) return null;

    const center = points[0];
    const polyline = points.map(p => [p.lat, p.lng]);

    return (
        <MapContainer center={[center.lat, center.lng]} zoom={10} style={{ height: '100%', width: '100%', borderRadius: 12 }} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {points.map((p, idx) => (
                <Marker key={idx} position={[p.lat, p.lng]} icon={icon({
                    iconUrl: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
                    iconSize: [25, 25],
                    iconAnchor: [12, 30],
                })}>
                    <Popup>
                        <b>Stop {idx + 1}</b><br />
                        {p.stopType} - {p.address}
                    </Popup>
                </Marker>
            ))}
            {polyline.length > 1 && <Polyline positions={polyline} color="#320A6B" />}
        </MapContainer>
    );
};

export default MapStopsPreview;
