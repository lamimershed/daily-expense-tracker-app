import { useQuery } from "@tanstack/react-query";
import { PlatformDetailsResponseType } from "@components/mainLayout/type";
import axiosInstance from "@/service/axios";

export const useUserPlatformDetailService = () => {
  return useQuery({
    queryKey: ["user/platform/detail"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/user/platform/detail`);
      return data as PlatformDetailsResponseType;
    },
  });
};
