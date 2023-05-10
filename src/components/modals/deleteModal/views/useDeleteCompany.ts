import { deleteCompany } from "@/services/company";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteCompany = (refetchAllCompanies: () => void) => {
  const client = useQueryClient();
  const { mutate, isSuccess, isLoading } = useMutation(
    (data: { ID: string; cardDelete?: boolean }) =>
      deleteCompany(data.ID, data.cardDelete || false),
    {
      onSuccess: () => {
        client.invalidateQueries(["allCompanies"]);
        refetchAllCompanies();
      },
    }
  );
  return { mutate, isSuccess, isLoading };
};
