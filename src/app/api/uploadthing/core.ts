import { auth, getAuth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const authenticateUser = async () => {};

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  subaccountLogo: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(({ req }) => {
      const userId = getAuth(req);
      // If you throw, the user will not be able to upload
      if (!userId) throw new UploadThingError("Unauthorized");
      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return userId;
    })
    .onUploadComplete(() => {}),
  avatar: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(({ req }) => {
      const userId = getAuth(req);
      if (!userId) throw new UploadThingError("Unauthorized");
      return userId;
    })
    .onUploadComplete(() => {}),
  agencyLogo: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(({ req }) => {
      const userId = getAuth(req);
      if (!userId) throw new UploadThingError("Unauthorized");
      return userId;
    })
    .onUploadComplete(() => {}),
  media: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(({ req }) => {
      const userId = getAuth(req);
      if (!userId) throw new UploadThingError("Unauthorized");
      return userId;
    })
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
