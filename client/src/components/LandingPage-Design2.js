import React, { Component } from "react";
import styled from "styled-components";
import Header from "./Header";
import CitySlider from "./CitySlider";

const LogoWrapper = styled.div`
  text-align: center;
`;

const Logo = styled.img`
  margin: 0px 0px;
  width: 80%;
  height: 10%;
`;

const Icon = styled.img`
  width: 100px;
  height: 100px;
`;

const TextWrapper = styled.div`
  p {
    text-align: center;
    font-size: 20px;
    margin: 0 20px;
  }
`;

const Text = styled.div`
  font-size: 20px;
  margin: 0 30px;
`;

const IconWrapper = styled.div`
  text-align: center;
  margin: 10px 0px;
`;

const SliderWrapper = styled.div`
  margin: 0px 5px;
`;

class Home extends Component {
  render() {
    return (
     
        <div>
          <Header />
          <LogoWrapper>
            <Logo
              src={require("../images/MYtineraryLogo.png")}
              alt={"company logo"}
            />
          </LogoWrapper>
          <TextWrapper>
            <p>
              Find your perfect trip, designed by insiders who know and love
              their cities.
            </p>
          </TextWrapper>

          {/* <h4>Start browsing</h4> */}

          <IconWrapper>
            <a>
              <Icon
                src={require("../images/circled-right-2.png")}
                alt={"enter"}
              />{" "}
            </a>
          </IconWrapper>
          <TextWrapper>
            <Text>Popular MYtinearies</Text>
          </TextWrapper>
          <SliderWrapper>
            <CitySlider />
          </SliderWrapper>
        </div>
  
    );
  }
}

export default Home;
