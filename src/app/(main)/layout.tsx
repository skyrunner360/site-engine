import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }} afterSignOutUrl={"/"}>
      {children}
    </ClerkProvider>
  );
};

export default Layout;
