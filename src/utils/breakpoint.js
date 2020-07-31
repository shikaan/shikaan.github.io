import {numberBreakpoint} from "~theme/variables";

export const getViewportWidth = () => window.innerWidth || document.documentElement.clientWidth;

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