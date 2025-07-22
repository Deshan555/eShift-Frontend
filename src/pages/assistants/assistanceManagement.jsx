
import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Table, Modal, Form, Input, Select, Space, Button, Tag, Breadcrumb, message } from 'antd';
import apiExecutions from '../api/apiExecutions';
import moment from 'moment';
import AssistantManagement from './management';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const AssistantsPage = () => {
  const [assistants, setAssistants] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [isView, setIsView] = React.useState(false);
  const [selectedAssistant, setSelectedAssistant] = React.useState(null);
  const [allBranches, setAllBranches] = React.useState([]);

  React.useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await apiExecutions.getAllBranches();
        setAllBranches(response.data);
      } catch (error) {
        console.error('Error fetching branches:', error);
      }
    };
    fetchBranches();
    fetchAssistants();
  }, []);

  const fetchAssistants = async () => {
    try {
      const data = await apiExecutions.getAllAssistants();
      setAssistants(data.data);
    } catch (error) {
      message.error('Error fetching assistants: ' + (error?.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (assistantId) => {
    setTimeout(() => {
      Modal.confirm({
        title: 'Are you sure you want to delete this assistant?',
        content: 'This action cannot be undone.',
        okText: 'Delete',
        okType: 'danger',
        cancelText: 'Cancel',
        onOk: async () => {
          try {
            await apiExecutions.deleteAssistant(assistantId);
            message.success('Assistant deleted successfully');
            fetchAssistants();
          } catch (error) {
            message.error('Failed to delete assistant: ' + (error?.message || 'Unknown error'));
          }
        },
      });
    }, 0);
  };

  return (
    <DashboardLayout>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <span className='textStyle-small' style={{ fontSize: 18 }}>Assistants Management</span>
          <Breadcrumb style={{ margin: '2px 0' }}>
            <Breadcrumb.Item className='textStyle-small'>Home</Breadcrumb.Item>
            <Breadcrumb.Item className='textStyle-small'>Assistants</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Button
          type="primary"
          style={{ backgroundColor: '#320A6B', borderColor: '#320A6B', height: 38, boorderRadius: 12 }}
          onClick={() => {
            setIsModalVisible(true);
            setIsEdit(false);
            setIsView(false);
            setSelectedAssistant(null);
          }}
        >
          <span className='textStyle-small' style={{ fontWeight: 550 }}>New Assistant</span>
        </Button>
      </div>

      <Modal visible={isModalVisible}
        destroyOnClose={true}
        onCancel={() => {
          setIsModalVisible(false);
          setSelectedAssistant(null);
          setIsEdit(false);
          setIsView(false);
        }}
        footer={null} width={800}
        className="custom-modal">
        <div className="modal-header-user" style={{ backgroundColor: '#F0E8FF', padding: 20 }}>
          <h2 className="header-title">
            <span style={{ fontFamily: 'Poppins', fontWeight: 550, fontSize: 18, letterSpacing: 0, color: '#000000' }}>
              {isEdit ? 'Edit Assistant' : isView ? 'View Assistant' : 'Add New Assistant'}
            </span>
          </h2>
        </div>
        <div className="modal-body">
          <AssistantManagement isEdit={isEdit} isView={isView} data={selectedAssistant} closeFunction={() => {
            setIsModalVisible(false)
            setSelectedAssistant(null);
            setIsEdit(false);
            setIsView(false);
            fetchAssistants();
          }} />
        </div>
      </Modal>

      <Table
        style={{ marginTop: 30 }}
        dataSource={assistants} loading={loading} rowKey="assistantId" className='table-striped-rows' pagination={assistants?.length > 10 ? { pageSize: 10 } : false}>
        <Table.Column title="User Name" dataIndex="name" render={(text) => <span className='textStyle-small' style={{ fontSize: 12 }}>{text}</span>} />
        <Table.Column title="Branch" dataIndex="branchId" render={(branch) => <span className='textStyle-small' style={{ fontSize: 12 }}>
          {
            allBranches.find(b => b.branchId === branch)?.name || 'N/A'
          }
        </span>} />
        <Table.Column title="Contact Info" dataIndex="contactInfo" render={(text) => <span className='textStyle-small' style={{ fontSize: 12 }}>{text}</span>} />
        <Table.Column title="Email" dataIndex="email" render={(text) => <span className='textStyle-small' style={{ fontSize: 12 }}>{text}</span>} />
        <Table.Column title="Secondary Phone" dataIndex="secondaryPhone" render={(text) => <span className='textStyle-small' style={{ fontSize: 12 }}>{text}</span>} />
        <Table.Column title="Pronouns" dataIndex="pronouns" render={(text) => <span className='textStyle-small' style={{ fontSize: 12 }}>{text || 'N/A'}</span>} />
        <Table.Column
          title="Actions"
          render={(_, record) => (
            <Space size="middle">
              <Button shape="circle" size="small" style={{ background: '#320A6B', borderColor: '#320A6B' }}
                onClick={() => {
                  setIsEdit(true);
                  setIsView(false);
                  setIsModalVisible(true);
                  setSelectedAssistant(record);
                }}><EditOutlined style={{ color: 'white', fontSize: 12 }} /></Button>
              {/* <Button shape="circle" danger type="primary" size="small" onClick={() => handleDelete(record.assistantId)}><DeleteOutlined /></Button> */}
            </Space>
          )}
        />
      </Table>
    </DashboardLayout>
  );
};

export default AssistantsPage;
