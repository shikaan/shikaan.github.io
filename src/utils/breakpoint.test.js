import {getViewportWidth} from "./breakpoint";

describe("breakpoint", () => {
  describe("getViewportWidth", () => {
    let originalInnerWidth;
    beforeAll(() => {
      originalInnerWidth = window.innerWidth;
    });
    afterEach(() => {
      window.innerWidth = originalInnerWidth;
    });
    it("returns innerWidth", () => {
      expect(getViewportWidth()).toEqual(window.innerWidth);
    });
    it("falls back to clientWidth", () => {
      window.innerWidth = undefined;
      expect(getViewportWidth()).toEqual(window.document.documentElement.clientWidth);
    });
  });
});
