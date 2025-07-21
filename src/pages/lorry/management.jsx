import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Table, Modal, Form, Input, Select, Space, Button, Breadcrumb, message, Row, Col } from 'antd';
import apiExecutions from '../api/apiExecutions';
import moment from 'moment';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

const LorryManagement = () => {
  const [lorries, setLorries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedLorry, setSelectedLorry] = useState(null);
  const [allBranches, setAllBranches] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await apiExecutions.getAllBranches();
        setAllBranches(response.data || response);
      } catch (error) {
        message.error('Error fetching branches: ' + (error?.message || 'Unknown error'));
      }
    };
    fetchBranches();
    fetchLorries();
  }, []);

  const fetchLorries = async () => {
    setLoading(true);
    try {
      const data = await apiExecutions.getAllLorries();
      setLorries(data.data || data);
    } catch (error) {
      message.error('Error fetching lorries: ' + (error?.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this lorry?',
      content: 'This action cannot be undone.',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          await apiExecutions.deleteLorry(id);
          message.success('Lorry deleted successfully');
          fetchLorries();
        } catch (error) {
          message.error('Failed to delete lorry: ' + (error?.message || 'Unknown error'));
        }
      },
    });
  };

  const handleModalOpen = (lorry = null) => {
    setIsModalVisible(true);
    setIsEdit(!!lorry);
    setSelectedLorry(lorry);
    if (lorry) {
      form.setFieldsValue({
        ...lorry,
        insuranceExpiryDate: lorry.insuranceExpiryDate ? moment(lorry.insuranceExpiryDate) : null,
      });
    } else {
      form.resetFields();
    }
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedLorry(null);
    setIsEdit(false);
    form.resetFields();
    fetchLorries();
  };

  const handleFinish = async (values) => {
    try {
      const payload = {
        ...values,
        insuranceExpiryDate: values.insuranceExpiryDate ? values.insuranceExpiryDate : null,
      };
      if (isEdit && selectedLorry) {
        await apiExecutions.updateLorry(selectedLorry.lorryId, payload);
        message.success('Lorry updated successfully');
      } else {
        await apiExecutions.createLorry(payload);
        message.success('Lorry created successfully');
      }
      handleModalClose();
    } catch (error) {
      message.error('Operation failed: ' + (error?.message || 'Unknown error'));
    }
  };

  const columns = [
    { title: 'Branch', dataIndex: 'branchId', key: 'branchId', render: (id) => allBranches.find(b => b.branchId === id)?.name || 'N/A' },
    { title: 'Registration Number', dataIndex: 'registrationNumber', key: 'registrationNumber' },
    { title: 'Capacity', dataIndex: 'capacity', key: 'capacity' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    { title: 'Model', dataIndex: 'vehicleModel', key: 'vehicleModel' },
    { title: 'Color', dataIndex: 'vehicleColor', key: 'vehicleColor' },
    { title: 'Insurance Number', dataIndex: 'insuranceNumber', key: 'insuranceNumber' },
    { title: 'Insurance Expiry', dataIndex: 'insuranceExpiryDate', key: 'insuranceExpiryDate', render: (date) => date ? moment(date).format('YYYY-MM-DD') : 'N/A' },
    { title: 'Transport Company', dataIndex: 'transportCompany', key: 'transportCompany' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button shape="circle" size="small" style={{ background: '#320A6B', borderColor: '#320A6B' }}
            onClick={() => handleModalOpen(record)}><EditOutlined style={{ color: 'white', fontSize: 12 }} /></Button>
          {/* <Button shape="circle" danger type="primary" size="small" onClick={() => handleDelete(record.lorryId)}><DeleteOutlined /></Button> */}
        </Space>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <span className='textStyle-small' style={{ fontSize: 18 }}>Lorry Management</span>
          <Breadcrumb style={{ margin: '2px 0' }}>
            <Breadcrumb.Item className='textStyle-small'>Home</Breadcrumb.Item>
            <Breadcrumb.Item className='textStyle-small'>Lorry</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Button
          type="primary"
          style={{ backgroundColor: '#320A6B', borderColor: '#320A6B', height: 38, borderRadius: 12 }}
          onClick={() => handleModalOpen()}
          icon={<PlusOutlined />}
        >
          <span className='textStyle-small' style={{ fontWeight: 550 }}>New Lorry</span>
        </Button>
      </div>

      <Modal visible={isModalVisible}
        destroyOnClose={true}
        onCancel={handleModalClose}
        footer={null} width={800}
        className="custom-modal">
        <div className="modal-header-user" style={{ backgroundColor: '#F0E8FF', padding: 20 }}>
          <h2 className="header-title">
            <span style={{ fontFamily: 'Poppins', fontWeight: 550, fontSize: 18, letterSpacing: 0, color: '#000000' }}>
              {isEdit ? 'Edit Lorry' : 'Add New Lorry'}
            </span>
          </h2>
        </div>
        <div className="modal-body">
          <Form
            layout="vertical"
            form={form}
            style={{ marginTop: 20 }}
            onFinish={handleFinish}
            initialValues={isEdit && selectedLorry ? {
              ...selectedLorry,
              insuranceExpiryDate: selectedLorry.insuranceExpiryDate ? moment(selectedLorry.insuranceExpiryDate).format('YYYY-MM-DD') : null,
            } : {}}
          >
            <Row span={24}>
                <Col span={12}>
            <Form.Item label="Branch" name="branchId" rules={[{ required: true, message: 'Please select a branch' }]}> 
              <Select placeholder="Select branch" className='custom-Select' bordered={false} style={{ width: '98%' }}
                allowClear
              >
                {allBranches.map(branch => (
                  <Option key={branch.branchId} value={branch.branchId}>
                    {branch.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            </Col>
            <Col span={12}>
            <Form.Item label="Registration Number" name="registrationNumber" rules={[{ required: true, message: 'Please enter the registration number' }]}> 
              <Input placeholder="Enter registration number" className='custom-Input-Field' style={{ width: '98%' }} />
            </Form.Item>
            </Col>
            <Col span={12}>
            <Form.Item label="Capacity" name="capacity" rules={[{ required: true, message: 'Please enter the capacity' }]}> 
              <Input type="number" placeholder="Enter capacity" className='custom-Input-Field' style={{ width: '98%' }} />
            </Form.Item>
            </Col>
            <Col span={12}>
            <Form.Item label="Status" name="status" rules={[{ required: true, message: 'Please enter the status' }]}> 
              <Select placeholder="Select status" className='custom-Select' bordered={false} style={{ width: '98%' }}>
                <Option value="available">Available</Option>
                <Option value="unavailable">Unavailable</Option>
                <Option value="maintenance">Maintenance</Option>
              </Select>
            </Form.Item>
            </Col>
            <Col span={12}>
            <Form.Item label="Model" name="vehicleModel" rules={[{ required: true, message: 'Please enter the vehicle model' }]}> 
              <Input placeholder="Enter vehicle model" className='custom-Input-Field' style={{ width: '98%' }} />
            </Form.Item>
            </Col>
            <Col span={12}>
            <Form.Item label="Color" name="vehicleColor" rules={[{ required: true, message: 'Please enter the vehicle color' }]}> 
              <Input placeholder="Enter vehicle color" className='custom-Input-Field' style={{ width: '98%' }} />
            </Form.Item>
            </Col>
            <Col span={12}>
            <Form.Item label="Insurance Number" name="insuranceNumber" rules={[{ required: true, message: 'Please enter the insurance number' }]}> 
              <Input placeholder="Enter insurance number" className='custom-Input-Field' style={{ width: '98%' }} />
            </Form.Item>
            </Col>
            <Col span={12}>
            <Form.Item label="Insurance Expiry Date" name="insuranceExpiryDate" rules={[{ required: true, message: 'Please select the insurance expiry date' }]}> 
              <Input type="date" className='custom-Input-Field' style={{ width: '98%' }} />
            </Form.Item>
            </Col>
            <Col span={12}>
            <Form.Item label="Transport Company" name="transportCompany" rules={[{ required: true, message: 'Please enter the transport company' }]}> 
              <Input placeholder="Enter transport company" className='custom-Input-Field' style={{ width: '98%' }} />
            </Form.Item>
            </Col>
            <Col span={24}>
            <Form.Item style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit" loading={loading} style={{ backgroundColor: '#320A6B', borderColor: '#320A6B', height: '36px' }} className='textStyle-small'>
                {isEdit ? 'Update Data' : 'Insert Data'}</Button>
              <Button onClick={handleModalClose} style={{ backgroundColor: '#e91414ff', borderColor: '#e91414ff', color: '#fff', marginLeft: 8, height: '36px' }} className='textStyle-small'>
                Cancel</Button>
            </Form.Item>
            </Col>
            </Row>
          </Form>
        </div>
      </Modal>

      <Table
        style={{ marginTop: 30 }}
        dataSource={lorries} loading={loading} rowKey="lorryId" className='table-striped-rows' pagination={lorries?.length > 10 ? { pageSize: 10 } : false} columns={columns} />
    </DashboardLayout>
  );
};

export default LorryManagement;
