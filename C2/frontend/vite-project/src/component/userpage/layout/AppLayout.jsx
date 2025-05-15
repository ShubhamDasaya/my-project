import { Outlet } from "react-router-dom";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";

const AppLayout = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh", 
        overflowY:"hidden"
      }}
    >
      <Header />
      <div style={{ flex: "1" , height:"calc(100vh - 120px)" , overflowY:"auto"}}> 


        <Outlet />


      </div>
      <Footer />
    </div>
  );
};

export default AppLayout;
