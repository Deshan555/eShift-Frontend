import React, { useEffect, useState } from 'react';
import { Table, Input, Form, message, Tag, Descriptions, Breadcrumb } from 'antd';
import apiExecutions from '../api/apiExecutions';
import DashboardLayout from '../../components/DashboardLayout';
import { SearchOutlined } from '@ant-design/icons';

const TripModule = () => {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingTrip, setEditingTrip] = useState(null);
    const [form] = Form.useForm();
    const [searchText, setSearchText] = useState('');

    const [jobDataMap, setJobDataMap] = useState({});

    const fetchTrips = async () => {
        setLoading(true);
        try {
            const data = await apiExecutions.getAllTrips();
            setTrips(Array.isArray(data.data) ? data.data : []);
        } catch (err) {
            message.error('Failed to fetch trips');
        }
        setLoading(false);
    };

    const fetchJobById = async (jobId) => {
        try {
            const data = await apiExecutions.getJobById(jobId);
            setJobDataMap(prev => ({ ...prev, [jobId]: data.data }));
            return data.data;
        } catch (err) {
            message.error('Failed to fetch job details');
            return null;
        }
    };

    useEffect(() => {
        fetchTrips();
    }, []);

    useEffect(() => {
        if (editingTrip) {
            form.setFieldsValue(editingTrip);
        } else {
            form.resetFields();
        }
    }, [editingTrip, form]);

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

    const filteredTrips = trips.filter((t) => {
        const search = searchText.toLowerCase();
        return (
            (t.tripId && t.tripId.toString().includes(search)) ||
            (t.jobId && t.jobId.toString().includes(search)) ||
            (t.lorry && (t.lorry.name?.toLowerCase().includes(search) || t.lorry.toString().toLowerCase().includes(search))) ||
            (t.driver && (t.driver.name?.toLowerCase().includes(search) || t.driver.toString().toLowerCase().includes(search))) ||
            (t.assistant && (t.assistant.name?.toLowerCase().includes(search) || t.assistant.toString().toLowerCase().includes(search))) ||
            (t.container && (t.container.name?.toLowerCase().includes(search) || t.container.toString().toLowerCase().includes(search))) ||
            (t.status && t.status.toLowerCase().includes(search)) ||
            (t.adminRemark && t.adminRemark.toLowerCase().includes(search))
        );
    });

    const columns = [
        { title: 'Trip ID', dataIndex: 'tripId', key: 'tripId', width: 80 },
        { title: 'Job ID', dataIndex: 'jobId', key: 'jobId', width: 80, render: (jobId) => 'JOB-'+jobId || <Tag bordered={false} color="orange">Unassigned</Tag> },
        { title: 'Lorry', dataIndex: 'lorry', key: 'lorry', render: (lorry) => lorry ? lorry.name || lorry : <Tag bordered={false} className='textStyle-small'
          style={{ fontSize: 10, fontWeight: 550, textTransform: 'capitalize', padding: 5, borderRadius: 8 }} color="red">Unassigned</Tag> },
        { title: 'Driver', dataIndex: 'driver', key: 'driver', render: (driver) => driver ? driver.name || driver : <Tag bordered={false} className='textStyle-small'
          style={{ fontSize: 10, fontWeight: 550, textTransform: 'capitalize', padding: 5, borderRadius: 8 }} color="pink">Unassigned</Tag> },
        { title: 'Assistant', dataIndex: 'assistant', key: 'assistant', render: (assistant) => assistant ? assistant.name || assistant : <Tag bordered={false} className='textStyle-small'
          style={{ fontSize: 10, fontWeight: 550, textTransform: 'capitalize', padding: 5, borderRadius: 8 }} color="orange">Unassigned</Tag> },
        { title: 'Container', dataIndex: 'container', key: 'container', render: (container) => container ? container.name || container : <Tag bordered={false} className='textStyle-small'
          style={{ fontSize: 10, fontWeight: 550, textTransform: 'capitalize', padding: 5, borderRadius: 8 }} color="purple">Unassigned</Tag> },
        { title: 'Scheduled Date', dataIndex: 'scheduledDate', key: 'scheduledDate', render: (date) => (!date || date === '0001-01-01T00:00:00') ? <Tag
            className='textStyle-small'
            style={{ fontSize: 10, fontWeight: 550, textTransform: 'capitalize', padding: 5, borderRadius: 8 }}
            color="yellow">Unplanned</Tag> : date },
        { title: 'Admin Remark', dataIndex: 'adminRemark', key: 'adminRemark', render: (remark) => remark || <span style={{ color: '#aaa' }}>-</span> },
        { title: 'Status', dataIndex: 'status', key: 'status', render: (status) => <Tag
            className='textStyle-small' bordered={false} 
            style={{ fontSize: 10, fontWeight: 550, textTransform: 'capitalize', padding: 5, borderRadius: 8 }}
            color={status === 'PENDING' ? 'orange' : status === 'COMPLETED' ? 'green' : 'blue'}>{status}</Tag> },
    ];

    return (
        <DashboardLayout>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginBottom: 16 }}>
                <div>
                    <span className='textStyle-small' style={{ fontSize: 18 }}>All Trips</span>
                    <Breadcrumb style={{ margin: '2px 0' }}>
                        <Breadcrumb.Item className='textStyle-small'>Home</Breadcrumb.Item>
                        <Breadcrumb.Item className='textStyle-small'>Trips</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <Input
                    placeholder="Search by Trip ID, Job ID, Lorry, Driver, etc."
                    className='custom-Input-Field'
                    value={searchText}
                    onChange={handleSearch}
                    style={{ width: 250 }}
                />
            </div>
            <Table
                columns={columns}
                style={{ marginTop: 16 }}
                dataSource={filteredTrips.reverse()} // Show latest trips first
                rowKey="tripId"
                size='middle'
                className='table-striped-rows'
                pagination={filteredTrips?.length > 10 ? { pageSize: 10 } : false}
                loading={loading}
                expandable={{
                    expandedRowRender: (record) => {
                        const job = jobDataMap[record.jobId];
                        if (!job) return <span>Loading...</span>;
                        return (
                            <Descriptions bordered size='small' column={2} style={{ margin: 0, borderColor: '#f0f1f2' }}>
                                <Descriptions.Item label="Job ID">{job.jobId}</Descriptions.Item>
                                <Descriptions.Item label="Customer ID">{job.customerId}</Descriptions.Item>
                                <Descriptions.Item label="Branch ID">{job.branchId}</Descriptions.Item>
                                <Descriptions.Item label="Date">{job.date}</Descriptions.Item>
                                <Descriptions.Item label="Status">{job.status}</Descriptions.Item>
                                <Descriptions.Item label="Request Status">{job.requestStatus}</Descriptions.Item>
                                <Descriptions.Item label="Delivery Date">{job.deliveryDate}</Descriptions.Item>
                                <Descriptions.Item label="Special Remark">{job.specialRemark}</Descriptions.Item>
                                <Descriptions.Item label="Request Container Type">{job.requestContainerType}</Descriptions.Item>
                                <Descriptions.Item label="Admin Approval Status">{job.adminApprovalStatus}</Descriptions.Item>
                                <Descriptions.Item label="Invoicing Status">{job.invoicingStatus}</Descriptions.Item>
                                <Descriptions.Item label="Invoice Price">{job.invoicePrice}</Descriptions.Item>
                                <Descriptions.Item label="Payment Status">{job.paymentStatus}</Descriptions.Item>
                            </Descriptions>
                        );
                    },
                    onExpand: async (expanded, record) => {
                        if (expanded && record.jobId && !jobDataMap[record.jobId]) {
                            await fetchJobById(record.jobId);
                        }
                    },
                    onExpandedRowsChange: (expandedRows) => {
                        if (expandedRows.length === 0) {
                            setJobDataMap({});
                        }
                    }
                }}
            />
        </DashboardLayout>
    );
};

export default TripModule;
