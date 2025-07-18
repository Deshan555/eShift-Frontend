import React from "react";
import { Button, Form, Input, Select, message, Row, Col, DatePicker, Steps, Card } from "antd";
import { ToastContainer, toast } from 'react-toastify';
import moment from "moment";
import apiExecutions from "../api/apiExecutions";

const { Step } = Steps;

const TripApprove = ({ jobID, requestedDeliveryDate, job, trip, refetchFunction }) => {
    const [availableResources, setAvailableResources] = React.useState([]);
    const [allAssistants, setAllAssistants] = React.useState([]);

    React.useEffect(() => {
        const fetchAvailableResources = async () => {
            try {
                const resources = await apiExecutions.getAvailableResources({
                    date: moment(requestedDeliveryDate).format('YYYY-MM-DD')
                }).then(res => res.data);
                setAvailableResources(resources);
            } catch (error) {
                console.error("Error fetching available resources:", error);
            }
        };
        const fetchAssistants = async () => {
            try {
                const assistants = await apiExecutions.getAllAssistants().then(res => res.data);
                setAllAssistants(assistants);
            } catch (error) {
                console.error("Error fetching assistants:", error);
            }
        };
        fetchAvailableResources();
        fetchAssistants();
    }, []);

    const handleTripApproval = async (values) => {
        if (values?.status === 'SCHEDULED' || values?.status === 'CANCELLED') {
            updateJobStatus(values.status);
        }
        try {
            const response = await apiExecutions.updateTrip(trip.tripId, {
                ...values,
                jobId: jobID,
                tripId: trip.tripId,
            });
            if (response.status === 200 || response.status === 201) {
                toast.success('Trip approved successfully');
                refetchFunction();
            } else {
                toast.error('Failed to approve trip');
            }
        } catch (error) {
            console.error("Error approving trip:", error);
            toast.error('Error approving trip: ' + (error?.message || 'Unknown error'));
        }
    };

    const updateJobStatus = async (status) => {
        try {
            const response = await apiExecutions.updateJob(jobID, {
                ...job,
                adminApprovalStatus: status === 'SCHEDULED' ? 'APPROVED' : 'REJECTED'
            });
            if (response.status === 200 || response.status === 201) {
                refetchFunction();
            } else {
                toast.error('Failed to update job status');
            }
        } catch (error) {
            toast.error('Error updating job status: ' + (error?.message || 'Unknown error'));
        }
    };

    return (
        <div>
            <Form layout="vertical" onFinish={(values) => handleTripApproval(values)}>
                <Row span={24}>
                    <Col span={12}>
                        <Form.Item label="Driver"
                            initialValue={trip?.driverId ? trip.driverId : undefined}
                            name="driverId">
                            <Select placeholder="Select a driver"
                                className="custom-Select"
                                bordered={false}
                                style={{ width: '98%' }}>
                                {availableResources?.drivers?.map(driver => (
                                    <Select.Option key={driver.driverId} value={driver.driverId} className='textStyle-small'>
                                        {driver.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            initialValue={trip?.lorryId ? trip.lorryId : undefined}
                            label="Lorry" name="lorryId">
                            <Select placeholder="Select a lorry"
                                className="custom-Select"
                                bordered={false}
                                style={{ width: '98%' }}>
                                {availableResources?.lorries?.map(lorry => (
                                    <Select.Option key={lorry.lorryId} value={lorry.lorryId} className='textStyle-small'>
                                        {lorry.registrationNumber} - {lorry.capacity}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            initialValue={trip?.containerId ? trip.containerId : undefined}
                            label="Container" name="containerId">
                            <Select placeholder="Select a container"
                                className="custom-Select"
                                bordered={false}
                                style={{ width: '98%' }}>
                                {availableResources?.containers?.map(container => (
                                    <Select.Option key={container.containerId} value={container.containerId} className='textStyle-small'>
                                        {container.type} - {container.size}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Assistant"
                            initialValue={trip?.assistantId ? trip.assistantId : undefined}
                            name="assistantId">
                            <Select placeholder="Select an assistant"
                                className="custom-Select"
                                bordered={false}
                                style={{ width: '98%' }}>
                                {allAssistants.map(assistant => (
                                    <Select.Option key={assistant.assistantId} value={assistant.assistantId} className='textStyle-small'>
                                        {assistant.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Scheduled Date"
                            initialValue={requestedDeliveryDate ? moment(requestedDeliveryDate) : undefined}
                            name="scheduledDate">
                            <DatePicker
                                disabled={true}
                                className="custom-DatePicker"
                                style={{ width: '98%' }}
                                format="YYYY-MM-DD"
                                disabledDate={(current) => current && current < moment().startOf('day')}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            rules={[{ required: false, message: 'Please input the admin remark!' }]}
                            label="Status" name="status"
                            initialValue={trip?.status ? trip.status : 'SCHEDULED'}
                        >
                            <Select placeholder="Select status"
                                className="custom-Select"
                                bordered={false}
                                style={{ width: '98%' }}>
                                <Select.Option value="PENDING" className='textStyle-small'>Pending</Select.Option>
                                <Select.Option value="SCHEDULED" className='textStyle-small'>Scheduled</Select.Option>
                                <Select.Option value="CANCELLED" className='textStyle-small'>Cancelled</Select.Option>
                                <Select.Option value="IN_PROGRESS" className='textStyle-small'>In Progress</Select.Option>
                                <Select.Option value="COMPLETED" className='textStyle-small'>Completed</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item label="Admin Remark" name="adminRemark"
                            initialValue={trip?.adminRemarkadminRemark ? trip.adminRemark : ''}
                        >
                            <Input.TextArea
                                placeholder="Enter any remarks"
                                className="custom-Input-Field"
                                style={{ width: '99%' }}
                                rows={4}
                            />
                        </Form.Item>
                    </Col>
                    {
                        trip?.status !== 'COMPLETED' && (
                    <Col span={24}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                            <Button htmlType="submit"
                                style={{ backgroundColor: '#320A6B', borderColor: '#320A6B', height: 38, borderRadius: 12 }}
                                className="custom-Button">
                                <span className='textStyle-small' style={{ fontWeight: 550, color: 'whitesmoke' }}>Approve Trip</span>
                            </Button>
                            <Button
                                style={{ backgroundColor: '#f5222d', borderColor: '#f5222d', height: 38, borderRadius: 12 }}
                                className="custom-Button"
                                onClick={() => {
                                    toast.error("Trip approval cancelled");
                                }}>
                                <span className='textStyle-small' style={{ fontWeight: 550, color: '#fff' }}>Cancel</span>
                            </Button>
                        </div>
                    </Col>
                        )
                    }
                </Row>
            </Form>
            <ToastContainer />
        </div>
    );
};

export default TripApprove;