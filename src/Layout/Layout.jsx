import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Layout = ({usuario, setUsuario}) => {
  return (
    <div className="body__container sm:flex rounded-xl">
        <Sidebar 
          usuario={usuario}
          setUsuario={setUsuario}
        />
        <Outlet
        />
    </div>
  )
}

export default Layout