
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import apiExecutions from '@/pages/api/apiExecutions';
import { Row, Col, Modal } from 'antd';
import { DeleteFilled, EditFilled, EyeFilled } from '@ant-design/icons';
import CreateJob from '../../jobs/createJob';
import 'leaflet/dist/leaflet.css';
import { icon } from 'leaflet';
import moment from 'moment';

const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });
import { Polyline as SyncPolyline } from 'react-leaflet';


const JobCard = ({ job, refetchFuction }) => {
  const [jobStops, setJobStops] = useState(job.stops || []);
  const [loading, setLoading] = useState(false);
  const [isCreateJobModalVisible, setIsCreateJobModalVisible] = useState(false);

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

  const stopsWithCoords = jobStops.filter(stop => stop.city && stop.city.latitude && stop.city.longitude);
  const positions = stopsWithCoords.map(stop => [stop.city.latitude, stop.city.longitude]);
  const mapCenter = positions.length > 0 ? positions[0] : [6.9271, 79.8612];

  return (
    <div
      style={{
        border: '1px solid #e0e0e0',
        borderRadius: 12,
        padding: 0,
        marginBottom: 18,
        background: '#fff',
        boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)',
        fontFamily: 'Poppins, monospace',
        fontSize: 14,
        maxWidth: 600,
        marginLeft: 'auto',
        marginRight: 'auto',
      }}>
      {positions.length > 0 && (
        <div style={{ height: 200, marginBottom: 12 }}>
          <MapContainer center={mapCenter} zoom={10}
            zoomControl={false}
            attributionControl={false}
            style={{ height: '100%', width: '100%', MozBorderRadiusTopleft: 12, MozBorderRadiusTopright: 12 }} scrollWheelZoom={false}>
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
      <div style={{ padding: 16, borderBottom: '1px solid #e0e0e0' }}>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <div
              className='textStyle-small'
              style={{ fontWeight: 700, fontSize: 16, marginBottom: 6, color: 'black' }}>Job #{job.jobId} - {job.status}
            </div>
          </Col>

          <Col span={12} style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 12, color: '#888', marginBottom: 4 }} className='textStyle-small'>
              {
                job.deliveryDate ? `${moment(job.deliveryDate).format('DD MMM YYYY')}` : 'Created: N/A'
              }
            </div>
          </Col>
        </Row>

        <div style={{ marginTop: 10, fontSize: 13, color: '#444', lineHeight: 1.7 }} className='textStyle-small'>
          <b>Summary:</b> This job is currently <b style={{ color: '#320A6B' }}>{job.status}</b> and requires a <b>{job.requestContainerType}</b> container. The delivery is scheduled for <b>{job.deliveryDate ? moment(job.deliveryDate).format('DD MMM YYYY') : 'N/A'}</b>.
          <br />
          <span>
            <b>Admin Approval:</b> <b style={{ color: job.adminApprovalStatus === 'APPROVED' ? 'green' : job.adminApprovalStatus === 'REJECTED' ? 'red' : '#a98cd1ff' }}>{job.adminApprovalStatus}</b>,
            <b> Invoicing Status:</b> <b style={{ color: job.invoicingStatus === 'INVOICED' ? '#320A6B' : '#888' }}>{job.invoicingStatus}</b>,
            <b> Invoice Price:</b> <b style={{ color: '#320A6B' }}>Rs. {job.invoicePrice?.toLocaleString('en-LK', { minimumFractionDigits: 2 })}</b>,
            <b> Payment Status:</b> <b style={{ color: job.paymentStatus === 'PAID' ? 'green' : '#a98cd1ff' }}>{job.paymentStatus}</b>.
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 16, marginTop: 12 }}>
          {job.adminApprovalStatus === 'PENDING' && (
            <EditFilled style={{ marginRight: 4, cursor: 'pointer', color: '#320A6B' }} 
            onClick={() => setIsCreateJobModalVisible(true)} />
          )}
          <EyeFilled 
          onClick={() => window.open(`/inspect/${job.jobId}`, '_blank')}
          style={{ marginRight: 4, cursor: 'pointer', color: '#320A6B' }} />
        </div>

        <Modal
          visible={isCreateJobModalVisible}
          onCancel={() => setIsCreateJobModalVisible(false)}
          footer={null}
          width={800}
          destroyOnClose
          className="custom-modal"
        >
          <div className="modal-header-user" style={{ backgroundColor: '#F0E8FF', padding: 20 }}>
            <h2 className="header-title">
              <span style={{ fontFamily: 'Poppins', fontWeight: 550, fontSize: 18, letterSpacing: 0, color: '#000000' }}>
                Update Job #{job.jobId}
              </span>
            </h2>
          </div>
          <div className="modal-body">
            <CreateJob
              refetchFunction={refetchFuction}
              onCloseFunction={() => { setIsCreateJobModalVisible(false) }}
              isEdit={true}
              stopsList={jobStops}
              jobData={job}
            />
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default JobCard;
