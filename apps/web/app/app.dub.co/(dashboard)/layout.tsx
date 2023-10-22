import { constructMetadata } from "@dub/utils";
import { ReactNode } from "react";

export const metadata = constructMetadata();

export default function DashboardRootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="min-h-screen w-full bg-gray-50">{children}</div>;
}
