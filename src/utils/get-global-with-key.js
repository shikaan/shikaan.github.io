export const getGlobalWithKey = (key = "location") => {
  return typeof window !== "undefined" ? window : {[key]: {}};
};
