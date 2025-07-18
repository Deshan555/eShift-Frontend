
import React from "react";
import { Button, Form, Input, Select, message, Row, Col, DatePicker, Steps, Card } from "antd";
import { DeleteFilled } from '@ant-design/icons';
import { ToastContainer, toast } from 'react-toastify';
import moment from "moment";
import apiExecutions from "../api/apiExecutions";

const { Step } = Steps;

const CreateJob = () => {
    const [form] = Form.useForm();
    const [currentStep, setCurrentStep] = React.useState(0);
    const [stepsData, setStepsData] = React.useState([]);
    const [allCities, setAllCities] = React.useState([]);
    const [jobDetails, setJobDetails] = React.useState({});

    React.useEffect(() => {
        fetchAllCities();
    }, []);

    const fetchAllCities = async () => {
        try {
            const response = await apiExecutions.getAllCities();
            setAllCities(response?.data || []);
        } catch (error) {
            message.error('Failed to fetch cities: ' + (error?.message || 'Unknown error'));
        }
    };

    const handleStepChange = (index, field, value) => {
        const newSteps = [...stepsData];
        newSteps[index][field] = value;
        setStepsData(newSteps);
    };

    const addStop = () => {
        setStepsData([...stepsData, { city: '', address: '', stopType: '' }]);
    };

    const removeStop = (idx) => {
        setStepsData(stepsData.filter((_, i) => i !== idx));
    };

    const next = async () => {
        if (currentStep === 0) {
            try {
                const values = await form.validateFields();
                setJobDetails(values);
                setCurrentStep(currentStep + 1);
            } catch (err) {
                toast.error(<span className='textStyle-small'>Please fill all job details</span>);
            }
        } else if (currentStep === 1) {
            if (stepsData.length === 0) {
                toast.error(<span className='textStyle-small'>Please add at least one stop</span>);
                return;
            }
            let valid = true;
            for (let step of stepsData) {
                if (!step.city || !step.address || !step.stopType) {
                    valid = false;
                    break;
                }
            }
            if (!valid) {
                toast.error(<span className='textStyle-small'>Please fill all stop details</span>);
                return;
            }
            setCurrentStep(currentStep + 1);
        }
    };

    const prev = () => {
        setCurrentStep(currentStep - 1);
    };

    const createNewJob = async () => {
        let jobData = {
            customerId: 1,
            branchId: 1,
            status: "PENDING",
            requestStatus: "INITIAL",
            deliveryDate: moment(jobDetails.deliveryDate).format("YYYY-MM-DD"),
            specialRemark: jobDetails.specialRemark,
            requestContainerType: jobDetails.requestContainerType,
            adminApprovalStatus: "PENDING",
            invoicingStatus: "UNINVOICED",
            invoicePrice: 0,
            paymentStatus: "UNPAID",
            stops: stepsData
        };
        try {
            let response = await apiExecutions.createJob(jobData);
            if (response.status === 200 || response.status === 201) {
                toast.success(<span className='textStyle-small'>Job created successfully!</span>);
                await initiateSteps(response.data.jobId);
            } else {
                toast.error(<span className='textStyle-small'>Error creating job: {response.data.message}</span>);
            }
        } catch (error) {
            toast.error(<span className='textStyle-small'>Error creating job: {error.message}</span>);
        }
    };


    const initiateSteps = async (jobId) => {
        for (let idx = 0; idx < stepsData.length; idx++) {
            const step = stepsData[idx];
            let jsonInput = {
                jobId: jobId,
                cityId: step.city,
                address: step.address,
                stopType: step.stopType,
                stopOrder: idx + 1,
                jobStatus: "PENDING"
            };
            try {
                console.log('Creating job stop:', jsonInput);
                let response = await apiExecutions.createJobStop(jsonInput);
                if (response.status !== 200 && response.status !== 201) {
                    throw new Error('Failed to create job stop');
                }
                toast.success(<span className='textStyle-small'>Job stop created successfully!</span>);
            } catch (error) {
                toast.error(<span className='textStyle-small'>Error creating job stop: {error.message}</span>);
            }
        }
        setCurrentStep(0);
        setStepsData([]);
        setJobDetails({});
        form.resetFields();
    };

    const steps = [
        {
            title: <span className='textStyle-small' style={{ fontWeight: 550 }}>Job Details</span>,
            content: (
                <Form
                    layout="vertical"
                    form={form}
                    initialValues={jobDetails}
                >
                    <Row span={24}>
                        <Col span={12}>
                            <Form.Item
                                label={<span className='textStyle-small' style={{ fontWeight: 550 }}>Request Container Type</span>}
                                name="requestContainerType"
                                rules={[{ required: true, message: <span className='textStyle-small'>Please select container type</span> }]}
                            >
                                <Select placeholder="Select container type" className='custom-Select' bordered={false} style={{ width: '98%' }}>
                                    {['20ft', '40ft', '45ft', 'Others'].map(type => (
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
                </Form>
            )
        },
        {
            title: <span className='textStyle-small' style={{ fontWeight: 550 }}>Stops</span>,
            content: (
                <div>
                    {
                        stepsData.length === 0 && (
                            <div className='textStyle-small' style={{ marginBottom: 16 }}>Please add stops below
                                <img src='stops.svg' alt="Steps" style={{ width: '40%', marginBottom: 20 }} />
                            </div>
                        )
                    }
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
                    {stepsData.map((step, idx) => (
<div key={idx} style={{ display: 'flex', gap: 5, alignItems: 'center', marginBottom: 8 }}>
    <Form.Item
        layout="vertical"
        required
        style={{ flex: 2, marginBottom: 0 }}
    >
        <Select
            placeholder="Select city"
            className='custom-Select'
            bordered={false}
            style={{ width: '100%' }}
            value={step.city}
            onChange={value => handleStepChange(idx, 'city', value)}
            filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
            }
            showSearch
        >
            <Select.Option value="" className='textStyle-small'>Select city</Select.Option>
            {allCities.map(city => (
                <Select.Option key={city?.cityId} value={city?.cityId} className='textStyle-small'>
                    {city.name}
                </Select.Option>
            ))}
        </Select>
    </Form.Item>
    <Form.Item
        required
        layout="vertical"
        style={{ flex: 2, marginBottom: 0 }}
    >
        <Input
            placeholder="Enter address"
            className='custom-Input-Field'
            style={{ width: '100%' }}
            value={step.address}
            onChange={e => handleStepChange(idx, 'address', e.target.value)}
        />
    </Form.Item>
    <Form.Item
        required
        layout="vertical"
        style={{ flex: 2, marginBottom: 0 }}
    >
        <Select
            placeholder="Select stop type"
            className='custom-Select'
            bordered={false}
            style={{ width: '100%' }}
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
    {stepsData.length > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Button
                danger
                type="primary"
                style={{ borderRadius: 10 }}
                onClick={() => removeStop(idx)}
                icon={<DeleteFilled style={{ color: '#fff' }} />}
            />
        </div>
    )}
</div>
                    ))}
                </div>
            )
        },
        {
            title: <span className='textStyle-small' style={{ fontWeight: 550 }}>Review & Submit</span>,
            content: (
                <div>
                    <Card title="Job Details" style={{ marginBottom: 24 }}>
                        <div><b>Request Container Type:</b> {jobDetails.requestContainerType}</div>
                        <div><b>Delivery Date:</b> {jobDetails.deliveryDate ? moment(jobDetails.deliveryDate).format('YYYY-MM-DD') : ''}</div>
                        <div><b>Special Remark:</b> {jobDetails.specialRemark}</div>
                    </Card>
                    <Card title="Stops">
                        {stepsData.map((step, idx) => (
                            <div key={idx} style={{ marginBottom: 16 }}>
                                <b>Stop {idx + 1}:</b> {step.stopType} - {step.city} {step.address && <span style={{ color: '#888' }}>- {step.address}</span>}
                            </div>
                        ))}
                    </Card>
                </div>
            )
        }
    ];

    return (
        <div>
            <ToastContainer />
            <Steps
                size="small"
                labelPlacement="vertical"
                current={currentStep} style={{ marginBottom: 32 }}>
                {steps.map(item => (
                    <Step key={item.title} title={item.title} />
                ))}
            </Steps>
            <div style={{ minHeight: 350, marginBottom: 24 }}>
                {steps[currentStep].content}
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                {currentStep > 0 && (
                    <Button style={{ marginRight: 8 }} onClick={prev}>
                        Previous
                    </Button>
                )}
                {currentStep < steps.length - 1 && (
                    <Button type="primary" onClick={next}>
                        Next
                    </Button>
                )}
                {currentStep === steps.length - 1 && (
                    <Button type="primary" onClick={createNewJob}>
                        Submit
                    </Button>
                )}
            </div>
        </div>
    );
};

export default CreateJob;