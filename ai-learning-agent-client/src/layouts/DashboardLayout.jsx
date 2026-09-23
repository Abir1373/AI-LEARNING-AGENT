import { Outlet, NavLink, Navigate } from "react-router";
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
import { MdPersonSearch } from "react-icons/md";
import { SiPaloaltonetworks } from "react-icons/si";
import { TbArrowAutofitContentFilled } from "react-icons/tb";
import { SiStatista } from "react-icons/si";

const DashboardLayout = () => {
  const { loading } = useAuth();
  const { role, roleLoading } = useUserRole();

  // Show loading while checking auth & role
  if (loading || roleLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // Redirect pending users
  if (role === "pending") {
    return <Navigate to="/pending" replace />;
  }

  return (
    <div className="flex flex-col">
      <Navbar />

      <div className="drawer lg:drawer-open">
        <input
          id="my-drawer-4"
          type="checkbox"
          className="drawer-toggle inline"
        />

        {/* Page Content */}
        <div className="drawer-content">
          <nav className="navbar w-full bg-base-300">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost drawer-button"
            >
              <TbLayoutSidebarRightExpandFilled className="text-xl" />
            </label>
            <div className="px-4">Dashboard</div>
          </nav>

          <div className="p-4">
            <Outlet />
          </div>
        </div>

        {/* Sidebar */}
        <div className="drawer-side is-drawer-close:overflow-visible">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
            <ul className="menu w-full grow gap-3 p-5 text-lg">
              {/* ================= USER MENU ================= */}
              {role === "user" && (
                <>
                  <li>
                    <NavLink
                      to="/dashboard/recent-activity"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="Recent Activity"
                    >
                      <LuActivity className="text-lg" />
                      <span className="is-drawer-close:hidden">
                        Recent Activity
                      </span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/dashboard/start-quiz"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="Start Quiz"
                    >
                      <MdQuiz className="text-lg" />
                      <span className="is-drawer-close:hidden">Start Quiz</span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/dashboard/learning-statistics"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="Learning Statistics"
                    >
                      <FcStatistics className="text-lg" />
                      <span className="is-drawer-close:hidden">
                        Learning Statistics
                      </span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/dashboard/favourite-topics"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="Favourite Topics"
                    >
                      <MdTopic className="text-lg" />
                      <span className="is-drawer-close:hidden">
                        Favourite Topics
                      </span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/dashboard/ai-content"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="AI Content"
                    >
                      <BsFillSaveFill className="text-sm" />
                      <span className="is-drawer-close:hidden">
                        Saved AI Generated Content
                      </span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/dashboard/completed-quizes"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="Completed Quizes"
                    >
                      <MdAccountTree className="text-sm" />
                      <span className="is-drawer-close:hidden">
                        Number of Quizes Completed
                      </span>
                    </NavLink>
                  </li>
                </>
              )}

              {/* ================= ADMIN MENU ================= */}
              {role === "admin" && (
                <>
                  <li>
                    <NavLink
                      to="/dashboard/view-users"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="View Users"
                    >
                      <FaRegUser className="text-sm" />
                      <span className="is-drawer-close:hidden">View Users</span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/dashboard/search-users"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="Search Users"
                    >
                      <MdPersonSearch className="text-lg" />
                      <span className="is-drawer-close:hidden">
                        Search Users
                      </span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/dashboard/view-user-activity"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="View User Activity"
                    >
                      <SiPaloaltonetworks className="text-lg" />
                      <span className="is-drawer-close:hidden">
                        View User Activity
                      </span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/dashboard/view-generated-content"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="View Generated Content"
                    >
                      <TbArrowAutofitContentFilled className="text-lg" />
                      <span className="is-drawer-close:hidden">
                        View Generated Content
                      </span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/dashboard/view-quiz-statistics"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="View Quiz Statistics"
                    >
                      <SiStatista className="text-sm" />
                      <span className="is-drawer-close:hidden">
                        View Quiz Statistics
                      </span>
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
