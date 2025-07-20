import dynamic from "next/dynamic";
export default dynamic(() => import('./management'), { ssr: false });