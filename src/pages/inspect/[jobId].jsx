function getStopSummary(stop) {
    if (!stop) return '';
    const city = stop.city ? `${stop.city.name}, ${stop.city.state}, ${stop.city.country} (postal code ${stop.city.postalCode})` : '';
    return `This stop (ID: ${stop.stopId}) is a ${stop.stopType} for job ${stop.jobId}, located at "${stop.address}"${city ? ` in ${city}` : ''}. It is stop number ${stop.stopOrder} in the route and is currently ${stop.jobStatus?.toLowerCase()}.`;
}

const StopSummary = ({ stop }) => {
    if (!stop) return null;
    return <p style={{ color: '#444' }}
        className='textStyle-small'
    >{getStopSummary(stop)}</p>;
};

import React from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { Row, Col, Tag, Card, Descriptions, Collapse } from 'antd';
import apiExecutions from '../api/apiExecutions';
import { EnvironmentFilled, CarFilled } from '@ant-design/icons';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

const ToastContainer = dynamic(
    () => import('react-toastify').then(mod => mod.ToastContainer),
    { ssr: false }
);
const JobPathMap = dynamic(
    () => import('./../jobs/JobPathMap'),
    { ssr: false }
);

const InspectJob = () => {
    const router = useRouter();
    const { jobId } = router.query;

    const [jobData, setJobData] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [stops, setStops] = React.useState([]);

    React.useEffect(() => {
        if (jobId) {
            const fetchJobData = async () => {
                setLoading(true);
                try {
                    const data = await apiExecutions.getJobById(jobId);
                    setJobData(data.data);
                    const stopsData = await apiExecutions.getJobStopsByJobId(jobId);
                    setStops(stopsData.data || []);
                } catch (err) {
                    setError('Failed to fetch job data');
                    toast.error('Failed to fetch job data');
                } finally {
                    setLoading(false);
                }
            };
            fetchJobData();
        }
    }, [jobId]);

    return (
        <div style={{ background: '#fff', minHeight: '100vh' }}>
            {typeof window !== 'undefined' && <ToastContainer />}
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : (
                <Row span={24}>
                    <Col span={6}>
                        <div style={{ height: '100vh', overflowY: 'auto' }}>
                            <Collapse defaultActiveKey={['1']} ghost={true}>
                                <Collapse.Panel header={<span 
                                className='textStyle-small'
                                style={{ fontWeight: 'bold', fontSize: 14 }}><CarFilled style={{ marginRight: 5 }}/>Job Details</span>} key="1">
                                    <Descriptions
                                        bordered
                                        size="small"
                                        column={1}
                                        style={{ marginBottom: 20 }}
                                    >
                                        <Descriptions.Item label="Job ID">JOB-{jobData.jobId}</Descriptions.Item>
                                        <Descriptions.Item label="Status">{jobData.status}</Descriptions.Item>
                                        <Descriptions.Item label="Request Status">{jobData.requestStatus}</Descriptions.Item>
                                        <Descriptions.Item label="Delivery Date">{jobData.deliveryDate ? dayjs(jobData.deliveryDate).format('DD/MM/YYYY') : 'N/A'}</Descriptions.Item>
                                        <Descriptions.Item label="Special Remark">{jobData.specialRemark || 'N/A'}</Descriptions.Item>
                                        <Descriptions.Item label="Request Container Type">{jobData.requestContainerType}</Descriptions.Item>
                                        <Descriptions.Item label="Admin Approval Status">{jobData.adminApprovalStatus}</Descriptions.Item>
                                        <Descriptions.Item label="Invoicing Status">{jobData.invoicingStatus}</Descriptions
                                            .Item>
                                        <Descriptions.Item label="Invoice Price">{jobData.invoicePrice ? jobData.invoicePrice.toLocaleString('en-LK', { minimumFractionDigits: 2 }) : 'N/A'}</Descriptions.Item>
                                        <Descriptions.Item label="Payment Status">{jobData.paymentStatus}</Descriptions.Item>
                                    </Descriptions>
                                </Collapse.Panel>
                                <Collapse.Panel header={<span 
                                className='textStyle-small'
                                style={{ fontWeight: 'bold', fontSize: 14 }}><EnvironmentFilled style={{ marginRight: 5 }}/>Stops</span>}
                                key="2">
                                    {stops.map((stop, index) => {
                                        // Tag color based on jobStatus
                                        let statusColor = 'default';
                                        switch ((stop.jobStatus || '').toUpperCase()) {
                                            case 'PENDING': statusColor = 'orange'; break;
                                            case 'COMPLETED': statusColor = 'green'; break;
                                            case 'IN_PROGRESS': statusColor = 'blue'; break;
                                            case 'CANCELLED': statusColor = 'red'; break;
                                            default: statusColor = 'default';
                                        }
                                        return (
                                            <Card
                                                key={stop.stopId || index}
                                                size="small"
                                                style={{ marginBottom: 10, borderRadius: 8, background: '#f9f9f9' }}
                                                bodyStyle={{ padding: 12 }}
                                                title={
                                                    <Row span={24} align="middle">
                                                        <Col span={16} className='textStyle-small' style={{ fontWeight: 'bold', color: '#320A6B' }}>
                                                            {stop.city?.name || 'Unknown City'} - Stop {index + 1}
                                                        </Col>
                                                        <Col span={8} style={{ textAlign: 'right' }}>
                                                            <Tag
                                                                bordered={false}
                                                                className='textStyle-small'
                                                                style={{ fontSize: 10, fontWeight: 550, textTransform: 'capitalize', padding: 5, borderRadius: 8 }}
                                                                color={stop.stopType === 'PICKUP' ? 'green' : stop.stopType === 'DROP_OFF' ? 'blue' : 'purple'}>
                                                                {stop.stopType}
                                                            </Tag>
                                                        </Col>
                                                    </Row>
                                                }
                                            >
                                                <EnvironmentFilled style={{ color: '#320A6B', marginRight: 8 }} /> {<span className='textStyle-small'>{stop.address}</span>}
                                            </Card>
                                        );
                                    })}
                                </Collapse.Panel>
                            </Collapse>
                        </div>
                    </Col>
                    <Col span={18}>
                        <JobPathMap jobData={jobData} stops={stops} />
                    </Col>
                </Row>
            )}
        </div>
    );
};

export default InspectJob;
