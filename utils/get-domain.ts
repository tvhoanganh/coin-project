const getDomain = () => {
  if (typeof window !== "undefined") {
    return `${window.location.origin}/public-api`;
  }
  return "";
};
export default getDomain;
