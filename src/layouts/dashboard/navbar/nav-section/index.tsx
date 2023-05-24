import { matchPath, useLocation } from "react-router-dom";

// ----------------------------------------------------------------------

export { default as NavSectionVertical } from "./NavSectionVertical";

export function isExternalLink(path: string): boolean {
  return path.includes("http");
}

export function getActive(path: string, pathname: string): boolean {
  return path ? !!matchPath({ path, end: false }, pathname) : false;
}
