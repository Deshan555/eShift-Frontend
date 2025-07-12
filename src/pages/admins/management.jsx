import React, { Fragment, useEffect, useState } from 'react';
import apiExecutions from '../api/apiExecutions';
import { Form, Input, Select, Button, message, Row, Col } from 'antd';

const AdminManagement = ({ isEdit, isView, data, closeFunction }) => {
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [allBranches, setAllBranches] = useState([]);

    useEffect(() => {
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
                    ...values,
                    adminId: data?.adminId,
                    emailAddress: values.email,
                    addressLine: values.address,
                    passwordHash: values.password,
                };
                await apiExecutions.updateAdmin(data?.adminId, updateData);
                message.success('Admin updated successfully');
            } else {
                const createData = {
                    ...values,
                    emailAddress: values.email,
                    addressLine: values.address,
                    passwordHash: values.password,
                };
                await apiExecutions.createAdmin(createData);
                message.success('Admin created successfully');
            }
            if (closeFunction) closeFunction();
        } catch (error) {
            message.error('Operation failed: ' + (error?.message || 'Unknown error'));
        } finally {
            setLoading(false);
        }
    }

    const passwordGenLogic = () => {
        const length = 12;
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
        let password = "";
        for (let i = 0, n = charset.length; i < length; ++i) {
            password += charset.charAt(Math.floor(Math.random() * n));
        }
        return password;
    }

    return (
        <Fragment>
            <Form layout="vertical" onFinish={handleSubmit} 
            initialValues={
                isEdit || isView ? {
                    username: data?.username,
                    fullName: data?.fullName,
                    email: data?.emailAddress,
                    address: data?.addressLine,
                    contactInfo: data?.contactInfo,
                    branchId: data?.branchId,
                    role: data?.role,
                    password: isView ? undefined : data?.passwordHash,
                } : {
                    password: passwordGenLogic()
                }
            }
            >
                <Row span={24} style={{ marginTop: 20 }}>
                    <Col span={12}>
                        <Form.Item label={<span className='textStyle-small' style={{ fontWeight: 550 }}>User Name</span>} name="username"
                            rules={[{ required: true, message: <span className='textStyle-small'>Please enter a username</span> }]}>
                            <Input placeholder="Enter username" className='custom-Input-Field' style={{ width: '98%' }}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={<span className='textStyle-small' style={{ fontWeight: 550 }}>Password</span>} name="password"
                            rules={[{ required: true, message: <span className='textStyle-small'>Please enter a password</span> }]}>
                            <Input.Password placeholder="Enter password" className='custom-Input-Field' style={{ width: '98%' }} />
                        </Form.Item>
                    </Col>
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
                        <Form.Item label={<span className='textStyle-small' style={{ fontWeight: 550 }}>Full Name</span>} name="fullName"
                            rules={[{ required: true, message: <span className='textStyle-small'>Please enter your full name</span> }]}>
                            <Input placeholder="Enter full name" className='custom-Input-Field' style={{ width: '98%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={<span className='textStyle-small' style={{ fontWeight: 550 }}>Email</span>} name="email"
                            rules={[{ required: true, message: <span className='textStyle-small'>Please enter your email</span> }]}>
                            <Input placeholder="Enter email" className='custom-Input-Field' style={{ width: '98%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={<span className='textStyle-small' style={{ fontWeight: 550 }}>Address</span>} name="address"
                            rules={[{ required: true, message: <span className='textStyle-small'>Please enter your address</span> }]}>
                            <Input placeholder="Enter address" className='custom-Input-Field' style={{ width: '98%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={<span className='textStyle-small' style={{ fontWeight: 550 }}>Contact Info</span>} name="contactInfo"
                            rules={[{ required: true, message: <span className='textStyle-small'>Please enter your contact info</span> }]}>
                            <Input placeholder="Enter contact info" className='custom-Input-Field' style={{ width: '98%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={<span className='textStyle-small' style={{ fontWeight: 550 }}>Role</span>} name="role"
                            rules={[{ required: true, message: <span className='textStyle-small'>Please select a role</span> }]}>
                            <Select placeholder="Select role" className='custom-Select' bordered={false} style={{ width: '98%' }}>
                                <Select.Option className='textStyle-small' value="BRANCH_ADMIN">Branch Admin</Select.Option>
                                <Select.Option className='textStyle-small' value="SUPER_ADMIN">Super Admin</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={24} style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 16 }}>
                        <Form.Item style={{ marginBottom: 0 }}>
                            <Button type="primary" htmlType="submit" className='primery-button' loading={loading} 
                                style={{ width: '150px' }}
                                disabled={isView}>
                                <span className='textStyle-small' style={{ fontWeight: 550 }}>
                                    {isEdit ? 'Update' : isView ? 'View Admin' : 'Add Admin'}
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

export default AdminManagement;

