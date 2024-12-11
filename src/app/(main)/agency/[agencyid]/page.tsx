import React from "react";

const Page = async ({ params }: { params: { agencyid: string } }) => {
  const { agencyid } = await params;
  return <div>{agencyid}</div>;
};

export default Page;
