
import React, { Fragment, useState } from 'react';
import { Row, Col, Form, Input, Select, Button, message } from 'antd';
import apiExecutions from '../api/apiExecutions';

const AssistantManagement = ({ isEdit, isView, data, closeFunction }) => {
    const [loading, setLoading] = useState(false);
    const [allBranches, setAllBranches] = useState([]);

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
    }, []);

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            if (isEdit) {
                const updateData = {
                    assistantId: data?.assistantId,
                    branchId: values.branchId,
                    name: values.name,
                    contactInfo: values.contactInfo,
                    email: values.email,
                    pronouns: values.pronouns,
                    secondaryPhone: values.secondaryPhone,
                };
                await apiExecutions.updateAssistant(data?.assistantId, updateData);
                message.success('Assistant updated successfully');
            } else {
                const createData = {
                    branchId: values.branchId,
                    name: values.name,
                    contactInfo: values.contactInfo,
                    email: values.email,
                    pronouns: values.pronouns,
                    secondaryPhone: values.secondaryPhone,
                };
                await apiExecutions.createAssistant(createData);
                message.success('Assistant created successfully');
            }
            if (closeFunction) closeFunction();
        } catch (error) {
            message.error('Operation failed: ' + (error?.message || 'Unknown error'));
        } finally {
            setLoading(false);
        }
    }

    return (
        <Fragment>
            <Form layout="vertical" onFinish={handleSubmit}
                initialValues={
                    isEdit || isView ? {
                        branchId: data?.branchId,
                        name: data?.name,
                        contactInfo: data?.contactInfo,
                    } : {}
                }
            >
                <Row span={24} style={{ marginTop: 20 }}>
                    <Col span={12}>
                        <Form.Item label={<span className='textStyle-small' style={{ fontWeight: 550 }}>Branch</span>} name="branchId"
                            rules={[{ required: true, message: <span className='textStyle-small'>Please select a branch</span> }]}>
                            <Select placeholder="Select branch" className='custom-Select' bordered={false} style={{ width: '98%' }}>
                                {allBranches.map(branch => (
                                    <Select.Option key={branch.branchId} value={branch?.branchId} className='textStyle-small'>
                                        {branch?.name} - {branch?.address}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={<span className='textStyle-small' style={{ fontWeight: 550 }}>Name</span>} name="name"
                            rules={[{ required: true, message: <span className='textStyle-small'>Please enter the name</span> }]}>
                            <Input placeholder="Enter name" className='custom-Input-Field' style={{ width: '98%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={<span className='textStyle-small' style={{ fontWeight: 550 }}>Contact Info</span>} name="contactInfo"
                            rules={[{ required: true, message: <span className='textStyle-small'>Please enter contact info</span> },
                            { pattern: /^[0-9]{10}$/, message: <span className='textStyle-small'>Please enter a valid 10-digit phone number</span> }
                            ]}>
                            <Input placeholder="Enter contact info" className='custom-Input-Field' style={{ width: '98%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={<span className='textStyle-small' style={{ fontWeight: 550 }}>Email</span>} name="email"
                            rules={[{ type: 'email', message: <span className='textStyle-small'>Please enter a valid email</span> }]}>
                            <Input placeholder="Enter email" className='custom-Input-Field' style={{ width: '98%' }} />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item label={<span className='textStyle-small' style={{ fontWeight: 550 }}>Pronouns</span>} name="pronouns">
                            <Select placeholder="Select pronouns" className='custom-Select' bordered={false} style={{ width: '98%' }}>
                                {
                                    ['He/Him', 'She/Her', 'They/Them', 'Other'].map(pronoun => (
                                        <Select.Option key={pronoun} value={pronoun} className='textStyle-small'>
                                            {pronoun}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>

                    <Col span={12}>
                        <Form.Item label={<span className='textStyle-small' style={{ fontWeight: 550 }}>Secondary Phone</span>} name="secondaryPhone"
                            rules={[{ pattern: /^[0-9]{10}$/, message: <span className='textStyle-small'>Please enter a valid 10-digit phone number</span> }]}>
                            <Input placeholder="Enter secondary phone" className='custom-Input-Field' style={{ width: '98%' }} />
                        </Form.Item>
                    </Col>

                    <Col span={24} style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 16 }}>
                        <Form.Item style={{ marginBottom: 0 }}>
                            <Button type="primary" htmlType="submit" className='primery-button' loading={loading}
                                style={{ width: '160px' }}
                                disabled={isView}>
                                <span className='textStyle-small' style={{ fontWeight: 550 }}>
                                    {isEdit ? 'Update' : isView ? 'View Assistant' : 'Add'}
                                </span>
                            </Button>
                        </Form.Item>
                        <Form.Item style={{ marginBottom: 0 }}>
                            <Button className='cancle-button' onClick={closeFunction}>
                                <span className='textStyle-small' style={{ fontWeight: 550 }}>Cancel</span>
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Fragment>
    );
}

export default AssistantManagement;
