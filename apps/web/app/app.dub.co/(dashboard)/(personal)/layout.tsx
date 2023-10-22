import { MaxWidthWrapper } from "@dub/ui";
import { ReactNode, Suspense } from "react";
import NavTabs from "@/ui/layout/nav-tabs";
import TopNav from "@/ui/layout/top-nav";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="sticky left-0 right-0 top-0 z-20 border-b border-gray-200 bg-white">
        <MaxWidthWrapper>
          <TopNav />
          <Suspense fallback={<div className="h-12 w-full" />}>
            <NavTabs />
          </Suspense>
        </MaxWidthWrapper>
      </div>
      {children}
    </>
  );
}
