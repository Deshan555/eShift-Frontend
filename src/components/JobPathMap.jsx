import React from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const JobPathMap = ({ stops }) => {
  if (!stops || stops.length === 0) return null;
  const positions = stops.map(stop => [stop.city.latitude, stop.city.longitude]);
  return (
    <MapContainer
      center={positions[0]}
      zoom={10}
      style={{ height: '400px', width: '100%'}}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Polyline positions={positions} color="blue" />
      {stops.map((stop, idx) => (
        <Marker key={stop.stopId} position={[stop.city.latitude, stop.city.longitude]}>
          <Popup>
            <b className='textStyle-small'>{stop.city.name}</b><br />
            {stop.address}<br />
            Type: {stop.stopType}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default JobPathMap;
