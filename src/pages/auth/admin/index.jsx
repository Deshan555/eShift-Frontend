import dynamic from "next/dynamic";

const AdminLogin = dynamic(() => import("./AdminAuth"), {
  ssr: false,
});

export default AdminLogin;
