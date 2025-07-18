import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapStopsPreview = ({ stops }) => {
  // Convert lat/lng to float and filter valid
  const points = stops
    .map(s => ({ ...s, lat: parseFloat(s.lat), lng: parseFloat(s.lng) }))
    .filter(s => !isNaN(s.lat) && !isNaN(s.lng));

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
        <Marker key={idx} position={[p.lat, p.lng]}>
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
