import React, { Component, Fragment } from "react";
import Footer from "./Footer";
import styled from "styled-components";


const LogoWrapper = styled.div`
  text-align: center;
`;

const Logo = styled.img`
  margin: 55px 0px;
  width: 80%;
  height: 10%;
`;

const Icon = styled.img`
  width: 100px;
  height: 100px;
`;

const TextWrapper = styled.div`
  text-align: center;
  p {
    font-size: 20px;
    padding: 10px 30px;
  }
  h4 {
    margin-top: 30px;
    margin-bottom: 8px;
  }
`;

const IconWrapper = styled.div`
  text-align: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

const FooterWrapper = styled.div`
margin-top: 20px;
text-align: center;
`;

class Home extends Component {
  render() {
    return (
      <Fragment>
        <LogoWrapper>
          <Logo
            src={require("../images/MYtineraryLogo.png")}
            alt={"company logo"}
          />
        </LogoWrapper>
        <TextWrapper>
          <p>
            Find your perfect trip, designed by insiders who know and love their
            cities.
          </p>

          <h4>Start browsing</h4>
        </TextWrapper>
        <IconWrapper>
          <Icon src={require("../images/circled-right-2.png")} alt={"enter"} />
        </IconWrapper>
        <TextWrapper>
          <p>Want to build your own MYtinerary?</p>
        </TextWrapper>
        <ButtonWrapper>
          <button>Log in</button>
          <button>Create Account</button>
        </ButtonWrapper>
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      </Fragment>
    );
  }
}

export default Home