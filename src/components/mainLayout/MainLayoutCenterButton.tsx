import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "@/store/useUserStore";
import axiosInstance from "@/service/axios";
import { CenterDataResponseType } from "@components/mainLayout/type";
import DropDownComponent from "@components/mainLayout/components/DropDownComponent";

const MainLayoutCenterButton = () => {
  const { setCenterCode, centerCode } = useUserStore();
  const queryClient = useQueryClient();
  const { data: centerData, isLoading } = useQuery({
    queryKey: ["centerData"],
    queryFn: async () => {
      const data = (await axiosInstance.get(
        "/center/all",
      )) as CenterDataResponseType;
      if (data?.status === 200) {
        setCenterCode(
          data?.data?.centers?.find((center) => center.isActive === true)?.code,
        );
      }
      return data;
    },
  });
  const centerList = centerData?.data?.centers?.map((center) => {
    return {
      name: center.name,
      id: center.code,
    };
  });

  const mutationData = useMutation({
    mutationFn: async (selectedCenterKey: string) => {
      await axiosInstance.put(`/center/active?centerCode=${selectedCenterKey}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    onError: (error) => console.error("onerror:", error),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  const handleCenterChange = (centerCode: string) => {
    setCenterCode(centerCode);
    mutationData.mutate(centerCode);
  };
  return (
    <>
      <DropDownComponent
        onChange={handleCenterChange}
        className="w-[200px]"
        options={centerList}
        value={centerCode}
      />
    </>
  );
};

export default MainLayoutCenterButton;
