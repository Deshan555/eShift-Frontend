import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Table, Button, Modal, message, Tag, Breadcrumb, Popconfirm, Select } from 'antd';
import { PlusOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import apiExecutions from '../api/apiExecutions';
import CityManagement from './management.jsx';

const CityPage = () => {
  const [searchText, setSearchText] = useState('');
  const [districtFilter, setDistrictFilter] = useState([]);
  const [provinceFilter, setProvinceFilter] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('add'); // 'add' | 'edit' | 'view'
  const [selectedCity, setSelectedCity] = useState(null);

  const fetchCities = async () => {
    setLoading(true);
    try {
      const res = await apiExecutions.getAllCities();
      setCities(res?.data || []);
    } catch (error) {
      message.error('Failed to fetch cities: ' + (error?.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  // Filter cities by district and province
  const filteredCities = cities.filter(city => {
    let districtMatch = true;
    let provinceMatch = true;
    let nameMatch = true;
    if (districtFilter.length > 0) {
      districtMatch = districtFilter.includes(city.district);
    }
    if (provinceFilter.length > 0) {
      provinceMatch = provinceFilter.includes(city.state);
    }
    if (searchText) {
      nameMatch = city.name?.toLowerCase().includes(searchText.toLowerCase());
    }
    return districtMatch && provinceMatch && nameMatch;
  });

  const handleAdd = () => {
    setModalType('add');
    setSelectedCity(null);
    setModalOpen(true);
  };

  const handleEdit = (record) => {
    setModalType('edit');
    setSelectedCity(record);
    setModalOpen(true);
  };

  const handleView = (record) => {
    setModalType('view');
    setSelectedCity(record);
    setModalOpen(true);
  };

  const handleDelete = async (cityId) => {
    setLoading(true);
    try {
      await apiExecutions.deleteCity(cityId);
      message.success('City deleted successfully');
      fetchCities();
    } catch (error) {
      message.error('Failed to delete city: ' + (error?.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedCity(null);
    fetchCities();
  };

  const columns = [
    {
      title: 'City Name',
      dataIndex: 'name',
      key: 'cityName',
      render: (text) => <span className='textStyle-small'>{text}</span>,
    },
    {
      title: 'Postal Code',
      dataIndex: 'postalCode',
      key: 'postalCode',
      render: (text) => <span className='textStyle-small'>{text}</span>,
    },
    {
      title: 'District',
      dataIndex: 'district',
      key: 'district',
      render: (text) => <span className='textStyle-small'>{text}</span>,
    },
    {
      title: 'Latitude',
      dataIndex: 'latitude',
      key: 'latitude',
      render: (lat) => <span className='textStyle-small'>{lat}</span>,
    },
    {
      title: 'Longitude',
      dataIndex: 'longitude',
      key: 'longitude',
      render: (lng) => <span className='textStyle-small'>{lng}</span>,
    },
    {
      title: 'Province',
      dataIndex: 'state',
      key: 'state',
      render: (province) => {
        // Province color mapping for Sri Lanka's 9 provinces
        const provinceColors = {
          'Central Province': 'geekblue',
          'Eastern Province': 'volcano',
          'Northern Province': 'cyan',
          'North Central Province': 'gold',
          'North Western Province': 'lime',
          'Sabaragamuwa Province': 'purple',
          'Southern Province': 'magenta',
          'Uva Province': 'green',
          'Western Province': 'blue',
        };
        return <Tag 
        style={{ padding: 5, borderRadius: 8, fontWeight: 550 }} bordered={false}
        color={provinceColors[province] || 'default'} className='textStyle-small'>{province}</Tag>;
      },
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
      render: (text) => <span className='textStyle-small'>{text}</span>,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <span style={{ display: 'flex', gap: 8 }}>
          <Button icon={<EyeOutlined />} shape='circle'
            style={{ backgroundColor: '#065084', borderColor: '#065084', color: '#fff' }}
            size="small" onClick={() => handleView(record)} />
          <Button icon={<EditOutlined />} shape='circle'
            style={{ backgroundColor: '#320A6B', borderColor: '#320A6B', color: '#fff' }}
            size="small" onClick={() => handleEdit(record)} />
          <Popconfirm title="Are you sure to delete this city?" onConfirm={() => handleDelete(record.cityId)} okText="Yes" cancelText="No">
            <Button icon={<DeleteOutlined />} shape='circle'
              style={{ backgroundColor: '#e91414ff', borderColor: '#e91414ff', color: '#fff' }}
              size="small" danger />
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <span className='textStyle-small' style={{ fontSize: 18 }}>City Management</span>
          <Breadcrumb style={{ margin: '2px 0' }}>
            <Breadcrumb.Item className='textStyle-small'>Home</Breadcrumb.Item>
            <Breadcrumb.Item className='textStyle-small'>City Management</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Button
          type="primary"
          style={{ backgroundColor: '#320A6B', borderColor: '#320A6B', height: 38, boorderRadius: 12 }}
          onClick={() => {
            setModalType('add');
            setSelectedCity(null);
            setModalOpen(true);
          }}
          icon={<PlusOutlined />}
        >
          <span className='textStyle-small' style={{ fontWeight: 550 }}>New City</span>
        </Button>
      </div>

      <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
        <div style={{ flex: 1 }}>
          <input
            type="text"
            placeholder="Enter city name..."
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            style={{ width: '100%', height: 38, marginBottom: 4, paddingLeft: 10 }}
            className='custom-Input-Field'
          />
        </div>
        <div style={{ flex: 1 }}>
          <Select
            mode="multiple"
            allowClear
            placeholder="Select District(s)"
            value={districtFilter}
            onChange={setDistrictFilter}
            style={{ width: '100%' }}
            className='custom-Select'
            bordered={false}
          >
            {Array.from(new Set(cities.map(c => c.district))).map(d => (
              <Select.Option key={d} value={d} className='textStyle-small' style={{ fontSize: 12 }}>{d}</Select.Option>
            ))}
          </Select>
        </div>
        <div style={{ flex: 1 }}>
          <Select
            mode="multiple"
            allowClear
            placeholder="Select Province(s)"
            value={provinceFilter}
            onChange={setProvinceFilter}
            style={{ width: '100%' }}
            className='custom-Select'
            bordered={false}
          >
            {Array.from(new Set(cities.map(c => c.state))).map(p => (
              <Select.Option key={p} value={p} className='textStyle-small' style={{ fontSize: 12 }}>{p}</Select.Option>
            ))}
          </Select>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={filteredCities}
        rowKey="cityId"
        loading={loading}
        pagination={filteredCities.length > 10 ? { pageSize: 10 } : false}
        size="middle"
        style={{ marginTop: 30 }}
        className='table-striped-rows'
      />

      <Modal
        open={modalOpen}
        onCancel={closeModal}
        footer={null}
        destroyOnClose
        title={modalType === 'add' ? 'Add City' : modalType === 'edit' ? 'Edit City' : 'View City'}
        width={700}
      >
        <CityManagement
          isEdit={modalType === 'edit'}
          isView={modalType === 'view'}
          data={selectedCity}
          closeFunction={closeModal}
        />
      </Modal>
    </DashboardLayout>
  );
};

export default CityPage;
