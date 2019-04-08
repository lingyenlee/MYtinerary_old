import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure, mount } from "enzyme";
import Cities from "./Cities";
import renderer from "react-test-renderer";
import getCities from "../actions/citiesActions";

configure({ adapter: new Adapter() });

describe("Cities component", () => {
  // test to render the component
  it("Should render without throwing an error", () => {
    const wrapper = shallow(<Cities />);
    expect(wrapper.find(".Cities")).toBeDefined();
  });

  // create a snapshot of the cities component
  //   it("renders correctly", () => {
  //     const wrapper = renderer.create(<Cities />).toJSON();
  //     expect(wrapper).toMatchSnapshot();
  //   });
});
