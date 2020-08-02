/**
 * @param {Array<{reference: string}>} microcopy
 * @param {string} key
 * @return {string}
 */
export const getMicrocopy = (microcopy, key) => {
  return microcopy.find(i => i.reference === key) ?? '';
};

/**
 * @param {Array<{reference: string}>} sections
 * @param {string} key
 * @return {string}
 */
export const getSection = (sections, key) => {
  return sections.find(i => i.reference === key) ?? {reference: key};
};