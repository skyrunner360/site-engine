import { getAuthUserDetails } from "@/lib/queries";
import React from "react";
import MenuOptions from "./menu-options";

type Props = {
  id: string;
  type: "agency" | "subaccount";
};

const Sidebar = async ({ id, type }: Props) => {
  const user = await getAuthUserDetails();
  if (!user) return null;
  if (!user.Agency) return;

  const details =
    type === "agency"
      ? user.Agency
      : user.Agency.SubAccount.find((acc) => acc.id === id);
  const isWhiteLabeledAgency = user.Agency.whiteLabel;
  if (!details) return;
  let sidebarlogo = user.Agency.agencyLogo || "assets/site-logo.svg";
  const currentSubAccount = user?.Agency?.SubAccount.find(
    (acc) => acc.id === id,
  );
  if (!isWhiteLabeledAgency) {
    if (type === "subaccount") {
      sidebarlogo = currentSubAccount?.subAccountLogo || user.Agency.agencyLogo;
    }
  }
  const sidebarOpts =
    type === "agency"
      ? user.Agency.SidebarOption || []
      : currentSubAccount?.SidebarOption || [];

  const subaccounts = user.Agency.SubAccount.filter((subacc) =>
    user.Permissions.find((pm) => pm.subAccountId === subacc.id && pm.access),
  );
  return (
    <>
      <MenuOptions
        defaultOpen={true}
        details={details}
        id={id}
        sidebarLogo={sidebarlogo}
        sidebarOpt={sidebarOpts}
        subAccounts={subaccounts}
        user={user}
      />
      <MenuOptions
        details={details}
        id={id}
        sidebarLogo={sidebarlogo}
        sidebarOpt={sidebarOpts}
        subAccounts={subaccounts}
        user={user}
      />
    </>
  );
};

export default Sidebar;
