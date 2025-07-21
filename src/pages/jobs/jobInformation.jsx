import React from "react";
import { Button, Form, Input, Select, message, Row, Col, DatePicker, Steps, Card, Descriptions, Tabs } from "antd";
import { DeleteFilled } from '@ant-design/icons';
import { ToastContainer, toast } from 'react-toastify';
import moment from "moment";
import apiExecutions from "../api/apiExecutions";
import JobPathMap from './JobPathMap';
import TripApprove from "./tripApprove";
import LoadManagement from "./loadManagement";
import Invoice from "./invoice";

const { Step } = Steps;

const JobInformations = ({ stops, jobData, allCustomers, allBranches }) => {

    const [overallStatics, setOverallStatics] = React.useState({});
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        if (jobData && jobData.jobId) {
            getJobDetailsOverall(jobData.jobId);
        }
    }, [jobData]);

    // getJobDetailsOverall
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

    return (
        <div>
            <Tabs style={{ marginTop: 10 }} defaultActiveKey="1">
                <Tabs.TabPane tab="Job Details" key="1">
                    <div style={{ padding: '10px' }}>
                        <Steps
                            current={(() => {
                                if (overallStatics?.job?.requestStatus === 'FINISHED') {
                                    return 4;
                                } else if (overallStatics?.job?.paymentStatus === 'PAID') {
                                    return 3;
                                } else if (overallStatics?.job?.invoicingStatus === 'INVOICED') {
                                    return 2;
                                } else if (overallStatics?.job?.adminApprovalStatus === 'APPROVED') {
                                    return 1;
                                } else if (overallStatics?.job?.requestStatus === 'INITIAL') {
                                    return 0;
                                } else {
                                    return 0;
                                }
                            })()}
                            size="small"
                            style={{ marginBottom: 20, marginTop: 10 }}
                        >
                            <Step title="REQUEST STATUS" description={overallStatics?.job?.requestStatus} />
                            <Step title="ADMIN APPROVAL" description={overallStatics?.job?.adminApprovalStatus} />
                            <Step title="INVOICING STATUS" description={overallStatics?.job?.invoicingStatus} />
                            <Step title="PAYMENT STATUS" description={overallStatics?.job?.paymentStatus} />
                            <Step title="FINAL STATUS" description={overallStatics?.trip?.status} />
                        </Steps>
                        <Descriptions bordered size="small" column={2}>
                            <Descriptions.Item label="Job ID">{overallStatics?.job?.jobId}</Descriptions.Item>
                            <Descriptions.Item label="Customer">{allCustomers.find(c => c.customerId === overallStatics?.job?.customerId)?.fullName || 'N/A'}</Descriptions.Item>
                            <Descriptions.Item label="Branch">{allBranches.find(b => b.branchId === overallStatics?.job?.branchId)?.name || 'N/A'}</Descriptions.Item>
                            {/* <Descriptions.Item label="Status">{overallStatics?.job?.status}</Descriptions.Item> */}
                            <Descriptions.Item label="Request Status">{overallStatics?.job?.requestStatus}</Descriptions.Item>
                            <Descriptions.Item label="Request Delivery Date">
                                {overallStatics?.job?.deliveryDate ? moment(overallStatics?.job?.deliveryDate).format('YYYY-MM-DD') : 'N/A'}
                            </Descriptions.Item>
                            <Descriptions.Item label="Container Type">{overallStatics?.job?.requestContainerType}</Descriptions.Item>
                            <Descriptions.Item label="Admin Approval">{overallStatics?.job?.adminApprovalStatus}</Descriptions.Item>
                            <Descriptions.Item label="Invoicing Status">{overallStatics?.job?.invoicingStatus}</Descriptions.Item>
                            <Descriptions.Item label="Invoice Price">{overallStatics?.job?.invoicePrice}</Descriptions.Item>
                            <Descriptions.Item label="Payment Status">{overallStatics?.job?.paymentStatus}</Descriptions.Item>
                            <Descriptions.Item label="Special Remark">{overallStatics?.job?.specialRemark || 'N/A'}</Descriptions.Item>
                            <Descriptions.Item label="Stops">
                                <ul>
                                    {
                                        stops?.map((stop, index) => (
                                            <li key={index}>
                                                <b>{stop?.city?.name}</b> - {stop?.address} ({stop?.stopType})
                                            </li>
                                        ))
                                    }
                                </ul>
                            </Descriptions.Item>
                        </Descriptions>
                    </div>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Job Path" key="2">
                    <div style={{ padding: '10px' }}>
                        <Steps
                            current={stops?.length > 0 ? stops?.length - 1 : 0}
                            size="small"
                            style={{ marginBottom: 20 }}
                            // progressDot={(dot, { index }) => (
                            //     <span style={{ color: index === stops?.length - 1 ? '#320A6B' : '#888' }}>{dot}</span>
                            // )}
                        >
                            {stops?.map((stop, index) => (
                                <Step
                                    key={index}
                                    title={stop?.city?.name}
                                    description={`${stop?.address} (${stop?.stopType})`}
                                />
                            ))}
                        </Steps>
                        <JobPathMap stops={stops} />
                    </div>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Actions" key="3">
                    <div style={{ padding: '10px' }}>
                        <TripApprove
                            jobID={jobData.jobId}
                            requestedDeliveryDate={jobData.deliveryDate}
                            job={jobData}
                            trip={overallStatics?.trip}
                            refetchFunction={() => getJobDetailsOverall(jobData.jobId)}
                        />
                    </div>
                </Tabs.TabPane>
                {
                    (overallStatics?.trip?.status === 'IN_PROGRESS' || overallStatics?.trip?.status === 'COMPLETED') && (
                        <Tabs.TabPane tab="Load Management" key="4">
                            <div style={{ padding: '10px' }}>
                                <LoadManagement
                                    summery={overallStatics}
                                    load={overallStatics?.load} refetchFunction={() => getJobDetailsOverall(jobData.jobId)} />
                            </div>
                        </Tabs.TabPane>
                    )
                }

                {
                    overallStatics?.trip?.status === 'COMPLETED' && (
                        <Tabs.TabPane tab="Invoicing" key="5">
                            <Invoice
                                data={overallStatics}
                                jobIn={jobData}
                                refetchFunction={() => getJobDetailsOverall(jobData.jobId)}
                            />
                        </Tabs.TabPane>
                    )
                }
            </Tabs>
        </div>

    );
};

export default JobInformations;