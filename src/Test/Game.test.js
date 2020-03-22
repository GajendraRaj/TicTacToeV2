import React from "react";
import { shallow, mount } from "enzyme";
import Game from "../component/Game";
import { constants } from "../constants";
import Square from "../component/Square";

describe("Game component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Game />);
  });

  it("should have the player X as default active player", () => {
    expect(wrapper.find("h4").text()).toEqual(
      constants.PLAYER_NEXT + " " + constants.PLAYER_X
    );
  });

  it("Should render the Square component", () => {
    expect(wrapper.find(Square).length).toEqual(9);
  });

  it("Should have 9 squares in the board", () => {
    expect(wrapper.find("ul li").length).toEqual(9);
  });
});

describe("Game component functionality", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Game />);
  });

  it("Should display default active player name as squares text on square click", () => {
    const squareButtonList = wrapper.find("ul li .square-button");

    wrapper
      .find("ul li .square-button")
      .at(1)
      .simulate("click");

    expect(squareButtonList.at(1).text()).toEqual(constants.PLAYER_X);
  });

  it("Should update the filled square with active player", () => {
    const squareButton1 = wrapper.find("ul li button").at(0);
    const squareButton4 = wrapper.find("ul li button").at(4);

    squareButton1.simulate("click");
    squareButton4.simulate("click");

    expect(squareButton1.text()).toEqual(constants.PLAYER_X);
    expect(squareButton4.text()).toEqual(constants.PLAYER_O);
  });

  it("Should display win message if any row completed by active player", () => {
    const squareButtonList = wrapper.find("ul li .square-button");
    const squareButton0 = squareButtonList.at(0);
    const squareButton1 = squareButtonList.at(1);
    const squareButton2 = squareButtonList.at(2);
    const squareButton3 = squareButtonList.at(3);
    const squareButton4 = squareButtonList.at(5);

    squareButton0.simulate("click");
    squareButton3.simulate("click");
    squareButton1.simulate("click");
    squareButton4.simulate("click");
    squareButton2.simulate("click");

    const winnerMessage = wrapper.find("p").at(0);
    expect(winnerMessage.text()).toEqual("Player X win the game");
  });

  it("Should display win message if any column completed by active player", () => {
    const squareButtonList = wrapper.find("ul li .square-button");
    const squareButton0 = squareButtonList.at(0);
    const squareButton1 = squareButtonList.at(1);
    const squareButton3 = squareButtonList.at(3);
    const squareButton4 = squareButtonList.at(4);
    const squareButton6 = squareButtonList.at(6);

    squareButton0.simulate("click");
    squareButton1.simulate("click");
    squareButton3.simulate("click");
    squareButton4.simulate("click");
    squareButton6.simulate("click");

    const winnerMessage = wrapper.find("p").at(0);
    expect(winnerMessage.text()).toEqual("Player X win the game");
  });
});
