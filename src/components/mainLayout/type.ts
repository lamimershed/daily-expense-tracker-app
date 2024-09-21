export type UserRole = "SUPER_ADMIN";

export type Permission =
  | "CENTER_VIEW"
  | "LEADS_TAB"
  | "PACKAGES_TAB"
  | "LEADS_ASSIGNED_FIELD"
  | "FOCUS_TAB"
  | "USER_ROLE_TAB"
  | "BLALCK_LIST_TAB"
  | "LEAD_ASSIGNED_TO"
  | "LEADS_PHONE_NUMBER_FIELD"
  | "CREATE_LEAD"
  | "TASK_TAB"
  | "TARGET_MANAGEMENT_TAB"
  | "KARECHAT_TAB"
  | "DELETE_ENQUIRY"
  | "LEAD_CENTER"
  | "ROLES_AND_PERMISSION_TAB"
  | "LEAD_MANGEMENT"
  | "SETTINGS_TAB"
  | "MANAGE_PHONE_NUMBER"
  | "ANALYTICS_TAB";

export type Platform =
  | "KARECHAT_MODULE"
  | "LEADS_MODULE"
  | "PANEL_MODULE"
  | "TASK_MODULE"
  | "FOCUS_MODULE"
  | "ANALYTICS_MODULE";

export interface PlatformDetailsResponseType {
  username: string;
  name: string;
  role: UserRole;
  id: number;
  code: string;
  permissions: Permission[];
  isWhatsappActive: boolean;
  kareflowUrl: string;
  activeCenter: string | null;
  logo: string;
  platforms: Platform[];
}

export interface CenterDataResponseType {
  data: {
    centers: {
      name: string;
      code: string;
      id: number;
      isActive: boolean;
    }[];
  };
  status: number;
}
