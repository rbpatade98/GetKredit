export const recycleBinParser = (data) => {
  return (
    data?.map((item) => ({
      id: item?.id ?? null,
      name: item?.name ?? "N/A",
      roles: item?.roles ?? "N/A",
      employeeNo: item?.employeeNo ?? "N/A",
      JoinningDate: item?.JoinningDate ?? "N/A",
      DeletedDate: item?.DeletedDate ?? "N/A",
    })) || []
  );
};
