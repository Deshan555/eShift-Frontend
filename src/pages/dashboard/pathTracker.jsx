
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Card, Spin, List } from "antd";
import apiExecutions from "../api/apiExecutions";

// SSR-safe import for map preview
const JobPathMap = dynamic(() => import("../../pages/jobs/JobPathMap"), { ssr: false });


const PathTracker = () => {
  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [stops, setStops] = useState([]);
  const [loadingStops, setLoadingStops] = useState(false);

  useEffect(() => {
    async function getJobs() {
      setLoadingJobs(true);
      try {
        const data = await apiExecutions.getAllJobs(); 
        setJobs(data?.data || []);
      } catch {
        setJobs([]);
      }
      setLoadingJobs(false);
    }
    getJobs();
  }, []);

  const handleCardClick = async (job) => {
    setSelectedJob(job);
    setLoadingStops(true);
    try {
      const stopsData = await apiExecutions.getJobStopsByJobId(job?.jobId);
      setStops(stopsData?.data || []);
    } catch {
      setStops([]);
    }
    setLoadingStops(false);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ width: 350, overflowY: "auto", padding: 16, background: "#f5f5f5" }}>
        <h2>Jobs</h2>
        {loadingJobs ? (
          <Spin />
        ) : (
          <List
            dataSource={jobs}
            renderItem={job => (
              <Card
                key={job.id}
                style={{
                  marginBottom: 16,
                  cursor: "pointer",
                  border: selectedJob?.id === job.id ? "2px solid #1890ff" : undefined,
                  boxShadow: "0 2px 8px #f0f1f2"
                }}
                onClick={() => handleCardClick(job)}
              >
                <Card.Meta
                  title={job.title || `Job #${job?.jobId}`}
                  description={job.description}
                />
              </Card>
            )}
          />
        )}
      </div>
      {/* <div style={{ flex: 1, position: "relative" }}>
        {loadingStops ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
            <Spin size="large" />
          </div>
        ) : (
          <div style={{ height: "100%", width: "100%" }}>
            <JobPathMap stops={stops} />
          </div>
        )}
      </div> */}
      <JobPathMap stops={stops} />
    </div>
  );
};

export default PathTracker;