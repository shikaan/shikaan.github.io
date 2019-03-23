import React from "react";
import {shallow, mount} from "enzyme";
import "jest-styled-components";

import {createArticle} from "./__fixtures__/create-article";
import {emptyData} from "./__fixtures__/empty-data";
import {createLocationWithQueryString} from "./__fixtures__/create-location-with-query";

import SearchPage from ".";

describe("SearchPage", () => {
  it("renders correctly", () => {
    const wrapper = shallow(
      <SearchPage
        content={{}}
        data={emptyData}
        location={createLocationWithQueryString("query=foo")}
      />);

    expect(wrapper).toMatchSnapshot();
  });

  describe("getSearchQuery", () => {
    it("returns an empty string if no query string", () => {
      const wrapper = mount(
        <SearchPage
          content={{}}
          data={emptyData}
          location={createLocationWithQueryString()}
        />);

      expect(wrapper.instance().getSearchQuery()).toHaveLength(0);
    });

    it("returns an the query under `query`", () => {
      const wrapper = mount(
        <SearchPage
          content={{}}
          data={emptyData}
          location={createLocationWithQueryString("query=foo")}
        />);

      expect(wrapper.instance().getSearchQuery()).toEqual("foo");
    });
  });

  describe("getTrendingTopics", () => {
    let getTrendingTopics;
    beforeAll(() => {
      const wrapper = mount(
        <SearchPage
          content={{}}
          data={emptyData}
          location={createLocationWithQueryString("sdfg=sdfgsdf")}
        />);

      getTrendingTopics = wrapper.instance().getTrendingTopics;
    });

    it("returns empty array if list is missing", () => {
      const result = getTrendingTopics([]);

      expect(result).toHaveLength(0);
    });

    it("returns no duplicates", () => {
      const result = getTrendingTopics([
        createArticle(["foo", "bar"]),
        createArticle(["foo", "baz"]),
      ]);

      expect(result).toEqual(["foo", "bar", "baz"]);
    });

    it("returns a list of maximum length provided", () => {
      const result = getTrendingTopics([
        createArticle(["foo", "bar"]),
        createArticle(["foo", "baz"]),
        createArticle(["goo", "bas"]),
      ], 3);

      expect(result).toEqual(["foo", "bar", "baz"]);
    });
  });

  describe("performSearch", () => {

    it("sets state only if query is longer than 3", (done) => {
      const data = {
        posts: {
          "edges": [
            createArticle(["foo"], "foo")
          ]
        }
      };

      const wrapper = mount(
        <SearchPage
          content={{}}
          data={data}
          location={createLocationWithQueryString()}
        />);

      const instance = wrapper.instance();

      instance
        .setState(
          {searchQuery: "fo"},
          () => {
            setTimeout(() => {
              expect(instance.state.searchResults).toBeNull();
              done();
            }, SearchPage.DEBOUNCE_INTERVAL * 2); // Wait for debounce to pass
          });
    });
    it("returns articles if query is included in title", (done) => {
      const data = {
        posts: {
          "edges": [
            createArticle(["foo"], "bar"),
            createArticle(["foo"], "baz")
          ]
        }
      };

      const wrapper = mount(
        <SearchPage
          content={{}}
          data={data}
          location={createLocationWithQueryString()}
        />);

      const instance = wrapper.instance();

      instance
        .setState(
          {searchQuery: "bar"},
          () => {
            setTimeout(() => {
              expect(instance.state.searchResults).toHaveLength(1);
              expect(instance.state.searchResults[0]).toHaveProperty("node.frontmatter.title", "bar");

              done();
            }, SearchPage.DEBOUNCE_INTERVAL * 2); // Wait for debounce to pass
          });
    });
    it("returns articles if query is included in topics", (done) => {
      const data = {
        posts: {
          "edges": [
            createArticle(["bar"], "foo"),
            createArticle(["baz"], "foo")
          ]
        }
      };

      const wrapper = mount(
        <SearchPage
          content={{}}
          data={data}
          location={createLocationWithQueryString()}
        />);

      const instance = wrapper.instance();

      instance
        .setState(
          {searchQuery: "bar"},
          () => {
            setTimeout(() => {
              expect(instance.state.searchResults).toHaveLength(1);
              expect(instance.state.searchResults[0]).toHaveProperty("node.frontmatter.tags", ["bar"]);

              done();
            }, SearchPage.DEBOUNCE_INTERVAL * 2); // Wait for debounce to pass
          });
    });
  });
});
