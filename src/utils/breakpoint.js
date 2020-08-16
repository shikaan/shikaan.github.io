import {numberBreakpoint} from "~theme/variables";
import {getGlobal} from "~/utils";

export const getViewportWidth = () => {
  const global = getGlobal();
  return global?.innerWidth ?? global?.document?.documentElement?.clientWidth; 
};

export const isMobile = () => {
  const viewportWidth = getViewportWidth();
  return viewportWidth < numberBreakpoint.sm;
};

export const isTablet = () => {
  const viewportWidth = getViewportWidth();
  return numberBreakpoint.sm <= viewportWidth && viewportWidth < numberBreakpoint.md;
};

export const isDesktop = () => {
  const viewportWidth = getViewportWidth();
  return numberBreakpoint.md <= viewportWidth;
};
