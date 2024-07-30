import Navbar from "../components/common/navbar/Navbar";

const Layout = ({ children } : any) => {
  return (
    <>
    <Navbar />
      {children}
    </>
  );
};

export default Layout;