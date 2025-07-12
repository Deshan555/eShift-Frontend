import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Table, Modal, Form, Input, Select, Space, Button, Tag, Breadcrumb, message } from 'antd';
import apiExecutions from '../api/apiExecutions';
import moment from 'moment';
import AdminManagement from './management';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const AdminsPage = () => {
  const [admins, setAdmins] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [isModalVisible, setIsModalVisible] = React.useState(true);
  const [isEdit, setIsEdit] = React.useState(false);
  const [isView, setIsView] = React.useState(false);
  const [selectedAdmin, setSelectedAdmin] = React.useState(null);

  React.useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const data = await apiExecutions.getAllAdmins();
      setAdmins(data.data);
    } catch (error) {
      console.error('Error fetching admins:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (adminId) => {
    setTimeout(() => {
      Modal.confirm({
        title: 'Are you sure you want to delete this admin?',
        content: 'This action cannot be undone.',
        okText: 'Delete',
        okType: 'danger',
        cancelText: 'Cancel',
        onOk: async () => {
          try {
            await apiExecutions.deleteAdmin(adminId);
            message.success('Admin deleted successfully');
            fetchAdmins();
          } catch (error) {
            message.error('Failed to delete admin: ' + (error?.message || 'Unknown error'));
          }
        },
      });
    }, 0);
  };
  
  return (
    <DashboardLayout>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <span className='textStyle-small' style={{ fontSize: 18 }}>Admins Management</span>
          <Breadcrumb style={{ margin: '2px 0' }}>
            <Breadcrumb.Item className='textStyle-small'>Home</Breadcrumb.Item>
            <Breadcrumb.Item className='textStyle-small'>Admins</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Button
          type="primary"
          style={{ backgroundColor: '#320A6B', borderColor: '#320A6B', height: 38, boorderRadius: 10 }}
          onClick={() => {
            setIsModalVisible(true);
            setIsEdit(false);
            setIsView(false);
            setSelectedAdmin(null);
          }}
        >
          <span className='textStyle-small' style={{ fontWeight: 550 }}>New Admin</span>
        </Button>
      </div>


      <Modal visible={isModalVisible} 
      destroyOnClose={true}
      onCancel={() => {
        setIsModalVisible(false);
        setSelectedAdmin(null);
        setIsEdit(false);
        setIsView(false);
      }}
      footer={null} width={800}
        className="custom-modal">
        <div className="modal-header-user" style={{ backgroundColor: '#F0E8FF', padding: 20 }}>
          <h2 className="header-title">
            <span style={{ fontFamily: 'Poppins', fontWeight: 550, fontSize: 18, letterSpacing: 0, color: '#000000' }}>
              {isEdit ? 'Edit Admin' : isView ? 'View Admin' : 'Add New Admin'}
            </span>
          </h2>
        </div>
        <div className="modal-body">
          <AdminManagement isEdit={isEdit} isView={isView} data={selectedAdmin} closeFunction={() => {
            setIsModalVisible(false)
            setSelectedAdmin(null);
            setIsEdit(false);
            setIsView(false);
            fetchAdmins();
          }} />
        </div>
      </Modal>

      <Table
        style={{ marginTop: 30 }}
        dataSource={admins} loading={loading} rowKey="adminId" className='table-striped-rows' pagination={admins?.length > 10 ? { pageSize: 10 } : false}>
        <Table.Column title="Username" dataIndex="username" render={(text) => <span className='textStyle-small' style={{ fontSize: 12 }}>{text}</span>} />
        <Table.Column title="Full Name" dataIndex="fullName" render={(text) => <span className='textStyle-small' style={{ fontSize: 12 }}>{text}</span>} />
        <Table.Column title="Email" dataIndex="emailAddress" render={(text) => <span className='textStyle-small' style={{ fontSize: 12 }}>{text}</span>} />
        <Table.Column title="Address" dataIndex="addressLine" render={(text) => <span className='textStyle-small' style={{ fontSize: 12 }}>{text}</span>} />
        <Table.Column title="Contact" dataIndex="contactInfo" render={(text) => <span className='textStyle-small' style={{ fontSize: 12 }}>{text}</span>} />
        <Table.Column title="Active" dataIndex="isActive" render={isActive => (isActive ? <Tag bordered={false} color="green"><span className='textStyle-small' style={{ fontSize: 12, fontWeight: 550 }}>Yes</span></Tag> :
          <Tag color="red"><span className='textStyle-small' style={{ fontSize: 12, fontWeight: 550 }}>No</span></Tag>)} />
        <Table.Column title="Role" dataIndex="role" render={(text) => <span className='textStyle-small' style={{ fontSize: 12 }}>{text}</span>} />
        <Table.Column title="Created At" dataIndex="createdAt" render={(text) => <span className='textStyle-small' style={{ fontSize: 12 }}>{moment(text).format('YYYY-MM-DD HH:mm')}</span>} />
        <Table.Column
          title="Actions"
          render={(_, record) => (
            <Space size="middle">
              <Button shape="circle" size="small" style={{ background: '#320A6B', borderColor: '#320A6B' }}
                onClick={() => {
                  setIsEdit(true);
                  setIsView(false);
                  setIsModalVisible(true);
                  setSelectedAdmin(record);
                }}><EditOutlined style={{ color: 'white', fontSize: 12 }} /></Button>
              <Button shape="circle" danger type="primary" size="small" onClick={() => handleDelete(record.adminId)}><DeleteOutlined /></Button>
            </Space>
          )}
        />
      </Table>
    </DashboardLayout>
  );
};


export default AdminsPage;
