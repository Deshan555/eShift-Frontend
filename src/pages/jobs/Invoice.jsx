import React from 'react';
import { Descriptions, Row, Button } from 'antd';

import { toast, ToastContainer } from 'react-toastify';
import apiExecutions from '../api/apiExecutions';
import { PrinterFilled } from '@ant-design/icons';
import InvoiceForm from '../../components/InvoiceForm';

const Invoice = ({ data, refetchFunction, jobIn }) => {
  const [invoiceChecked, setInvoiceChecked] = React.useState(false);
  const [paymentChecked, setPaymentChecked] = React.useState(false);

  // Extract data from props
  const { job, jobStops, load, customer } = data;
  const mileage = load.meaterReadingEnd - load.meaterReadingStart;
  const mileageRate = 250.0;
  const weightRate = 50;
  const mileageCost = mileage * mileageRate;
  const weightCost = load.weight * weightRate;
  const subtotal = mileageCost + weightCost;

  const updateJobStatus = async () => {
    try {
      const response = await apiExecutions.updateJob(job?.jobId, {
        ...jobIn,
        invoicingStatus: 'INVOICED',
        invoicePrice: subtotal,
        paymentStatus: 'PAID',
        requestStatus: 'FINISHED'
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
    <>
      <ToastContainer />
      <Descriptions
        bordered
        column={2}
        style={{ fontFamily: 'monospace, monospace', fontSize: 15 }}
      >
        <Descriptions.Item label="Job ID">{job.jobId}</Descriptions.Item>
        <Descriptions.Item label="Customer Name">{customer.fullName}</Descriptions.Item>
        <Descriptions.Item label="Container Type">{job.requestContainerType}</Descriptions.Item>
        <Descriptions.Item label="Status">{job.status}</Descriptions.Item>
        <Descriptions.Item label="Delivery Date">{new Date(job.deliveryDate).toLocaleDateString('en-GB')}</Descriptions.Item>
        <Descriptions.Item label="Special Remark">{job.specialRemark}</Descriptions.Item>
        <Descriptions.Item label="Total Weight (kg)">{load.weight}</Descriptions.Item>
        <Descriptions.Item label="Total Volume (m³)">{load.volume}</Descriptions.Item>
        <Descriptions.Item label="Mileage (km)">{mileage}</Descriptions.Item>
        <Descriptions.Item label="Mileage Cost (Rs.)">{mileageCost.toLocaleString('en-LK', { minimumFractionDigits: 2 })}</Descriptions.Item>
        <Descriptions.Item label="Weight Cost (Rs.)">{weightCost.toLocaleString('en-LK', { minimumFractionDigits: 2 })}</Descriptions.Item>
        <Descriptions.Item label={<b>Subtotal (Rs.)</b>}>
          <b>{subtotal.toLocaleString('en-LK', { minimumFractionDigits: 2 })}</b>
        </Descriptions.Item>
      </Descriptions>
      {
        (job?.invoicingStatus !== 'INVOICED' && job?.paymentStatus !== 'PAID') ? (
          <InvoiceForm
            invoiceChecked={invoiceChecked}
            setInvoiceChecked={setInvoiceChecked}
            paymentChecked={paymentChecked}
            setPaymentChecked={setPaymentChecked}
            onSubmit={updateJobStatus}
          />
        ) : (
          <Row justify="end" style={{ marginTop: 20 }}>
            <Button
              type="primary"
              icon={<PrinterFilled />}
              style={{ backgroundColor: '#320A6B', borderColor: '#320A6B', height: 38, borderRadius: 12 }}
              href={'/print/' + job.jobId}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className='textStyle-small' style={{ fontWeight: 550, color: 'whitesmoke' }}>Print Invoice</span>
            </Button>
          </Row>
        )
      }

    </>
  );
};

export default Invoice;