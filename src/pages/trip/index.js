import dynamic from "next/dynamic";

const TripPage = dynamic(() => import('./tripModule'), {
  ssr: false
});

export default TripPage;
