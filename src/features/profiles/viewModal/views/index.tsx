import { Col, Row, Skeleton, Card } from "antd";
import React, { Fragment } from "react";
import useProfileDetails from "./useProfileDetails";

const ProfileViewModal = () => {
  const { viewData, detailLoadingProfiles } = useProfileDetails();

  return (
    <Card className="mt-10" headStyle={{background:"#30007E0D"}} title={<span className="text-2xl font-semibold">Profile Details</span>}>
      {detailLoadingProfiles ? (
        <Skeleton active />
      ) : (
          <div>
            <Row>
              <Col xs={24} sm={24} md={12} lg={12} xl={12} className="mt-5 text-lg">
                <div className="text-grey ">Name of Profile </div>
                <div className="text-main ">{viewData?.nameOfProfile}</div>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12} className="mt-5 text-lg">
                <div className="text-grey ">Vendor Name </div>
                <div className="text-main ">{viewData?.vendorName}</div>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12} className="mt-5 text-lg">
                <div className="text-grey ">Experience</div>
                <div className="text-main ">{viewData?.experience}</div>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12} className="mt-5 text-lg">
                <div className="text-grey ">Skills</div>
                <div className="text-main ">
                  {viewData?.skills?.map((each: any, index: number) => {
                    return (
                      <span key={each.id}>
                        {each.name}

                        {index != viewData?.skills?.length - 1 ? ", " : " "}
                      </span>
                    );
                  })}
                </div>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12} className="mt-5 text-lg">
                <div className="text-grey ">Location / Remote </div>
                <div className="text-main ">
                  {viewData?.location?.map((each: any, index: number) => {
                    return (
                      <span key={each.id}>
                        {each.name}

                        {index != viewData?.location?.length - 1 ? ", " : " "}
                      </span>
                    );
                  })}
                </div>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12} className="mt-5 text-lg">
                <div className="text-grey ">Cost per month</div>
                <div className="text-main ">₹ {viewData?.cost}</div>
              </Col>
              {viewData?.email && (
                <Col
                  xs={24}
                  sm={24}
                  md={12}
                  lg={12}
                  xl={12}
                  className="mt-5 text-lg"
                >
                  <div className="text-grey ">Email ID</div>
                  <div className="text-main ">{viewData.email}</div>
                </Col>
              )}
              {viewData?.mobile && (
                <Col className="mt-5 text-lg">
                  <div className="text-grey ">Mobile Number</div>
                  <div className="text-main ">{viewData?.mobile}</div>
                </Col>
              )}
              <Col xs={24} sm={24} md={12} lg={12} xl={12} className="mt-5 text-lg">
                <div className="text-grey ">Created At</div>
                <div className="text-main ">{viewData?.createdAt}</div>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12} className="mt-5 text-lg">
                <div className="text-grey ">Updated At </div>
                <div className="text-main ">{viewData?.updatedAt}</div>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12} className="mt-5 text-lg">
                <div className="text-grey ">Created By</div>
                <div className="text-main ">{viewData?.createdBy}</div>
              </Col>
            </Row>
          </div>
      )}
    </Card>
  );
};

export default ProfileViewModal;
