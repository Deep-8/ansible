import { useRouter } from "next/router";
import React, { Fragment } from "react";

const BreadCrumb = () => {
  const router = useRouter();
  return (
    <Fragment>
      {router.pathname.includes("companies") && (
        <div className="flex">
          <button
            className="text-grey-med text-base cursor-pointer"
            onClick={() =>
              router.push({
                pathname: "/dashboard/companies",
                query: { page: 1 },
              })
            }
          >
            Companies{" > "}
          </button>
          <div className="text-dark text-base ml-1">Company Details</div>
        </div>
      )}
      {router.pathname.includes("vendors") && (
        <div className="flex">
          <button
            className="text-grey-med text-base cursor-pointer"
            onClick={() =>
              router.push({
                pathname: "/dashboard/vendors",
                query: { page: 1 },
              })
            }
          >
            Vendors{" > "}
          </button>
          <div className="text-dark text-base ml-1">Vendor Details</div>
        </div>
      )}
      {router.pathname.includes("requirements") && (
        <div className="flex">
          <button
            className="text-grey-med text-base cursor-pointer"
            onClick={() =>
              router.push({
                pathname: "/dashboard/requirements",
                query: { page: 1 },
              })
            }
          >
            Requirements{" > "}
          </button>
          <div className="text-dark text-base ml-1">Requirement Details</div>
        </div>
      )}
      {router.pathname.includes("profiles") && (
        <div className="flex">
          <button
            className="text-grey-med text-base cursor-pointer"
            onClick={() =>
              router.push({
                pathname: "/dashboard/profiles",
                query: { page: 1 },
              })
            }
          >
            Profiles{" > "}
          </button>
          <div className="text-dark text-base ml-1">Profiles Details</div>
        </div>
      )}
    </Fragment>
  );
};

export default BreadCrumb;
