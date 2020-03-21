import React from "react";
import { shallow } from "enzyme";
import Square from "../component/Square";
import { constants } from "../constants";

describe("Square component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Square value={constants.PLAYER_X} />);
  });

  it("Should have the button", () => {
    expect(wrapper.find("button").length).toEqual(1);
  });

  it("Should have the button X as default button", () => {
    expect(wrapper.find("button").text()).toEqual(constants.PLAYER_X);
  });
});
