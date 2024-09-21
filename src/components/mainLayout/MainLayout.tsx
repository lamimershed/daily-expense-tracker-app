import React, { ReactElement, ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/utils/cn";
// svgs
import {
  AnalyticsIcon,
  FocusIcon,
  KareChatIcon,
  LeadIcon,
  LogoutIcon,
  SettingsIcon,
} from "@/components/mainLayout/icons/MenuIcons";
// images
// import hexIcon from '@components/mainLayout/icons/hex.svg';
import avatarIcon from "@components/mainLayout/icons/avatar-dummy1.png";
import MainLayoutCenterButton from "@components/mainLayout/MainLayoutCenterButton";
import { useUserPlatformDetailService } from "@components/mainLayout/services";
import {
  getGreeating,
  platformPermissionsCheck,
} from "@components/mainLayout/utils";
import { useQueryClient } from "@tanstack/react-query";
// import { ProgressBarComponent } from '../common/ProgressBarComponent';

// ======== feature under development =========
// import bellIcon from '@components/mainLayout/icons/bell.svg';
// import profileDropDownIcon from '@components/mainLayout/icons/profileDropDownIcon.svg';
// import dropDownIcon from '@components/mainLayout/icons/dropDownArrow.svg';
// import timerIcon from '@components/mainLayout/icons/timer.svg';

const MainLayout = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useUserPlatformDetailService();
  // const { setToken } = useUserStore();
  if (isLoading) {
    return (
      <div className="flex h-[100vh] w-full flex-col items-center justify-center p-3">
        {/* <ProgressBarComponent /> */}
        Loading......
      </div>
    );
  }
  return (
    <div className="flex h-[100vh] w-full flex-col p-3">
      {/* header */}
      <div className="flex h-[9vh] w-full gap-[10px] bg-white">
        <div className="flex h-[9vh] min-w-[9vh] items-center justify-center rounded-md border-[1px] border-[#E5EBEE]">
          <img
            className="h-[55px] w-[55px] object-contain"
            src={data?.logo}
            alt="icon"
          />{" "}
        </div>
        {/* side header */}
        <div className="flex h-auto w-full items-center justify-between overflow-hidden rounded-md border-[1px] border-[#E5EBEE] bg-white px-[20px]">
          {/* first section */}
          <div className="flex flex-col">
            <h1 className="text-[14px] font-medium">
              {" "}
              {getGreeating()}{" "}
              <span className="text-[#00B297]">{data?.name}</span>
            </h1>
            <p className="text-[12px] text-[#767676]">
              {" "}
              manage your sales leads effectively{" "}
            </p>
          </div>
          {/* second section */}
          <div className="flex items-center gap-[15px]">
            {/* ======== feature under development ========= */}
            {/* <img
              src={bellIcon}
              alt='notification'
              className='h-[24px] w-[24px]'
            /> */}
            {/* <button className='flex h-[34px] items-center justify-center gap-[10px] rounded-[6px] border border-[#ADE7DE] bg-[#E7FDF9] px-[20px] text-[12px] font-semibold'>
              Kinder Hospital, Kochi
              <img
                src={dropDownIcon}
                alt='notification'
                className='h-[15px] w-[15px]'
              />
            </button> */}
            {data?.permissions?.includes("CENTER_VIEW") && (
              <MainLayoutCenterButton />
            )}
            {/* ======== feature under development ========= */}
            {/* <button className='flex h-[34px] items-center justify-center gap-[10px] rounded-[6px] border border-[#ADE7DE] bg-gradient-to-r from-[#276175] to-[#2F4858] px-[10px] text-[12px] font-semibold text-white'>
              <img
                src={timerIcon}
                alt='check-in'
                className='h-[12px] w-[12px]'
              />
              Check - In
            </button> */}
            {/* profile */}
            <div className="h-[80px] border-l border-[#E5EBEE]"></div>
            <button className="flex h-full w-[60px] items-center justify-center gap-[5px]">
              <div className="justify-centers flex h-[35px] w-[35px] items-center rounded-full border border-[#74F6E2] bg-gray-200">
                <img
                  src={avatarIcon}
                  alt="notification"
                  className="h-[35px] w-[35px]"
                />
              </div>
              {/* ======== feature under development ========= */}
              {/* <img
                src={profileDropDownIcon}
                alt='notification'
                className='h-[10px] w-[10px]'
              /> */}
            </button>
          </div>
        </div>
      </div>
      {/* =========== side bar ========== */}
      <div className="mt-[10px] flex h-[88vh] w-full">
        <div className="flex h-full w-[9vh] flex-col justify-center gap-[20px] rounded-md border-[1px] border-[#E5EBEE]">
          {platformPermissionsCheck({
            platformPermission: "FOCUS_MODULE",
            tabPermission: "FOCUS_TAB",
            data,
          }) && (
            <IconBox
              Icon={<FocusIcon />}
              title="Focus Mode"
              link={`${import.meta.env.VITE_FOCUS_MODULE_URL}`}
            />
          )}
          {platformPermissionsCheck({
            platformPermission: "LEADS_MODULE",
            tabPermission: "LEADS_TAB",
            data,
          }) && (
            <IconBox
              Icon={<LeadIcon />}
              title="Leads"
              link={`${import.meta.env.VITE_LEADS_MODULE_URL}`}
            />
          )}
          {platformPermissionsCheck({
            platformPermission: "KARECHAT_MODULE",
            tabPermission: "KARECHAT_TAB",
            data,
          }) && (
            <IconBox
              Icon={<KareChatIcon />}
              title="KareChat"
              link={`${import.meta.env.VITE_CHAT_MODULE_URL}`}
            />
          )}
          {platformPermissionsCheck({
            platformPermission: "PANEL_MODULE",
            tabPermission: "SETTINGS_TAB",
            data,
          }) && (
            <IconBox
              Icon={<SettingsIcon />}
              title="Settings"
              link={`${import.meta.env.VITE_SETTINGS_MODULE_URL}`}
              fills
            />
          )}
          {platformPermissionsCheck({
            platformPermission: "ANALYTICS_MODULE",
            tabPermission: "ANALYTICS_TAB",
            data,
          }) && (
            <IconBox
              Icon={<AnalyticsIcon />}
              title="Analytics"
              link={`${import.meta.env.VITE_ANALYTICS_MODULE_URL}`}
            />
          )}
          <IconBox
            onClick={() => {
              const logoutConformation = window.confirm(
                "are you sure you want to logout?",
              );
              if (logoutConformation) {
                window.localStorage.removeItem("token");
                queryClient.invalidateQueries();
                window.location.reload();
              }
            }}
            Icon={<LogoutIcon />}
            title="Logout"
            link="/"
          />
        </div>
        <div className="bg-white-200 ml-[10px] flex max-h-[88vh] w-full flex-col overflow-hidden rounded-md shadow-[0px_0px_10px_#00000030]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;

const IconBox = ({
  Icon,
  title,
  link,
  fills,
  onClick,
}: {
  title: string;
  Icon: ReactElement;
  link: string;
  fills?: boolean;
  onClick?: () => void;
}) => {
  return (
    <Link
      onClick={onClick}
      to={link}
      className="group flex flex-col items-center justify-center gap-[4px] rounded-[7px] py-[5px] hover:bg-[#00CFAF]"
    >
      {React.cloneElement(Icon, {
        className: cn(
          "2xl:w-[24px] stroke-[#292D32] group-hover:stroke-white 2xl:h-[24px]",
          fills && " fill-black group-hover:fill-white ",
          // &&' fill-black group-hover:fill-white '
        ),
      })}
      <p className="text-nowrap text-[12px] font-medium text-[#7b7b7b] group-hover:text-white">
        {title}
      </p>
    </Link>
  );
};
