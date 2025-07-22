import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Input, Form, message, Popconfirm, Tag, Row, Col, Breadcrumb, Switch } from 'antd';
import apiExecutions from '../api/apiExecutions';
import DashboardLayout from '../../components/DashboardLayout';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { toast, ToastContainer } from 'react-toastify';

const CustomerModule = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [form] = Form.useForm();
    const [searchText, setSearchText] = useState('');

    const fetchCustomers = async () => {
        setLoading(true);
        try {
            const data = await apiExecutions.getAllCustomers();
            const mapped = Array.isArray(data.data)
                ? data.data.map(c => ({
                    id: c.customerId,
                    name: c.name,
                    fullName: c.fullName,
                    address: c.address,
                    email: c.emailAddress,
                    phone: c.phoneNumber,
                    password: c.password,
                    status: c.activeStatus,
                }))
                : [];
            setCustomers(mapped);
        } catch (err) {
            message.error('Failed to fetch customers');
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    // Set form fields when editingCustomer changes
    useEffect(() => {
        if (editingCustomer) {
            form.setFieldsValue({
                name: editingCustomer.name,
                fullName: editingCustomer.fullName,
                address: editingCustomer.address,
                email: editingCustomer.email,
                phone: editingCustomer.phone,
                status: editingCustomer.status,
            });
        } else {
            form.resetFields();
        }
    }, [editingCustomer, form]);

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

    const filteredCustomers = customers.filter((c) =>
        c.name?.toLowerCase().includes(searchText.toLowerCase()) ||
        c.email?.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleDelete = async (id) => {
        try {
            await apiExecutions.deleteCustomer(id);
            message.success('Customer deleted successfully');
            fetchCustomers();
        } catch (err) {
            message.error('Failed to delete customer');
        }
    };

    const handleModalOk = async () => {
        try {
            const values = await form.validateFields();
            if (editingCustomer) {
                // Update customer
                await apiExecutions.updateCustomer(editingCustomer.id, values);
                message.success('Customer updated successfully');
            } else {
                // Add new customer
                await apiExecutions.createCustomer(values);
                message.success('Customer added successfully');
            }
            setModalVisible(false);
            form.resetFields();
            setEditingCustomer(null);
            fetchCustomers();
        } catch (err) {
            message.error('Failed to save customer');
        }
    };

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
        { title: 'Name', dataIndex: 'name', key: 'name', render: (text) => <span className="poppins-regular">{text}</span> },
        { title: 'Full Name', dataIndex: 'fullName', key: 'fullName', render: (text) => <span className="poppins-regular">{text}</span> },
        { title: 'Address', dataIndex: 'address', key: 'address', render: (text) => <span className="poppins-regular">{text}</span> },
        { title: 'Email', dataIndex: 'email', key: 'email', render: (text) => <span className="poppins-regular">{text}</span> },
        { title: 'Phone', dataIndex: 'phone', key: 'phone', render: (text) => <span className="poppins-regular">{text}</span> },
        { title: 'Status', dataIndex: 'status', key: 'status', render: (status) => 
        <Tag 
        bordered={false}
        style={{ fontSize: 12, fontFamily: 'Poppins', fontWeight: 550 }}
        color={status === 'true' ? 'green' : 'red'}>{status}</Tag> },
        {
            title: 'Actions',
            key: 'actions',
            width: 120,
            render: (_, record) => (
                <>
                                    <Switch 
                    size='small'
                    style={{ backgroundColor: record?.status === 'true' ? '#52c41a' : '#f5222d', borderRadius: 10 }}
                    checked={record.status === 'true'} onChange={() => updateCustomerStatus(record)} />
                    <Button
                        icon={<EditOutlined size='small' style={{ fontSize: 12 }}/>}
                         shape='circle'
                         size='small'
                        style={{ backgroundColor: '#320A6B', borderColor: '#320A6B', color: '#fff', marginLeft: 5 }}
                        onClick={() => {
                            setEditingCustomer(record);
                            setModalVisible(true);
                        }}
                    />
                </>
            ),
        },
    ];

        // {
    //         "customerId": 3,
    //         "name": "chamudi",
    //         "fullName": "chamudi lakshani",
    //         "address": "main street, kuruwita",
    //         "emailAddress": "maxwon555@gmail.com",
    //         "phoneNumber": "0715827357",
    //         "password": "AQAAAAIAAYagAAAAECEHy0reEeC82/4qFHIF1I830ZlfUV8gSOQKO3uw5yBPleexX9hRAnbzpUcyZLEtpA=="
    //     },

    const updateCustomerFunction = async (values) => {
        let json = {
            customerId: editingCustomer.id,
            name: values.name,
            fullName: values.fullName,
            address: values.address,
            emailAddress: values.email,
            phoneNumber: values.phone,
            activeStatus: editingCustomer.status,
            password: editingCustomer.password,
        }
        try {
            let response = await apiExecutions.updateCustomer(editingCustomer.id, json);
            if (response.status === 200) {
                toast.success('Customer updated successfully');
                setModalVisible(false);
                setEditingCustomer(null);
                form.resetFields();
                fetchCustomers();
            } else {
                toast.error('Failed to update customer');
            }
        } catch (err) {
            toast.error('Failed to update customer');
        }
    }

    // update customer current status 
    const updateCustomerStatus = async (editingCustomer) => {
        let json = {
            customerId: editingCustomer.id,
            activeStatus: editingCustomer.status === 'true' ? 'false' : 'true',
            name: editingCustomer.name,
            fullName: editingCustomer.fullName,
            address: editingCustomer.address,
            emailAddress: editingCustomer.email,
            phoneNumber: editingCustomer.phone,
            password: editingCustomer.password,
        };
        try {
            let response = await apiExecutions.updateCustomer(editingCustomer.id, json);
            if (response && response.status === 200) {
                toast.success('Customer status updated successfully');
                fetchCustomers();
            } else {
                toast.error('Failed to update customer status');
            }
        } catch (err) {
            toast.error('Failed to update customer status');
        }
    }

    return (
        <DashboardLayout>
                 <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <span className='textStyle-small' style={{ fontSize: 18 }}>Customer Management</span>
          <Breadcrumb style={{ margin: '2px 0' }}>
            <Breadcrumb.Item className='textStyle-small'>Home</Breadcrumb.Item>
            <Breadcrumb.Item className='textStyle-small'>Customer</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        {/* <Button
          type="primary"
          style={{ backgroundColor: '#320A6B', borderColor: '#320A6B', height: 38, borderRadius: 12 }}
          onClick={() => handleModalOpen()}
          icon={<PlusOutlined />}
        >
          <span className='textStyle-small' style={{ fontWeight: 550 }}>New Lorry</span>
        </Button> */}
                        <Input
                    placeholder="Search by name or email"
                    prefix={<SearchOutlined />}
                    value={searchText}
                    onChange={handleSearch}
                    className="custom-Input-Field"
                    style={{ width: 250 }}
                />
      </div>
        <div style={{ marginTop: 20 }}>
            <Table
                columns={columns}
                dataSource={filteredCustomers}
                rowKey="id"
                loading={loading}
                pagination={{ pageSize: 10 }}
                className='table-striped-rows'
            />
            
            <Modal
                open={modalVisible}
                onOk={handleModalOk}
                onCancel={() => {
                    setModalVisible(false);
                    setEditingCustomer(null);
                    form.resetFields();
                }}
                width={700}
                okText="Save"
                cancelText="Cancel"
                footer={null}
                destroyOnClose={true}
                className="custom-modal"
            >
                <div className="modal-header-user" style={{ backgroundColor: '#F0E8FF', padding: 20 }}>
                    <h2 className="header-title">
                        <span style={{ fontFamily: 'Poppins', fontWeight: 550, fontSize: 18, letterSpacing: 0, color: '#000000' }}>
                            {editingCustomer ? 'Edit Customer' : 'Add New Customer'}
                        </span>
                    </h2>
                </div>
                <div className="modal-body">
                                    <Form 
                                    onFinish={editingCustomer ? updateCustomerFunction : handleModalOk}
                                    form={form} layout="vertical" style={{ marginTop: 20, marginBottom: 20 }}>
                    <Row span={24}>
                        <Col span={12}>
                            <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter name' }]}>
                                <Input className="custom-Input-Field" style={{ width: '98%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="fullName" label="Full Name" rules={[{ required: true, message: 'Please enter full name' }]}>
                                <Input className="custom-Input-Field" style={{ width: '98%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="address" label="Address" rules={[{ required: true, message: 'Please enter address' }]}>
                                <Input className="custom-Input-Field" style={{ width: '98%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please enter email' }]}>
                                <Input className="custom-Input-Field" style={{ width: '98%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="phone" label="Phone" rules={[{ required: true, message: 'Please enter phone' }]}>
                                <Input className="custom-Input-Field" style={{ width: '98%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="textStyle-small"
                                    style={{ backgroundColor: '#320A6B', borderColor: '#320A6B', height: 38, borderRadius: 12, float: 'right' }}
                                    onClick={handleModalOk}
                                >
                                    {editingCustomer ? 'Update Data' : 'Add Customer'}
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                </div>

            </Modal >

            <ToastContainer />
        </div>
        </DashboardLayout>
    );
};

export default CustomerModule;