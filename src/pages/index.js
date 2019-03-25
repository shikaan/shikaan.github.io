import {navigate} from "~components/Link";

const Index = () => {
  if (typeof window !== "undefined") {
    navigate("/home", {replace: true});
  }

  return null;
};

export default Index;
