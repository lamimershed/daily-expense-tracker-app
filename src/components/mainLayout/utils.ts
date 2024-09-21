import { useUserPlatformDetailService } from "./services";
import { Permission, Platform } from "./type";
export const getGreeating = () => {
  const date = new Date();
  const hours = date.getHours();
  if (hours < 12) {
    return "Good morning";
  }
  if (hours < 16) {
    return "Good afternoon";
  }
  return "Good evening";
};

export const platformPermissionsCheck = ({
  platformPermission,
  tabPermission,
  data,
}: {
  platformPermission: Platform;
  tabPermission: Permission;
  data: ReturnType<typeof useUserPlatformDetailService>["data"];
}) => {
  return (
    data?.permissions.includes(tabPermission) &&
    data?.platforms.includes(platformPermission)
  );
};
