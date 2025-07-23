import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
import { Polyline as SyncPolyline } from 'react-leaflet';
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });
import 'leaflet/dist/leaflet.css';
import { icon } from 'leaflet';

export default function JobPathMap({ stops }) {
  if (!stops || stops.length === 0) return null;
  const positions = stops.map(stop => [stop.city.latitude, stop.city.longitude]);
  return (
    <div style={{ height: '100vh', width: '100%', zIndex: 1 }}>
      <MapContainer
         center={positions[0]}
        zoom={10}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <SyncPolyline positions={positions} color="blue" />
        {stops.map((stop, idx) => (
          <Marker key={stop.stopId} position={[stop.city.latitude, stop.city.longitude]} icon={icon({
            iconUrl: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
            iconSize: [25, 25],
            iconAnchor: [12, 30],
          })}>
            <Popup>
              <b className=''>{stop.city.name}</b><br />
              {stop.address}<br />
              Type: {stop.stopType}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}