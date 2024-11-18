"use server";

import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { db } from "./db";
import { redirect } from "next/navigation";
import { User } from "@prisma/client";

export const getAuthUserDetails = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) return;

  const userData = await db.user.findUnique({
    where: { email: clerkUser.emailAddresses[0].emailAddress },
    include: {
      Agency: {
        include: {
          SidebarOption: true,
          SubAccount: {
            include: {
              SidebarOption: true,
            },
          },
        },
      },
      Permissions: true,
    },
  });
  return userData;
};

export const createTeamUser = async (agencyId: string, user: User) => {
  if (user.role === "AGENCY_OWNER") return null;
  const response = await db.user.create({ data: { ...user } });
  return response;
};

export const saveActivityLogNotification = async ({
  agencyId,
  description,
  subaccountId,
}: {
  agencyId?: string;
  description: string;
  subaccountId?: string;
}) => {
  const authUser = await currentUser();
  let userData;
  if (!authUser) {
    const response = await db.user.findFirst({
      where: { Agency: { SubAccount: { some: { id: subaccountId } } } },
    });
    if (response) userData = response;
  } else {
    userData = await db.user.findUnique({
      where: { email: authUser.emailAddresses[0].emailAddress },
    });
  }
  if (!userData) {
    console.log("Could not find a user");
    return;
  }

  let foundAgencyId = agencyId;
  if (!foundAgencyId) {
    if (!subaccountId) {
      throw new Error(
        "You need to provide atleast an agency Id or a subaccount Id"
      );
    }
    const response = await db.subAccount.findUnique({
      where: { id: subaccountId },
    });

    if (response) foundAgencyId = response.agencyId;
  }
  if (subaccountId) {
    await db.notification.create({
      data: {
        notification: `${userData.name} | ${description}`,
        User: { connect: { id: userData.id } },
        Agency: { connect: { id: foundAgencyId } },
        SubAccount: { connect: { id: subaccountId } },
      },
    });
  } else {
    await db.notification.create({
      data: {
        notification: `${userData.name} | ${description}`,
        User: { connect: { id: userData.id } },
        Agency: { connect: { id: foundAgencyId } },
      },
    });
  }
};

export const verifyAndAcceptInvitation = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) return redirect("/sign-in");

  const invitationExists = await db.invitation.findUnique({
    where: {
      email: clerkUser.emailAddresses[0].emailAddress,
      status: "PENDING",
    },
  });

  if (invitationExists) {
    const userDetails = await createTeamUser(invitationExists.agencyId, {
      email: invitationExists.email,
      agencyId: invitationExists.agencyId,
      avatarUrl: clerkUser.imageUrl,
      id: clerkUser.id,
      name: `${clerkUser.firstName} ${clerkUser.lastName}`,
      role: invitationExists.role,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await saveActivityLogNotification({
      agencyId: invitationExists?.agencyId,
      description: "Joined!",
      subaccountId: undefined,
    });

    if (userDetails) {
      await (
        await clerkClient()
      ).users.updateUserMetadata(clerkUser.id, {
        privateMetadata: {
          role: userDetails.role || "SUBACCOUNT_USER",
        },
      });

      await db.invitation.delete({ where: { email: userDetails.email } });

      return userDetails.agencyId;
    } else return null;
  } else {
    const agency = await db.user.findUnique({
      where: { email: clerkUser.emailAddresses[0].emailAddress },
    });

    return agency ? agency.agencyId : null;
  }
};
