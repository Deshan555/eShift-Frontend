
import React from 'react';
import dynamic from 'next/dynamic';

const CustomerAuth = dynamic(() => import('./CustomerAuth'), { ssr: false });

export default function AuthPage() {
  return <CustomerAuth />;
}