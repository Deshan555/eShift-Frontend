import React, { Fragment, useEffect, useState } from 'react';
import apiExecutions from '../api/apiExecutions';
import { Form, Input, Button, message, Row, Col } from 'antd';

const CityManagement = ({ isEdit, isView, data, closeFunction }) => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            if (isEdit) {
                const updateData = {
                    ...values,
                    cityId: data?.cityId,
                };
                await apiExecutions.updateCity(data?.cityId, updateData);
                message.success('City updated successfully');
            } else {
                const createData = {
                    ...values
                };
                await apiExecutions.createCity(createData);
                message.success('City created successfully');
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
                        cityName: data?.cityName,
                        state: data?.state,
                        country: data?.country,
                    } : {}
                }
            >
                <Row span={24} style={{ marginTop: 20 }}>
                    <Col span={8}>
                        <Form.Item label={<span className='textStyle-small' style={{ fontWeight: 550 }}>City Name</span>} name="cityName"
                            rules={[{ required: true, message: <span className='textStyle-small'>Please enter city name</span> }]}>
                            <Input placeholder="Enter city name" className='custom-Input-Field' style={{ width: '98%' }}/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label={<span className='textStyle-small' style={{ fontWeight: 550 }}>State</span>} name="state"
                            rules={[{ required: true, message: <span className='textStyle-small'>Please enter state</span> }]}>
                            <Input placeholder="Enter state" className='custom-Input-Field' style={{ width: '98%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label={<span className='textStyle-small' style={{ fontWeight: 550 }}>Country</span>} name="country"
                            rules={[{ required: true, message: <span className='textStyle-small'>Please enter country</span> }]}>
                            <Input placeholder="Enter country" className='custom-Input-Field' style={{ width: '98%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={24} style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 16 }}>
                        <Form.Item style={{ marginBottom: 0 }}>
                            <Button type="primary" htmlType="submit" className='primery-button' loading={loading}
                                style={{ width: '150px' }}
                                disabled={isView}>
                                <span className='textStyle-small' style={{ fontWeight: 550 }}>
                                    {isEdit ? 'Update' : isView ? 'View City' : 'Add City'}
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

export default CityManagement;
