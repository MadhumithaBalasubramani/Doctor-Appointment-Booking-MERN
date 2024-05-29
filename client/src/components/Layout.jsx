import React, { useEffect, useState } from "react";
import "../layout.css";
import { Link,useLocation, useNavigate } from "react-router-dom";
import { useLocale } from "antd/es/locale";
// import useSelection from "antd/es/table/hooks/useSelection";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../Redux/reducer";
import { Badge } from "antd";
import { reset, setUser } from "../Redux/userSlice";
function Layouts({ children }) {
  const [collapsed, setCollapsed] = useState(true);
  const location = useLocation();
  const { user } = useSelector((state) => state.user || {});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-smile-2-fill",
    },
    
    {
      name: "Apply Doctor",
      path: "/apply-doctor",
      icon: "ri-hospital-line",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "ri-user-3-line",
    },
  ];
  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-smile-2-fill",
    },
    // {
    //   name: "Appoinments",
    //   path: "/appoinments",
    //   icon: "ri-file-list-3-line",
    // },

    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "ri-user-3-line",
    },
  ];
  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-smile-2-fill",
    },
    {
      name: "Users",
      path: "/users",
      icon: "ri-user-line",
    },
    {
      name: "Doctors",
      path: "/doctors",
      icon: "ri-shield-user-line",
    },
  ];

  const menuToBeRendered = user?.isAdmin ? adminMenu : user?.isDoctor? doctorMenu:userMenu
  // const role=user?.isAdmin?"Admin":user?.isDoctor?"Doctor":"User";
  return (
    <div className="main">
      <div className="d-flex layout">
        <div className={`${collapsed ? "collapsed-sidebar" : "sidebar"}`}>
          
            {/* <h1>HELLO</h1> */}
            {collapsed ? (
              <i
                className="ri-menu-2-line header-action-icon"
                onClick={() => {
                  setCollapsed(false);
                }}
              ></i>
            ) : (
              <i
                className="ri-close-line header-action-icon"
                onClick={() => {
                  setCollapsed(true);
                }}
              ></i>
            )}

            <h1 className="Title">{!collapsed ? `MEDICARE` : `MEDICARE`} </h1>
            {/* <h1 className="role">{role}</h1> */}
            <div className="menu">
              {menuToBeRendered.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <div
                    className={`d-flex menu-item ${
                      isActive && "active-menu-item"
                    }`}
                  >
                    <i className={menu.icon}></i>
                    {!collapsed && (
                      <Link className="pe-4" to={menu.path}>
                        {menu.name}
                      </Link>
                    )}
                  </div>
                );
              })}
              <div
                onClick={() => {
                  localStorage.clear();
                  dispatch(reset());
                  navigate("/login");
                }}
                className={`d-flex menu-item `}
              >
                <i className="ri-logout-circle-line"></i>
                {!collapsed && <Link className="pe-4">LogOut</Link>}
              </div>
            </div>
           
        </div>
        <div className="content">
          <div className="header">
            <div >
            
              <Badge count={user?.unseenNotification.length} onClick={()=>navigate('/notifications')}>
              <i class="ri-notification-2-line notification-icon "></i>
              </Badge>
              
            </div>
            <Link className="anchor" to="/profile">
                {user?.name}
            </Link>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layouts;
