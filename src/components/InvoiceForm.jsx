import React from 'react';
import { Form, Checkbox, Row, Button } from 'antd';

const InvoiceForm = ({
  invoiceChecked,
  setInvoiceChecked,
  paymentChecked,
  setPaymentChecked,
  onSubmit
}) => (
  <Form style={{ marginTop: 20 }} onFinish={onSubmit}>
    <Form.Item>
      <Row>
        <Checkbox
          checked={invoiceChecked}
          onChange={e => setInvoiceChecked(e.target.checked)}
          className='textStyle-small'
          style={{ marginBottom: 10 }}
        >
          I confirm that the above details are correct and agree to the terms of service.
        </Checkbox>
      </Row>
      <Row>
        <Checkbox
          checked={paymentChecked}
          onChange={e => setPaymentChecked(e.target.checked)}
          className='textStyle-small'
          style={{ marginBottom: 10 }}
        >
          Mark as Invoiced, and complete the payment process.
        </Checkbox>
      </Row>
      <Row justify="end" style={{ marginTop: 5 }}>
        <Button htmlType="submit"
          style={{ backgroundColor: '#320A6B', borderColor: '#320A6B', height: 38, borderRadius: 12 }}
          disabled={!(invoiceChecked && paymentChecked)}
          className="custom-Button">
          <span className='textStyle-small' style={{ fontWeight: 550, color: 'whitesmoke' }}>Submit Invoice</span>
        </Button>
      </Row>
    </Form.Item>
  </Form>
);

export default InvoiceForm;
