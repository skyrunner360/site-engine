import { db } from "@/lib/db";
import React from "react";

type Props = {
  agencyId: string;
};

const Page = async ({ agencyId }: Props) => {
  const authUser = await db.user.findMany({
    where: { Agency: { id: agencyId } },
    include: {
      Agency: { include: { SubAccount: true } },
      Permissions: { include: { SubAccount: true } },
    },
  });
  if (!authUser) return null;
  const agencyDetails = await db.agency.findUnique({
    where: { id: agencyId },
    include: {
      SubAccount: true,
    },
  });
  if (!agencyDetails) return null;
  return <div>Team Page</div>;
};

export default Page;
