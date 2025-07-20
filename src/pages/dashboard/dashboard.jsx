import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from '../../components/DashboardLayout';
import { Card, Row, Col } from 'antd';
import { UserOutlined, TeamOutlined, CarOutlined, ContainerOutlined, SolutionOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import dynamic from 'next/dynamic';

// http://localhost:5000/api/Dashboard/summary

const Dashboard = () => {
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/Dashboard/summary")
            .then((response) => {
                setSummary(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError("Failed to fetch summary");
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    // Card config: key, label, icon, color, link
    const cards = [
        {
            key: 'jobsCount',
            label: 'Jobs',
            icon: <SolutionOutlined style={{ fontSize: 32, color: '#6C63FF' }} />, 
            color: '#F3F0FF',
            link: '/jobs',
        },
        {
            key: 'clientsCount',
            label: 'Clients',
            icon: <UsergroupAddOutlined style={{ fontSize: 32, color: '#FFB6B9' }} />, 
            color: '#FFF0F3',
            link: '/clients/management',
        },
        {
            key: 'adminsCount',
            label: 'Admins',
            icon: <UserOutlined style={{ fontSize: 32, color: '#A0E7E5' }} />, 
            color: '#E0F7FA',
            link: '/admins',
        },
        {
            key: 'driversCount',
            label: 'Drivers',
            icon: <CarOutlined style={{ fontSize: 32, color: '#FFD166' }} />, 
            color: '#FFF9E6',
            link: '/drivers/management',
        },
        {
            key: 'lorriesCount',
            label: 'Lorries',
            icon: <CarOutlined style={{ fontSize: 32, color: '#B5EAD7' }} />, 
            color: '#F0FFF3',
            link: '/lorry/management',
        },
        {
            key: 'containersCount',
            label: 'Containers',
            icon: <ContainerOutlined style={{ fontSize: 32, color: '#FFDAC1' }} />, 
            color: '#FFF7F0',
            link: '/containers/management',
        },
    ];

    // Mock data for charts and map
    const approvalStatusData = [
        { name: 'Approved', value: summary?.approvedJobs || 2 },
        { name: 'Pending', value: summary?.pendingJobs || 2 },
        { name: 'Rejected', value: summary?.rejectedJobs || 1 },
    ];
    const approvalColors = ['#6C63FF', '#FFD166', '#FF6F91'];

    const fuelData = [
        { name: 'Lorry 1', fuel: 120 },
        { name: 'Lorry 2', fuel: 98 },
        { name: 'Lorry 3', fuel: 150 },
        { name: 'Lorry 4', fuel: 80 },
    ];

    // Advanced resource allocation grouped bar chart data
    const resourceChartData = [
        {
            name: 'Drivers',
            Total: summary?.totalDrivers || 0,
            Available: summary?.activeDrivers || 0,
        },
        {
            name: 'Lorries',
            Total: summary?.totalLorries || 0,
            Available: summary?.availableLorries || 0,
        },
        {
            name: 'Containers',
            Total: summary?.totalContainers || 0,
            Available: summary?.totalContainers || 0, // If you have availableContainers, use it here
        },
    ];

    // // Map with polylines (mock, dynamic import)
    // const MapWithNoSSR = React.useMemo(() => dynamic(() => import('./MapStopsPreview'), { ssr: false }), []);
    // const mockRoutes = [
    //     [ [6.9271, 79.8612], [7.2906, 80.6337], [7.8731, 80.7718] ],
    //     [ [6.9271, 79.8612], [6.0535, 80.2210] ]
    // ];

    return (
        <DashboardLayout>
            <h2>Dashboard Summary</h2>
            {/* Summary Cards */}
            <Row span={24} style={{ marginBottom: 32, flexWrap: 'wrap' }}>
                {cards.map(card => (
                    <Col key={card.key} xs={24} sm={4} md={4} lg={4} xl={4}>
                        <Card
                            hoverable
                            onClick={() => window.location.href = card.link}
                            style={{
                                background: card.color,
                                borderRadius: 16,
                                boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)',
                                cursor: 'pointer',
                                transition: 'box-shadow 0.2s',
                                border: 'none',
                                height: 110,
                                display: 'flex',
                                alignItems: 'center',
                                padding: 0,
                                width: '96%',
                            }}
                            bodyStyle={{ padding: 0, height: '100%' }}
                        >
                            <Row style={{ height: '100%', width: '100%' }} span={24}>
                                <Col style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }} span={14}>
                                    {card.icon}
                                </Col>
                                <Col style={{ paddingLeft: 12 }} span={10}>
                                    <div style={{ fontSize: 18, fontWeight: 600, color: '#320A6B', marginBottom: 2, lineHeight: '22px' }} className='textStyle-small'>{card.label}</div>
                                    <div style={{ fontSize: 28, fontWeight: 700, color: '#320A6B', marginTop: 2 }}>{summary[card.key]}</div>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                ))}
            </Row>


            {/* Advanced Resource Allocation Chart */}
            <Row gutter={24} style={{ marginBottom: 32 }}>
                <Col xs={24} md={16} lg={12} xl={8}>
                    <Card title="Resource Allocation" style={{ borderRadius: 12 }}>
                        <ResponsiveContainer width="100%" height={260}>
                            <BarChart data={resourceChartData} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
                                <XAxis dataKey="name" fontSize={13} />
                                <YAxis fontSize={13} allowDecimals={false} />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="Total" fill="#6C63FF" radius={[8, 8, 0, 0]} barSize={32} />
                                <Bar dataKey="Available" fill="#FFD166" radius={[8, 8, 0, 0]} barSize={32} />
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>
                </Col>
            </Row>

            {/* Charts and Map Row */}
            <Row gutter={24} style={{ marginBottom: 32 }}>
                {/* Pie Chart for Approval Status */}
                <Col xs={24} md={8}>
                    <Card title="Jobs by Approval Status" style={{ borderRadius: 12 }}>
                        <ResponsiveContainer width="100%" height={220}>
                            <PieChart>
                                <Pie data={approvalStatusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
                                    {approvalStatusData.map((entry, idx) => (
                                        <Cell key={`cell-${idx}`} fill={approvalColors[idx % approvalColors.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </Card>
                </Col>
                {/* Map for Routing Paths */}
                <Col xs={24} md={8}>
                    <Card title="Routing Paths" style={{ borderRadius: 12, minHeight: 260 }}>
                        {/* Replace with your actual map component and data */}
                        <div style={{ height: 220, width: '100%' }}>
                            {/* Example: <MapWithNoSSR routes={mockRoutes} /> */}
                            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>
                                Map with polylines here
                            </div>
                        </div>
                    </Card>
                </Col>
                {/* Fuel Consumption Chart */}
                <Col xs={24} md={8}>
                    <Card title="Fuel Consumption" style={{ borderRadius: 12 }}>
                        <ResponsiveContainer width="100%" height={220}>
                            <BarChart data={fuelData} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
                                <XAxis dataKey="name" fontSize={12} />
                                <YAxis fontSize={12} />
                                <Tooltip />
                                <Bar dataKey="fuel" fill="#6C63FF" radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>
                </Col>
            </Row>
        </DashboardLayout>
    );
};

export default Dashboard;