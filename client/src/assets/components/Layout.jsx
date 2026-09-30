import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div>

      <Sidebar />

      <div
        style={{
          marginLeft: "240px",
          padding: "20px",
          background: "#f5f7fa",
          minHeight: "100vh"
        }}
      >
        {children}
      </div>

    </div>
  );
};

export default Layout;