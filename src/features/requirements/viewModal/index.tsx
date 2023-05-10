import { Col, Row, Skeleton, Card } from "antd";
import React from "react";
import useRequirementDetails from "./views/useRequirementDetails";

const RequirementViewModal = () => {
  const { viewData, detailLoadingRequirements } = useRequirementDetails();

  return (
    <Card
      className="mt-10"
      headStyle={{ background: "#30007E0D" }}
      title={
        <span className="text-2xl font-semibold">Requirement Details</span>
      }
    >
      {detailLoadingRequirements ? (
        <Skeleton active />
      ) : (
        <div>
          <Row gutter={24}>
            <Col
              className="text-lg mt-5"
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={12}
            >
              <div className="text-grey ">Company Name </div>
              <div className="text-main ">{viewData?.companyName}</div>
            </Col>
            <Col
              className="text-lg mt-5"
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={12}
            >
              <div className="text-grey ">Exprience Range </div>
              <div className="text-main ">{viewData?.experienceRange}</div>
            </Col>
            <Col
              className="text-lg mt-5"
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={12}
            >
              <div className="text-grey ">Number of Profiles </div>
              <div className="text-main ">{viewData?.noOfProfiles}</div>
            </Col>
            <Col
              className="text-lg mt-5"
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={12}
            >
              <div className="text-grey ">
                Budget Per Month(exclusive of all taxes)
              </div>
              <div className="text-main ">₹ {viewData?.budget}</div>
            </Col>
            <Col
              className="text-lg mt-5"
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={12}
            >
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
            <Col
              className="text-lg mt-5"
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={12}
            >
              <div className="text-grey ">Duration</div>
              <div className="text-main ">{viewData?.duration}</div>
            </Col>
            <Col
              className="text-lg mt-5"
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={12}
            >
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
            {viewData?.assignedTo != undefined && (
              <Col
                className="text-lg mt-5"
                xs={24}
                sm={24}
                md={12}
                lg={12}
                xl={12}
              >
                <div className="text-grey ">Assigned to</div>
                <div className="text-main ">{viewData?.assignedTo}</div>
              </Col>
            )}
            <Col
              className="text-lg mt-5"
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={12}
            >
              <div className="text-grey ">Created At</div>
              <div className="text-main ">{viewData?.createdAt}</div>
            </Col>
            <Col
              className="text-lg mt-5"
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={12}
            >
              <div className="text-grey ">Updated At </div>
              <div className="text-main ">{viewData?.updatedAt}</div>
            </Col>
            <Col
              className="text-lg mt-5"
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={12}
            >
              <div className="text-grey ">Created By</div>
              <div className="text-main ">{viewData?.createdBy}</div>
            </Col>
          </Row>
        </div>
      )}
    </Card>
  );
};

export default RequirementViewModal;
