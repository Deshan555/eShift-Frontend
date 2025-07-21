import dynamic from 'next/dynamic';

const CustomerModule = dynamic(() => import('./customerModule'), {
  ssr: false,
  loading: () => <div className="main-content"><div className="module-card"><h2 className="poppins-semibold">Loading Customer Management...</h2></div></div>,
});

export default function CustomerIndex() {
  return <CustomerModule />;
}
