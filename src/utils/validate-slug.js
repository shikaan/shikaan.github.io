
export const validateSlug = (slug) => {
  return slug.startsWith("/") ? slug : `/${slug}`;
};