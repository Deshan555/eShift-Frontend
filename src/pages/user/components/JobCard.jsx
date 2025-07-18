
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import apiExecutions from '@/pages/api/apiExecutions';
import 'leaflet/dist/leaflet.css';
import { icon } from 'leaflet';

const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });
import { Polyline as SyncPolyline } from 'react-leaflet';


const JobCard = ({ job }) => {
  const [jobStops, setJobStops] = useState(job.stops || []);

  useEffect(() => {
    const fetchStops = async () => {
      try {
        const response = await apiExecutions.getJobStopsByJobId(job.jobId);
        setJobStops(response?.data || []);
      } catch (error) {
        console.error("Error fetching job stops:", error);
      }
    };
    if (job) fetchStops();
  }, [job]);

  // Prepare positions for map
  const stopsWithCoords = jobStops.filter(stop => stop.city && stop.city.latitude && stop.city.longitude);
  const positions = stopsWithCoords.map(stop => [stop.city.latitude, stop.city.longitude]);
  const mapCenter = positions.length > 0 ? positions[0] : [6.9271, 79.8612];

  return (
    <div style={{
      border: '1px solid #e0e0e0',
      borderRadius: 12,
      padding: 20,
      marginBottom: 18,
      background: '#fff',
      boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)',
      fontFamily: 'Poppins, monospace',
      fontSize: 14,
      maxWidth: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    }}>
      {/* Stops Map at top of card */}
      {positions.length > 0 && (
        <div style={{ height: 200, marginBottom: 12 }}>
          <MapContainer center={mapCenter} zoom={10} style={{ height: '100%', width: '100%' }} scrollWheelZoom={false}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <SyncPolyline positions={positions} color="blue" />
            {stopsWithCoords.map((stop, idx) => (
              <Marker key={stop.stopId || idx} position={[stop.city.latitude, stop.city.longitude]} icon={icon({
                iconUrl: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
                iconSize: [25, 25],
                iconAnchor: [12, 30],
              })}>
                <Popup>
                  <b>{stop.city.name}</b><br />
                  {stop.address}<br />
                  Type: {stop.stopType}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      )}
      <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>Job #{job.jobId} - {job.status}</div>
      <div><b>Container Type:</b> {job.requestContainerType}</div>
      <div><b>Delivery Date:</b> {job.deliveryDate ? new Date(job.deliveryDate).toLocaleDateString('en-GB') : 'N/A'}</div>
      <div><b>Special Remark:</b> {job.specialRemark || '-'}</div>
      <div><b>Admin Approval:</b> {job.adminApprovalStatus}</div>
      <div><b>Invoicing Status:</b> {job.invoicingStatus}</div>
      <div><b>Invoice Price:</b> Rs. {job.invoicePrice?.toLocaleString('en-LK', { minimumFractionDigits: 2 })}</div>
      <div><b>Payment Status:</b> {job.paymentStatus}</div>
    </div>
  );
};

export default JobCard;
