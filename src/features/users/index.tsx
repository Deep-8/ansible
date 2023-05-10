import TableComponent from '@/components/tableComponent'
import React from 'react'
import { Button, Col, Form, Input, Modal, Row, Select, Spin } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import ButtonComponent from '@/components/button';
import useUser from './views/useUser';

const User = () => {
    const { allUser, handleShowDeleteModal, onDelete, showDeleteModal, showEditModal, handleAddUser, initialValues, addLoading, editLoading, columns, isFetching, pagination, onSearch, showModal, handleShowAddUserModal } = useUser();
    return (
        <div>
            <div className='flex justify-between my-4 items-center gap-x-4 gap-y-4 flex-wrap'>
                <div className="bg-white p-2 h-11 rounded-lg border border-grey-for-border">
                    <Input
                        className="sm:w-56 md:w-80"
                        prefix={
                            <SearchOutlined style={{ fontSize: 16, color: "#1890ff" }} />
                        }
                        bordered={false}
                        placeholder="Search User"
                        allowClear
                        onChange={(event) => onSearch(event.target.value)}
                    />
                </div>
                <ButtonComponent text="Add User" clickFn={handleShowAddUserModal} />
            </div>

            <TableComponent
                className="px-4"
                Datatype={columns}
                tableData={allUser}
                isLoading={isFetching}
                paginationData={pagination}

            />
            {/*  add edit modal */}
            <Modal
                maskClosable={false}
                bodyStyle={{ paddingTop: "2rem", paddingBottom: "2rem" }}
                title={showEditModal === true ? "Edit User" : "Add User"}
                centered
                open={showModal || showEditModal}
                onOk={handleShowAddUserModal}
                // confirmLoading={isLoading}
                onCancel={handleShowAddUserModal}
                width={420}
                footer={null}
                destroyOnClose
            >
                <Form
                    initialValues={initialValues}
                    colon={false}
                    preserve={false}
                    layout={"vertical"}
                    size={"large"}
                    onFinish={(values) => {
                        handleAddUser(values)
                    }}
                >
                    <Row gutter={30}>
                        <Col xs={24} md={24}>
                            <Form.Item
                                name="name"
                                label={
                                    <span className=" text-grey text-base">
                                        User Name<span className="text-red">*</span>
                                    </span>
                                }
                                rules={[
                                    { required: true, message: "This is a required field" },
                                    { whitespace: true, message: "Cannot have empty spaces" },
                                    { min: 3, message: "Should be more than 3" },
                                    { max: 50, message: "Should be less than 50" },
                                    {
                                        pattern: /^[a-zA-Z][a-zA-Z0-9. ]*$/,
                                        message: "Please enter a valid User Name ",
                                    },
                                ]}
                            >
                                <Input
                                    style={{ width: '100%' }}
                                    placeholder="Enter User Name" allowClear />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24}>
                            <Form.Item
                                name="email"
                                label={<span className=" text-grey text-base mb-2">Email ID <span className="text-red">*</span></span>}
                                rules={[
                                    { required: true, message: "This is a required field" },
                                    { type: "email", message: "Invalid email" }]}
                            >
                                <Input
                                    style={{ height: "40px" }}
                                    placeholder="Enter Email-id"
                                    allowClear
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24}>
                            <Form.Item
                                name="role"
                                label={<span className=" text-grey text-base mb-2">Select Role <span className="text-red">*</span></span>}
                                rules={[
                                    { required: true, message: "This is a required field" },
                                ]}
                            >
                                <Select
                                    defaultValue={{ value: 1, label: 'Admin' }}
                                    style={{ width: '100%' }}
                                    options={[
                                        { value: 1, label: 'Admin' },
                                        { value: 2, label: 'Employee' },
                                    ]}
                                />
                            </Form.Item>
                        </Col>

                    </Row>


                    <Row className="flex justify-center">
                        <Col xs={8} md={4} lg={4}>
                            <Button
                                block
                                size="large"
                                htmlType="submit"
                                className={
                                    editLoading || addLoading
                                        ? "bg-white rounded-md "
                                        : "bg-page rounded-md text-white px-52"
                                }
                                disabled={editLoading || addLoading}
                            >
                                {addLoading || editLoading ? (
                                    <Spin spinning={addLoading || editLoading}></Spin>
                                ) : (
                                    "Save"
                                )}
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Modal>

            {/* delete modal */}
            <Modal
                maskClosable={false}
                bodyStyle={{ paddingTop: "2rem", paddingBottom: "2rem" }}
                title="Delete Task"
                centered
                open={showDeleteModal}
                onOk={() => onDelete()}
                // confirmLoading={isLoading}
                onCancel={handleShowDeleteModal}
                okText="Delete"
                okButtonProps={{ danger: true }}
                width={420}
            >
                <p>Are you sure you want to delete this User ?</p>
            </Modal>
        </div>
    )
}

export default User