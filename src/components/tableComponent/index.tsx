import React, { FC } from "react";
import { Table } from "antd";
import Router from "next/router";

const TableComponent: FC<any> = ({
  Datatype,
  paginationData,
  tableData,
  isLoading,
  otherData,
  rowSelection,
}) => {
  return (
    <div className="pt-2">
      <Table
        rowSelection={rowSelection}
        scroll={{ x: 700 }}
        columns={Datatype}
        dataSource={tableData}
        loading={isLoading}
        pagination={{
          current: paginationData?.currentPage,
          pageSize: paginationData?.perPage,
          total: paginationData?.total,
          position: ["bottomCenter"],
          showSizeChanger: false,
          onChange: (page) => {
            Router.push({
              pathname: Router.pathname,
              query: { ...otherData, page: page },
            });
          },
        }}
      />
    </div>
  );
};

export default TableComponent;
