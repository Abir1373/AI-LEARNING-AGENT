import { Outlet, NavLink } from "react-router";
import { FaRegUser } from "react-icons/fa";
import { TbLayoutSidebarRightExpandFilled } from "react-icons/tb";
import Navbar from "../components/Navbar";

const DashboardLayout = () => {
  return (
    <div className="flex flex-col">
      <Navbar></Navbar>
      <div className="drawer lg:drawer-open">
        <input
          id="my-drawer-4"
          type="checkbox"
          className="drawer-toggle inline"
        />
        <div className="drawer-content">
          {/* Navbar */}
          <nav className="navbar w-full bg-base-300">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost drawer-button"
            >
              {/* Sidebar toggle icon */}
              <TbLayoutSidebarRightExpandFilled className="text-xl" />
            </label>
            <div className="px-4">Dashboard </div>
          </nav>
          {/* Page content here */}
          <div className="p-4">
            {" "}
            <Outlet></Outlet>{" "}
          </div>
        </div>

        <div className="drawer-side is-drawer-close:overflow-visible">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
            {/* Sidebar content here */}
            <ul className="menu w-full grow gap-3 p-5">
              {/* List item */}
              <li>
                <NavLink
                  to="/dashboard/view-users"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right active"
                  data-tip="ViewUsers"
                >
                  {/* Settings icon */}
                  <FaRegUser />
                  <span className="is-drawer-close:hidden">View Users</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
