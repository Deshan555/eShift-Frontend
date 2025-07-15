import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import {
    Table,
    Modal,
    Form,
    Input,
    Select,
    Space,
    Button,
    Tag,
    Breadcrumb,
    message,
    Row,
    Col
} from 'antd';
import apiExecutions from '../api/apiExecutions';
import moment from 'moment';
import {
    EditOutlined,
    DeleteOutlined,
    PlusOutlined,
} from '@ant-design/icons';
import { toast, ToastContainer } from 'react-toastify';

const { Option } = Select;

const DriversManagementModel = ({ isEdit, isView, fetchData, data }) => {
    const [allBranches, setAllBranches] = useState([]);
    const fetchBranches = async () => {
        try {
            const response = await apiExecutions.getAllBranches();
            setAllBranches(response?.data || []);
        } catch (error) {
            console.error('Error fetching branches:', error);
        }
    };
    useEffect(() => {
        fetchBranches();
    }, []);

    const handleSubmit = async (values) => {
        try {
            if (isEdit) {
                let response = await apiExecutions.updateDriver(
                    data.driverId,
                    {
                        ...values,
                        driverId: data.driverId,
                        licenseExpiryDate: values.licenseExpiryDate ? moment(values.licenseExpiryDate).format('YYYY-MM-DD') : null,
                        workingStatus: data.workingStatus,
                    });
                if (response.status === 200 || response.status === 201) {
                    toast.success('Driver updated successfully');
                    fetchData();
                } else {
                    toast.error('Failed to update driver');
                }
            } else {
                let response = await apiExecutions.createDriver({
                    ...values,
                    licenseExpiryDate: values.licenseExpiryDate ? moment(values.licenseExpiryDate).format('YYYY-MM-DD') : null,
                    workingStatus: true
                });
                if (response.status === 200 || response.status === 201) {
                    toast.success('Driver added successfully');
                    fetchData();
                } else {
                    toast.error('Failed to add driver');
                }
            }
        } catch (error) {
            console.error('Error submitting driver data:', error);
            toast.error('Error submitting driver data: ' + (error?.message || 'Unknown error'));
        }
    };


    return (
        <div>
            {/* <ToastContainer /> */}
            <Form
                layout="vertical"
                initialValues={isEdit ? {
                    ...data,
                    licenseExpiryDate: data.licenseExpiryDate ? moment(data.licenseExpiryDate).format('YYYY-MM-DD') : null
                } : {}}
                onFinish={handleSubmit}
                className='textStyle-small'
                style={{ marginTop: 20 }}
            >
                <Row span={24} style={{ marginBottom: 16 }}>
                    <Col span={12}>
                        <Form.Item
                            name="branchId"
                            label="Branch"
                            rules={[{ required: true, message: 'Please select a branch!' }]}
                        >
                            <Select placeholder="Select Branch" className='custom-Select' bordered={false} style={{ width: '98%' }}>
                                {allBranches.map(branch => (
                                    <Option key={branch.branchId} value={branch.branchId}>
                                        {branch.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>

                        <Form.Item
                            name="name"
                            label="Name"
                            rules={[{ required: true, message: 'Please input the driver name!' }]}
                        >
                            <Input placeholder="Driver Name" className='custom-Input-Field' style={{ width: '98%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>

                        <Form.Item
                            name="licenseNumber"
                            label="License Number"
                            rules={[{ required: true, message: 'Please input the license number!' }]}
                        >
                            <Input placeholder="License Number" className='custom-Input-Field' style={{ width: '98%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>

                        <Form.Item
                            name="contactInfo"
                            label="Contact Info"
                            rules={[{ required: true, message: 'Please input the contact info!' }]}
                        >
                            <Input placeholder="Contact Info" className='custom-Input-Field' style={{ width: '98%' }} />
                        </Form.Item>
                    </Col>

                    <Col span={12}>

                        <Form.Item
                            name="nic"
                            label="NIC"
                            rules={[{ required: false, message: 'Please input the NIC!' }]}
                        >
                            <Input placeholder="NIC" className='custom-Input-Field' style={{ width: '98%' }} />
                        </Form.Item>
                    </Col>

                    <Col span={12}>

                        <Form.Item
                            name="phoneNumber"
                            label="Phone Number"
                            rules={[{ required: false, message: 'Please input the phone number!' }]}
                        >
                            <Input placeholder="Phone Number" className='custom-Input-Field' style={{ width: '98%' }} />
                        </Form.Item>

                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="licenseType"
                            label="License Type"
                            rules={[{ required: false, message: 'Please input the license type!' }]}
                        >
                            <Select placeholder="License Type" className='custom-Select' bordered={false} style={{ width: '98%' }}>
                                {
                                    ['Heavy', 'Light', 'Motorcycle'].map(type => (
                                        <Select.Option key={type} value={type} className='textStyle-small'>
                                            {type}
                                        </Select.Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="licenseExpiryDate"
                            label="License Expiry Date"
                            rules={[{ required: false, message: 'Please select the license expiry date!' }]}
                        >
                            <Input
                                type="date"
                                placeholder="License Expiry Date"
                                className='custom-Input-Field'
                                style={{ width: '98%' }}
                                defaultValue={isEdit ? moment(isEdit.licenseExpiryDate).format('YYYY-MM-DD') : ''}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            name="address"
                            label="Address"
                            rules={[{ required: false, message: 'Please input the address!' }]}
                        >
                            <Input.TextArea placeholder="Address" rows={3} className='custom-Input-Field' style={{ width: '99%' }} />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
                        <Button htmlType="submit" style={{ backgroundColor: '#320A6B', borderColor: '#320A6B', height: 38, borderRadius: 12 }}>
                            <span className='textStyle-small' style={{ fontWeight: 550, color: '#fff' }}>
                                {isEdit ? 'Update Driver' : 'Add Driver'}
                            </span>
                        </Button>
                        <Button style={{ backgroundColor: '#e91414ff', borderColor: '#e91414ff', color: '#fff', height: 38, borderRadius: 12 }} onClick={() => fetchData()}>
                            <span className='textStyle-small' style={{ fontWeight: 550 }}>Cancel</span>
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </div>

    );
};

export default DriversManagementModel;