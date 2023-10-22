import { ProjectContext } from "app/app.dub.co/(dashboard)/(projects)/[slug]/provider";
import { useContext } from "react";

export default function useProject() {
  const project = useContext(ProjectContext);
  return project;
}
