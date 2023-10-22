"use client";

import { ReactNode, createContext, useState } from "react";
import { ProjectProps } from "@/lib/types";
import AcceptInviteModal from "@/ui/modals/accept-invite-modal";

export const ProjectContext = createContext<
  ProjectProps & {
    isOwner: boolean;
    exceededUsage: boolean;
  }
>({} as any);

export default function ProjectProvider({
  project,
  pendingInvites,
  children,
}: {
  project: ProjectProps;
  pendingInvites: any;
  children: ReactNode;
}) {
  const [showAcceptInviteModal, setShowAcceptInviteModal] = useState(false);

  if (pendingInvites) {
    setShowAcceptInviteModal(true);
    return (
      <AcceptInviteModal
        showAcceptInviteModal={showAcceptInviteModal}
        setShowAcceptInviteModal={setShowAcceptInviteModal}
      />
    );
  }

  return (
    <ProjectContext.Provider
      value={{
        ...project,
        isOwner:
          project?.users && project.users[0].role === "owner" ? true : false,
        exceededUsage: project.usage > project.usageLimit,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}
