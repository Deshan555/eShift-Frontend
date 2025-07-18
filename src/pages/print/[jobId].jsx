import React, { useRef } from 'react';
import { useRouter } from 'next/router';
import apiExecutions from '../api/apiExecutions';

const Invoice = () => {
  const componentRef = useRef();
  const handlePrint = () => window.print();

  const router = useRouter();
  const { jobId } = router.query;
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await apiExecutions.getJobDetailsOverall(jobId);
      setData(result?.data || {});
    };
    if (jobId) {
      fetchData();
    }
  }, [jobId]);

  if (!data || !data.job || !data.jobStops || !data.load || !data.customer) {
    return <div style={{ textAlign: 'center', marginTop: 40 }}>Loading invoice...</div>;
  }

  const { job, jobStops, load, customer } = data;
  const mileage = load.meaterReadingEnd - load.meaterReadingStart;
  const mileageRate = 250.0; 
  const weightRate = 50; 
  const mileageCost = mileage * mileageRate;
  const weightCost = load.weight * weightRate;
  const subtotal = mileageCost + weightCost;

  return (
    <>
      <style>
        {`
          .invoice-container {
            max-width: 700px;
            margin: 32px auto;
            padding: 32px 28px 28px 28px;
            background: #fff;
            box-shadow: 0 2px 24px 0 rgba(0,0,0,0.10);
            border-radius: 10px;
            font-family: monospace, monospace;
            font-size: 15px;
            line-height: 1.7;
            overflow: hidden;
            scrollbar-width: none;
          }
          .invoice-container::-webkit-scrollbar {
            display: none;
          }
          .header {
            text-align: center;
            border-bottom: 2px solid #222;
            padding-bottom: 18px;
            margin-bottom: 18px;
          }
          .header h1 {
            font-size: 28px;
            margin: 0 0 4px 0;
            letter-spacing: 2px;
            color: #222;
          }
          .header p {
            margin: 3px 0;
            font-size: 13px;
            color: #222;
          }
          .section {
            margin-bottom: 22px;
            color: #222;
          }
          .section h2 {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 7px;
            letter-spacing: 1px;
          }
          .section p {
            margin: 3px 0;
            font-size: 13px;
          }
          .table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 18px;
          }
          .table th, .table td {
            border: 1px solid #222;
            padding: 7px 10px;
            text-align: left;
            font-size: 13px;
          }
          .table th {
            background: #f8f8f8;
            font-weight: bold;
            letter-spacing: 1px;
          }
          .summary ul {
            list-style-type: disc;
            padding-left: 22px;
            font-size: 13px;
          }
          .summary li {
            margin-bottom: 4px;
          }
          .footer {
            text-align: center;
            border-top: 2px solid #222;
            padding-top: 14px;
            margin-top: 18px;
            color: #222;
          }
          .footer p {
            margin: 3px 0;
            font-size: 13px;
          }
          .print-button {
            display: block;
            margin: 24px auto 0 auto;
            padding: 10px 28px;
            background: #320A6B;
            color: #fff;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 15px;
            font-family: monospace, monospace;
            letter-spacing: 1px;
          }
          .print-button:hover {
            background: #1e0640;
          }
          @media print {
            .print-button {
              display: none;
            }
            .invoice-container {
              box-shadow: none;
              border-radius: 0;
              margin: 0;
              padding: 0;
              max-width: 100vw;
            }
          }
        `}
      </style>
      <div className="invoice-container" ref={componentRef}>
        <div className="header">
          <h1>INVOICE</h1>
          <p>eShift Transport Solutions</p>
          <p>Colombo, Sri Lanka</p>
          <p>Email: info@eshift.lk | Phone: +94 11 123 4567</p>
          <p>Invoice No: {job.jobId}</p>
          <p>Invoice Date: {new Date().toLocaleDateString('en-GB')}</p>
          <p>Delivery Date: {new Date(job.deliveryDate).toLocaleDateString('en-GB')}</p>
        </div>

        {/* Customer Details */}
        <div className="section">
          <h2>BILLED TO</h2>
          <p>{customer.fullName}</p>
          {customer.address && <p>{customer.address}</p>}
          {customer.emailAddress && <p>Email: {customer.emailAddress}</p>}
          {customer.phoneNumber && <p>Phone: {customer.phoneNumber}</p>}
        </div>

        {/* Job Details */}
        <div className="section">
          <h2>JOB DETAILS</h2>
          <p>Job ID: {job.jobId}</p>
          {job.specialRemark && <p>Remark: {job.specialRemark}</p>}
          <p>Container Type: {job.requestContainerType}</p>
          <p>Status: {job.requestStatus}</p>
        </div>

        {/* Stop Details */}
        <div className="section">
          <h2>STOPS</h2>
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Address</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {jobStops.map((stop) => (
                <tr key={stop.stopId}>
                  <td>{stop.stopOrder}</td>
                  <td>{stop.address}</td>
                  <td>{stop.stopType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="section summary">
          <h2>SUMMARY</h2>
          <ul>
            <li>Total Weight: {load.weight} kg</li>
            <li>Total Volume: {load.volume} m³</li>
            <li>Total Mileage: {mileage} km</li>
            <li>
              Subtotal: Rs. {subtotal.toLocaleString('en-LK', { minimumFractionDigits: 2 })} (Mileage: {mileage} km @ Rs. {mileageRate.toLocaleString('en-LK', { minimumFractionDigits: 2 })}/km = Rs. {mileageCost.toLocaleString('en-LK', { minimumFractionDigits: 2 })}; Weight: {load.weight} kg @ Rs. {weightRate.toLocaleString('en-LK', { minimumFractionDigits: 2 })}/kg = Rs. {weightCost.toLocaleString('en-LK', { minimumFractionDigits: 2 })})
            </li>
          </ul>
        </div>

        {/* Footer */}
        <div className="footer">
          <p><strong>Thank you for your business!</strong></p>
          <p>For inquiries, contact info@eshift.lk</p>
        </div>

        {/* Print Button */}
        <button className="print-button" onClick={handlePrint}>
          PRINT INVOICE
        </button>
      </div>
    </>
  );
};

export default Invoice;