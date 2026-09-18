import { Outlet, NavLink } from "react-router";
import { FaRegUser } from "react-icons/fa";
import { TbLayoutSidebarRightExpandFilled } from "react-icons/tb";
import Navbar from "../components/Navbar";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";
import { LuActivity } from "react-icons/lu";
import { MdQuiz } from "react-icons/md";
import { FcStatistics } from "react-icons/fc";
import { MdTopic } from "react-icons/md";
import { BsFillSaveFill } from "react-icons/bs";
import { MdAccountTree } from "react-icons/md";

const DashboardLayout = () => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useUserRole();
  if (loading || roleLoading) {
    return <span className="loading loading-spinner text-primary"></span>;
  }

  console.log("user:", user);
  console.log("role:", role); // should now show "user"
  console.log("typeof role:", typeof role);
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
            <ul className="menu w-full grow gap-3 p-5 text-lg">
              {role === "user" && (
                <>
                  <li>
                    <NavLink
                      to="/dashboard/recent-activity"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="View Users"
                    >
                      <LuActivity />
                      <span className="is-drawer-close:hidden">
                        Recent Activity
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/start-quiz"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="View Users"
                    >
                      <MdQuiz />
                      <span className="is-drawer-close:hidden">Start Quiz</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/learning-statistics"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="View Users"
                    >
                      <FcStatistics />
                      <span className="is-drawer-close:hidden">
                        Learning Statistics
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/favourite-topics"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="View Users"
                    >
                      <MdTopic />
                      <span className="is-drawer-close:hidden">
                        Favourite Topics
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/ai-content"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="View Users"
                    >
                      <BsFillSaveFill />
                      <span className="is-drawer-close:hidden">
                        Saved AI Generated Content
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/completed-quizes"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="View Users"
                    >
                      <MdAccountTree />
                      <span className="is-drawer-close:hidden">
                        Number of Quizes Completed
                      </span>
                    </NavLink>
                  </li>
                </>
              )}
              {role === "admin" && (
                <>
                  <li>
                    <NavLink
                      to="/dashboard/view-users"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="View Users"
                    >
                      <FaRegUser />
                      <span className="is-drawer-close:hidden">View Users</span>
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
