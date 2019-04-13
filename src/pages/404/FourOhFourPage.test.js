import React from "react";
import {mount, shallow} from "enzyme";
import "jest-styled-components";

import FourOhFour from ".";

const createFourOhFourProps = (navigateStub = jest.fn(), slug = "/slug") => {
  return {
    navigate: navigateStub,
    data: {
      featuredArticle: {
        fields: {
          slug
        }
      }
    }
  };
};

describe("FourOhFour", () => {
  describe("openTrendingArticle", () => {
    it("calls navigate with correct argument", () => {
      const navigateStub = jest.fn();
      const props = createFourOhFourProps(navigateStub);

      const wrapper = mount(<FourOhFour {...props}></FourOhFour>);

      wrapper.instance().openTrendingArticle();

      expect(navigateStub).toHaveBeenCalledWith(props.data.featuredArticle.fields.slug);
    });
  });
});
