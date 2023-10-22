import { Divider } from "@/ui/shared/icons";
import { Logo } from "@dub/ui";
import { HOME_DOMAIN } from "@dub/utils";
import Link from "next/link";
import { ReactNode, Suspense } from "react";
import UserDropdown from "@/ui/layout/user-dropdown";
import ProjectSelect from "@/ui/layout/project-select";
import ProjectSelectPlaceholder from "@/ui/layout/project-select/placeholder";

export default function TopNav({ children }: { children?: ReactNode }) {
  return (
    <div className="flex h-16 items-center justify-between">
      <div className="flex items-center">
        <Link href="/">
          <Logo className="h-8 w-8 transition-all duration-75 active:scale-95" />
        </Link>
        <Divider className="h-8 w-8 text-gray-200 sm:ml-3" />
        <Suspense fallback={<ProjectSelectPlaceholder />}>
          <ProjectSelect />
        </Suspense>
        {children}
      </div>
      <div className="flex items-center space-x-6">
        <a
          href={`${HOME_DOMAIN}/changelog`}
          className="hidden text-sm text-gray-500 transition-colors hover:text-gray-700 sm:block"
          target="_blank"
        >
          Changelog
        </a>
        <a
          href={`${HOME_DOMAIN}/help`}
          className="hidden text-sm text-gray-500 transition-colors hover:text-gray-700 sm:block"
          target="_blank"
        >
          Help
        </a>
        <UserDropdown />
      </div>
    </div>
  );
}
