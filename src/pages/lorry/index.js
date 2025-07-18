import dynamic from "next/dynamic";

// import React from 'react';
// import LorryManagement from './management';

// const LorryPage = () => <LorryManagement />;

// export default LorryPage;


export default dynamic(() => import('./management'), { ssr: false });