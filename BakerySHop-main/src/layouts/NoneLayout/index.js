import SideBar from "~/components/adminPage/SideBar/SideBar";

const NoneLayout = ({ children }) => {
  return (
    <div className="layout-container">
      {children}
      <SideBar />
    </div>
  );
};

export default NoneLayout;
