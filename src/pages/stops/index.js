import dynamic from "next/dynamic";

const JobStopsPage = dynamic(() => import('./jobStopsModule'), {
  ssr: false
});

export default JobStopsPage;
