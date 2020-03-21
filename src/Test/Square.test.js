import React from "react";
import { shallow } from "enzyme";
import Square from "../component/Square";

describe("Square component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Square />);
  });

  it("Should have button", () => {
    expect(wrapper.find("button").length).toEqual(1);
  });
});
