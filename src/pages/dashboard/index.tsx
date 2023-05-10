import TableComponent from "@/components/tableComponent";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { getCookie } from "@/utils/cookies";
import { Table } from "antd";
import Router from "next/router";
import React, { useEffect } from "react";

const Dashboard = () => {
  return (
    <div>
      <TableComponent />
    </div>
  );
};

export default Dashboard;
