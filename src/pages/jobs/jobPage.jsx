import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Table, Breadcrumb, message, Input, Select, DatePicker, Row, Col, Button, Space, Tag } from 'antd';
import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import moment from 'moment';
import apiExecutions from '../api/apiExecutions';
import Modal from 'antd/es/modal/Modal';
import CreateJob from './createJob';
import JobPathMap from './JobPathMap';
import JobInformations from './jobInformation';

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [branches, setBranches] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState([]);
  const [approvalFilter, setApprovalFilter] = useState([]);
  const [dateRange, setDateRange] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const [stopDetails, setStopDetails] = useState([]);
  const [allCities, setAllCities] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const [jobsRes, customersRes, branchesRes, allCitiesRes] = await Promise.all([
          apiExecutions.getAllJobs(),
          apiExecutions.getAllCustomers(),
          apiExecutions.getAllBranches(),
          apiExecutions.getAllCities()
        ]);
        const jobsData = jobsRes.data || jobsRes;
        setJobs(jobsData);
        setFilteredJobs(jobsData);
        setAllCities(allCitiesRes.data || allCitiesRes);
        setCustomers(customersRes.data || customersRes);
        setBranches(branchesRes.data || branchesRes);
      } catch (error) {
        message.error('Error fetching jobs/customers/branches: ' + (error?.message || 'Unknown error'));
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const getCustomerName = (id) => {
    const customer = customers.find(c => c.customerId === id);
    return customer ? customer.fullName : id;
  };
  const getBranchName = (id) => {
    const branch = branches.find(b => b.branchId === id);
    return branch ? branch.name : id;
  };

  // Filter and search logic
  useEffect(() => {
    let data = [...jobs];
    // Status filter
    if (statusFilter.length > 0) {
      data = data.filter(job => statusFilter.includes(job.status));
    }
    // Approval filter
    if (approvalFilter.length > 0) {
      data = data.filter(job => approvalFilter.includes(job.adminApprovalStatus));
    }
    // Date range filter (using deliveryDate, robust handling)
    if (dateRange && dateRange.length === 2 && dateRange[0] && dateRange[1]) {
      const start = moment(dateRange[0]).startOf('day');
      const end = moment(dateRange[1]).endOf('day');
      data = data.filter(job => {
        if (!job.deliveryDate) return false;
        const deliveryDate = moment(job.deliveryDate);
        return deliveryDate.isValid() && deliveryDate.isBetween(start, end, undefined, '[]');
      });
    }
    // Global search
    if (searchText) {
      const lower = searchText.toLowerCase();
      data = data.filter(job =>
        Object.values(job).some(val =>
          val && val.toString().toLowerCase().includes(lower)
        )
      );
    }
    setFilteredJobs(data);
  }, [jobs, statusFilter, approvalFilter, dateRange, searchText]);

  const columns = [
    { title: 'Customer', dataIndex: 'customerId', key: 'customerId', render: getCustomerName },
    { title: 'Branch', dataIndex: 'branchId', key: 'branchId', render: getBranchName },
    // { title: 'Created Date', dataIndex: 'date', key: 'date', render: (date) => moment(date).format('YYYY-MM-DD') },
    // { title: 'Status', dataIndex: 'status', key: 'status', filters: [
    //   ...Array.from(new Set(jobs.map(j => j.status))).map(s => ({ text: s, value: s }))
    // ],
    //   onFilter: (value, record) => record.status === value},
    { title: 'Request Delivery Date', dataIndex: 'deliveryDate', key: 'deliveryDate' , render: (date) => date ? moment(date).format('YYYY-MM-DD') : 'N/A'},
    // { title: 'Special Remark', dataIndex: 'specialRemark', key: 'specialRemark' },
    { title: 'Invoice Price', dataIndex: 'invoicePrice', key: 'invoicePrice' },
    { title: 'Container Type', dataIndex: 'requestContainerType', key: 'requestContainerType' },
        { title: 'Request Status', dataIndex: 'requestStatus', key: 'requestStatus', 
      filters: [
        ...Array.from(new Set(jobs.map(j => j.requestStatus))).map(s => ({
          text: s, value: s
        }))
      ],
      onFilter: (value, record) => record.requestStatus === value,
      render: (status) => {
      const colorMap = {
        'INITIAL': 'blue',
        'PENDING': 'orange',
        'APPROVED': 'green',
        'REJECTED': 'red',
        'FINISHED': 'purple',
        'CANCELLED': 'grey'
      };
      return <Tag 
        bordered={false}
        className='textStyle-small'
        style={{ fontSize: 10, fontWeight: 550, textTransform: 'capitalize', padding: 5, borderRadius: 8 }}
        color={colorMap[status] || 'default'}>{status}</Tag>;
    },
  },
    { title: 'Admin Approval', dataIndex: 'adminApprovalStatus', key: 'adminApprovalStatus', 
      render : (status) => {
        const colorMap = {
          'PENDING': 'blue',
          'APPROVED': 'green',
          'REJECTED': 'red',
          'CANCELLED': 'orange'
        };
        return <Tag 
          bordered={false}
          className='textStyle-small'
          style={{ fontSize: 10, fontWeight: 550, textTransform: 'capitalize', padding: 5, borderRadius: 8 }}
          color={colorMap[status] || 'default'}>{status}</Tag>;
      },
      filters: [
      ...Array.from(new Set(jobs.map(j => j.adminApprovalStatus))).map(s => ({ text: s, value: s }))
    ],
      onFilter: (value, record) => record.adminApprovalStatus === value
    },
    { title: 'Invoicing Status', dataIndex: 'invoicingStatus', key: 'invoicingStatus', render: (status) => {
      const colorMap = {
        'PENDING': 'blue',
        'INVOICED': 'green',
        'UNINVOICED': 'purple',
        'CANCELLED': 'red'
      };
      return <Tag 
      bordered={false}
      className='textStyle-small'
      style={{ fontSize: 10, fontWeight: 550, textTransform: 'capitalize', padding: 5, borderRadius: 8 }}
      color={colorMap[status] || 'default'}>{status}</Tag>;
    }},
    { title: 'Payment Status', dataIndex: 'paymentStatus', key: 'paymentStatus', render: (status) => {
      const colorMap = {
        'PENDING': 'orange',
        'PAID': 'green',
        'UNPAID': 'red'
      };
      return <Tag 
      bordered={false}
      className='textStyle-small'
      style={{ fontSize: 10, fontWeight: 550, textTransform: 'capitalize', padding: 5, borderRadius: 8 }}
      color={colorMap[status] || 'default'}>{status}</Tag>;
    }},
    { title: 'Actions', key: 'actions', render: (text, record) => (
        <Space>
          <Button shape='circle' 
          size='small'
          style={{ background: '#320A6B', borderColor: '#320A6B' }}
          icon={<EyeOutlined style={{ color: '#fff' }} />} onClick={() => {
            getJobStopsByJobId(record.jobId);
            setIsEdit(true);
            setSelectedJob(record);
            setIsModalVisible(true);
          }} />
        </Space>
    ) }
  ];

  const getJobStopsByJobId = async (jobId) => {
    try {
      const response = await apiExecutions.getJobStopsByJobId(jobId);
      if (response.status === 200) {
        setStopDetails(response.data);
      } else {
        message.error('Failed to fetch job stops');
      }
    } catch (error) {
      console.error('Error fetching job stops:', error);
    }
  };

  return (
    <DashboardLayout>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <span className='textStyle-small' style={{ fontSize: 18 }}>Jobs Management</span>
          <Breadcrumb style={{ margin: '2px 0' }}>
            <Breadcrumb.Item className='textStyle-small'>Home</Breadcrumb.Item>
            <Breadcrumb.Item className='textStyle-small'>Jobs</Breadcrumb.Item>
          </Breadcrumb>
        </div>

        <Button  
        style={{ backgroundColor: '#320A6B', borderColor: '#320A6B', height: 38, borderRadius: 12 }}
        onClick={() => {
          setIsEdit(false);
          setSelectedJob(null);
          setIsModalVisible(true);
        }}>
          <span className='textStyle-small' style={{ fontWeight: 550, color: 'whitesmoke' }}>New Job</span>
        </Button>
      </div>
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={6}>
          <Input
            placeholder="Search jobs..."
            allowClear
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            style={{ width: '100%', height: 38 }}
            className='custom-Input-Field'
            bordered={false}
          />
        </Col>
        <Col span={6}>
          <Select
            mode="multiple"
            allowClear
            placeholder="Filter by Status"
            value={statusFilter}
            onChange={setStatusFilter}
            style={{ width: '100%' }}
            className='custom-Select'
            bordered={false}
          >
            {Array.from(new Set(jobs.map(j => j.status))).map(s => (
              <Select.Option className='textStyle-small' style={{ fontSize: 12 }} key={s} value={s}>{s}</Select.Option>
            ))}
          </Select>
        </Col>
        <Col span={6}>
          <Select
            mode="multiple"
            allowClear
            placeholder="Filter by Approval Status"
            value={approvalFilter}
            onChange={setApprovalFilter}
            style={{ width: '100%' }}
            className='custom-Select'
            bordered={false}
          >
            {Array.from(new Set(jobs.map(j => j.adminApprovalStatus))).map(s => (
              <Select.Option className='textStyle-small' style={{ fontSize: 12 }} key={s} value={s}>{s}</Select.Option>
            ))}
          </Select>
        </Col>
        <Col span={6}>
          <DatePicker.RangePicker
            style={{ width: '100%' }}
            value={dateRange}
            onChange={setDateRange}
            allowClear
            className='custom-DatePicker'
            format="YYYY-MM-DD"
          />
        </Col>
      </Row>
      <Table
        style={{ marginTop: 30 }}
        dataSource={filteredJobs ? filteredJobs.slice().reverse() : []}
        loading={loading}
        rowKey="jobId"
        size='middle'
        className='table-striped-rows'
        pagination={filteredJobs?.length > 10 ? { pageSize: 10 } : false}
        columns={columns}
      />

      <Modal 
      className='custom-modal'
        visible={isModalVisible} // Replace with your modal visibility state
        onCancel={() => { setIsModalVisible(false); setSelectedJob(null); setIsEdit(false); }}
        destroyOnClose
        width={900}
        footer={null}
      >
            <div className="modal-header-user" style={{ backgroundColor: '#F0E8FF', padding: 20 }}>
          <h2 className="header-title-User">
            <span style={{ fontFamily: 'Poppins', fontWeight: 550, fontSize: 18, letterSpacing: 0, color: '#000000' }}>
              {isEdit ? 'Manage Job' : 'Add New Job'}
            </span>
          </h2>
        </div>
        <div className="modal-body">
          {/* <pre>
            {JSON.stringify(stopDetails, null, 2)}
          </pre> */}
          {/* <CreateJob /> */}
          {/* <JobPathMap stops={stopDetails} /> */}

          <JobInformations 
          allCustomers={customers} allBranches={branches}
          stops={stopDetails} jobData={selectedJob} 
          refectchFunction ={() => {
            getJobStopsByJobId(selectedJob.jobId);
          }}
          />
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default JobsPage;
