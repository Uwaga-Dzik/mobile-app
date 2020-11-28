import PropTypes from "prop-types";
import React from "react";
import {Platform, Text, TouchableWithoutFeedback, View} from "react-native";
import posed from "react-native-pose";
import {Link} from "react-router-native";
import styled from "styled-components";
import {menuLinks} from "../../../data/menuLinks";
import Hamburger from "../Hamburger";
import {useHistory} from "react-router-native";
import Search from "../../Search";

const PosedLinksBox = posed.View({
    open: {
        y: Platform.OS === "android" ? 0 : "0",
        transition: {
            default: {ease: "linear", duration: 200},
        },
    },
    close: {
        y: Platform.OS === "android" ? -1000 : "-800%",
        transition: {
            default: {ease: "linear", duration: 200},
        },
    },
});

const StyledLinksBox = styled(PosedLinksBox)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: ${({theme}) => theme.colors.white};
`;

const StyledHeader = styled.View`
  height: 25%;
  background-color: ${({theme}) => theme.colors.gray};
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
  display: flex;
  flex-direction: row;
  position: relative;
`;

const StyledSearchContainer = styled.View`
  width: 100%;
  height: 50px;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 20px;
`;

const StyledHamburgerWrapper = styled.View`
  position: absolute;
  right: 0;
  margin: 20px;
  z-index: 5;
`;

const StyledName = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  margin-top: 15%;
  padding-bottom: 15px;
`;

const StyledImage = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
`;

const StyledHello = styled.View`
  display: flex;
  justify-content: center;
  margin-left: 15px;
`;

const StyledHelloText = styled.Text`
  font-size: 20px;
  font-weight: ${({theme, isBold}) =>
    isBold ? theme.fonts.bold : theme.fonts.regular};
`;

const StyledLinks = styled.View`
  display: flex;
  margin-left: 25%;
`;

const StyledLinkText = styled.Text`
  color: ${({theme}) => theme.colors.black};
  font-size: 20px;
  padding: 10px 0;
`;

const StyledLinkItem = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledIcon = styled.Image`
  width: 20px;
  height: 20px;
  margin-right: 5%;
`;

const StyledAvatar = styled.Image`
  border-radius: 16px;
`;

const LinksBox = ({isOpen, setIsOpen}) => {
    let history = useHistory();

    const handlePress = () => {
        setIsOpen(!isOpen);
    };

    return (
        <StyledLinksBox isOpen={isOpen} pose={isOpen ? "open" : "close"}>
            <StyledHeader>
                <StyledName>
                    <StyledImage>
                        <StyledAvatar
                            source={require("../../../assets/icons/avatar.png")}
                        />
                    </StyledImage>
                    <StyledHello>
                        <StyledHelloText>Witaj,</StyledHelloText>
                        <StyledHelloText isBold>Angelika! 😀</StyledHelloText>
                    </StyledHello>
                </StyledName>

                <StyledHamburgerWrapper>
                    <Hamburger isOpen={isOpen} setIsOpen={setIsOpen}/>
                </StyledHamburgerWrapper>

            </StyledHeader>

          <StyledSearchContainer>
            <Search closeLinksBox={() => setIsOpen(false)} />
          </StyledSearchContainer>

            <StyledLinks>
                {menuLinks.map(({name, slug}) => {
                    return (
                        <Link to={`${slug}`} key={slug}>
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    handlePress();
                                    history.push(slug);
                                }}
                            >
                                <StyledLinkItem>
                                    {name === "Dzikopedia" ? (
                                        <StyledIcon
                                            source={require("../../../assets/icons/question-mark.png")}
                                        />
                                    ) : (
                                        <StyledIcon
                                            source={require("../../../assets/icons/settings.png")}
                                        />
                                    )}

                                    <StyledLinkText>{name}</StyledLinkText>
                                </StyledLinkItem>
                            </TouchableWithoutFeedback>
                        </Link>
                    );
                })}
            </StyledLinks>
        </StyledLinksBox>
    );
};

LinksBox.propTypes = {
    isOpen: PropTypes.bool,
    setIsOpen: PropTypes.func,
};

LinksBox.defaultProps = {
    isOpen: false,
    setIsOpen: () => {
    },
};

export default LinksBox;
