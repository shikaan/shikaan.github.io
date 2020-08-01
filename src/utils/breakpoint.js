import {numberBreakpoint} from "~theme/variables";
import {getGlobalWithKey} from "~/utils/get-global-with-key";

export const getViewportWidth = () => getGlobalWithKey("innerWidth") ?? getGlobalWithKey("document").documentElement.clientWidth;

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