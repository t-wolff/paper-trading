import { Outlet } from "react-router";
import Navbar from "../navbar/Navbar";
import "./SharedLayout.css";

const SharedLayout = () => {
  return (
    <>
      <div className="container">
        <Navbar />
        <main>
          <Outlet />
        </main>
        <footer className="footer">
          <p>All Rights Reserved 2023</p>
        </footer>
      </div>
    </>
  );
};

export default SharedLayout;
