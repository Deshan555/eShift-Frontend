import { useEffect, useState } from 'react';
import { Steps, Tabs, Form, Select, DatePicker, Input, Col, Row, Button } from 'antd';
import moment from 'moment';
import apiExecutions from '../api/apiExecutions';
import { ToastContainer, toast } from 'react-toastify';

const LoadManagement = ({ load, refetchFunction, summery }) => {

    const handleSubmit = async (values) => {
        try {
            const response = await apiExecutions.updateLoad(load?.loadId, {
                ...values,
                loadId: load?.loadId,
                jobId: load?.jobId,
                tripId: load?.tripId,
                meaterReadingStart: values.meaterReadingStart ? Number(values.meaterReadingStart) : 0,
                meaterReadingEnd: values.meaterReadingEnd ? Number(values.meaterReadingEnd) : 0
            });
            if (response.status === 200 || response.status === 201) {
                toast.success(response.message);
                if (refetchFunction) {
                    refetchFunction();
                }
            } else {
                toast.error('Failed to update load');
            }
        } catch (error) {
            toast.error('Error updating load: ' + (error?.message || 'Unknown error'));
        }
    };

    return (
        <div>
            <ToastContainer />
            <Form layout='vertical'
                onFinish={handleSubmit}>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Weight" name="weight" initialValue={load?.weight}>
                            <Input type="number" placeholder="Enter weight" className="custom-Input-Field" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Volume" name="volume" initialValue={load?.volume}>
                            <Input type="number" placeholder="Enter volume" className="custom-Input-Field" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Meter Reading Start" name="meaterReadingStart" initialValue={load?.meaterReadingStart}>
                            <Input type="number" placeholder="Enter meter reading start" className="custom-Input-Field" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Meter Reading End"
                            name="meaterReadingEnd"
                            initialValue={load?.meaterReadingEnd}
                            dependencies={["meaterReadingStart"]}
                            rules={[
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        const start = getFieldValue('meaterReadingStart');
                                        if (value === undefined || value === null || start === undefined || start === null) {
                                            return Promise.resolve();
                                        }
                                        if (Number(value) > Number(start)) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('End meter reading must be higher than start meter reading!'));
                                    },
                                }),
                            ]}
                        >
                            <Input type="number" placeholder="Enter meter reading end" className="custom-Input-Field" />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item label="Description" name="description" initialValue={load?.description}>
                            <Input.TextArea
                                rows={4}
                                placeholder="Enter description" className="custom-Input-Field" />
                        </Form.Item>
                    </Col>
                    {
                        (summery?.job?.invoicingStatus !== 'INVOICED' && summery?.job?.paymentStatus !== 'PAID') && (
                            <Col span={24} style={{ textAlign: 'right' }}>
                                <Button
                                    htmlType="submit"
                                    className="custom-Button"
                                    style={{ marginRight: 8, backgroundColor: '#320A6B', borderColor: '#320A6B', height: 38, borderRadius: 12 }}>
                                    <span className='textStyle-small' style={{ fontWeight: 550, color: 'white' }}>Update</span>
                                </Button>
                                <Button type="default" className="custom-Button" style={{ height: 38, borderRadius: 12 }}>
                                    <span className='textStyle-small' style={{ fontWeight: 550 }}>Cancel</span>
                                </Button>
                            </Col>
                        )
                    }
                </Row>
            </Form>
        </div>
    );
}

export default LoadManagement;