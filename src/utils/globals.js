export const getGlobalWithKey = (key = "location") => {
  return typeof window !== "undefined" ? window : {[key]: {}};
};

export const getGlobal = () => { 
  // eslint-disable-next-line no-restricted-globals
  if (typeof self !== "undefined") { return self }
  if (typeof window !== "undefined") { return window } 
  if (typeof global !== "undefined") { return global } 
  throw new Error("unable to locate global object"); 
}; 
