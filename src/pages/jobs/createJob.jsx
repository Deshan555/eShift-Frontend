import React from "react";
import { Button, Form, Input, Select, message, Row, Col, Date, DatePicker } from "antd";
import { DeleteFilled } from '@ant-design/icons';

const CreateJob = () => {


    const [steps, setSteps] = React.useState([]);

    const handleStepChange = (index, field, value) => {
        const newSteps = [...steps];
        newSteps[index][field] = value;
        setSteps(newSteps);
    };

    const addStop = () => {
        setSteps([...steps, { city: '', address: '', stopType: '' }]);
        message.success('New stop added successfully');
    };

    //     {
    //   "jobId": 1,
    //   "customerId": 123,
    //   "branchId": 5,
    //   "date": "2025-07-13T10:00:00Z",
    //   "status": "Pending",
    //   "requestStatus": "New",
    //   "deliveryDate": "2025-07-15T15:00:00Z",
    //   "specialRemark": "Handle with care",
    //   "requestContainerType": "20ft",
    //   "adminApprovalStatus": "Approved",
    //   "invoicingStatus": "Uninvoiced",
    //   "invoicePrice": 1500.00,
    //   "paymentStatus": "Unpaid"
    // }

    return (
        <div>

            <pre>
                {JSON.stringify(steps, null, 2)}
            </pre>

            <Form layout="vertical" onFinish={(values) => {
                console.log('Form submitted with values:', values);
                message.success('Job created successfully');
            }}>
                <Row span={24}>
                    <Col span={12}>
                        <Form.Item
                            label={<span className='textStyle-small' style={{ fontWeight: 550 }}>Request Container Type</span>}
                            name="requestContainerType"
                        >
                            <Select placeholder="Select container type" className='custom-Select' bordered={false} style={{ width: '98%' }}>
                                {
                                    ['20ft', '40ft', '45ft', 'Others'].map(type => (
                                        <Select.Option key={type} value={type} className='textStyle-small'>
                                            {type}
                                        </Select.Option>
                                    ))}
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label={<span className='textStyle-small' style={{ fontWeight: 550 }}>Delivery Date</span>}
                            name="deliveryDate"
                            rules={[{ required: true, message: <span className='textStyle-small'>Please select a delivery date</span> }]}
                        >
                            <DatePicker className='custom-DatePicker' style={{ width: '98%' }} />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item
                            label={<span className='textStyle-small' style={{ fontWeight: 550 }}>Special Remark</span>}
                            name="specialRemark"
                            rules={[{ required: true, message: <span className='textStyle-small'>Please enter a special remark</span> }]}
                        >
                            <Input.TextArea
                                placeholder="Enter special remark"
                                className='custom-Input-Field'
                                style={{ width: '99%' }}
                                rows={4}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                                <Row>
                    <Col span={24}>
                        <Button
                            type="dashed"
                            style={{ height: 38, borderRadius: 12, width: '99%', marginTop: 10, marginBottom: 30 }}
                            onClick={addStop}
                        >
                            <span className='textStyle-small' style={{ fontWeight: 550 }}>Add Stop</span>
                        </Button>
                    </Col>
                </Row>

                {steps.map((step, idx) => (
                    <Row span={24} key={idx} style={{ marginBottom: 8 }}>
                        <Col span={7}>
                            <Form.Item
                                label={<span className='textStyle-small' style={{ fontWeight: 550 }}>City</span>}
                                required
                            >
                                <Input
                                    placeholder="Enter city"
                                    className='custom-Input-Field'
                                    style={{ width: '98%' }}
                                    value={step.city}
                                    onChange={e => handleStepChange(idx, 'city', e.target.value)}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={7}>
                            <Form.Item
                                label={<span className='textStyle-small' style={{ fontWeight: 550 }}>Address</span>}
                                required
                            >
                                <Input
                                    placeholder="Enter address"
                                    className='custom-Input-Field'
                                    style={{ width: '98%' }}
                                    value={step.address}
                                    onChange={e => handleStepChange(idx, 'address', e.target.value)}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={7}>
                            <Form.Item
                                label={<span className='textStyle-small' style={{ fontWeight: 550 }}>Stop Type </span>}
                                required
                            >
                                <Select
                                    placeholder="Select stop type"
                                    className='custom-Select'
                                    bordered={false}
                                    style={{ width: '98%' }}
                                    value={step.stopType}
                                    onChange={value => handleStepChange(idx, 'stopType', value)}
                                >
                                    <Select.Option value="" className='textStyle-small'>Select stop type</Select.Option>
                                    {['PICKUP', 'DROP_OFF', 'INTERMEDIATE'].map(type => (
                                        <Select.Option key={type} value={type} className='textStyle-small'>
                                            {type}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        {steps.length > 1 && (
                            <Col span={3} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Button
                                    danger
                                    type="primary"
                                    style={{ borderRadius: 10 }}
                                    onClick={() => {
                                        setSteps(steps.filter((_, i) => i !== idx));
                                    }}
                                    icon={<DeleteFilled style={{ color: '#fff' }} />}
                                />
                            </Col>
                        )}
                    </Row>
                ))}
                <Row span={24} style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
                    <Col>
                        <Button type="primary" htmlType="submit" className='primery-button'
                            style={{ height: 38, borderRadius: 12, width: '100%' }}
                            onClick={() => {
                                message.success('Job created successfully');
                                // Here you would typically handle the form submission
                            }}
                        >
                            <span className='textStyle-small' style={{ fontWeight: 550 }}>Create Job</span>
                        </Button>
                    </Col>
                </Row>
            </Form>

            {/* Vertical Map Visualization */}
            <div style={{ marginTop: 32, marginLeft: 16 }}>
                <h3 className='textStyle-small' style={{ fontWeight: 600, marginBottom: 16 }}>Stops Map</h3>
                <div style={{ borderLeft: '3px solid #320A6B', paddingLeft: 24, position: 'relative' }}>
                    {steps.map((step, idx) => (
                        <div key={idx} style={{ marginBottom: 32, position: 'relative' }}>
                            <div style={{ position: 'absolute', left: -32, top: 0 }}>
                                <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#320A6B', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12 }}>
                                    {idx + 1}
                                </div>
                            </div>
                            <div>
                                <span className='textStyle-small' style={{ fontWeight: 550, color: '#320A6B' }}>{step.stopType || 'Stop'}</span>
                                <div className='textStyle-small' style={{ color: '#222', fontSize: 13 }}>
                                    {step.city} {step.address && <span style={{ color: '#888' }}>- {step.address}</span>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CreateJob;