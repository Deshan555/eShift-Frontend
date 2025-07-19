
import Link from 'next/link';
import React from 'react';
import JobCard from './components/JobCard';
import { DeleteFilled, EditFilled, EyeFilled, PlusOutlined } from '@ant-design/icons';
import { Row, Col, Avatar, Modal, Button, Popover } from 'antd';
import apiExecutions from '../api/apiExecutions';
import { toast, ToastContainer } from 'react-toastify';
import JobPathMap from '../jobs/JobPathMap';
import CreateJob from '../jobs/createJob';

const UserPage = () => {

    const [overallStatics, setOverallStatics] = React.useState({});
    const [getJobStopsByJobId, setGetJobStopsByJobId] = React.useState([]);
    const [allJobs, setAllJobs] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [isCreateJobModalVisible, setIsCreateJobModalVisible] = React.useState(false);

    let userData = null;
    if (typeof window !== 'undefined') {
        userData = localStorage.getItem('eshiftCustomer') ? JSON.parse(localStorage.getItem('eshiftCustomer')) : null;
    }

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            const customer = localStorage.getItem('eshiftCustomer');
            if (!customer) {
                window.location.href = '/auth/customer';
            }
        }
    }, []);

    React.useEffect(() => {
        // getJobDetailsOverall(15);
        // getJobStopsByJobIdFetch(15);
        // if (userData && userData.customerId) {
        //     getJobsByCustomers(userData.customerId);
        // }
        getJobsByCustomers(userData?.customerId);
    }, []);

    const getJobDetailsOverall = async (jobId) => {
        setLoading(true);
        try {
            const data = await apiExecutions.getJobDetailsOverall(jobId);
            setOverallStatics(data?.data);
        } catch (error) {
            toast.error("Failed to fetch job details");
        } finally {
            setLoading(false);
        }
    };

    const getJobStopsByJobIdFetch = async (jobId) => {
        setLoading(true);
        try {
            const data = await apiExecutions.getJobStopsByJobId(jobId);
            setGetJobStopsByJobId(data?.data);
        } catch (error) {
            toast.error("Failed to fetch job stops");
        } finally {
            setLoading(false);
        }
    };

    // getJobsByCustomers
    const getJobsByCustomers = async (customerId) => {
        setLoading(true);
        try {
            const data = await apiExecutions.getJobsByCustomers(customerId);
            setAllJobs(data?.data || []);
        } catch (error) {
            toast.error("Failed to fetch jobs for customer");
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        if (typeof window !== 'undefined' && document?.body) {
            document.body.style.backgroundColor = 'white';
            return () => {
                document.body.style.backgroundColor = '';
            };
        } else {
            // Always return a cleanup function for React
            return () => { };
        }
    }, []);

    return (
        <div style={{ minHeight: '100vh', background: '#fff' }}>
            <header
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    background: '#fff',
                    color: '#320A6B',
                    padding: '0 0',
                    height: 75,
                    zIndex: 1200,
                    boxShadow: '0 4px 16px 0 rgba(50,10,107,0.10)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid #eee',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                    <img src="/app.jpeg" alt="Logo" style={{ height: 30, marginLeft: 24, marginRight: 16, borderRadius: 8 }} />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginRight: 24 }}>
                    <Button
                        style={{ background: '#F0E8FF', borderColor: '#320A6B', color: '#320A6B', fontWeight: 500, fontSize: 14, height: 36, padding: '0 16px', borderRadius: 12 }}
                        icon={<PlusOutlined style={{ color: '#320A6B', fontSize: 16 }} />}
                        onClick={() => setIsCreateJobModalVisible(true)}
                        legacyBehavior>
                    </Button>

                    <Popover
                        placement="bottomRight"
                        trigger="click"
                        style={{ borderRadius: 12 }}
                        content={
                            <div style={{ minWidth: 220 }}>
                                <div style={{ fontWeight: 600, color: '#320A6B', marginBottom: 6 }}>Customer Details</div>
                                <div style={{ fontSize: 13, marginBottom: 4 }}><b>Name:</b> {userData?.name || '-'}</div>
                                <div style={{ fontSize: 13, marginBottom: 4 }}><b>Email:</b> {userData?.email || '-'}</div>
                                <div style={{ fontSize: 13, marginBottom: 12 }}><b>Customer ID:</b> {userData?.customerId || '-'}</div>
                                <Button danger block size="small" onClick={() => {
                                    localStorage.removeItem('eshiftCustomer');
                                    window.location.href = '/auth/customer';
                                }}>Logout</Button>
                            </div>
                        }
                    >
                        <Avatar style={{ background: '#F0E8FF', cursor: 'pointer', color: 'gray', borderColor: '#320A6B', }} size={38} className='textStyle-small'>
                           {
                            userData?.name ? userData.name.charAt(0).toUpperCase() : '?'
                           }
                        </Avatar>
                    </Popover>
                </div>
            </header>

            {/* Add padding top to avoid content under header */}
            <div style={{ marginTop: 90, paddingLeft: 0, paddingRight: 0 }}>
                {/* Job Cards Grid List */}
                <div style={{ padding: '0 26px', background: '#fff', minHeight: 'calc(100vh - 90px)' }}>
                    <Row span={24}>
                        {allJobs && allJobs.length > 0 ? (
                            allJobs.slice().reverse().map(job => (
                                <Col key={job.jobId} xs={24} sm={12} md={8} lg={8} style={{ padding: 8 }}>
                                    <JobCard job={job} />
                                </Col>
                            ))
                        ) : (
                            <Col span={24} style={{ textAlign: 'center', color: '#888', marginTop: 40 }}>No jobs found.</Col>
                        )}
                    </Row>
                </div>
            </div>

            {/* <Modal
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
      </Modal> */}

            <Modal
                visible={isCreateJobModalVisible}
                onCancel={() => setIsCreateJobModalVisible(false)}
                footer={null}
                width={800}
                destroyOnClose
                className="custom-modal"
            >
                <div className="modal-header-user" style={{ backgroundColor: '#F0E8FF', padding: 20 }}>
                    <h2 className="header-title">
                        <span style={{ fontFamily: 'Poppins', fontWeight: 550, fontSize: 18, letterSpacing: 0, color: '#000000' }}>
                            Define New Job
                        </span>
                    </h2>
                </div>
                <div className="modal-body">
                    <CreateJob 
                        refetchFunction={() => { getJobsByCustomers(userData?.customerId) }}
                        customerID={userData?.customerId}
                        onCloseFunction={() => { setIsCreateJobModalVisible(false) }}
                    />
                </div>
            </Modal>
        </div>
    );
};

export default UserPage;