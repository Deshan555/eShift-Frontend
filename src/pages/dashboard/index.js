import dynamic from "next/dynamic";
export default dynamic(() => import('./dashboard'), { ssr: false });