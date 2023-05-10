import { getRequirementDetails } from "@/services/requirements";
import { dateGenerator } from "@/utils/date";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useRequirementDetails = () => {
  const router = useRouter();
  const { requirementId } = router.query;
  const [viewData, setViewData] = useState<any>();
  const { data: requirementDetails, isLoading: detailLoadingRequirements } =
    useQuery(
      ["requirementDetails", requirementId],
      () => {
        return getRequirementDetails(requirementId as string);
      },
      {
        enabled: !!requirementId,
        retry: 1,
      }
    );
  console.log("**", requirementDetails);
  const getDetails = (requirementDetails: any) => {
    const details = requirementDetails?.data?.data;
    const createdDate = dateGenerator(details?.createdAt);
    const updatedDate = dateGenerator(details?.updatedAt);
    const viewData: any = {
      companyName: details?.company?.name,
      assignedTo: details?.assignedTo?.name,
      budget: details?.budgetInr,
      experienceRange: `${details?.minExperience} - ${details?.maxExperience} years`,
      noOfProfiles: details?.noOfDevelopers,
      createdAt: createdDate,
      location: details?.locations,
      skills: details?.skills,
      duration: `${details?.durationInMonths} months`,
      createdBy: details?.createdBy?.name,
      updatedAt: updatedDate,
    };
    setViewData(viewData);
  };

  useEffect(() => {
    getDetails(requirementDetails);
  }, [requirementDetails]);

  return { viewData, detailLoadingRequirements };
};

export default useRequirementDetails;
