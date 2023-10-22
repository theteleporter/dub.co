import { MaxWidthWrapper } from "@dub/ui";
import { ReactNode, Suspense } from "react";
import NavTabs from "@/ui/layout/nav-tabs";
import TopNav from "@/ui/layout/top-nav";
import { getPendingInvites, getProject } from "@/lib/fetchers";
import { getSession } from "@/lib/auth-app";
import ProjectProvider from "./provider";
import ProjectNotFound from "@/ui/projects/project-not-found";
import UpgradeBanner from "@/ui/layout/upgrade-banner";

export default async function ProjectLayout({
  params,
  children,
}: {
  params: {
    slug: string;
  };
  children: ReactNode;
}) {
  const [session, project] = await Promise.all([
    getSession(),
    getProject({ slug: params.slug }),
  ]);
  let pendingInvites;

  if (project && project.users) {
    // project exists but user is not part of it
    if (project.users.length === 0) {
      pendingInvites = await getPendingInvites({
        email: session.user.email,
        projectId: project.id,
      });
      if (!pendingInvites) {
        return <ProjectNotFound />;
      }
    }
  } else {
    // project doesn't exist
    // TODO: change this to notFound() when https://github.com/vercel/next.js/issues/55717 is fixed
    return <ProjectNotFound />;
  }

  return (
    <ProjectProvider project={project} pendingInvites={pendingInvites}>
      <div className="sticky left-0 right-0 top-0 z-20 border-b border-gray-200 bg-white">
        <MaxWidthWrapper>
          <TopNav>
            <UpgradeBanner />
          </TopNav>
          <Suspense fallback={<div className="h-12 w-full" />}>
            <NavTabs />
          </Suspense>
        </MaxWidthWrapper>
      </div>
      {children}
    </ProjectProvider>
  );
}
