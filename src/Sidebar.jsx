import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";
import { Link } from "react-router-dom";

export default function Sidebars() {
  return (
    <Sidebar
      aria-label="FEDERAL MOTOR CARRIER SAFETY ADMINSTRATION"
      className="sticky top-0 h-screen shadow-2xl "
    >
      <Sidebar.Logo className="my-6 border-b-2 pb-4">SPOTTER</Sidebar.Logo>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to="/dashboard">
            <Sidebar.Item
              href="#"
              icon={HiChartPie}
              className="mb-3 hover:bg-blue-400 hover:text-white"
            >
              Dashboard
            </Sidebar.Item>
          </Link>
          <Link to="/productsPage">
            <Sidebar.Item
              icon={HiViewBoards}
              className="mb-3  hover:bg-blue-400 hover:text-white"
            >
              Records Page
            </Sidebar.Item>
          </Link>
          <Sidebar.Item
            icon={HiInbox}
            className="mb-3  hover:bg-blue-400 hover:text-white"
          >
            Inbox
          </Sidebar.Item>
          <Sidebar.Item
            icon={HiUser}
            className="mb-3  hover:bg-blue-400 hover:text-white"
          >
            Users
          </Sidebar.Item>
          <Sidebar.Item
            icon={HiShoppingBag}
            className="mb-3  hover:bg-blue-400 hover:text-white"
          >
            Products
          </Sidebar.Item>
          <Sidebar.Item
            icon={HiArrowSmRight}
            className="mb-3  hover:bg-blue-400 hover:text-white"
          >
            Sign In
          </Sidebar.Item>
          <Sidebar.Item
            icon={HiTable}
            className="mb-3  hover:bg-blue-400 hover:text-white"
          >
            Sign Up
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
