import dynamic from 'next/dynamic';
export default dynamic(() => import('./CityManagement'), { ssr: false });