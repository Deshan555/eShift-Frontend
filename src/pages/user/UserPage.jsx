
import Link from 'next/link';
import React from 'react';
import JobCard from './components/JobCard';
import { Row, Col } from 'antd';
import apiExecutions from '../api/apiExecutions';
import { toast, ToastContainer } from 'react-toastify';
import JobPathMap from '../jobs/JobPathMap';

const UserPage = () => {

    const [overallStatics, setOverallStatics] = React.useState({});
    const [getJobStopsByJobId, setGetJobStopsByJobId] = React.useState([]);
    const [allJobs, setAllJobs] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        getJobDetailsOverall(15);
        getJobStopsByJobIdFetch(15);
        getJobsByCustomers(1);
    }, []);

    const getJobDetailsOverall = async (jobId) => {
        setLoading(true);
        try {
            const data = await apiExecutions.getJobDetailsOverall(jobId);
            setOverallStatics(data?.data);
        } catch (error) {
            toast.error("Failed to fetch job details");
        } finally {
            setLoading(false);
        }
    };

    const getJobStopsByJobIdFetch = async (jobId) => {
        setLoading(true);
        try {
            const data = await apiExecutions.getJobStopsByJobId(jobId);
            setGetJobStopsByJobId(data?.data);
        } catch (error) {
            toast.error("Failed to fetch job stops");
        } finally {
            setLoading(false);
        }
    };

    // getJobsByCustomers
    const getJobsByCustomers = async (customerId) => {
        setLoading(true);
        try {
            const data = await apiExecutions.getJobsByCustomers(customerId);
            setAllJobs(data?.data || []);
        } catch (error) {
            toast.error("Failed to fetch jobs for customer");
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        if (typeof window !== 'undefined' && document?.body) {
            document.body.style.backgroundColor = 'white';
            return () => {
                document.body.style.backgroundColor = '';
            };
        } else {
            // Always return a cleanup function for React
            return () => {};
        }
    }, []);

    return (
        <div style={{ minHeight: '100vh', background: '#fff' }}>
            {/* Header Bar */}
            <header style={{
                width: '100%',
                background: '#320A6B',
                color: '#fff',
                padding: '16px 0',
                marginBottom: 24,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)'
            }}>
                <nav style={{ display: 'flex', gap: 32 }}>
                    <Link href="/user" legacyBehavior><a style={{ color: '#fff', fontFamily: 'Poppins, monospace', fontSize: 18, fontWeight: 600, textDecoration: 'none' }}>User Home</a></Link>
                    <Link href="/user/profile" legacyBehavior><a style={{ color: '#fff', fontFamily: 'Poppins, monospace', fontSize: 18, fontWeight: 600, textDecoration: 'none' }}>Profile</a></Link>
        </nav>
    </header>

    {/* Job Cards Grid List */}
    <div style={{ padding: '0 26px' }}>
        <Row span={24}>
            {allJobs && allJobs.length > 0 ? (
                allJobs.slice().reverse().map(job => (
                    <Col key={job.jobId} xs={24} sm={12} md={8} lg={8} style={{ padding: 8 }}>
                        <JobCard job={job} />
                    </Col>
                ))
            ) : (
                <Col span={24} style={{ textAlign: 'center', color: '#888', marginTop: 40 }}>No jobs found.</Col>
            )}  
        </Row>
      {/* {allJobs && allJobs.length > 0 ? (
        allJobs.slice().reverse().map(job => <JobCard key={job.jobId} job={job} />)
      ) : (
        <div style={{ gridColumn: '1/-1', textAlign: 'center', color: '#888', marginTop: 40 }}>No jobs found.</div>
      )} */}
    </div>

    {/* <JobPathMap stops={getJobStopsByJobId} />
    <pre style={{ padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '5px', color: 'black' }}>
        {JSON.stringify(overallStatics?.jobStops, null, 2)}
    </pre> */}
</div>
    );
};

export default UserPage;