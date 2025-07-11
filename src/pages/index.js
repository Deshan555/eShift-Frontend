import Head from "next/head";
import { Typography, Row, Col, Card } from "antd";
import DashboardLayout from "../components/DashboardLayout";

const { Title, Paragraph } = Typography;

export default function Home() {
  return (
    <>
      <Head>
        <title>eShift Dashboard</title>
        <meta name="description" content="eShift Admin Dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashboardLayout>
        <Title level={2}>Welcome to eShift Dashboard</Title>
        <Paragraph>
          Use the side navigation to manage Admins, Assistants, Branches, City, Containers, Clients, Drivers, Jobs, Job Stops, Load, Lorry, and Trip.
        </Paragraph>
        <Row gutter={[16, 16]}>
          {[
            { title: "Admins", desc: "Manage admin users", href: "/admins" },
            { title: "Assistants", desc: "Manage assistants", href: "/assistants" },
            { title: "Branches", desc: "Manage branches", href: "/branches" },
            { title: "City", desc: "Manage cities", href: "/city" },
            { title: "Containers", desc: "Manage containers", href: "/containers" },
            { title: "Clients", desc: "Manage clients", href: "/clients" },
            { title: "Drivers", desc: "Manage drivers", href: "/drivers" },
            { title: "Jobs", desc: "Manage jobs", href: "/jobs" },
            { title: "Job Stops", desc: "Manage job stops", href: "/jobstops" },
            { title: "Load", desc: "Manage loads", href: "/load" },
            { title: "Lorry", desc: "Manage lorries", href: "/lorry" },
            { title: "Trip", desc: "Manage trips", href: "/trip" },
          ].map((item) => (
            <Col xs={24} sm={12} md={8} lg={6} key={item.title}>
              <a href={item.href} style={{ textDecoration: "none" }}>
                <Card hoverable title={item.title} style={{ marginBottom: 16 }}>
                  {item.desc}
                </Card>
              </a>
            </Col>
          ))}
        </Row>
      </DashboardLayout>
    </>
  );
}
