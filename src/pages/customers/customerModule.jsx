import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Input, Form, message, Popconfirm, Tag, Row, Col } from 'antd';
import apiExecutions from '../api/apiExecutions';
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
            status: c.status || 'active',
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
    { title: 'Status', dataIndex: 'status', key: 'status', render: (status) => <Tag color={status === 'active' ? 'green' : 'red'}>{status}</Tag> },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: (_, record) => (
        <>
          <Button
            icon={<EditOutlined />}
            size="small"
            className="edit-btn"
            onClick={() => {
              setEditingCustomer(record);
              setModalVisible(true);
            }}
          />
          <Popconfirm title="Delete this customer?" onConfirm={() => handleDelete(record.id)} okText="Yes" cancelText="No">
            <Button icon={<DeleteOutlined />} size="small" danger className="delete-btn" style={{ marginLeft: 8 }} />
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div className="main-content">
      <div style={{ marginBottom: 16, textAlign: 'right' }}>
        <Input
          placeholder="Search by name or email"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={handleSearch}
          className="search-bar"
          style={{ width: 250 }}
        />
      </div>
      <Table
        columns={columns}
        dataSource={filteredCustomers}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
        className="main-table"
      />
      <Modal
        title={editingCustomer ? 'Edit Customer' : 'Add Customer'}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={() => {
          setModalVisible(false);
          setEditingCustomer(null);
          form.resetFields();
        }}
        okText="Save"
        cancelText="Cancel"
        destroyOnClose={true}
      >
        <Form form={form} layout="vertical">
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
            <Col span={12}>
          <Form.Item name="status" label="Status" rules={[{ required: true, message: 'Please select status' }]}>
            <Input className="custom-Input-Field" placeholder="active/inactive" style={{ width: '98%' }} />
          </Form.Item>
            </Col>
            </Row>

        </Form>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default CustomerModule;