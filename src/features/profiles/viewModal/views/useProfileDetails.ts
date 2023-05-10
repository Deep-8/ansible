import { IprofileByIdPayload } from "@/interfaces/profiles";
import { getProfileByID } from "@/services/profiles";
import { dateGenerator } from "@/utils/date";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const useProfileDetails = () => {
  const router = useRouter();
  const { profileId } = router.query;
  const [viewData, setViewData] = useState<any>();
  const profileByIdPayload: IprofileByIdPayload = {
    params: {
      include: "locations,skills,vendor,createdBy",
    },
  };
  const { data: profileDetails, isLoading: detailLoadingProfiles } = useQuery(
    ["profileDetails", profileId],
    () => {
      return getProfileByID(profileByIdPayload, profileId as string);
    },
    {
      enabled: !!profileId,
      retry: 1,
    }
  );

  const getDetails = (profileDetails: any) => {
    const details = profileDetails?.data;

    const createdDate = dateGenerator(details?.createdAt);
    const updatedDate = dateGenerator(details?.updatedAt);
    const viewData: any = {
      nameOfProfile: details?.name,
      vendorName: details?.vendor?.name,
      cost: details?.costInr,
      experience: `${details?.experience} years`,
      createdAt: createdDate,
      location: details?.locations,
      skills: details?.skills,
      createdBy: details?.createdBy?.name,
      updatedAt: updatedDate,
      email: details?.email,
      mobile: details?.mobile,
    };
    setViewData(viewData);
  };

  useEffect(() => {
    getDetails(profileDetails);
  }, [profileDetails]);

  return { viewData, detailLoadingProfiles };
};

export default useProfileDetails;
