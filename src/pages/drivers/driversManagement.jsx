import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import {
  Table,
  Modal,
  Form,
  Input,
  Select,
  Space,
  Button,
  Tag,
  Breadcrumb,
  message,
  Switch,
  Popconfirm
} from 'antd';
import apiExecutions from '../api/apiExecutions';
import moment from 'moment';
import {
  EditOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import DriversManagementModel from './management.jsx';
import { toast, ToastContainer } from 'react-toastify';

const { Option } = Select;

const DriversPage = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [allBranches, setAllBranches] = useState([]);

  const fetchBranches = async () => {
    try {
      const response = await apiExecutions.getAllBranches();
      setAllBranches(response?.data || []);
    } catch (error) {
      console.error('Error fetching branches:', error);
    }
  };

  const fetchDrivers = async () => {
    try {
      const response = await apiExecutions.getAllDrivers();
      setDrivers(response?.data || []);
    } catch (error) {
      console.error('Error fetching drivers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBranches();
    fetchDrivers();
  }, []);

  const handleAddDriver = () => {
    setIsEdit(false);
    setSelectedDriver(null);
    setIsModalVisible(true);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <span className='textStyle-small'>{text}</span>,
    },
    {
      title: 'Branch',
      dataIndex: 'branchId',
      key: 'branchId',
      render: (branch) => (
        <span className='textStyle-small'>
          {branch ? allBranches.find(b => b.branchId === branch)?.name || 'N/A' : 'N/A'}
        </span>
      ),
    },
    {
      title: 'License Number',
      dataIndex: 'licenseNumber',
      key: 'licenseNumber',
      render: (text) => <span className='textStyle-small'>{text}</span>,
    },
    {
      title: 'Contact Info',
      dataIndex: 'contactInfo',
      key: 'contactInfo',
      render: (text) => <span className='textStyle-small'>{text}</span>,
    },
    {
      title: 'NIC',
      dataIndex: 'nic',
      key: 'nic',
      render: (text) => <span className='textStyle-small'>{text}</span>,
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      render: (text) => <span className='textStyle-small'>{text}</span>,
    },
    {
      title: 'License Type',
      dataIndex: 'licenseType',
      key: 'licenseType',
      render: (text) => <span className='textStyle-small'>{text}</span>,
    },
    {
      title: 'License Expiry Date',
      dataIndex: 'licenseExpiryDate',
      key: 'licenseExpiryDate',
      render: (date) => (
        <span className='textStyle-small'>
          {date ? moment(date).format('YYYY-MM-DD') : 'N/A'}
        </span>
      ),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      render: (text) => <span className='textStyle-small'>{text}</span>,
    },
    {
      title: 'Status',
      dataIndex: 'workingStatus',
      key: 'workingStatus',
      render: (status) => (
        <Tag color={status === 'Active' ? 'green' : 'volcano'} style={{ fontSize: '12px', borderRadius: 10, fontWeight: 550, padding: 5 }} bordered={false} className='textStyle-small'>
          {status ? status : 'N/A'}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Switch
            checked={record?.workingStatus === 'Active'}
            onChange={async () => {
              await handleDelete(record.driverId);
            }}
            size='small'
            style={{ backgroundColor: record?.workingStatus === 'Active' ? '#52c41a' : '#f5222d', borderRadius: 10 }}
          />
          <Button
            type="primary"
            shape='circle'
            style={{ backgroundColor: '#320A6B', borderColor: '#320A6B', color: '#fff' }}
            size='small'
            icon={<EditOutlined style={{ color: '#fff', fontSize: 12 }} />}
            onClick={() => {
              setIsEdit(true);
              setSelectedDriver(record);
              setIsModalVisible(true);
            }}
          />
        </Space>
      ),
    },
  ];

  const handleDelete = async (driverId) => {
    try {
      let response = await apiExecutions.deleteDriver(driverId);
      if (response?.status === 200) {
        toast.success(<span style={{ fontSize: 14 }} className='textStyle-small'>Operation Performed successfully</span>);
        fetchDrivers();
      } else {
        toast.error(<span style={{ fontSize: 14 }} className='textStyle-small'>Operation Failed</span>);
      }
    } catch (error) {
      console.error('Error deleting driver:', error);
      toast.error(<span style={{ fontSize: 14 }} className='textStyle-small'>Error deleting driver: {error?.message || 'Unknown error'}</span>);
    }
  };


  return (
    <DashboardLayout>
      <ToastContainer />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 16,
        }}
      >
        <div>
          <span className='textStyle-small' style={{ fontSize: 18 }}>
            Drivers Management
          </span>
          <Breadcrumb style={{ margin: '2px 0' }}>
            <Breadcrumb.Item className='textStyle-small'>Home</Breadcrumb.Item>
            <Breadcrumb.Item className='textStyle-small'>
              Drivers Management
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Button
          type='primary'
          style={{
            backgroundColor: '#320A6B',
            borderColor: '#320A6B',
            height: 38,
            borderRadius: 12,
          }}
          onClick={handleAddDriver}
          icon={<PlusOutlined />}
        >
          <span className='textStyle-small' style={{ fontWeight: 550 }}>
            New Driver
          </span>
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={drivers}
        rowKey="driverId"
        loading={loading}
        pagination={drivers.length > 10 ? { pageSize: 10 } : false}
        className='table-striped-rows'
      />

      <Modal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        destroyOnClose
        width={700}
        footer={null}
        className="custom-modal"
      >
        <div className="modal-header-user" style={{ backgroundColor: '#F0E8FF', padding: 20 }}>
          <h2 className="header-title">
            <span style={{ fontFamily: 'Poppins', fontWeight: 550, fontSize: 18, letterSpacing: 0, color: '#000000' }}>
              {isEdit ? 'Edit Driver' : 'Add New Driver'}
            </span>
          </h2>
        </div>
        <div className="modal-body">
          <DriversManagementModel
            isEdit={isEdit}
            isView={!isEdit}
            fetchData={() => {
              fetchDrivers();
              setIsModalVisible(false);
              setIsEdit(false);
              setSelectedDriver(null);
            }}
            data={selectedDriver}
            allBranches={allBranches}
          />
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default DriversPage;
