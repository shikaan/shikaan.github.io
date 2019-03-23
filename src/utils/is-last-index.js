export const isLastIndex = (list, index) => {
  if (!Array.isArray(list)) {
    return false;
  }

  return index === list.length - 1;
};
